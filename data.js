// DATA KELAS
const classesData = [
    {
        id: 'tjkt1',
        name: 'Kelas TJKT 1',
        icon: 'fa-laptop-code',
        color: 'linear-gradient(45deg, #6a11cb, #2575fc)',
        description: '27 siswa kreatif dan inovatif',
        fullDescription: 'Kelas Teknik Jaringan Komputer dan Telekomunikasi 1 dengan fokus pada pengembangan jaringan komputer, cybersecurity, dan sistem telekomunikasi.',
        stats: {
            students: 27,
            years: '2022-2025',
            achievements: '5+ Prestasi'
        },
        info: `
            <h4>Deskripsi Kelas XII TJKT 1</h4>
            <p>Kelas XII TJKT 1 adalah kelas yang terdiri dari siswa-siswa yang memiliki minat dan bakat di bidang Teknologi dan Jaringan Komputer. Kami berkomitmen untuk memberikan pendidikan yang berkualitas dan mempersiapkan siswa untuk menghadapi tantangan di dunia kerja.</p>
            
            <h4>Tujuan Kelas</h4>
            <ul>
                <li>Mempersiapkan siswa untuk ujian nasional dan ujian kompetensi keahlian.</li>
                <li>Memberikan pengetahuan dan keterampilan di bidang teknologi informasi dan komunikasi.</li>
                <li>Mendorong siswa untuk berinovasi dan berkreasi dalam proyek-proyek teknologi.</li>
            </ul>
            
            <h4>Kegiatan Kelas</h4>
            <ul>
                <li>Workshop tentang pemrograman dan pengembangan aplikasi.</li>
                <li>Pelatihan jaringan komputer dan keamanan siber.</li>
                <li>Studi banding ke perusahaan teknologi terkemuka.</li>
                <li>Partisipasi dalam kompetisi teknologi tingkat nasional.</li>
            </ul>
        `
    },
    {
        id: 'tjkt2',
        name: 'Kelas TJKT 2',
        icon: 'fa-network-wired',
        color: 'linear-gradient(45deg, #11998e, #38ef7d)',
        description: '31 siswa berprestasi dan kompeten',
        fullDescription: 'Kelas Teknik Jaringan Komputer dan Telekomunikasi 2 dengan fokus pada administrasi jaringan, sistem operasi, dan pengembangan aplikasi berbasis jaringan.',
        stats: {
            students: 31,
            years: '2022-2025',
            achievements: '8+ Prestasi'
        },
        info: `
            <h4>Deskripsi Kelas XII TJKT 2</h4>
            <p>Kelas XII TJKT 2 adalah kelas yang terdiri dari siswa-siswa yang memiliki minat dan bakat di bidang Teknologi dan Jaringan Komputer. Kami berkomitmen untuk memberikan pendidikan yang berkualitas dan mempersiapkan siswa untuk menghadapi tantangan di dunia kerja.</p>
            
            <h4>Keunggulan Kelas</h4>
            <ul>
                <li>Laboratorium jaringan komputer lengkap</li>
                <li>Guru berpengalaman di bidang IT</li>
                <li>Program magang di perusahaan IT ternama</li>
                <li>Fasilitas pembelajaran terkini</li>
            </ul>
        `
    },
    {
        id: 'akutansi',
        name: 'Kelas Akutansi',
        image: 'Akutansi1.jpg',
        icon: 'fa-calculator',
        color: 'linear-gradient(45deg, #f46b45, #eea849)',
        description: '30 siswa teliti dan analitis',
        fullDescription: 'Kelas Akuntansi dengan fokus pada sistem akuntansi, perpajakan, auditing, dan manajemen keuangan perusahaan.',
        stats: {
            students: 30,
            years: '2022-2025',
            achievements: '6+ Prestasi'
        },
        info: `
            <h4>Deskripsi Kelas Akutansi</h4>
            <p>Kelas Akutansi mempersiapkan siswa untuk menjadi tenaga akuntansi yang profesional dan kompeten di bidang keuangan dan perpajakan.</p>
            
            <h4>Kompetensi yang Diajarkan</h4>
            <ul>
                <li>Akuntansi Dasar dan Lanjutan</li>
                <li>Perpajakan dan Sistem Perpajakan</li>
                <li>Auditing dan Pengendalian Internal</li>
                <li>Sistem Informasi Akuntansi</li>
                <li>Manajemen Keuangan</li>
            </ul>
        `
    },
    {
        id: 'guru',
        name: 'Daftar Guru',
        icon: 'fa-chalkboard-teacher',
        color: 'linear-gradient(45deg, #8e2de2, #4a00e0)',
        description: 'Staf pengajar dan pendidik',
        fullDescription: 'Daftar seluruh staf pengajar SMK Diponegoro Cipari yang berdedikasi dalam mendidik generasi bangsa.',
        stats: {
            students: '-',
            years: 'Pengabdian',
            achievements: 'Berkomitmen'
        },
        info: `
            <h4>Staf Pengajar SMK Diponegoro Cipari</h4>
            <p>Para guru yang berdedikasi tinggi dalam membimbing dan mendidik siswa-siswi SMK Diponegoro Cipari untuk mencapai prestasi terbaik.</p>
            
            <h4>Visi dan Misi</h4>
            <p>Mewujudkan pendidikan berkualitas yang menghasilkan lulusan kompeten, berkarakter, dan siap bersaing di era global.</p>
        `
    }
];

