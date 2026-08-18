-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 17, 2026 at 03:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_spk`
--

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `suplemen_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suplemens`
--

CREATE TABLE `suplemens` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `c1_harga` float DEFAULT NULL,
  `c2_ulasan_negatif` float DEFAULT NULL,
  `c3_kandungan_nutrisi` int(11) DEFAULT NULL,
  `c4_efektivitas_manfaat` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suplemens`
--

INSERT INTO `suplemens` (`id`, `nama`, `c1_harga`, `c2_ulasan_negatif`, `c3_kandungan_nutrisi`, `c4_efektivitas_manfaat`) VALUES
(1, 'BSN SYNTHA-6 4 LBS', 1100000, 2.5, 140, 100),
(3, 'ON WHEY GOLD 5 LBS', 1770000, 2.5, 150, 100),
(4, 'MUSCLETECH NITRO TECH 5 LBS ', 1570000, 2.5, 150, 100),
(5, 'MUSCLE FIRST PRO GAINER 6LBS/2721GR - MASS GAINER', 520000, 3, 145, 95),
(6, 'PROVUS PREMIUM WHEY GOLD 900GR - WHEY PROTEIN CONCENTRATE', 550000, 2.5, 150, 100),
(7, 'RIMBALIFE RIMBAMASS 5 LBS 2250GR', 420000, 2.5, 135, 90),
(8, 'GENETICA ISOMATRIX 5 LBS WHEY PROTEIN ISOLATE MATRIX', 560000, 2.5, 145, 100),
(9, 'KEVIN LEVRONE GOLD CREATINE MONOHYDRATE 300GR 60SERVING', 325000, 2, 150, 100),
(10, 'EVERBUILD CREATINE POWDER 500GR CREATINE MONOHYDRATE', 440000, 2, 140, 100),
(11, 'OPTIMUM NUTRITION CREATINE POWDER 300 GR MONOHYDRATE', 439998, 2.5, 150, 100);

-- --------------------------------------------------------

--
-- Table structure for table `suplemen_details`
--

