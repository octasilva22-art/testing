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

// DATA ALUMNI TJKT 1
const alumniTJKT1 = [
    { name: 'Bili Okan R.', motto: 'Long time long see' },
    { name: 'Mohammad F. A.', motto: 'Believe in yourself' },
    { name: "Ma'Rifatus S.", motto: 'Aku akan menjadi kuat dengan caraku sendiri' },
    { name: 'Naela Mery S.', motto: 'Private' },
    { name: 'Damar S.R.', motto: 'Kalau orang lain bisa insyaallah saya juga bisa' },
    { name: 'Azahra Giya A.', motto: 'Never give up' },
    { name: 'Bela Safitri', motto: 'Milikilah pundak yang kuat agar tetap kokoh berdiri, untuk orang-orang yang kamu sayangi' },
    { name: 'Tri Sara R.', motto: 'Jika kamu mencari orang lain untuk merubah dirimu lihatlah ke cermin maka kamu akan melihatnya' },
    { name: 'Elsa Avrelia', motto: 'Nihil est impossible, si tunc est possibilis' },
    { name: 'Jihan Lestari', motto: 'Hiduplah dengan rasa syukur' },
    { name: 'Dinda Meli A.', motto: 'Setiap langkah kecil menuju impian adalah investasi menuju masa depan' },
    { name: 'Aji Mustofa', motto: 'Hidup hanya sekali maka nikmatilah, mati pun hanya sekali maka persiapkanlah' },
    { name: 'Galih Dwi C.', motto: 'Yaudah jalanin aja' },
    { name: 'Nasirul A.', motto: 'Dimana ada air disitu ada ikan' },
    { name: 'Ridho Zaqi M.', motto: 'Perbaiki sholatmu allah jamin keberhasilan hidupmu' },
    { name: 'Sukra Jenar', motto: 'Jadilah hinaan jadi motivasi' },
    { name: 'Muhammad T.', motto: 'Satu-satunya kebijakan sejati adalah mengetahui bahwa anda tidak tahu apa-apa' },
    { name: 'Levino Fabyan N.', motto: 'Tidak ada' },
    { name: 'Meris Saputra', motto: 'Janganlah menyerah karena menyerah tidak akan membuahkan hasil' },
    { name: 'Novando Tegar P.', motto: 'Setiap kesulitan pasti ada kemudahan' },
    { name: 'Muhammad Farkhan', motto: 'Tidak ada' },
    { name: 'Anggiawan', motto: 'Dimana ada kemauan disitu ada jalan' },
    { name: 'Deri Adi P.', motto: 'I was born like this, perform like this' },
    { name: 'Reza F.', motto: 'Jangan mengharapkan hasilnya, tapi nikmati juga prosesnya' },
    { name: 'Dedes Ghias F.', motto: 'Ubur-ubur ikan lele' },
    { name: 'Jefri Saputra', motto: 'Terlihat biasa namun tidak biasa' },
    { name: 'Wisnu W.', motto: 'Jadilah dirimu sendiri tanpa meniru orang lain' }
];