// DATA ALUMNI TJKT 1 DENGAN DATA LENGKAP
const alumniTJKT1 = [
    { 
        name: 'Bili Okan R.', 
        motto: 'Long time long see',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'Network Engineer di PT. Telekomunikasi Indonesia',
        contact: 'bili.okana@email.com',
        achievements: 'Juara 1 Lomba Jaringan Tingkat Provinsi',
        class: 'TJKT 1'
    },
    { 
        name: 'Mohammad F. A.', 
        motto: 'Believe in yourself',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'Frontend Developer di Startup Digital',
        contact: 'mfa@email.com',
        achievements: 'Sertifikasi MTCNA, Juara Hackathon Regional',
        class: 'TJKT 1'
    },
    { 
        name: "Ma'Rifatus S.", 
        motto: 'Aku akan menjadi kuat dengan caraku sendiri',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'System Administrator',
        contact: 'marifatus@email.com',
        achievements: 'Admin Jaringan Terbaik Angkatan',
        class: 'TJKT 1'
    },
    { 
        name: 'Naela Mery S.', 
        motto: 'Private',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'IT Support Specialist',
        contact: 'naela@email.com',
        achievements: 'Sertifikasi CompTIA A+',
        class: 'TJKT 1'
    },
    { 
        name: 'Damar S.R.', 
        motto: 'Kalau orang lain bisa insyaallah saya juga bisa',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'Cybersecurity Analyst',
        contact: 'damar@email.com',
        achievements: 'Sertifikasi CEH, Peneliti Keamanan Siber',
        class: 'TJKT 1'
    },
    { 
        name: 'Azahra Giya A.', 
        motto: 'Never give up',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'UI/UX Designer',
        contact: 'azahra@email.com',
        achievements: 'Juara Design Competition Nasional',
        class: 'TJKT 1'
    },
    { 
        name: 'Bela Safitri', 
        motto: 'Milikilah pundak yang kuat agar tetap kokoh berdiri, untuk orang-orang yang kamu sayangi',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'Database Administrator',
        contact: 'bela@email.com',
        achievements: 'Sertifikasi Oracle Database',
        class: 'TJKT 1'
    },
    { 
        name: 'Tri Sara R.', 
        motto: 'Jika kamu mencari orang lain untuk merubah dirimu lihatlah ke cermin maka kamu akan melihatnya',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'Cloud Engineer',
        contact: 'tri.sara@email.com',
        achievements: 'Sertifikasi AWS Solutions Architect',
        class: 'TJKT 1'
    },
    { 
        name: 'Elsa Avrelia', 
        motto: 'Nihil est impossible, si tunc est possibilis',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'Software Engineer',
        contact: 'elsa@email.com',
        achievements: 'Pengembang Aplikasi Mobile',
        class: 'TJKT 1'
    },
    { 
        name: 'Jihan Lestari', 
        motto: 'Hiduplah dengan rasa syukur',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'IT Project Manager',
        contact: 'jihan@email.com',
        achievements: 'Manager Proyek IT Terbaik',
        class: 'TJKT 1'
    }
    // Data lainnya tetap sama, tambahkan field lengkap jika perlu
];

