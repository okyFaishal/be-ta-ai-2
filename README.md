# Rute Anti Banjir (Kota Semarang)

## Deskripsi
Proyek "Rute Anti Banjir" adalah sebuah aplikasi berbasis web yang dirancang untuk membantu pengguna menemukan rute yang aman dari banjir di Kota Semarang. Aplikasi ini memanfaatkan data area rawan banjir dan cuaca untuk memberikan rekomendasi rute yang aman hingga 3 hari ke depan.

## Backend
### Cara Menjalankan
1. Clone repository backend:
   ```bash
   git clone https://github.com/okyFaishal/be-ta-ai-2.git
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd be-ta-ai-2
   ```
3. Install dependensi proyek:
   ```bash
   npm install
   ```
4. Buat database MySQL.
5. Konfigurasi file `.env`:
   - Buat file `.env` di root proyek.
   - Tambahkan variabel berikut dan sesuaikan jika diperlukan:
     ```env
      DB_DIAL=mysql

      # ---------- DB ----------
      DB_USERNAME= # nama user
      DB_PASSWORD= # password database
      DB_NAME= # nama database
      DB_HOST= # nama host
      DB_PORT= # port database

      # port
      PORT=8001 # bisa diganti sesuai keinginan
     ```
6. Export database yang ada di google drive
8. Jalankan server backend:
   ```bash
   node index
   ```
9. Buat folder / direktori dengan nama cuaca
10. Untuk bisa memproses rute 2, buka halaman website cuaca - banjir di set data, lalu click set data rute 2

## Fitur
- Integrasi dengan API cuaca BMKG untuk mendapatkan prakiraan cuaca 3 hari kedepan yang akurat.
- Integrasi dengan peta interaktif untuk visualisasi rute (menggunakan Leaflet dan OpenStreetMap).
- Prediksi rute anti banjir berdasarkan data area rawan banjir dan cuaca.