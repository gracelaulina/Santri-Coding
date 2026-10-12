# Santri Code

Aplikasi mobile belajar coding untuk santri: lihat materi, kumpulkan tugas dengan upload file, dan kelola profil.

**Stack:** Express · Prisma ORM (SQLite) · express-validator · JWT · Multer (file upload) · React Native (Expo) · React Navigation

## Fitur
- Register, login, dan sesi tersimpan aman (SecureStore + JWT)
- Role Santri dan Ustadz (hanya ustadz yang boleh kelola materi)
- Daftar dan detail materi (fetching data, pull to refresh)
- Kumpulkan tugas dengan upload file, hapus tugas
- Ganti foto profil
- Validasi input di server, pesan error jelas di aplikasi

## Menjalankan backend
```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```
Akun ustadz dari seed: `ustadz@santri.dev` / `password123`

## Menjalankan mobile
```bash
cd mobile
npm install
npx expo install --fix
```
Buka `src/config.js`, ganti `BASE_URL` dengan IP laptop (HP dan laptop harus satu Wi-Fi), lalu:
```bash
npx expo start
```
Scan QR dengan aplikasi Expo Go.

## Endpoint API
| Method | Path | Keterangan |
|---|---|---|
| POST | /api/auth/register, /login | Daftar dan masuk |
| GET | /api/auth/me | Profil |
| POST | /api/auth/avatar | Upload foto profil |
| GET/POST/PUT/DELETE | /api/materials | Materi (tulis: ustadz) |
| GET/POST/DELETE | /api/submissions | Tugas + upload file |
