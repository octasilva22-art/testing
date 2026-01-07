// STATE APLIKASI
let currentUser = null;
let currentPage = 'home';
let currentClass = null;
let replyingTo = null;
let firebaseInitialized = false;
let currentStudentProfile = null;
let rememberMeEnabled = false;

// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceID: 'service_xxxxxxxx',    // Ganti dengan Service ID Anda
    templateID: 'template_xxxxxxxx',  // Ganti dengan Template ID Anda
    userID: 'user_xxxxxxxxxx'         // Ganti dengan Public Key Anda
};

// INISIALISASI APLIKASI
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplikasi Alumni dimulai...');
    
    // Initialize EmailJS jika ada
    initEmailJS();
    
    // Check remember me first
    checkRememberedUser();
    
    // Setup event listeners
    setupNavigation();
    setupAuthForms();
    loadClassesPreview();
    
    // Initialize Firebase
    initializeFirebase();
    
    // Setup klik di luar dropdown
    document.addEventListener('click', closeDropdowns);
    
    // Auto login jika ada remember me
    autoLoginIfRemembered();
    
    // Handle verification dari URL
    handleURLVerification();
});

// Initialize EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        try {
            emailjs.init(EMAILJS_CONFIG.userID);
            console.log('EmailJS initialized successfully');
        } catch (error) {
            console.error('EmailJS init error:', error);
        }
    } else {
        console.warn('EmailJS SDK not loaded yet');
        // Load EmailJS dynamically
        loadEmailJSSDK();
    }
}

// Load EmailJS SDK dynamically
function loadEmailJSSDK() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = function() {
        console.log('EmailJS SDK loaded dynamically');
        initEmailJS();
    };
    script.onerror = function() {
        console.error('Failed to load EmailJS SDK');
    };
    document.head.appendChild(script);
}

// Handle verification dari URL
function handleURLVerification() {
    const urlParams = new URLSearchParams(window.location.search);
    const verificationToken = urlParams.get('verify');
    
    if (verificationToken) {
        console.log('Found verification token in URL:', verificationToken);
        showPage('login');
        setTimeout(() => {
            verifyEmail(verificationToken);
        }, 1000);
        
        // Hapus token dari URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Handle reset password dari URL
    const resetToken = urlParams.get('reset');
    if (resetToken) {
        showPage('login');
        showResetPasswordForm(resetToken);
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

// AUTO LOGIN JIKA ADA REMEMBER ME
async function autoLoginIfRemembered() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser && !currentUser) {
        try {
            const userData = JSON.parse(rememberedUser);
            showLoading(true);
            
            // Verifikasi di Firebase
            if (firebaseInitialized) {
                database.ref('users').orderByChild('email').equalTo(userData.email).once('value', snapshot => {
                    showLoading(false);
                    
                    const users = snapshot.val();
                    if (users) {
                        const userId = Object.keys(users)[0];
                        const user = users[userId];
                        
                        // Check if token masih valid (dibuat dalam 7 hari)
                        const tokenCreated = localStorage.getItem('rememberTokenCreated');
                        const tokenAge = Date.now() - parseInt(tokenCreated || 0);
                        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 hari
                        
                        if (tokenAge < maxAge && userData.token === localStorage.getItem('rememberToken')) {
                            currentUser = {
                                id: userId,
                                ...user
                            };
                            
                            showNotification('Login otomatis berhasil!', 'success');
                            updateUserUI();
                            showPage('home');
                        } else {
                            // Token expired, hapus remember me
                            localStorage.removeItem('rememberedUser');
                            localStorage.removeItem('rememberToken');
                            localStorage.removeItem('rememberTokenCreated');
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Auto login error:', error);
            showLoading(false);
        }
    }
}

// SETUP NAVIGASI
function setupNavigation() {
    // Nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            if (page === 'logout') {
                logout();
                return;
            }
            
            if (page === 'forum' && !currentUser) {
                showNotification('Silakan login terlebih dahulu!', 'warning');
                showPage('login');
                return;
            }
            
            showPage(page);
        });
    });
    
    // Setup dropdown toggle
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.parentElement.querySelector('.dropdown-menu');
            dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// Setup close dropdown saat klik di luar
function closeDropdowns(event) {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    const userMenu = document.getElementById('user-menu');
    
    if (userMenu && !userMenu.contains(event.target)) {
        dropdowns.forEach(dropdown => {
            if (dropdown.style.display === 'flex') {
                dropdown.style.display = 'none';
            }
        });
    }
}

// SETUP FORM AUTH
function setupAuthForms() {
    // Enter key untuk login
    document.getElementById('login-email')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') login();
    });
    
    document.getElementById('login-password')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') login();
    });
    
    // Enter key untuk register
    document.getElementById('reg-name')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') register();
    });
    
    document.getElementById('reg-email')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') register();
    });
    
    document.getElementById('reg-password')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') register();
    });
    
    document.getElementById('reg-confirm')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') register();
    });
}

