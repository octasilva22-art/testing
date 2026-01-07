// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJx7SW_gwv0B2tEyTHxGlcAhY2xmuvJ_o",
    authDomain: "chatalumnitjkt2.firebaseapp.com",
    databaseURL: "https://chatalumnitjkt2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chatalumnitjkt2",
    storageBucket: "chatalumnitjkt2.appspot.com",
    messagingSenderId: "356385118945",
    appId: "1:356385118945:web:9800bcf8774479fb68b5a0"
};

// Initialize Firebase
let app, database;

function initializeFirebase() {
    try {
        if (!firebase.apps.length) {
            app = firebase.initializeApp(firebaseConfig);
            database = firebase.database();
            firebaseInitialized = true;
            console.log('Firebase berhasil diinisialisasi');
            
            // Create default admin if not exists
            createDefaultAdmin();
        } else {
            app = firebase.app();
            database = firebase.database();
            firebaseInitialized = true;
            console.log('Firebase sudah diinisialisasi');
        }
    } catch (error) {
        console.error('Error inisialisasi Firebase:', error);
        showNotification('Mode demo aktif. Fitur chat tidak tersimpan permanen.', 'info');
    }
}

function createDefaultAdmin() {
    // Check if admin exists
    database.ref('users').orderByChild('email').equalTo('admin@example.com').once('value', snapshot => {
        if (!snapshot.exists()) {
            // Create admin user
            const adminUser = {
                name: 'Admin',
                email: 'admin@example.com',
                password: 'admin123',
                role: 'admin',
                createdAt: Date.now()
            };
            
            database.ref('users').push(adminUser);
            console.log('Admin default dibuat');
        }
    });
}