// DATA ALUMNI TJKT 2
const alumniTJKT2 = [
    { name: 'Ade Ahmad Sudiro', motto: 'Hidup itu singkat, jadi nikmatilah' },
    { name: 'Afif Febrian', motto: 'Sometimes losing people is part of life, but doesn\'t mean you stop letting them in' },
    { name: 'Akmaluddin Fauzan', motto: 'Waktu adalah sumber paling berharga. Jadi, gunakan dengan sebaik mungkin' },
    { name: 'Alfarokah', motto: 'Sejatinya pendidikan bukan merupakan sesuatu yang harus kita terima, namun merupakan sesuatu yang kita harus dapatkan' },
    { name: 'Anggun Zaskia Kusuma', motto: 'Jangan nikah sebelum sukses, nanti jual pop ice' },
    { name: 'Ardi Fajar Pratama', motto: 'Tidak masalah jalan menanjak, karena akan mengantarkan kita ke puncak' },
    { name: 'Bonifasius Galang Prasetya', motto: 'Just trying to be better' },
    { name: 'Claven Phasya Yuandhita', motto: 'Hidup itu serba salah, terlalu jujur kita ditipu, terlalu baik kita dipermainkan' },
    { name: 'Diki Dwi Priyogi', motto: 'Keberhasilan datang dari kegigihan dan ketekunan' },
    { name: 'Dina Rofiana', motto: 'Hidup jangan kaya ndewton, banyak gaya' },
    { name: 'Dina Rofingati', motto: 'Just be yourself' },
    { name: 'Farid Gunansyah', motto: 'Tidak ada' },
    { name: 'Ferdiyan Sahputra', motto: 'Tidak ada kata terlambat untuk mulai menciptakan kehidupan yang kamu inginkan' },
    { name: 'Feri Ahmad Romadhon', motto: 'Fortis fortuna adiuvat' },
    { name: 'Hendri Juniar', motto: 'Tetaplah berjuang walaupun banyak rintangannya' },
    { name: 'Khoerul Anam Hidayat', motto: 'Hidup cuma sekali, jangan menua tanpa arti' },
    { name: 'Muhamad Dwiky Reza', motto: 'Labor omnia vincit' },
    { name: 'Muhammad Mukhit', motto: 'Hari ini harus lebih baik dari kemarin, dan hari esok harus lebih baik dari hari ini' },
    { name: 'Nabil Septiyo', motto: 'non ducor, duco' },
    { name: 'Nabil Uswatun Khasanah', motto: 'Jangan meninggi, karna yang tinggi cuma tower dubai' },
    { name: 'Novan Fiki Fatoni', motto: 'Sing penting urip' },
    { name: 'Putra Galuh Setyawan', motto: 'Hidup adalah perjalanan, nikmati setiap langkahnya' },
    { name: 'Raka Ade Saputra', motto: 'Kita bisa melakukan apapun jika kita mau berusaha' },
    { name: 'Rezky Rihan', motto: 'Pejuang S. Kom.' },
    { name: 'Ridwana Wingga Adami', motto: 'Yakin pada diri sendiri adalah kunci' },
    { name: 'Siti Khafifatun Nazah', motto: 'Nahkoda yang hebat tidak datang dari laut yang tenang' },
    { name: 'Stanly Ferdinan', motto: 'Jangan bandingkan dirimu dengan orang lain, tapi bandingkan dirimu dengan yang kemarin' },
    { name: 'Surya Septa Dwi Prayogi', motto: 'Menjadi lebih baik' },
    { name: 'Syifa Nurhafifah', motto: 'Kesuksesan yang besar, berawal dari langkah yang kecil' },
    { name: 'Toriqul Fajar', motto: 'Siapapun bisa menjadi apapun' },
    { name: 'Vivi May Kumalasari', motto: 'Semua ada waktunya' },
    { name: 'Yusuf Al\'alwi', motto: 'Semua keberhasilan dapat terwujud ketika kita berani keluar dari zona nyaman' }
];

// DATA ALUMNI AKUTANSI
const alumniAkutansi = [
    { name: 'Siswa Akutansi 1', motto: 'Akurasi adalah kunci' },
    { name: 'Siswa Akutansi 2', motto: 'Detail menentukan kualitas' },
    { name: 'Siswa Akutansi 3', motto: 'Kejujuran di atas segalanya' },
    { name: 'Siswa Akutansi 4', motto: 'Kerja keras tidak pernah mengkhianati hasil' },
    { name: 'Siswa Akutansi 5', motto: 'Disiplin waktu adalah modal' },
    { name: 'Siswa Akutansi 6', motto: 'Belajar sepanjang hayat' },
    { name: 'Siswa Akutansi 7', motto: 'Konsistensi membawa kesuksesan' },
    { name: 'Siswa Akutansi 8', motto: 'Integritas adalah fondasi' },
    { name: 'Siswa Akutansi 9', motto: 'Profesional dalam bekerja' },
    { name: 'Siswa Akutansi 10', motto: 'Komitmen pada keunggulan' }
];

// DATA GURU
const alumniGuru = [
    { name: 'Kepala Sekolah', motto: 'Mendidik dengan hati' },
    { name: 'Wakil Kepala Sekolah', motto: 'Berkarya untuk kemajuan' },
    { name: 'Guru TJKT 1', motto: 'Menginspirasi generasi digital' },
    { name: 'Guru TJKT 2', motto: 'Membangun kompetensi unggul' },
    { name: 'Guru Akutansi', motto: 'Mencetak profesional keuangan' },
    { name: 'Guru Umum', motto: 'Mendidik dengan keteladanan' },
    { name: 'Staf TU', motto: 'Melayani dengan senyum' }
];

// DATA GALLERY
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