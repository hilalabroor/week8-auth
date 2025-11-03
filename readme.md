# express-auth-jwt
---
## Identitas
- **Nama**: M. Wahyu Hilal Abroor
- **NIM**: F1D02310123
---

## Deskripsi Singkat
Tugas ini adalah latihan penerapan autentikasi dengan JWT (JSON Web Token) menggunakan Express.js dan MySQL mata kuliah Pemrograman Web Lanjut. Fungsi utamanya adalah untuk melakukan registrasi user, login user, serta mengakses route yang dilindungi hanya jika memiliki token JWT yang valid.

## Tujuan Tugas
- Menerapkan autentikasi menggunakan JWT di aplikasi backend.
- Menggunakan bcrypt untuk mengamankan password user.
- Mengelola database user dengan MySQL.
- Membuat sistem login yang aman dan terstruktur menggunakan Express.js.

## Langkah Pengerjaan
1. Membuat folder proyek dengan nama 'week8_auth' dengan perintah
```
mkdir week8-auth
cd week8-auth
```

2. Inisialisasi npm:
```
npm init -y
```

3. Install dependency:

```
npm install express mysql2 dotenv jsonwebtoken bcrypt
```

4. Buat struktur folder:
```
express-auth-jwt/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   └── authRoutes.js
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── readme.md
└── auth.sql
```

5. Buat file .env berisi konfigurasi database dan secret key JWT:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=auth_jwt_db
JWT_SECRET=rahasia_superku
```

6. Buat database MySQL dengan script pada auth.sql:
```
```CREATE DATABASE auth_jwt_db;
USE auth_jwt_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullname VARCHAR(100)
);
```

7. Implementasikan koneksi database pada file src/config/db.js menggunakan mysql2 dan dotenv.
8. Buat controller authController.js untuk menangani register dan login user.
9. Tambahkan middleware authMiddleware.js untuk memverifikasi token JWT.
10. Buat route authRoutes.js untuk endpoint register & login, serta protectedRoutes.js untuk route profil yang dilindungi.
11. Jalankan server menggunakan perintah:
```npm run dev```

## Database
Tabel: users
- id INT AUTO_INCREMENT PRIMARY KEY
- username VARCHAR(100)
- password VARCHAR(255)
- fullname VARCHAR(100)

## Penjelasan Bagian-Bagian Utama
Berikut adalah penjelasan singkat untuk setiap file berdasarkan struktur proyek:

1. src/config/db.js

Menghubungkan aplikasi ke database MySQL menggunakan konfigurasi dari .env.

2. src/controllers/authController.js

   a. register: Menyimpan user baru dengan password terenkripsi (bcrypt).

   b. login: Memverifikasi username dan password lalu mengembalikan token JWT.

4. src/middleware/authMiddleware.js

Memeriksa apakah request memiliki header Authorization dengan token JWT yang valid. Jika valid, user dapat mengakses route selanjutnya.

5. src/routes/authRoutes.js

Menyediakan endpoint:
    
    a. POST /api/auth/register --> Registrasi user baru
    
    b. POST /api/auth/login --> Login user


6. src/app.js
File utama server yang mengatur middleware global, menghubungkan semua route, serta menjalankan server pada port yang ditentukan.

## Hasil Uji API dengan Postman

1. Register User
- Endpoint: POST http://localhost:5000/api/auth/register
  
- Screenshot:
- ![WhatsApp Image 2025-11-03 at 11 57 16_9d8fe26b](https://github.com/user-attachments/assets/0df4579f-32d6-4691-932d-ccf834c5e1bc)
![WhatsApp Image 2025-11-03 at 12 09 43_20d18ac1](https://github.com/user-attachments/assets/4e646c24-ae19-44c1-a319-0ca82dc88899)



2. Login User
- Endpoint: POST http://localhost:5000/api/auth/login
- Screenshot:
![WhatsApp Image 2025-11-03 at 12 11 22_0d538bad](https://github.com/user-attachments/assets/bb540a6f-5e94-42cf-92fa-717b20cf5cac)
![WhatsApp Image 2025-11-03 at 12 10 48_d62c937c](https://github.com/user-attachments/assets/6219399f-0d1a-4a31-89cc-c69499b87077)


3. Akses Profil (Protected Route)
- Endpoint: GET http://localhost:5000/api/protected/profile
- Screenshot:
<img width="1432" height="878" alt="image" src="https://github.com/user-attachments/assets/b2d1c007-c82d-447c-bbe9-e8169c5007fb" />
<img width="1438" height="921" alt="image" src="https://github.com/user-attachments/assets/a886f93d-8285-42d7-9581-7ebf21a2e3bb" />



## Kesimpulan
Program ini sudah berhasil menerapkan sistem autentikasi JWT (JSON Web Token) menggunakan Node.js, Express, dan MySQL. User bisa melakukan registrasi, login, serta mengakses route yang dilindungi dengan token yang valid. Fitur hashing password dengan bcrypt dan penggunaan dotenv untuk menyimpan konfigurasi rahasia memastikan sistem lebih aman.
