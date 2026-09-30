# Basic Pink Keepsake — MEMOu

Template surprise pasangan putih–pink dengan font Inter lokal. Tanpa framework, dapat dibuka langsung melalui index.html atau dipasang di hosting statis.

## Revisi Inter

Semua tulisan memakai Inter Variable. Pembuka sekarang berupa panel luas dengan tiga foto melayang, judul besar, dan transisi kartu foto saat dibuka. Halaman utama memakai foto lebih besar dan judul pendek. Surat dan caption menggunakan bahasa sehari-hari. Font dan lisensi OFL ada di assets/fonts/.


## Isi paket

- Entrance card dengan tombol `Buka Kado 🎁`.
- Section 1 Header: judul, foto utama, nama penerima, tanggal. Tiga kartu foto mengembang dari tengah seperti referensi video. Dua kartu samping menggunakan ulang foto galeri; tetap hanya tiga file foto unik.
- Section 2 Surat: surat personal dan nama pengirim.
- Section 3 Galeri: dua foto berdampingan dan caption.
- Musik instrumental orisinal, toggle ON/OFF, love melayang lembut, dan love kecil saat tap/klik. Dukungan reduced motion dan keyboard.

## Mengganti isi

Edit objek `BASIC_CONFIG` di `script.js`. Key wajib: recipientName, nickname, eventDate, senderName, loveLetter. Caption dapat diganti melalui caption1, caption2, captionNote1, captionNote2. Gunakan `\n\n` untuk paragraf surat. Pertahankan objek sebagai literal agar controller bisa membacanya.

Ganti tiga foto contoh ini dengan foto customer, memakai nama file yang sama:

| File | Penggunaan |
|---|---|
| assets/images/cover.jpg | Foto utama Header |
| assets/images/photo_1.jpg | Galeri 1 dan kartu dekoratif kiri pembuka |
| assets/images/photo_2.jpg | Galeri 2 dan kartu dekoratif kanan pembuka |

Rekomendasi: foto vertikal, minimal 1000 px. Foto memakai object-fit: cover dan posisi tengah. Posisi crop dapat disesuaikan di CSS (`.fan-main img`, `.memory-one`, `.memory-two`, `.photo-wrap img`).

Ganti `assets/audio/bgm.mp3` untuk musik customer. File bawaan adalah komposisi instrumental sintetis orisinal, bukan rekaman lagu komersial. Volume awal 0.32, dapat diubah lewat musicVolume (0–1). Musik dimulai hanya setelah tombol pembuka diklik mengikuti kebijakan browser. Jika play ditolak perangkat, tekan tombol Audio untuk mencoba lagi.

## Integrasi controller

Struktur memakai `assets/` (plural), mengikuti PDF yang dilampirkan, bukan `asset/`.

ID kompatibel pedoman: entranceModal, enterSiteBtn, bgmAudio, soundToggleBtn, recipientName, eventDate, letterText, senderName.

Ada tepat 3 tag img dengan alt wajib:
- Foto Utama Header
- Foto Kenangan 1
- Foto Kenangan 2

Tidak ada Make a Wish, lilin, kuis, atau mini-game. Ornamen tidak menambah foto customer. File utama index.html, script.js, style.css berada langsung di folder basic_pink_keepsake. Konten demo tidak memakai nama orang sebenarnya. Tanggal demo dapat diganti melalui eventDate.

## Foto demo

Foto contoh dari Unsplash, bebas digunakan berdasarkan Unsplash License saat sumber diakses. Ganti dengan foto customer sebelum penyerahan akhir:
- cover.jpg — PICSAR: https://unsplash.com/photos/j7qtze8E1bM
- photo_1.jpg — Sonny Mauricio: https://unsplash.com/photos/GWrxS-thF5A
- photo_2.jpg — Aurela Redenica: https://unsplash.com/photos/VMhDFv5tPys
- Lisensi: https://unsplash.com/license

Semua aset tersedia secara lokal; tidak membutuhkan CDN, font online, atau koneksi internet setelah diunduh. Kompatibilitas diuji pada Chromium dengan lebar 1440, 390, dan 320 px, termasuk pemuatan font Inter dan mode reduced motion. Parser controller asli tidak tersedia; struktur mengikuti pedoman PDF, bukan pengujian terhadap aplikasi controller langsung.