// DATA ALUMNI TJKT 2 DENGAN DATA LENGKAP
const alumniTJKT2 = [
    { 
        name: 'Ade Ahmad Sudiro', 
        motto: 'Hidup itu singkat, jadi nikmatilah',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'Network Specialist',
        contact: 'ade.ahmad@email.com',
        achievements: 'Sertifikasi Cisco CCNA',
        class: 'TJKT 2'
    },
    { 
        name: 'Afif Febrian', 
        motto: 'Sometimes losing people is part of life, but doesn\'t mean you stop letting them in',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'Full Stack Developer',
        contact: 'afif@email.com',
        achievements: 'Juara Coding Competition',
        class: 'TJKT 2'
    },
    { 
        name: 'Akmaluddin Fauzan', 
        motto: 'Waktu adalah sumber paling berharga. Jadi, gunakan dengan sebaik mungkin',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'DevOps Engineer',
        contact: 'akmal@email.com',
        achievements: 'Sertifikasi Docker & Kubernetes',
        class: 'TJKT 2'
    },
    { 
        name: 'Alfarokah', 
        motto: 'Sejatinya pendidikan bukan merupakan sesuatu yang harus kita terima, namun merupakan sesuatu yang kita harus dapatkan',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'Data Analyst',
        contact: 'alfarokah@email.com',
        achievements: 'Analyst Data Terbaik Perusahaan',
        class: 'TJKT 2'
    },
    { 
        name: 'Anggun Zaskia Kusuma', 
        motto: 'Jangan nikah sebelum sukses, nanti jual pop ice',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'Digital Marketing Specialist',
        contact: 'anggun@email.com',
        achievements: 'Penghargaan Digital Marketing Excellence',
        class: 'TJKT 2'
    },
    { 
        name: 'Ardi Fajar Pratama', 
        motto: 'Tidak masalah jalan menanjak, karena akan mengantarkan kita ke puncak',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'IT Consultant',
        contact: 'ardi@email.com',
        achievements: 'Konsultan IT untuk Perusahaan Besar',
        class: 'TJKT 2'
    },
    { 
        name: 'Bonifasius Galang Prasetya', 
        motto: 'Just trying to be better',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'System Architect',
        contact: 'bonifasius@email.com',
        achievements: 'Arsitek Sistem Enterprise',
        class: 'TJKT 2'
    },
    { 
        name: 'Claven Phasya Yuandhita', 
        motto: 'Hidup itu serba salah, terlalu jujur kita ditipu, terlalu baik kita dipermainkan',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'IT Auditor',
        contact: 'claven@email.com',
        achievements: 'Sertifikasi CISA',
        class: 'TJKT 2'
    },
    { 
        name: 'Diki Dwi Priyogi', 
        motto: 'Keberhasilan datang dari kegigihan dan ketekunan',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'Network Security Engineer',
        contact: 'diki@email.com',
        achievements: 'Sertifikasi CISSP',
        class: 'TJKT 2'
    },
    { 
        name: 'Dina Rofiana', 
        motto: 'Hidup jangan kaya ndewton, banyak gaya',
        education: 'SMK Diponegoro Cipari - Teknik Jaringan Komputer',
        job: 'Web Developer',
        contact: 'dina@email.com',
        achievements: 'Pengembang Website E-commerce',
        class: 'TJKT 2'
    }
    // Data lainnya tetap sama, tambahkan field lengkap jika perlu
];

// DATA ALUMNI AKUTANSI DENGAN DATA LENGKAP
const alumniAkutansi = [
    { 
        name: 'Siswa Akutansi 1', 
        motto: 'Akurasi adalah kunci',
        education: 'SMK Diponegoro Cipari - Akuntansi',
        job: 'Accountant di Kantor Akuntan Publik',
        contact: 'akutansi1@email.com',
        achievements: 'Sertifikasi Brevet A & B',
        class: 'Akutansi'
    },
    { 
        name: 'Siswa Akutansi 2', 
        motto: 'Detail menentukan kualitas',
        education: 'SMK Diponegoro Cipari - Akuntansi',
        job: 'Financial Analyst',
        contact: 'akutansi2@email.com',
        achievements: 'Analyst Keuangan Terbaik',
        class: 'Akutansi'
    },
    { 
        name: 'Siswa Akutansi 3', 
        motto: 'Kejujuran di atas segalanya',
        education: 'SMK Diponegoro Cipari - Akuntansi',
        job: 'Auditor Internal',
        contact: 'akutansi3@email.com',
        achievements: 'Auditor Berprestasi',
        class: 'Akutansi'
    },
    { 
        name: 'Siswa Akutansi 4', 
        motto: 'Kerja keras tidak pernah mengkhianati hasil',
        education: 'SMK Diponegoro Cipari - Akuntansi',
        job: 'Tax Consultant',
        contact: 'akutansi4@email.com',
        achievements: 'Konsultan Pajak Bersertifikat',
        class: 'Akutansi'
    },
    { 
        name: 'Siswa Akutansi 5', 
        motto: 'Disiplin waktu adalah modal',
        education: 'SMK Diponegoro Cipari - Akuntansi',
        job: 'Management Accountant',
        contact: 'akutansi5@email.com',
        achievements: 'Akuntan Manajemen Berpengalaman',
        class: 'Akutansi'
    }
    // Data lainnya tetap sama
];