CREATE TABLE `suplemen_details` (
  `id` int(11) NOT NULL,
  `suplemen_id` int(11) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `store_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_1` varchar(255) DEFAULT NULL,
  `image_2` varchar(255) DEFAULT NULL,
  `image_3` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `rater` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suplemen_details`
--

INSERT INTO `suplemen_details` (`id`, `suplemen_id`, `link`, `store_name`, `description`, `image_1`, `image_2`, `image_3`, `rating`, `rater`, `createdAt`, `updatedAt`) VALUES
(1, 3, 'https://id.shp.ee/sYzQsKcN', 'Susu Fitnesku', 'Isolate protein whey adalah bentuk whey yang paling murni dan bahan utama dalam Gold Standard 100% Whey mengandung 4 gram glutamine, 5 gram BCAA dan glutamin yang sangat mudah larut dalam air serta dicerna oleh tubuh. Produk ini kaya akan asam amino yang dapat membantu pemulihan otot setelah latihan fisik. Selain itu suplemen ini tidak mengandung kaltosa, lemak, kolesterol dan lainnya. jadi tidak akan membuat penimbunan lemak pada tubuh. Manfaat Dalam 1 serving Optimum Nutrition Whey Gold protein mengandung 24 gram protein, 100% whey protein, 120 kalori, 1 gram fat, whey protein isolate, whey concentrate, dan hydrolyzed isolate. Semua bahan tersebut akan membuat proses pembentukan otot terjadi lebih cepat.', '/uploads/1786789025298-905086237.avif', '/uploads/1786789031359-631881484.avif', '/uploads/1786789035634-519348950.avif', 4.8, 1698, '2026-07-28 00:54:55', '2026-08-15 10:27:47'),
(2, 4, 'https://id.shp.ee/jXq7BCT2', 'Susu Fitnesku', 'MuscleTech Nitro-Tech 100% Whey Gold 5 lbs adalah suplemen protein kelas dunia yang dirancang secara ilmiah untuk mendukung pertumbuhan massa otot dan pemulihan pasca-latihan yang optimal. Produk ini memadukan whey protein peptides (penyerapan super cepat) dan whey protein isolate (protein murni) sebagai sumber utama, sehingga sangat efektif untuk menunjang performa binaraga atau latihan intensitas tinggi. Dengan kandungan 24 gram protein, 5,5 gram BCAA, dan 4 gram glutamin per sajian, formula ini membantu memenuhi kebutuhan nutrisi otot Anda secara presisi dengan kadar lemak dan gula yang sangat rendah. Selain kualitas nutrisinya, produk ini juga unggul dalam hal rasa yang lezat dan kemudahan dalam pelarutan, menjadikannya pilihan ideal bagi Anda yang ingin meningkatkan hasil latihan dengan suplemen berkualitas tinggi dan telah melalui proses mikrofiltrasi dingin yang ketat.  ', '/uploads/1786788319234-714574352.avif', '/uploads/1786788323576-83517878.avif', '/uploads/1786788327140-331641670.avif', 4.9, 250, '2026-08-02 17:14:32', '2026-08-15 11:31:50'),
(3, 1, 'https://id.shp.ee/ZtDL63RC', 'Susu Fitnesku', 'Syntha 6 merupakan protein bubuk ultra premium yang mengandung 22 gram protein per sajian dan protein dengan rasa terbaik di pasaran. Syntha 6 tidak hanya mengandung asam amino esensial dan asam lemak esensial, namun terdapat sumber serat terbaik yang membuat produk ini merupakan suplemen protein terbaik. Syntha 6 merupakan protein yang cocok untuk segala jenis olahraga karena telah didesain cocok untuk segala gaya hidup aktif dan segala diet. \n\n\n\nMengapa BSN Syntha-6?\n\n- Meningkatkan pertumbuhan otot \n\n- Meningkatkan sintesis protein otot \n\n- Membantu proses penyembuhan otot \n\n- Rasa Milkshake yang sangat enak \n\n\n\nAnjuran Pemakaian:\n\nAmbil 1-2 scoop (untuk pria) atau 1 scoop (untuk wanita) Syntha-6 dan campur dengan 200ml air dingin atau dengan minuman lainnya. Minum 1 - 4 sajian per hari.\"', '/uploads/1786789580612-722728892.avif', '/uploads/1786789583074-171026623.avif', '/uploads/1786789585533-783308906.avif', 4.9, 300, '2026-08-02 17:15:03', '2026-08-15 10:26:47'),
(4, 5, 'https://id.shp.ee/bNzcqSn1', 'Muscle First', 'PRO GAINER \n\nPro Gainer dari Muscle First merupakan suplemen mass gainer yang efektif untuk meningkatan berat badan yang sehat dan berkontribusi pada pertumbuhan massa otot yang optimal. Produk ini diformulasikan dengan cermat, mengandalkan serat gandum alami untuk memberikan hasil yang efektif dan berkelanjutan. memiliki 15g protein & 288kkal per serving dan sudah tersertifikasi GMP (Good Manufacturing Product), Halal MUI, BPOM, HACCP, & ISO 22000.\n\n\n\nMengapa harus Pro Gainer ?\n\nKualitas Terbaik : tersertifikasi GMP (Good Manufacturing Product), Halal MUI, BPOM, HACCP, & ISO 22000\n\nTinggi Protein & Kalori : memiliki 15g Protein & 288kkal per serving sehingga cocok untuk surplus kalori\n\nMengandung 11g Bcaa : sehingga dapat membantu mempercepat proses recovery otot\n\nRasa yang lezat : memiliki berbagai macam varian rasa\n\n\n\nPro Gainer cocok untuk siapa ?\n\n- Pria & Wanita pemula gym yang ingin memaksimalkan pembentukan massa otot dan membuat tubuh lebih berisi\n\n- Pria & Wanita yang sedang menjalani program bulking & surplus kalori\n\n- Pria & Wanita yang tidak sanggup makan banyak\n\n\n\nKapan harus dikonsumsi ?\n\n- On gym : 1 scoop  di mix air 200ml setelah olahraga di campur air dingin\n\n- Off gym : 1 scoop di campur 200ml air dingin kapan pun saat anda merasa butuh asupan kalori / makanan pengganti\n\n\n\nSaran penyajian :\n\n3 scoop/ 3 serving sehari  ( takaran saji mengikuti kebutuhan anda )', '/uploads/1786790683695-283086976.webp', '/uploads/1786790685534-38306896.webp', '/uploads/1786790687688-171336939.webp', 4.9, 10700, '2026-08-15 10:29:54', '2026-08-15 10:47:55'),
(5, 6, 'https://id.shp.ee/uF2NvdLh', 'Susu Fitnesku', 'Keunggulan Provus Premium Whey Gold:\n\n25gr Protein\n\n5g BCAAS\n\n\n\nSize: 908gr (23x Serving)\n\nTERSEDIA RASA : CHOCOLATE\n\n\n\nManfaat Provus Premium Whey Gold:\n\n- Mendukung pemulihan cepat otot setelah latihan\n\n- Meningkatkan Massa dan Kekuatan Otot\n\n- Meningkatkan Metabolisme\n\n\n\nSaran Penyajian:\n\nTambahkan 1 sajian (38gram) dengan 200ml air dingin, Lalu di shake selama 30-60 detik (HARUS DI SHAKE).\n\nGunakan 1-2 kali sehari, setiap pagi hari, setelah latihan/olahraga, atau setiap anda membutuhkan asupan protein\n\n\n\nPetunjuk Penyimpanan:\n\nSimpat di tempat sejuk dan kering serta terlindungi dari sinar matahari. Jauhkan dari jangkauan anak-anak\n\n\n\nWhey Protein Concentrate adalah pilihan tepat untuk Anda yang ingin meningkatkan performa latihan, mempercepat pemulihan, dan membangun otot yang kuat dan sehat. Dapatkan sekarang dan rasakan manfaatnya bagi tubuh Anda!\n\n', '/uploads/1786791164016-261314556.jpeg', '/uploads/1786791165773-62218476.jpeg', '/uploads/1786791167842-598185161.jpeg', 4.9, 1900, '2026-08-15 10:30:18', '2026-08-15 10:54:02'),
(6, 7, 'https://id.shp.ee/JXNGhuJR', 'Rimbalife Official Shop', 'Berikut adalah deskripsi lengkap dan jelas mengenai Rimbalife Rimbamass (5 Lbs / 2250 gram):\n\nTentang Produk\nRimba Mass dari Rimbalife adalah susu weight gainer tinggi kalori dan protein yang diformulasikan untuk program bulking, menaikkan berat badan, serta menambah massa otot secara maksimal. Produk ini sudah resmi terdaftar di BPOM dan bersertifikasi Halal, sehingga aman dikonsumsi.\n\nInformasi Nilai Gizi & Protein\nKandungan Protein: 42 gram per serving (mendukung sintesis, pertumbuhan, dan pemulihan jaringan otot).\n\nKalori & Karbohidrat: Dilengkapi kalori tinggi dan karbohidrat kompleks untuk membantu mencapai surplus kalori harian dan memulihkan energi setelah latihan beban.\n\nAsam Amino: Diperkaya dengan BCAA untuk mencegah katabolisme otot.\n\nKeunggulan Utama\nEfektif menaikkan berat badan dan membuat bentuk tubuh lebih padat (bulking).\n\nMembantu pemulihan otot pasca latihan intensif.\n\nMemiliki rasa yang lezat dan mudah larut tanpa rasa enek.\n\nLegalitas terjamin (BPOM & Halal).\n\nSaran Penyajian\nCampurkan takaran saji (scoop) Rimbamass ke dalam air dingin atau suhu ruangan (jangan gunakan air panas agar kandungan protein tidak rusak).\n\nKonsumsi secara rutin, terutama setelah latihan (post-workout) dan di waktu luang untuk mencukupi kebutuhan kalori harian.', '/uploads/1786791578242-146800363.jpeg', '/uploads/1786791579977-3668396.jpeg', '/uploads/1786791581957-232522502.jpeg', 4.9, 4500, '2026-08-15 10:30:35', '2026-08-15 11:05:50'),
(7, 8, 'https://id.shp.ee/VPZMBZWW', 'Fit Secret', 'Brand : Genetica\n\nProduct Name : Isomatrix\n\nSize : 5 Lbs\n\nServing Size : 1 scoops (33 grams)\n\nNutrition Fact : 20gr Protein, 140 Calories, 3.5gr bcaa\n\n\n\nGENETICA ISOMATRIX – Triple Blend Whey untuk Maksimalkan Massa Otot!\n\nDukung performa dan pemulihan ototmu dengan Genetica Isomatrix, whey protein premium dengan kombinasi 3 sumber protein (Whey Isolate & Concentrate) yang bekerja efektif menyuplai asupan nutrisi otot.\n\n\n\nCocok dikonsumsi:\n\n1. Setelah latihan\n\n2. Sebagai pengganti camilan sehat tinggi protein\n\nUntuk mendukung peningkatan massa otot & pemulihan lebih optimal\n\nRasa mantap, hasilnya maksimal.\n\n\n\n*Cara Pakai : 1 scoop dengan air / susu 300-400ml.', '/uploads/1786792606621-494851470.webp', '/uploads/1786792608306-474974799.webp', '/uploads/1786792609747-231104879.webp', 4.9, 164, '2026-08-15 10:30:51', '2026-08-15 11:17:43'),
(8, 9, 'https://id.shp.ee/SdAEH75E 18.22', 'Susu Fitnesku', 'KEVIN LEVRONE GOLD CREATINE\n\nSuplemen untuk mendukung latihan intensitas tinggi. Produk ini direkomendasikan untuk orang dewasa yang rutin melakukan latihan dengan intensitas tinggi. Creatine membantu meningkatkan performa fisik dalam serangkaian latihan singkat berintensitas tinggi, dengan manfaat optimal yang dapat diperoleh melalui konsumsi harian 3 gram creatine. Vitamin B6 dalam suplemen ini mendukung fungsi normal sistem kekebalan tubuh serta membantu mengurangi rasa lelah dan keletihan.\n\n\n\nKomposisi: \n\nCreatine monohydrate\n\nUnflavored\n\n\n\nServing Size 1 Scoop ( 5 gram ) \n\nServing Per Packaging: 60', '/uploads/1786793577050-686989206.webp', '/uploads/1786793575492-49361208.webp', '/uploads/1786793573629-521097397.webp', 4.9, 2400, '2026-08-15 10:31:12', '2026-08-15 11:32:59'),
(9, 10, 'https://id.shp.ee/NzJXBMbf', 'THE FIT ZONE STORE Official Store', 'EVERBUILD Creatine Monohydrate 500 Gram - UNFALV (Exp Product : 08/2028)\n\n\n\nUKURAN\n\n500 Gram – Kemasan ekonomis yang sangat awet, bisa digunakan untuk 100 kali pemakaian (servings) jika dikonsumsi 5 gram per hari.\n\n\n\nKELEBIHAN PRODUCT\n\n- Pharmaceutical Grade Quality: Mengandung Creatine Monohydrate dengan tingkat kemurnian tinggi yang sudah teruji secara klinis.\n\n- Maximum Strength & Power: Membantu meningkatkan produksi ATP (energi sel otot), membuat angkatan beban Anda jadi lebih berat dan bertenaga.\n\n- Cell Volumization: Menarik air ke dalam sel otot (bukan di bawah kulit), memberikan tampilan otot yang lebih padat, tebal, dan berisi.\n\n- Enhanced Recovery: Membantu mempercepat pemulihan energi antar set saat latihan, sehingga Anda bisa berlatih lebih lama dengan intensitas tinggi.\n\n- Unflavored & Versatile: Tidak berasa, sehingga sangat mudah dicampur ke dalam whey protein, gainer, atau minuman favorit Anda tanpa mengubah rasa.\n\n\n\nKONTRAINDIKASI\n\n- Tidak disarankan bagi individu dengan riwayat gangguan fungsi ginjal atau penyakit medis kronis lainnya tanpa konsultasi dokter.\n\n- Pastikan asupan air putih harian ditingkatkan (minimal 2-3 liter per hari) untuk menjaga hidrasi tubuh selama mengonsumsi Creatine.\n\n- Tidak ditujukan untuk wanita hamil, menyusui, atau anak di bawah umur 18 tahun.\n\n\n\nKANDUNGAN UTAMA\n\n- 100% Pure Creatine Monohydrate: Bentuk kreatin yang paling banyak diteliti dan terbukti paling efektif untuk meningkatkan massa otot dan performa atletik.\n\n\n\nCARA PENGGUNAAN\n\nCampurkan 1 sendok teh (sekitar 5 gram) ke dalam 200 ml air, jus, atau campuran protein Anda.\n\n\n\nFase Maintenance: Konsumsi 5 gram setiap hari, baik di pagi hari atau segera setelah latihan.\n\n\n\nTips: Gunakan secara rutin setiap hari (termasuk hari tidak latihan) untuk menjaga kadar kreatin di dalam otot tetap optimal.', '/uploads/1786875836832-9234134.webp', '/uploads/1786875839180-36167465.webp', '/uploads/1786875841752-800911400.webp', 4.9, 30, '2026-08-15 10:31:35', '2026-08-16 10:24:04'),
(10, 11, 'https://id.shp.ee/3mmDHyPT', 'Aest Nutrition Official Store', 'Optimum Nutrition Creatine Powder - Recovery and Muscle Growth 300gr\n\n\n\nProduk yang dikirim memiliki tanggal kadaluarsa minimal 6 bulan dari tanggal pemesanan\n\n\n\nBPOM : POM SI154206481\n\nHalal : ID00410019286260724\n\n\n\nManfaat :\n\n• Menambah tenaga\n\n• Mempercepat perbaikan otot\n\n• Memperbesar volume sel dan kekuatan otot\n\n• Menggunakan fase loading\n\n\n\nCara Pemakaian\n\n(Fase Loading)\n\nBubuk: 1 sendok teh (5g) dicampur air putih 250ml atau di campur minuman manis, diminum 4x sehari selama 5 hari pertama.\n\n(Fase Maintenance)\n\nBubuk: 1 sendok teh (5g) dicampur air putih 250ml atau dicampur minuman manis, diminum 2x sehari setelah fase loading (hari ke-6 s/d hari ke-30).', '/uploads/1786794111362-956794676.webp', '/uploads/1786794113370-547221562.webp', '/uploads/1786794114825-991866174.webp', 4.9, 400, '2026-08-15 10:32:06', '2026-08-15 11:43:21');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'user',
  `profilePicture` varchar(255) DEFAULT 'user.jpg',
  `isActive` tinyint(1) DEFAULT 1,
  `activationCode` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `username`, `email`, `password`, `role`, `profilePicture`, `isActive`, `activationCode`, `createdAt`, `updatedAt`) VALUES
(1, 'Muhammad Rakha Risfandi', 'Rakaa', 'rakarisfandi23@gmail.com', 'dff9e6ea7da1c66b86cfbe709268f6411b40abd06ef24f70c919e36e736a3264484bcf8a746b98d0da0e22f93ef7ba56e91b935dcdd2df93a496f8023db76f4a', 'admin', '/uploads/1785659221468-700539464.jpg', 1, '762485ae6d1181ee574f6648d730d606d957d35fad60eeec843e5c7b24a9ccfd9fe0ab4fc57781484c127e74226a3efadc5e8aad853ee53a82e40442b6cc7246', '2026-05-22 17:40:14', '2026-08-16 04:28:56'),
(2, 'RakaMhmd', 'RisfandiRaka', 'risfandiraka@gmail.com', 'dff9e6ea7da1c66b86cfbe709268f6411b40abd06ef24f70c919e36e736a3264484bcf8a746b98d0da0e22f93ef7ba56e91b935dcdd2df93a496f8023db76f4a', 'user', '/uploads/1785220930805-416276916.jpg', 1, '33e70df3336c53d862995721a6f90d7079a0cd3745d5599626504fb287ba31671e9059dc459e479c02bc5776e4db25a40de4ba505575e56aba8bf7d0c6c801a5', '2026-07-28 02:25:36', '2026-08-16 04:51:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `suplemen_id` (`suplemen_id`);

--
-- Indexes for table `suplemens`
--
ALTER TABLE `suplemens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suplemen_details`
--
ALTER TABLE `suplemen_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `suplemen_id` (`suplemen_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username_20` (`username`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `username_21` (`username`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `username_22` (`username`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `username_23` (`username`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `username_24` (`username`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `username_25` (`username`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `username_26` (`username`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `username_27` (`username`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `username_28` (`username`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `username_29` (`username`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `username_30` (`username`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `username_31` (`username`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `username_32` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `username_4` (`username`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `username_5` (`username`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `username_6` (`username`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `username_7` (`username`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `username_8` (`username`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `username_9` (`username`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `username_10` (`username`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `username_11` (`username`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `username_12` (`username`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `username_13` (`username`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `username_14` (`username`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `username_15` (`username`),
  ADD UNIQUE KEY `email_15` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `suplemens`
--
ALTER TABLE `suplemens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `suplemen_details`
--
ALTER TABLE `suplemen_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_61` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_62` FOREIGN KEY (`suplemen_id`) REFERENCES `suplemens` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `suplemen_details`
--
ALTER TABLE `suplemen_details`
  ADD CONSTRAINT `suplemen_details_ibfk_1` FOREIGN KEY (`suplemen_id`) REFERENCES `suplemens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
