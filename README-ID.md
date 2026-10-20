# Koperasi Sejahtera — starter online (uji coba)

Paket ini membawa antarmuka manajemen koperasi yang sebelumnya berupa demo lokal, ditambah gerbang login Supabase dan sinkronisasi ke database online.

## Fitur antarmuka
- Dashboard ringkasan
- Anggota (termasuk identitas, pekerjaan, penghasilan, alamat, kontak darurat, dan koordinat jika tersedia di form)
- Pengajuan/data pinjaman dan jadwal cicilan
- Pembayaran cicilan dan tunggakan
- Simpanan bulanan
- Laporan dan ekspor/backup

## Penting sebelum dipakai
**Ini adalah starter/prototype untuk pengujian, bukan sistem keuangan siap produksi.** Data aplikasi disimpan sebagai satu dokumen JSONB. Jika dua petugas mengubah data bersamaan, perubahan dapat saling menimpa; pencatatan transaksi juga belum memakai transaksi database atomik dan audit log. Jangan masukkan NIK, alamat, atau transaksi anggota sebenarnya sampai versi relasional yang aman selesai diuji.

## A. Konfigurasi Supabase
1. Buka project Supabase milik sendiri.
2. Di Authentication > Users, buat user admin dengan email yang kamu kuasai dan password kuat. Matikan pendaftaran publik bila tidak diperlukan.
3. Buka SQL Editor, tempel seluruh isi `supabase-schema.sql`, lalu jalankan.
4. Salin UUID user admin dari Authentication > Users.
5. Jalankan query contoh di bagian akhir SQL, ganti `USER_UUID_DI_SINI` dengan UUID admin asli.
6. Buka Project Settings > API. Salin Project URL dan anon/publishable key (bukan `service_role`).
7. Edit `supabase-config.js`, ganti nilai `YOUR_SUPABASE_PROJECT_URL` dan `YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY`.

## B. Upload ke GitHub
1. Ekstrak ZIP ini di komputer.
2. Buka repository `koperasi-sejahtera` yang sudah dibuat.
3. Pilih Add file > Upload files.
4. Upload `index.html`, `supabase-config.js`, `supabase-schema.sql`, dan `README-ID.md` (file-file di dalam folder hasil ekstrak, bukan ZIP-nya).
5. Klik Commit changes.

## C. Cloudflare Pages
1. Buka Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git.
2. Hubungkan GitHub dan pilih repository `koperasi-sejahtera`.
3. Framework preset: None. Build command: kosongkan. Build output directory: `/` atau `.` sesuai pilihan yang diterima dashboard.
4. Deploy. Cloudflare akan memberikan alamat `*.pages.dev`.
5. Setelah deployment, buka alamat itu dan tes login.

## D. Keamanan
- Jangan pernah menaruh `service_role` key di file frontend.
- Gunakan password unik, aktifkan 2FA GitHub dan Supabase.
- Simpan data asli hanya setelah skema relasional, validasi sisi server, audit log, backup dan pemulihan diuji.
- Sinkronisasi JSONB dalam starter ini cocok untuk demo terbatas saja. Jangan mengandalkannya sebagai satu-satunya catatan keuangan.