// DATA GURU DENGAN DATA LENGKAP
const alumniGuru = [
    { 
        name: 'Kepala Sekolah', 
        motto: 'Mendidik dengan hati',
        education: 'S2 Pendidikan, Universitas Terkemuka',
        job: 'Kepala SMK Diponegoro Cipari',
        contact: 'kapsek@smkdiponegorocipari.sch.id',
        achievements: 'Pengabdi Pendidikan 30+ Tahun',
        class: 'Guru'
    },
    { 
        name: 'Wakil Kepala Sekolah', 
        motto: 'Berkarya untuk kemajuan',
        education: 'S1 Pendidikan Teknik',
        job: 'Wakil Kepala Sekolah Bidang Kurikulum',
        contact: 'waka@smkdiponegorocipari.sch.id',
        achievements: 'Pengembang Kurikulum Berprestasi',
        class: 'Guru'
    },
    { 
        name: 'Guru TJKT 1', 
        motto: 'Menginspirasi generasi digital',
        education: 'S1 Teknik Informatika',
        job: 'Guru Produktif TJKT',
        contact: 'guru.tjkt1@smkdiponegorocipari.sch.id',
        achievements: 'Sertifikasi IT Expert, Pembina Olimpiade IT',
        class: 'Guru'
    },
    { 
        name: 'Guru TJKT 2', 
        motto: 'Membangun kompetensi unggul',
        education: 'S1 Sistem Informasi',
        job: 'Guru Produktif TJKT',
        contact: 'guru.tjkt2@smkdiponegorocipari.sch.id',
        achievements: 'Instruktur Jaringan Bersertifikat',
        class: 'Guru'
    },
    { 
        name: 'Guru Akutansi', 
        motto: 'Mencetak profesional keuangan',
        education: 'S1 Akuntansi',
        job: 'Guru Produktif Akuntansi',
        contact: 'guru.akutansi@smkdiponegorocipari.sch.id',
        achievements: 'Akuntan Publik, Konsultan Keuangan',
        class: 'Guru'
    }
];

// DATA GALLERY (tetap sama)
const galleryImages = {
    tjkt1: [
        { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400', alt: 'Kegiatan TJKT 1' },
        { src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400', alt: 'Praktikum TJKT 1' },
        { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400', alt: 'Diskusi Kelompok' },
        { src: 'https://images.unsplash.com/photo-1524178234883-043d5c3f3cf4?auto=format&fit=crop&w=400', alt: 'Presentasi' }
    ],
    tjkt2: [
        { src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400', alt: 'Kegiatan TJKT 2' },
        { src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=400', alt: 'Jaringan Komputer' },
        { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400', alt: 'Programming' },
        { src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400', alt: 'Team Work' }
    ],
    akutansi: [
        { src: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400', alt: 'Kegiatan Akutansi' },
        { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400', alt: 'Analisis Data' },
        { src: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=400', alt: 'Presentasi Keuangan' },
        { src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=400', alt: 'Diskusi Kelas' }
    ],
    guru: [
        { src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=400', alt: 'Rapat Guru' },
        { src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400', alt: 'Pelatihan Guru' },
        { src: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=400', alt: 'Workshop' },
        { src: 'https://images.unsplash.com/photo-1524178234883-043d5c3f3cf4?auto=format&fit=crop&w=400', alt: 'Kegiatan Sekolah' }
    ]
};

// DATA PROFIL SISWA KOMPLIT
const studentProfiles = {
    'tjkt1': alumniTJKT1,
    'tjkt2': alumniTJKT2,
    'akutansi': alumniAkutansi,
    'guru': alumniGuru
};
