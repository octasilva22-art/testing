// STATE APLIKASI
let currentUser = null;
let currentPage = 'home';
let currentClass = null;
let replyingTo = null;
let firebaseInitialized = false;

// INISIALISASI APLIKASI
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplikasi Alumni dimulai...');
    
    // Setup event listeners
    setupNavigation();
    setupAuthForms();
    loadClassesPreview();
    
    // Check remembered user
    checkRememberedUser();
    
    // Initialize Firebase
    initializeFirebase();
});

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

// LOAD KELAS PREVIEW
function loadClassesPreview() {
    const container = document.getElementById('classes-preview');
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
    
    container.innerHTML += `<div class="classes-container">${classCards}</div>`;
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

// LOAD DATA ALUMNI
function loadAlumniData(classId) {
    const alumniList = document.getElementById('alumni-list');
    if (!alumniList) return;
    
    let alumniData = [];
    
    switch(classId) {
        case 'tjkt1':
            alumniData = alumniTJKT1;
            break;
        case 'tjkt2':
            alumniData = alumniTJKT2;
            break;
        case 'akutansi':
            alumniData = alumniAkutansi;
            break;
        case 'guru':
            alumniData = alumniGuru;
            break;
    }
    
    alumniList.innerHTML = alumniData.map(alumni => `
        <div class="alumni-card">
            <div class="alumni-avatar">
                <i class="fas fa-user"></i>
            </div>
            <h4 class="alumni-name">${alumni.name}</h4>
            <p class="alumni-motto">${alumni.motto}</p>
            ${alumni.current ? `<p class="alumni-current"><small>${alumni.current}</small></p>` : ''}
        </div>
    `).join('');
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
    
    // Simulasi login (ganti dengan Firebase Authentication)
    setTimeout(() => {
        // Cek di database users
        if (firebaseInitialized) {
            database.ref('users').orderByChild('email').equalTo(email).once('value', snapshot => {
                showLoading(false);
                
                const users = snapshot.val();
                if (users) {
                    const userId = Object.keys(users)[0];
                    const user = users[userId];
                    
                    if (user.password === password) {
                        currentUser = {
                            id: userId,
                            ...user
                        };
                        
                        // Remember user
                        if (remember) {
                            localStorage.setItem('rememberedEmail', email);
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
                role: 'alumni'
            };
            
            showNotification('Login berhasil (demo mode)!', 'success');
            updateUserUI();
            showPage('home');
        }
    }, 1000);
}

function register() {
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
    
    showLoading(true);
    
    // Simulasi register
    setTimeout(() => {
        if (firebaseInitialized) {
            const newUser = {
                name: name,
                email: email,
                password: password,
                role: 'alumni',
                createdAt: Date.now()
            };
            
            database.ref('users').push(newUser, error => {
                showLoading(false);
                
                if (!error) {
                    showNotification('Registrasi berhasil! Silakan login.', 'success');
                    showLogin();
                } else {
                    showNotification('Terjadi kesalahan saat registrasi.', 'error');
                }
            });
        } else {
            // Fallback untuk demo
            showLoading(false);
            showNotification('Registrasi berhasil (demo mode)! Silakan login.', 'success');
            showLogin();
        }
    }, 1000);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('rememberedEmail');
    updateUserUI();
    showNotification('Berhasil logout!', 'success');
    showPage('home');
}

function updateUserUI() {
    const forumNav = document.getElementById('forum-nav');
    const logoutNav = document.getElementById('logout-nav');
    
    if (currentUser) {
        if (forumNav) forumNav.style.display = 'flex';
        if (logoutNav) logoutNav.style.display = 'flex';
        
        const userName = document.getElementById('current-user-name');
        if (userName) userName.textContent = currentUser.name;
    } else {
        if (forumNav) forumNav.style.display = 'none';
        if (logoutNav) logoutNav.style.display = 'none';
    }
}

function checkRememberedUser() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('login-email').value = rememberedEmail;
        document.getElementById('remember-me').checked = true;
    }
}

// FORUM FUNCTIONS
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
    
    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-sender">
                ${msg.senderName} ${isAdmin ? '<i class="fas fa-shield-alt"></i>' : ''}
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
        role: currentUser.role || 'alumni'
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
        text.textContent = message;
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
}

function showRegister() {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById('register-form').classList.add('active');
}

function showForgotPassword() {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById('forgot-form').classList.add('active');
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