// RESET FORM REGISTER
function resetRegisterForm() {
    document.getElementById('reg-name').value = '';
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('reg-confirm').value = '';
}

// FUNGSI HALAMAN
function showPage(pageName) {
    console.log('Menampilkan halaman:', pageName);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-page') === pageName) {
            btn.classList.add('active');
        }
    });
    
    // Show selected page
    const pageElement = document.getElementById(`${pageName}-page`);
    if (pageElement) {
        pageElement.classList.add('active');
        currentPage = pageName;
        
        // Page-specific actions
        switch(pageName) {
            case 'forum':
                if (currentUser) loadForumMessages();
                break;
            case 'classes':
                break;
            case 'home':
                // Tutup forum fullscreen jika ada
                document.querySelector('.forum-fullscreen')?.classList.remove('active');
                break;
            case 'login':
                // Reset form register jika ada
                resetRegisterForm();
                break;
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

function goBack() {
    if (currentClass) {
        currentClass = null;
        showPage('classes');
    } else if (currentPage === 'class-detail') {
        showPage('classes');
    } else {
        showPage('home');
    }
}

// LOAD KELAS PREVIEW DI HOME
function loadClassesPreview() {
    const container = document.querySelector('#home-page .classes-container');
    if (!container) return;
    
    const classCards = classesData.slice(0, 3).map(cls => `
        <div class="class-card" data-class="${cls.id}">
            <div class="class-image" style="background: ${cls.color}">
                <i class="fas ${cls.icon}"></i>
            </div>
            <div class="class-info">
                <h3>${cls.name}</h3>
                <p>${cls.description}</p>
                <button class="class-btn" onclick="openClassDetail('${cls.id}')">
                    <i class="fas fa-external-link-alt"></i> Lihat Detail
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = classCards;
}

// BUKA DETAIL KELAS
function openClassDetail(classId) {
    console.log('Membuka detail kelas:', classId);
    
    const classData = classesData.find(c => c.id === classId);
    if (!classData) return;
    
    currentClass = classId;
    
    // Update title
    document.getElementById('class-detail-title').textContent = classData.name;
    
    // Load content
    const content = document.querySelector('.class-content');
    content.innerHTML = `
        <div class="class-description">
            <h3>${classData.name}</h3>
            <p>${classData.fullDescription || classData.description}</p>
            
            ${classData.stats ? `
                <div class="class-stats">
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <span>${classData.stats.students} Siswa</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-calendar"></i>
                        <span>${classData.stats.years}</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-trophy"></i>
                        <span>${classData.stats.achievements}</span>
                    </div>
                </div>
            ` : ''}
        </div>
        
        <div class="class-tabs">
            <button class="tab-btn active" data-tab="alumni">Alumni</button>
            <button class="tab-btn" data-tab="gallery">Galeri</button>
            <button class="tab-btn" data-tab="info">Informasi</button>
        </div>
        
        <div class="tab-content">
            <div id="alumni-tab" class="tab-pane active">
                <div class="alumni-grid" id="alumni-list"></div>
            </div>
            <div id="gallery-tab" class="tab-pane">
                <div class="gallery-grid" id="gallery-content"></div>
            </div>
            <div id="info-tab" class="tab-pane">
                <div class="class-info-content">
                    ${classData.info || '<p>Informasi detail akan segera tersedia.</p>'}
                </div>
            </div>
        </div>
    `;
    
    // Load alumni data
    loadAlumniData(classId);
    
    // Load gallery data
    loadGalleryData(classId);
    
    // Setup tabs
    setupClassTabs();
    
    // Show page
    showPage('class-detail');
}

function setupClassTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected tab content
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            document.getElementById(`${tab}-tab`).classList.add('active');
        });
    });
}

// LOAD DATA ALUMNI dengan click event untuk profile
function loadAlumniData(classId) {
    const alumniList = document.getElementById('alumni-list');
    if (!alumniList) return;
    
    let alumniData = studentProfiles[classId] || [];
    
    alumniList.innerHTML = alumniData.map((alumni, index) => `
        <div class="alumni-card" onclick="showStudentProfile('${classId}', ${index})">
            <div class="alumni-avatar">
                <i class="fas fa-user"></i>
            </div>
            <h4 class="alumni-name">${alumni.name}</h4>
            <p class="alumni-motto">"${alumni.motto}"</p>
            ${alumni.current ? `<p class="alumni-current"><small>${alumni.current}</small></p>` : ''}
        </div>
    `).join('');
}

// TAMPILKAN PROFILE SISWA
function showStudentProfile(classId, index) {
    const alumniData = studentProfiles[classId];
    if (!alumniData || !alumniData[index]) return;
    
    const alumni = alumniData[index];
    currentStudentProfile = alumni;
    
    // Update modal content
    document.getElementById('profile-name').textContent = alumni.name;
    document.getElementById('profile-class').textContent = alumni.class;
    document.getElementById('profile-motto').textContent = alumni.motto;
    document.getElementById('profile-education').textContent = alumni.education || 'SMK Diponegoro Cipari';
    document.getElementById('profile-job').textContent = alumni.job || 'Belum bekerja';
    document.getElementById('profile-contact').textContent = alumni.contact || '-';
    document.getElementById('profile-achievements').textContent = alumni.achievements || 'Belum ada prestasi tercatat';
    
    // Show modal
    document.getElementById('student-profile-modal').classList.add('active');
}

function closeStudentProfile() {
    document.getElementById('student-profile-modal').classList.remove('active');
    currentStudentProfile = null;
}

// LOAD GALLERY DATA
function loadGalleryData(classId) {
    const galleryContent = document.getElementById('gallery-content');
    if (!galleryContent) return;
    
    let galleryData = galleryImages[classId] || [];
    
    galleryContent.innerHTML = galleryData.map(img => `
        <div class="gallery-item">
            <img src="${img.src}" alt="${img.alt}" loading="lazy">
        </div>
    `).join('');
}

// GENERATE REMEMBER TOKEN
function generateRememberToken() {
    return 'rmb_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// GENERATE VERIFICATION TOKEN
function generateVerificationToken() {
    return 'verify_' + Date.now() + '_' + Math.random().toString(36).substr(2, 16);
}

// FUNGSI KIRIM EMAIL VERIFIKASI
async function sendVerificationEmail(email, token, name) {
    console.log('Sending verification email to:', email);
    
    try {
        // Pastikan EmailJS sudah di-load
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS SDK not loaded');
            return {
                success: false,
                error: 'Email service not available',
                developmentMode: true
            };
        }
        
        // Pastikan sudah di-init
        if (!emailjs.defaults || !emailjs.defaults.userId) {
            emailjs.init(EMAILJS_CONFIG.userID);
        }
        
        const verificationLink = `${window.location.origin}?verify=${token}`;
        
        // Template parameters
        const templateParams = {
            to_name: name,
            to_email: email,
            from_name: 'Alumni SMK Diponegoro Cipari',
            reply_to: 'noreply@example.com',
            verification_link: verificationLink,
            website_url: window.location.origin,
            current_year: new Date().getFullYear(),
            timestamp: new Date().toLocaleString('id-ID')
        };
        
        console.log('EmailJS Config:', EMAILJS_CONFIG);
        console.log('Template Params:', templateParams);
        
        // Kirim email
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            templateParams
        );
        
        console.log('✅ Email sent successfully:', response);
        return { 
            success: true, 
            message: 'Email verifikasi berhasil dikirim',
            response: response 
        };
        
    } catch (error) {
        console.error('❌ Error sending email:', error);
        
        // Fallback untuk development/localhost
        if (window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1' ||
            error.text?.includes('Invalid') ||
            error.status === 412) {
            
            console.log('=== DEVELOPMENT MODE ACTIVATED ===');
            const verificationLink = `${window.location.origin}?verify=${token}`;
            
            console.log(`📧 Verification link for ${name} (${email}):`);
            console.log(`🔗 ${verificationLink}`);
            
            // Tampilkan link di halaman untuk testing
            showNotification(`[TEST MODE] Verification link: ${verificationLink}`, 'info');
            
            return { 
                success: true, 
                message: 'Development mode: Check console for verification link',
                developmentMode: true,
                verificationLink: verificationLink
            };
        }
        
        return { 
            success: false, 
            error: error.text || 'Gagal mengirim email verifikasi',
            details: error 
        };
    }
}

// AUTH FUNCTIONS
function login() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const remember = document.getElementById('remember-me').checked;
    
    if (!email || !password) {
        showNotification('Email dan password harus diisi!', 'warning');
        return;
    }
    
    showLoading(true);
    
    // Simulasi login
    setTimeout(() => {
        if (firebaseInitialized) {
            database.ref('users').orderByChild('email').equalTo(email).once('value', snapshot => {
                showLoading(false);
                
                const users = snapshot.val();
                if (users) {
                    const userId = Object.keys(users)[0];
                    const user = users[userId];
                    
                    // Cek apakah email sudah diverifikasi
                    if (user.emailVerified !== true && user.role !== 'admin') {
                        showNotification('Email belum diverifikasi! Cek email Anda untuk link verifikasi.', 'warning');
                        
                        // Tampilkan tombol resend verification
                        const loginForm = document.getElementById('login-form');
                        const existingBtn = loginForm.querySelector('.resend-verification');
                        if (!existingBtn) {
                            const resendBtn = document.createElement('button');
                            resendBtn.type = 'button';
                            resendBtn.className = 'resend-btn';
                            resendBtn.innerHTML = '<i class="fas fa-redo"></i> Kirim Ulang Verifikasi';
                            resendBtn.onclick = () => resendVerification(email);
                            loginForm.appendChild(resendBtn);
                        }
                        return;
                    }
                    
                    if (user.password === password) {
                        currentUser = {
                            id: userId,
                            ...user
                        };
                        
                        // Remember user jika dicentang
                        if (remember) {
                            const token = generateRememberToken();
                            const userData = {
                                id: userId,
                                email: email,
                                name: user.name,
                                token: token
                            };
                            
                            localStorage.setItem('rememberedUser', JSON.stringify(userData));
                            localStorage.setItem('rememberToken', token);
                            localStorage.setItem('rememberTokenCreated', Date.now().toString());
                            
                            // Simpan juga di Firebase untuk validasi
                            database.ref(`users/${userId}/rememberToken`).set(token);
                        } else {
                            // Hapus remember me jika tidak dicentang
                            localStorage.removeItem('rememberedUser');
                            localStorage.removeItem('rememberToken');
                            localStorage.removeItem('rememberTokenCreated');
                        }
                        
                        showNotification('Login berhasil!', 'success');
                        updateUserUI();
                        showPage('home');
                    } else {
                        showNotification('Password salah!', 'error');
                    }
                } else {
                    showNotification('Email tidak terdaftar!', 'error');
                }
            });
        } else {
            // Fallback untuk demo
            showLoading(false);
            currentUser = {
                id: 'demo-user',
                name: 'User Demo',
                email: email,
                role: 'alumni',
                emailVerified: true
            };
            
            if (remember) {
                const token = generateRememberToken();
                const userData = {
                    id: 'demo-user',
                    email: email,
                    name: 'User Demo',
                    token: token
                };
                
                localStorage.setItem('rememberedUser', JSON.stringify(userData));
                localStorage.setItem('rememberToken', token);
                localStorage.setItem('rememberTokenCreated', Date.now().toString());
            }
            
            showNotification('Login berhasil (demo mode)!', 'success');
            updateUserUI();
            showPage('home');
        }
    }, 1000);
}

async function register() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const confirm = document.getElementById('reg-confirm').value.trim();
    
    if (!name || !email || !password || !confirm) {
        showNotification('Semua field harus diisi!', 'warning');
        return;
    }
    
    if (password !== confirm) {
        showNotification('Password tidak cocok!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password minimal 6 karakter!', 'error');
        return;
    }
    
    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Format email tidak valid!', 'error');
        return;
    }
    
    showLoading(true);
    
    // Check if email already exists
    if (firebaseInitialized) {
        database.ref('users').orderByChild('email').equalTo(email).once('value', snapshot => {
            if (snapshot.exists()) {
                showLoading(false);
                showNotification('Email sudah terdaftar!', 'error');
                return;
            }
            
            // Create user dengan verifikasi email
            createUserWithVerification(name, email, password);
        });
    } else {
        // Fallback untuk demo
        showLoading(false);
        showRegistrationSuccess(email, name);
        showLogin();
    }
}

async function createUserWithVerification(name, email, password) {
    // Generate verification token
    const verificationToken = generateVerificationToken();
    
    const newUser = {
        name: name,
        email: email,
        password: password,
        role: 'alumni',
        emailVerified: false,
        verificationToken: verificationToken,
        verificationSentAt: Date.now(),
        createdAt: Date.now()
    };
    
    database.ref('users').push(newUser, async (error, ref) => {
        showLoading(false);
        
        if (!error) {
            const userId = ref.key;
            
            // Kirim email verifikasi
            const emailResult = await sendVerificationEmail(email, verificationToken, name);
            
            if (emailResult.success) {
                // Tampilkan halaman sukses dengan form kosong
                showRegistrationSuccess(email, name, emailResult.developmentMode, emailResult.verificationLink);
                
                // Reset form untuk pendaftaran berikutnya
                resetRegisterForm();
                
                // Simpan data user sementara untuk resend
                sessionStorage.setItem('pendingVerification', JSON.stringify({
                    userId: userId,
                    email: email,
                    name: name,
                    token: verificationToken
                }));
                
            } else {
                showNotification('Registrasi berhasil tapi gagal mengirim email verifikasi. Silakan coba login nanti.', 'warning');
                showLogin();
            }
        } else {
            showNotification('Terjadi kesalahan saat registrasi.', 'error');
        }
    });
}

function showRegistrationSuccess(email, name, developmentMode = false, verificationLink = '') {
    const registerForm = document.getElementById('register-form');
    
    let additionalInfo = '';
    if (developmentMode && verificationLink) {
        additionalInfo = `
            <div class="dev-info">
                <h4><i class="fas fa-code"></i> Development Mode</h4>
                <p>Karena dalam mode development, berikut link verifikasi Anda:</p>
                <div class="verification-link-box">
                    <input type="text" value="${verificationLink}" readonly class="link-input">
                    <button class="copy-btn" onclick="copyToClipboard('${verificationLink}')">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <p class="small-text">Klik link di atas atau copy ke browser untuk verifikasi.</p>
            </div>
        `;
    }
    
    registerForm.innerHTML = `
        <div class="registration-success">
            <i class="fas fa-check-circle"></i>
            <h2>Registrasi Berhasil!</h2>
            <div class="success-details">
                <p><strong>Nama:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
            </div>
            <div class="verification-instruction">
                <h3><i class="fas fa-envelope"></i> Periksa Email Anda</h3>
                <p>Kami telah mengirim link verifikasi ke <strong>${email}</strong></p>
                <p>Silakan cek inbox (dan folder spam) email Anda dan klik link verifikasi untuk mengaktifkan akun.</p>
                
                ${additionalInfo}
                
                <div class="success-actions">
                    <button class="auth-btn primary-btn" onclick="showLogin()">
                        <i class="fas fa-sign-in-alt"></i> Ke Halaman Login
                    </button>
                    <button class="auth-btn secondary-btn" onclick="resendVerification('${email}')">
                        <i class="fas fa-redo"></i> Kirim Ulang Verifikasi
                    </button>
                    <button class="auth-btn outline-btn" onclick="resetRegistrationForm()">
                        <i class="fas fa-user-plus"></i> Daftar Akun Baru
                    </button>
                </div>
                
                <div class="note">
                    <p><i class="fas fa-info-circle"></i> <strong>Catatan:</strong></p>
                    <ul>
                        <li>Link verifikasi berlaku 24 jam</li>
                        <li>Pastikan email sudah benar</li>
                        <li>Cek folder spam jika tidak menemukan email</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function resetRegistrationForm() {
    // Reset ke form register awal
    const registerForm = document.getElementById('register-form');
    registerForm.innerHTML = `
        <h2><i class="fas fa-user-plus"></i> Registrasi Alumni</h2>
        <div class="form-group">
            <input type="text" id="reg-name" placeholder="Nama Lengkap" class="form-input">
            <i class="fas fa-user input-icon"></i>
        </div>
        <div class="form-group">
            <input type="email" id="reg-email" placeholder="Email" class="form-input">
            <i class="fas fa-envelope input-icon"></i>
        </div>
        <div class="form-group">
            <input type="password" id="reg-password" placeholder="Password" class="form-input">
            <i class="fas fa-lock input-icon"></i>
        </div>
        <div class="form-group">
            <input type="password" id="reg-confirm" placeholder="Konfirmasi Password" class="form-input">
            <i class="fas fa-lock input-icon"></i>
        </div>
        <button class="auth-btn" onclick="register()">
            <i class="fas fa-user-plus"></i> Daftar
        </button>
        <p class="auth-switch">
            Sudah punya akun? <a href="#" onclick="showLogin()">Login disini</a>
        </p>
    `;
    
    // Setup event listeners untuk form baru
    setupAuthForms();
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Link berhasil disalin!', 'success');
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

async function resendVerification(email) {
    showLoading(true);
    
    if (firebaseInitialized) {
        database.ref('users').orderByChild('email').equalTo(email).once('value', async snapshot => {
            showLoading(false);
            
            const users = snapshot.val();
            if (users) {
                const userId = Object.keys(users)[0];
                const user = users[userId];
                
                if (user.emailVerified) {
                    showNotification('Email sudah diverifikasi! Silakan login.', 'info');
                    showLogin();
                    return;
                }
                
                // Generate token baru
                const newToken = generateVerificationToken();
                
                // Update token di database
                database.ref(`users/${userId}`).update({
                    verificationToken: newToken,
                    verificationSentAt: Date.now()
                });
                
                // Kirim ulang email
                const result = await sendVerificationEmail(email, newToken, user.name);
                
                if (result.success) {
                    showNotification('Email verifikasi telah dikirim ulang!', 'success');
                    
                    if (result.developmentMode && result.verificationLink) {
                        console.log('New verification link:', result.verificationLink);
                        showNotification(`[TEST] Link baru: ${result.verificationLink}`, 'info');
                    }
                } else {
                    showNotification('Gagal mengirim ulang email verifikasi.', 'error');
                }
            } else {
                showNotification('Email tidak ditemukan!', 'error');
            }
        });
    }
}

// FUNGSI VERIFIKASI EMAIL (dipanggil dari link email)
async function verifyEmail(token) {
    showLoading(true);
    console.log('Verifying token:', token);
    
    if (firebaseInitialized) {
        // Cari user dengan token tersebut
        database.ref('users').orderByChild('verificationToken').equalTo(token).once('value', snapshot => {
            showLoading(false);
            
            const users = snapshot.val();
            if (users) {
                const userId = Object.keys(users)[0];
                const user = users[userId];
                
                // Cek apakah token masih valid (kurang dari 24 jam)
                const tokenSentAt = user.verificationSentAt || 0;
                const tokenAge = Date.now() - tokenSentAt;
                const maxAge = 24 * 60 * 60 * 1000; // 24 jam
                
                if (tokenAge > maxAge) {
                    showVerificationError('Token verifikasi sudah kadaluarsa. Silakan request verifikasi ulang.');
                    return;
                }
                
                // Update status verifikasi
                database.ref(`users/${userId}`).update({
                    emailVerified: true,
                    verifiedAt: Date.now(),
                    verificationToken: null
                });
                
                // Tampilkan halaman sukses
                showVerificationSuccess(user.name, user.email);
                
                // Hapus dari session storage jika ada
                sessionStorage.removeItem('pendingVerification');
                
            } else {
                showVerificationError('Token verifikasi tidak valid atau sudah digunakan.');
            }
        });
    } else {
        showLoading(false);
        showVerificationError('Sistem verifikasi tidak tersedia.');
    }
}

function showVerificationSuccess(userName, userEmail) {
    document.getElementById('login-page').innerHTML = `
        <div class="auth-container">
            <div class="auth-form active">
                <div class="verification-success">
                    <i class="fas fa-check-circle"></i>
                    <h2>Email Berhasil Diverifikasi!</h2>
                    <div class="user-info">
                        <p><strong>Nama:</strong> ${userName}</p>
                        <p><strong>Email:</strong> ${userEmail}</p>
                    </div>
                    <p>Akun Anda sekarang sudah aktif dan dapat digunakan untuk login.</p>
                    <button class="auth-btn" onclick="showLogin()">
                        <i class="fas fa-sign-in-alt"></i> Login Sekarang
                    </button>
                </div>
            </div>
        </div>
    `;
    showPage('login');
}

function showVerificationError(message) {
    document.getElementById('login-page').innerHTML = `
        <div class="auth-container">
            <div class="auth-form active">
                <div class="verification-error">
                    <i class="fas fa-times-circle"></i>
                    <h2>Verifikasi Gagal</h2>
                    <p>${message}</p>
                    <div class="verification-actions">
                        <button class="auth-btn" onclick="showLogin()">
                            <i class="fas fa-sign-in-alt"></i> Ke Halaman Login
                        </button>
                        <button class="resend-btn" onclick="showRegister()">
                            <i class="fas fa-user-plus"></i> Daftar Ulang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    showPage('login');
}

function logout() {
    currentUser = null;
    
    // Hapus remember token dari localStorage dan Firebase
    localStorage.removeItem('rememberedUser');
    localStorage.removeItem('rememberToken');
    localStorage.removeItem('rememberTokenCreated');
    
    if (firebaseInitialized && currentUser) {
        database.ref(`users/${currentUser.id}/rememberToken`).remove();
    }
    
    updateUserUI();
    showNotification('Berhasil logout!', 'success');
    showPage('home');
}

function updateUserUI() {
    const userMenu = document.getElementById('user-menu');
    const loginNav = document.getElementById('login-nav');
    
    if (currentUser) {
        // Sembunyikan tombol login, tampilkan menu titik tiga
        if (loginNav) loginNav.style.display = 'none';
        if (userMenu) userMenu.style.display = 'block';
        
        const userName = document.getElementById('current-user-name');
        if (userName) userName.textContent = currentUser.name;
        
        // Tampilkan badge verifikasi jika sudah verified
        if (currentUser.emailVerified) {
            userName.innerHTML = `${currentUser.name} <i class="fas fa-check-circle verified-badge" title="Email Terverifikasi"></i>`;
        }
    } else {
        // Sembunyikan menu titik tiga, tampilkan tombol login
        if (userMenu) userMenu.style.display = 'none';
        if (loginNav) loginNav.style.display = 'flex';
    }
}

function checkRememberedUser() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        try {
            const userData = JSON.parse(rememberedUser);
            const emailInput = document.getElementById('login-email');
            const rememberCheck = document.getElementById('remember-me');
            
            if (emailInput) emailInput.value = userData.email;
            if (rememberCheck) rememberCheck.checked = true;
        } catch (e) {
            console.error('Error parsing remembered user:', e);
        }
    }
}

// Fungsi untuk menampilkan form reset password
function showResetPasswordForm(token) {
    document.getElementById('login-page').innerHTML = `
        <div class="auth-container">
            <div class="auth-form active">
                <h2><i class="fas fa-key"></i> Reset Password</h2>
                <div class="form-group">
                    <input type="password" id="new-password" placeholder="Password Baru" class="form-input">
                    <i class="fas fa-lock input-icon"></i>
                </div>
                <div class="form-group">
                    <input type="password" id="confirm-password" placeholder="Konfirmasi Password" class="form-input">
                    <i class="fas fa-lock input-icon"></i>
                </div>
                <button class="auth-btn" onclick="resetPasswordWithToken('${token}')">
                    <i class="fas fa-save"></i> Simpan Password Baru
                </button>
                <p class="auth-switch">
                    <a href="#" onclick="showLogin()">Kembali ke Login</a>
                </p>
            </div>
        </div>
    `;
}

// Fungsi reset password dengan token
function resetPasswordWithToken(token) {
    const newPassword = document.getElementById('new-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    
    if (!newPassword || !confirmPassword) {
        showNotification('Password baru dan konfirmasi harus diisi!', 'warning');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('Password minimal 6 karakter!', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('Password tidak cocok!', 'error');
        return;
    }
    
    showLoading(true);
    
    if (firebaseInitialized) {
        // Cari user dengan reset token yang valid
        database.ref('users').orderByChild('resetToken').equalTo(token).once('value', snapshot => {
            const users = snapshot.val();
            if (users) {
                const userId = Object.keys(users)[0];
                const user = users[userId];
                
                // Cek apakah token masih valid (kurang dari 1 jam)
                const tokenExpires = user.resetTokenExpires || 0;
                if (Date.now() > tokenExpires) {
                    showLoading(false);
                    showNotification('Token reset password sudah kadaluarsa!', 'error');
                    showLogin();
                    return;
                }
                
                // Update password
                database.ref(`users/${userId}`).update({
                    password: newPassword,
                    resetToken: null,
                    resetTokenExpires: null
                }, error => {
                    showLoading(false);
                    
                    if (!error) {
                        showNotification('Password berhasil direset! Silakan login dengan password baru.', 'success');
                        showLogin();
                    } else {
                        showNotification('Gagal mereset password!', 'error');
                    }
                });
            } else {
                showLoading(false);
                showNotification('Token reset password tidak valid!', 'error');
                showLogin();
            }
        });
    } else {
        showLoading(false);
        showNotification('Reset password berhasil (demo mode)!', 'success');
        showLogin();
    }
}

// FORUM FUNCTIONS - FULLSCREEN
function loadForumMessages() {
    if (!firebaseInitialized || !currentUser) return;
    
    const messagesContainer = document.getElementById('forum-messages');
    messagesContainer.innerHTML = '<div class="loading-messages"><i class="fas fa-spinner fa-spin"></i> Memuat pesan...</div>';
    
    database.ref('messages').orderByChild('timestamp').limitToLast(50).on('value', snapshot => {
        const messages = snapshot.val();
        messagesContainer.innerHTML = '';
        
        if (!messages) {
            messagesContainer.innerHTML = '<div class="no-messages"><i class="fas fa-comment-slash"></i> Belum ada pesan</div>';
            return;
        }
        
        Object.entries(messages).forEach(([id, msg]) => {
            displayMessage(id, msg);
        });
        
        // Auto scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
}

function displayMessage(id, msg) {
    const container = document.getElementById('forum-messages');
    if (!container) return;
    
    // Skip if already exists
    if (document.getElementById(`msg-${id}`)) return;
    
    const isCurrentUser = msg.senderId === currentUser.id;
    const isAdmin = msg.role === 'admin';
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isCurrentUser ? 'sent' : 'received'}`;
    messageDiv.id = `msg-${id}`;
    
    let replyContent = '';
    if (msg.replyTo) {
        replyContent = `
            <div class="reply-indicator">
                <i class="fas fa-reply"></i> Membalas: ${msg.replyToName}
            </div>
            <div class="reply-message">${msg.replyToMessage}</div>
        `;
    }
    
    let actions = '';
    if (isCurrentUser || currentUser.role === 'admin') {
        actions = `
            <div class="message-actions">
                <button class="action-btn" onclick="deleteMessage('${id}')">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </div>
        `;
    }
    
    const verifiedBadge = msg.emailVerified ? ' <i class="fas fa-check-circle verified-badge-small" title="Email Terverifikasi"></i>' : '';
    
    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-sender">
                ${msg.senderName}${verifiedBadge} ${isAdmin ? '<i class="fas fa-shield-alt"></i>' : ''}
            </span>
            <span class="message-time">${formatTime(msg.timestamp)}</span>
        </div>
        ${replyContent}
        <div class="message-content">${msg.message}</div>
        ${actions}
        <button class="action-btn" onclick="setupReply('${id}', '${msg.senderName}', '${msg.message}')" style="margin-top: 5px;">
            <i class="fas fa-reply"></i> Balas
        </button>
    `;
    
    container.appendChild(messageDiv);
}

function sendMessage() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        showPage('login');
        return;
    }
    
    // Cek apakah email sudah diverifikasi
    if (!currentUser.emailVerified && currentUser.role !== 'admin') {
        showNotification('Email belum diverifikasi! Silakan verifikasi email Anda terlebih dahulu.', 'warning');
        
        // Tampilkan tombol resend verification
        if (!document.querySelector('.resend-verification-forum')) {
            const resendBtn = document.createElement('button');
            resendBtn.className = 'resend-btn resend-verification-forum';
            resendBtn.innerHTML = '<i class="fas fa-redo"></i> Kirim Ulang Verifikasi';
            resendBtn.onclick = () => resendVerification(currentUser.email);
            document.querySelector('.forum-header').appendChild(resendBtn);
        }
        return;
    }
    
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (!message) {
        showNotification('Pesan tidak boleh kosong!', 'warning');
        return;
    }
    
    if (!firebaseInitialized) {
        showNotification('Forum dalam mode demo. Pesan tidak tersimpan.', 'info');
        input.value = '';
        cancelReply();
        return;
    }
    
    const messageData = {
        senderId: currentUser.id,
        senderName: currentUser.name,
        message: message,
        timestamp: Date.now(),
        role: currentUser.role || 'alumni',
        emailVerified: currentUser.emailVerified || false
    };
    
    // Add reply data if replying
    if (replyingTo) {
        messageData.replyTo = replyingTo.id;
        messageData.replyToName = replyingTo.senderName;
        messageData.replyToMessage = replyingTo.message;
    }
    
    database.ref('messages').push(messageData, error => {
        if (!error) {
            input.value = '';
            cancelReply();
        } else {
            showNotification('Gagal mengirim pesan!', 'error');
        }
    });
}

function deleteMessage(messageId) {
    if (!confirm('Hapus pesan ini?')) return;
    
    if (!firebaseInitialized) {
        showNotification('Mode demo: Pesan tidak dapat dihapus', 'info');
        return;
    }
    
    database.ref(`messages/${messageId}`).remove();
}

function setupReply(messageId, senderName, message) {
    replyingTo = {
        id: messageId,
        senderName: senderName,
        message: message
    };
    
    const preview = document.getElementById('reply-preview');
    const text = document.getElementById('reply-text');
    
    if (preview && text) {
        text.textContent = message.length > 50 ? message.substring(0, 50) + '...' : message;
        preview.style.display = 'flex';
        document.getElementById('message-input').focus();
    }
}

function cancelReply() {
    replyingTo = null;
    const preview = document.getElementById('reply-preview');
    if (preview) preview.style.display = 'none';
}

function handleMessageKey(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// UI HELPER FUNCTIONS
function showLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = show ? 'flex' : 'none';
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notification-text');
    
    if (!notification || !text) return;
    
    // Set color based on type
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    text.textContent = message;
    notification.style.display = 'block';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

function hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) notification.style.display = 'none';
}

function showLogin() {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById('login-form').classList.add('active');
    
    // Reset form register juga
    resetRegistrationForm();
}

function showRegister() {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById('register-form').classList.add('active');
}

function showForgotPassword() {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById('forgot-form').classList.add('active');
}

function resetPassword() {
    const email = document.getElementById('reset-email').value.trim();
    
    if (!email) {
        showNotification('Email harus diisi!', 'warning');
        return;
    }
    
    showLoading(true);
    
    if (firebaseInitialized) {
        // Cek apakah email terdaftar
        database.ref('users').orderByChild('email').equalTo(email).once('value', snapshot => {
            showLoading(false);
            
            if (snapshot.exists()) {
                // Generate reset token
                const resetToken = 'reset_' + Date.now() + '_' + Math.random().toString(36).substr(2, 16);
                
                // Simpan reset token di database
                const userId = Object.keys(snapshot.val())[0];
                database.ref(`users/${userId}`).update({
                    resetToken: resetToken,
                    resetTokenExpires: Date.now() + 3600000 // 1 jam
                });
                
                // Kirim email reset (simulasi)
                sendResetPasswordEmail(email, resetToken);
                showNotification('Link reset password telah dikirim ke email Anda!', 'success');
                showLogin();
            } else {
                showNotification('Email tidak terdaftar!', 'error');
            }
        });
    } else {
        setTimeout(() => {
            showLoading(false);
            showNotification('Link reset password telah dikirim ke email Anda (demo mode)', 'success');
            showLogin();
        }, 1500);
    }
}

function sendResetPasswordEmail(email, token) {
    // Simulasi pengiriman email reset
    console.log('Mengirim email reset ke:', email);
    
    // Simpan data reset di Firebase
    if (firebaseInitialized) {
        database.ref('passwordResets').push({
            email: email,
            token: token,
            sentAt: Date.now(),
            used: false
        });
    }
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    // Less than 1 minute
    if (diff < 60000) return 'baru saja';
    
    // Less than 1 hour
    if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`;
    
    // Less than 1 day
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`;
    
    // Show date
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
}
