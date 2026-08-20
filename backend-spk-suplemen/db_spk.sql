-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2026 at 10:06 AM
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
(1, 'BSN SYNTHA-6 4 LBS', 1100000, 2, 22, 5),
(3, 'ON WHEY GOLD 5 LBS', 1770000, 1, 24, 5),
(4, 'MUSCLETECH NITRO TECH 5 LBS ', 1570000, 1, 24, 4),
(5, 'MUSCLE FIRST PRO GAINER 6LBS/2721GR - MASS GAINER', 520000, 2, 15, 4),
(6, 'PROVUS PREMIUM WHEY GOLD 900GR - WHEY PROTEIN CONCENTRATE', 550000, 2, 25, 4),
(7, 'RIMBALIFE RIMBAMASS 5 LBS 2250GR', 420000, 2, 42, 4),
(8, 'GENETICA ISOMATRIX 5 LBS WHEY PROTEIN ISOLATE MATRIX', 560000, 2, 20, 5),
(9, 'KEVIN LEVRONE GOLD CREATINE MONOHYDRATE 300GR 60SERVING', 325000, 2, 0, 5),
(10, 'EVERBUILD CREATINE POWDER 500GR CREATINE MONOHYDRATE', 440000, 2, 0, 4),
(11, 'OPTIMUM NUTRITION CREATINE POWDER 300 GR MONOHYDRATE', 439998, 2, 22, 5),
(12, 'MUSCLE FIRST PRO WHEY 100 4LBS/1800GR - WHEY PROTEIN SUPLEMEN FITNESS', 1400000, 2, 25, 4),
(13, 'PROVUS ISOLATE MATRIX 2LB - WHEY PROTEIN ISOLATE', 750000, 3, 27, 5),
(14, 'EVERBUILD NUTRITION ISO BUILD 5 LBS ULTRA HYDROLYZED ISOLATE WHEY PROTEIN', 1929000, 1, 23, 5),
(15, 'BPI ISO HD 5 LBS WHEY PROTEIN ISOLATE', 1950000, 1, 32, 5),
(16, 'DY NUTRITION SHADOWHEY 5 LBS LB 5LBS 5LB DORIAN YATES HYDROLIZED WHEY PROTEIN ISOLATE HYDROLYSATE SHADOW WHEY', 1940000, 1, 25, 5),
(17, 'DRAGON PHARMA ISO PHORM 5 LBS WHEY PROTEIN ISOLATE ISOPHORM HYDROLIZED', 1825000, 2, 25, 4),
(18, 'FINAFLEX CLEAR PROTEIN 5 LBS LB 5LBS 5LB FINA FLEX WHEY PROTEIN 2300 GRAM', 1350000, 1, 25, 4),
(19, 'DIABLO WHEY PROTEIN THERMOGENIC PLUS FAT BURNER 4LBS ANS PERFORMANCE', 1350000, 3, 20, 4),
(20, 'EVOLENE EVOWHEY EVOSORPTION -WHEY PROTEIN 50 SERVING/1550GR', 1319900, 1, 25, 5),
(21, 'PURO WPC WPRO WHEY PROTEIN CONCENTRATE 600GR', 395000, 1, 21, 5),
(22, 'UP NUTRITION ISOBLEND 90 300GR', 199000, 3, 27, 4),
(23, 'FITLIFE PEAZY PROTEIN BLEND 900 GRAM WHEY ISOLATE PEA CONSENTRATE', 250000, 2, 20, 4),
(24, 'LINDEN NUTRITION LIN WHEY GOLD 2LBS 900 GRAM WHEY PROTEIN', 450000, 1, 25, 4),
(25, 'RIMBALIFE WHEYGAN 2 LBS 900 GRAM VEGAN PEA PLANT PROTEIN RIMBA SUSU WHEY PROTEIN', 275000, 3, 22, 4),
(26, 'PROVUS LEAN ZERO WHEY PROTEIN ISOLATE 454GR', 470000, 2, 25, 3),
(27, 'SPORTIGO WHEY PROTEIN FUEL PRO 4LB BSTORES ', 712000, 2, 22, 4),
(28, 'SCITEC NUTRITION - WHEY PROTEIN PROFESSIONAL 500 GRAM OPTIMUM DIETARY SUPPORT', 510000, 2, 22, 4),
(29, 'VECTORLABS MASTER WHEY 3LB - PURE WHEY PROTEIN ISOLATE', 320000, 2, 25, 2),
(30, 'KEVIN LEVRONE ANABOLIC MASS 2 LBS 900 GRAM', 322000, 1, 48, 4),
(31, 'BPI SPORTS EXTREME BULK MUSCLE XL 10 LBS WEIGHT MASS GAINER', 890000, 1, 22, 4);

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
(10, 11, 'https://id.shp.ee/3mmDHyPT', 'Aest Nutrition Official Store', 'Optimum Nutrition Creatine Powder - Recovery and Muscle Growth 300gr\n\n\n\nProduk yang dikirim memiliki tanggal kadaluarsa minimal 6 bulan dari tanggal pemesanan\n\n\n\nBPOM : POM SI154206481\n\nHalal : ID00410019286260724\n\n\n\nManfaat :\n\n• Menambah tenaga\n\n• Mempercepat perbaikan otot\n\n• Memperbesar volume sel dan kekuatan otot\n\n• Menggunakan fase loading\n\n\n\nCara Pemakaian\n\n(Fase Loading)\n\nBubuk: 1 sendok teh (5g) dicampur air putih 250ml atau di campur minuman manis, diminum 4x sehari selama 5 hari pertama.\n\n(Fase Maintenance)\n\nBubuk: 1 sendok teh (5g) dicampur air putih 250ml atau dicampur minuman manis, diminum 2x sehari setelah fase loading (hari ke-6 s/d hari ke-30).', '/uploads/1786794111362-956794676.webp', '/uploads/1786794113370-547221562.webp', '/uploads/1786794114825-991866174.webp', 4.9, 400, '2026-08-15 10:32:06', '2026-08-15 11:43:21'),
(11, 12, 'https://id.shp.ee/EoFTmzCb', 'Muscle First Official Shop', 'Pro Whey 100 adalah whey protein powder dari Muscle First.Mengandung mengandung 25g Protein, 160 Kalori, 2,5g Lemak dan menggunakan pemanis alami daun stevia. sudah teruji Lab International (Labdoor) dengan skor A+ dan sudah tersertifikasi GMP (Good Manufacturing Product), Halal MUI, BPOM, HACCP, ISO 22000.\n\n\n\nMengapa harus Pro Whey 100 ?\n\nKualitas Terbaik : teruji Lab International (Labdoor) dengan skor A+\n\nTinggi Protein : memiliki 25g Protein per serving\n\nRendah kalori & rendah Lemak : hanya mengandung 160 kalori & 2,5g lemak per serving\n\nPemanis Alami : Mengandung pemanis alami dari daun stevia\n\nMengandung 6,18g Bcaa : sehingga dapat membantu mempercepat proses recovery otot\n\nRasa yang lezat : memiliki berbagai macam varian rasa\n\n\n\nPro Whey 100 cocok untuk siapa ?\n\n- Pria & Wanita pemula gym yang ingin memaksimalkan pembentukan massa otot\n\n- Pria & Wanita pemula gym yang ingin memiliki berat badan ideal\n\n- Pria & Wanita yang sedang menjalan program cutting & defisit kalori\n\n- Pria & Wanita yang ingin mencukupi protein harian\n\n\n\nKapan harus dikonsumsi ?\n\nKegunaan utama pro whey adalah untuk menambah protein harian, sehingga cocok diminum kapanpun. Tetapi jika on training, dapat diminum setelah olahraga agar hasil maksimal\n\n\n\nSaran penyajian :\n\n1-2 scoop perhari di mix air 250ml ( takaran saji mengikuti protein harian anda )\n\n\n\nRasa :\n\n- Coklat / BPOM RI MD 662331394367\n\n- Vanilla Kurma Madu / BPOM RI MD 662331411367\n\n\n\nUkuran : 4 Lbs (1,8kg) 45 serving', '/uploads/1786983635810-388703376.jpeg', '/uploads/1786983637826-933992367.jpeg', '/uploads/1786983639216-225440348.jpeg', 4.8, 5010, '2026-08-17 16:07:09', '2026-08-17 16:20:41'),
(12, 13, 'https://id.shp.ee/wPjbwJhG', 'Provus Official Store', 'Provus Isolate Matrix adalah produk whey protein isolate 100% murni yang terkenal. Dikembangkan dengan fokus pada kualitas terbaik, Provus Isolate Matrix memiliki kandungan protein yang tinggi dan minim zat tambahan (filler), menjadikannya pilihan ideal untuk menjaga bentuk badan yang sempurna. Dengan 27g protein, 140 kalori, 1g gula, dan 1,5gr lemak per sajian, produk ini dirancang untuk memenuhi kebutuhan protein harian Anda dengan efisien. Provus Isolate Matrix juga telah bersertifikasi oleh BPOM, memberikan jaminan akan keamanan dan kualitasnya.\n\n\n\nKeunggulan Provus Isolate Matrix:\n\n27 Serving\n\nKualitas terbaik: Terbuat dari 100% Whey Protein Isolate.\n\nTinggi protein: Mengandung 27g Protein per sajian.\n\nRendah kalori dan lemak: Hanya mengandung 140 kalori & 1,5gr lemak per sajian.\n\n\n\nProvus Isolate Matrix sangat cocok untuk:\n\nPria dan wanita yang sedang dalam program pembentukan massa otot.\n\nPria dan wanita yang menjalani program defisit kalori.\n\nMereka yang ingin mencukupi asupan protein harian dengan kualitas tinggi.\n\n\n\nCara penyajian yang disarankan:\n\nCampur 1 sajian (1 scoop) dengan 150 - 200 ml air dingin sesuai kebutuhan protein harian Anda.\n\n\n\nWaktu konsumsi yang direkomendasikan:\n\nGunakan 1-3 sajian per hari, baik saat pagi hari, sebelum atau sesudah latihan, dan di antara jam makan siang.\n\n\n\nPenyimpanan:\n\nSimpanlah produk ini di tempat dengan suhu di bawah 25°C untuk mempertahankan kualitasnya.\"\n\n\n\nBPOM MD 242876019100100', '/uploads/1786983824569-126871343.jpeg', '/uploads/1786983847538-697046582.jpeg', '/uploads/1786983828092-220989120.jpeg', 5, 450, '2026-08-17 16:08:10', '2026-08-17 16:25:29'),
(13, 14, 'https://id.shp.ee/YKYWSh2a', 'Aest Nutrition Official Store', 'Everbuild Nutrition ISO Build 5 lbs – Hydrolyzed Whey Protein Isolate\n\n\n\n⚡Protein Murni, Serap Cepat, Hasil Nyata⚡\n\n\n\nIngin membentuk otot tanpa kompromi? Everbuild ISO Build hadir dengan teknologi hidrolisis mutakhir yang memungkinkan protein diserap lebih cepat, lebih efisien, dan lebih bersih oleh tubuh. Cocok untuk kamu yang mengejar pemulihan maksimal dan hasil latihan yang optimal‼️\n\n\n\n✅ Highlight Keunggulan Produk:\n\n\n\n- Hydrolyzed Whey Protein Isolate (hWPI 97%)\n\n  Teknologi pemurnian tinggi menghasilkan protein murni dengan tingkat penyerapan yang sangat cepat. Membantu otot pulih dan berkembang lebih cepat setelah latihan intens.\n\n\n\n- Kandungan Protein Tinggi – 23g per sajian (27.7g)\n\n  Menyokong sintesis otot dan mempertahankan massa otot tanpa tambahan kalori yang tidak perlu.\n\n\n\n- Rendah Lemak & Karbohidrat\n\n  ✔️ Lemak total hanya 0.3g, karbohidrat hanya 1.1g – cocok untuk program cutting atau diet rendah kalori.\n\n\n\n- Tanpa Gula & Rendah Kolesterol\n\n  ❎ 0g gula dan hanya 2mg kolesterol per sajian. Aman untuk menjaga kadar gula darah dan jantung tetap sehat.\n\n\n\n- Kaya Kalsium – 100mg per sajian\n\n  Mendukung kesehatan tulang dan kontraksi otot saat latihan berat.\n\n\n\n- Diperkaya Kolagen Peptida\n\n  Menunjang kekuatan sendi, tendon, dan kulit. Cocok untuk kamu yang aktif dan ingin tetap bugar menyeluruh.\n\n\n\n- Mengandung Stevia Alami (0.1%)\n\n  Memberikan rasa manis alami tanpa kalori tambahan. Tanpa pemanis buatan❕\n\n\n\n- Diproduksi di Fasilitas HACCP & cGMP\n\n  ✔️ Menjamin kualitas, kebersihan, dan keamanan produk sesuai standar internasional.\n\n\n\n✏️ Informasi Nutrisi per Sajian (27.7g):\n\n- Kalori: 104\n\n- Protein: 23g\n\n- Lemak total: 0.3g\n\n- Karbohidrat total: 1.1g\n\n- Gula: 0g\n\n- Kolesterol: 2mg\n\n- Sodium: 140mg\n\n- Kalsium: 100mg\n\n- Zat Besi: 0.2mg\n\n\n\n🩻 Komposisi Utama:\n\n- Hydrolyzed Whey Protein Isolate (97%)\n\n- Cocoa (Alkalized with Alkali)\n\n- Natural & Artificial Flavors\n\n- Collagen Peptides\n\n- Stevia (0.1%)\n\n- Soy Lecithin (0.1%)\n\n\n\n⚠️ Mengandung susu & kedelai (lecithin). Diproduksi di fasilitas yang juga memproses telur dan gandum.\n\n\n\n✏️ Aturan Pakai:\n\n- Campurkan 1 scoop (27.7g) ke dalam 180–250ml air dingin atau susu rendah lemak.\n\n- Konsumsi segera setelah latihan atau sebagai tambahan protein harian.\n\n- Dapat diminum di pagi hari, sebelum tidur, atau sebagai camilan sehat.\n\n\n\n🫀 Cocok Untuk Siapa?\n\n- Atlet & fitness enthusiast yang ingin pemulihan otot cepat & bersih\n\n- Kamu yang sedang dalam program cutting atau diet rendah kalori\n\n- Siapa pun yang ingin meningkatkan asupan protein harian berkualitas tinggi', '/uploads/1786983122663-253178873.jpeg', '/uploads/1786983126810-465572108.jpeg', '/uploads/1786983130859-331503199.jpeg', 4.9, 70, '2026-08-17 16:08:51', '2026-08-17 16:14:05'),
(14, 15, 'https://id.shp.ee/Pnt4L559', 'Suplemenfactory Official Store', 'Whey Protein import dari US dengan filter Isolate mengandung 25 gram protein dan 120 kalori per servingnya, 0 sugar 0 fat dan rendah kolesterol.\r\n\r\n\r\n\r\n Rasa :\r\n\r\n Chocolate Smooth / BPOMRIML262309002975 / EXP : 01 Februari 2028\r\n\r\n Vanilla / BPOMRIML262331031648 / EXP : 01 September 2027\r\n\r\n\r\n\r\n Nutrition Facts : (Chocolate Brownie)\r\n\r\n Servings Per Container : 69\r\n\r\n Serving Size : 1 Scoop (32 grams)\r\n\r\n Calories : 120 kcal\r\n\r\n Total Fat : 1 g\r\n\r\n Cholesterol : 15 mg\r\n\r\n Sodium : 170 mg\r\n\r\n Total Carbohydrate : 2 g\r\n\r\n Sugars : 0 g\r\n\r\n Protein : 25 g\r\n\r\n BCAA Per Serving : 5 g\r\n\r\n\r\n\r\n Cara Konsumsi :\r\n\r\n 1 Scoop dicampur air dingin/biasa sebanyak 300-400ml. Sebaiknya dikonsumsi waktu pagi dan setelah latihan.', '/uploads/1786984265054-501048928.webp', '/uploads/1786984266661-74626342.webp', '/uploads/1786984268301-621753460.webp', 4.9, 488, '2026-08-17 16:29:10', '2026-08-17 16:31:11'),
(15, 16, 'https://id.shp.ee/AzQPCGzL', 'Fit Addict', 'DY NUTRITION Shadowhey Hydrolyzed\r\n\r\nServing Size: 1 Scoop (25g)\r\n\r\nServing per container: 90\r\n\r\n\r\n\r\n\r\n\r\nWhey protein cepat serap dengan kualitas tinggi untuk bantu kamu capai badan lean & fit! Shadowhey Hydrolyzed mengandung 80% protein berkualitas tinggi dengan penyerapan super cepat, cocok untuk kamu yang serius membangun otot tanpa lemak.\r\n\r\nShadowhey Hydrolyzed secara alami kaya akan asam amino yang membantu tubuh memperkuat massa otot.\r\n\r\n\r\n\r\n\r\n\r\nKeunggulan:\r\n\r\n- 20g Protein Per Serving\r\n\r\n- 4,5g BCAA Per Serving\r\n\r\n- Low Sugar\r\n\r\n\r\n\r\n\r\n\r\nCara Konsumsi:\r\n\r\nCampurkan 1 scoop dengan 250ml air\r\n\r\nMinum 1 serving setelah workout atau di antara waktu makan untuk membantu memenuhi kebutuhan protein harian.\r\n\r\n\r\n\r\n\r\n\r\nBPOM RASA VANILLA: BPOM RI ML 220976005000828\r\n\r\nBPOM RASA CHOCOLATE: BPOM RI ML 220976005200828', '/uploads/1786984476809-2227491.webp', '/uploads/1786984476831-583889609.webp', '/uploads/1786984476839-703228013.webp', 5, 60, '2026-08-17 16:34:36', '2026-08-17 16:34:36'),
(16, 17, 'https://id.shp.ee/GKTnWMA8', 'THE FIT ZONE STORE Official Store', 'Dragon Pharma Iso Phorm 5 Lbs Whey Protein Isolate IsoPhorm Hydrolyzed\r\n\r\n\r\n\r\nVarian & Expired :\r\n\r\nDragon Pharma Iso Phorm 5 Lbs BLUEBERRY ICE (Exp Product : 06/2027)\r\n\r\nDragon Pharma Iso Phorm 5 Lbs CHOCO PEANUT (Exp Product : 08/2027)\r\n\r\nDragon Pharma Iso Phorm 5 Lbs HOT CHOCO (Exp Product : 11/2027)\r\n\r\n\r\n\r\nUKURAN\r\n\r\n5 Lbs (Sekitar 2.3 kg) – Ukuran ideal untuk penggunaan rutin bulanan, memberikan jumlah serving yang melimpah dengan kualitas protein tertinggi.\r\n\r\n\r\n\r\nKELEBIHAN PRODUCT\r\n\r\n- Hydrolyzed Whey Isolate: Kasta tertinggi dalam dunia protein. Protein telah dipecah menjadi fragmen yang lebih kecil (peptida) sehingga penyerapan ke otot terjadi hampir instan.\r\n\r\n- Rapid Recovery: Sangat efektif untuk menghentikan fase katabolik (penyusutan otot) segera setelah latihan beban yang berat.\r\n\r\n- Premium Purity: Bebas dari filler, rendah lemak, rendah gula, dan sangat rendah laktosa. Sangat aman bagi Anda yang memiliki perut sensitif atau sering kembung minum susu biasa.\r\n\r\n- Lean Muscle Support: Membantu membangun massa otot tanpa lemak tambahan, sangat cocok untuk fase cutting atau lean bulking.\r\n\r\n- Superior Solubility & Taste: Mudah larut tanpa gumpalan dan memiliki profil rasa yang sangat lezat, khas kualitas Dragon Pharma yang mendunia.\r\n\r\n\r\n\r\nKONTRAINDIKASI\r\n\r\n- Meskipun rendah laktosa karena proses isolasi dan hidrolisis, tetap berhati-hati bagi individu dengan alergi susu sapi yang sangat parah.\r\n\r\n- Tidak ditujukan untuk mendiagnosis, mengobati, atau mencegah penyakit kronis tertentu tanpa saran dokter.\r\n\r\n- Pastikan asupan air putih tetap cukup selama mengonsumsi suplemen protein tinggi.\r\n\r\n\r\n\r\nKANDUNGAN UTAMA\r\n\r\n- 100% Hydrolyzed Whey Protein Isolate: Sumber protein murni dengan nilai biologis (BV) tertinggi untuk pertumbuhan otot.\r\n\r\n- Complete Amino Acid Profile: Kaya akan BCAA dan EAA alami yang esensial untuk perbaikan jaringan tubuh.\r\n\r\n- Digestive Enzyme Friendly: Formulasi yang dirancang untuk kenyamanan pencernaan maksimal.\r\n\r\n\r\n\r\nCARA PENGGUNAAN\r\n\r\nCampurkan 1 scoop Iso Phorm ke dalam 200-250 ml air dingin atau minuman favorit Anda. Kocok menggunakan shaker selama 10-15 detik. Waktu konsumsi paling krusial adalah segera setelah latihan dan saat bangun tidur di pagi hari ketika tubuh sangat membutuhkan nutrisi cepat serap.\r\n\r\n\r\n\r\nNO BPOM : ML 220976005800175', '/uploads/1786984740437-462269466.jpeg', '/uploads/1786984740468-386732057.jpeg', '/uploads/1786984740471-786334498.jpeg', 4.9, 30, '2026-08-17 16:39:00', '2026-08-17 16:39:00'),
(17, 18, 'https://id.shp.ee/azZ1M3SL', 'Fit Addict', 'PROTEIN DRINK MIX – Dengan PentaPhase Instantized Whey Protein, CLEAR PROTEIN menghadirkan 25g protein berkualitas tinggi dengan kandungan lemak dan karbohidrat yang minimal. Protein ini dicerna oleh tubuh dalam lima fase terpisah selama lima jam untuk mendukung performa serta pertumbuhan otot.\r\n\r\nMENGAPA WHEY? – Dengan bioavailability yang tinggi, whey protein memberikan bahan bakar yang dibutuhkan otot untuk pulih lebih cepat, serta tumbuh lebih besar dan kuat. Whey protein secara luas dianggap sebagai bentuk protein yang paling efektif.\r\n\r\nMUDAH DICERNA – Semakin keras tubuh Anda harus bekerja untuk mengolah protein, semakin besar kemungkinan Anda mengalami perut kembung, kram perut, mual, dan efek samping tak menyenangkan lainnya. Selain itu, protein apa pun yang tidak dapat dicerna oleh tubuh hanya akan terbuang sia-sia.\r\n\r\nRASA DENGAN LEZAT – Dengan protein selezat ini, Anda tidak akan kesulitan mencapai target makro harian! CLEAR PROTEIN larut dengan mudah menjadi milkshake yang lembut, puding, atau oatmeal. Anda juga bisa memanggangnya ke dalam resep masakan atau membekukannya untuk dijadikan es krim buatan sendiri.\r\n\r\nSIAPA KAMI – FINAFLEX adalah perusahaan makanan ringan dan suplemen yang didirikan pada tahun 2008 dan berbasis di Atlanta, Georgia. Sebagai produsen bersertifikat GMP, kami berkomitmen untuk menghadirkan produk yang unik, efektif, dan berkualitas tinggi untuk membantu setiap orang mencapai target kebugaran mereka.', '/uploads/1786985095440-856693082.webp', '/uploads/1786985095449-326331408.webp', '/uploads/1786985095450-140956125.webp', 4.9, 25, '2026-08-17 16:44:55', '2026-08-17 16:44:55'),
(18, 19, 'https://id.shp.ee/eXGEayNS', 'Z Gym Clinic Store', 'Diablo Protein adalah whey protein dengan rasa lezat yang juga menawarkan manfaat menurunkan berat badan / management berat badan, Kombinasi whey protein concetrate, susu, serta whey protein casein yang merupakan whey protein lambat serap memberikan anda rasa kenyang lebih lama, menunda rasa lapar mendukung kebutuhan harian protein anda dan juga diablo didesain dengan rendah gula, rendah kalori, dan rendah lemak menjadikan diablo protein snack yang menyehatkan dan cocok dikonsumsi untuk mereka yang sedang berdiet, dan juga cocok untuk dikonsumsi sebagai post workout\r\n\r\n\r\n\r\nCampurang whey protein pada DIABLO PROTEIN adalah, Whey Protein Concentrate 80%, Milk Protein Isolate, Whey Protein Isolate, Hydrolyzed Whey Protein, Micellar Casein, hasil dari pengabungan jenis-jenis protein tersebut menjadikan DIABLO PROTEIN dapat digunakan untuk berbagai tujuan, mulai dari gain lean muscle, Build new Muscle, Weight Management serta DIABLO PROTEIN dapat dikonsumsi baik oleh pria maupun wanita\r\n\r\n\r\n\r\nDiablo Protein juga dilengkapi bahan-bahan alami yang dapat membantu anda menjaga berat badan dan menurunkan kadar lemak, serta tetap menjaga otot anda tetap bertumbuh\r\n\r\n\r\n\r\nKunci DIABLO PROTEIN\r\n\r\n*20gr Lean Protein\r\n\r\n*Hanya 100kalori perserving\r\n\r\n*LOW SUGAR, LOW FAT\r\n\r\n*L-carnitine, Green Coffe Bean, CLA, bahan2 pembakar lemak non stimulan\r\n\r\n\r\n\r\nSehinnga Diablo protein adalah whey unik dengan efek menurunkan kadar lemak tubuh', '/uploads/1786985463787-83748148.webp', '/uploads/1786985463792-335078406.webp', '/uploads/1786985463797-611794813.webp', 4.6, 17, '2026-08-17 16:51:03', '2026-08-17 16:51:03'),
(19, 20, 'https://id.shp.ee/9rv7paQ2', 'Evolene Authorized Store Medan', 'vowhey Evosorption diformulasikan untuk bantu kamu:\r\n\r\n\r\n\r\n- Mencukupi kebutuhan protein harian\r\n\r\n- Mengencangkan otot perut\r\n\r\n- Mempermudah program defisit kalori\r\n\r\n- Menjalani program cutting\r\n\r\n- Wujudkan badan ideal impian\r\n\r\n\r\n\r\nKeunggulan Evowhey Evosorption :\r\n\r\n- Tinggi protein dengan kandungan 25 gr protein/ servingnya\r\n\r\n- Rendah kalori, hanya 140 kkal/ servingnya, kalorinya sangat rendah dibandingkan whey protein lain\r\n\r\n- Diperkaya premix vitamin yang dapat meningkatkan daya tahan tubuh\r\n\r\n- Mengandung BCAA 5,5 gr/ serving yang berfungsi membantu pertumbuhan otot, meredakan sakit dan nyeri saat olahraga\r\n\r\n\r\n\r\nSaran penyajian:\r\n\r\n\r\n\r\n- Konsumsi minimal 1 serving per hari dan maksimal 2 serving per hari untuk hasil yang maksimal.\r\n\r\n- Tuang 1 scoop Evowhey ke dalam shaker \r\n\r\n- Campurkan dengan air dingin atau air biasa sebanyak 200-300ml. Ingat jangan campur dengan air panas karena akan merusak kandungannya. \r\n\r\n- Kocok shaker hingga rata, lalu minum\r\n\r\n- Konsumsi setelah latihan untuk hasil optimal dalam pemulihan otot, atau sebagai tambahan protein dalam diet harian Anda.\r\n\r\n\r\n\r\nDapatkan New Evowhey Sekarang!\r\n\r\nTingkatkan performa dan pemulihan otot Anda dengan New Evowhey standar baru suplemen kebugaran yang didukung oleh sains. \r\n\r\nBPOM RI MD 862331005523\r\n\r\n\r\n\r\nSegera coba dan rasakan perbedaannya!', '/uploads/1786985710244-194922563.jpeg', '/uploads/1786985710266-92650620.jpeg', '/uploads/1786985710271-245818507.jpeg', 5, 5, '2026-08-17 16:55:10', '2026-08-17 16:55:10'),
(20, 21, 'https://id.shp.ee/DB3NFSdT', 'Puro Official Shop', 'Saran penyajian:\r\n\r\n30gr (± 1 scoop) + 250-300ml air suhu ruang/ air dingin. \r\n\r\n*Disarankan untuk melakukan penimbangan untuk takaran yang lebih akurat.\r\n\r\n\r\n\r\nKEMASAN :\r\n\r\n600gr (20 servings)= 300gr x 2 box\r\n\r\n\r\n\r\n*WHY PURO WPC ?\r\n\r\n- 21 g Protein per serving\r\n\r\n- 5 g BCAA\r\n\r\n- No Filler\r\n\r\n- No Added Maltodextrin\r\n\r\n- No Coloring\r\n\r\n- Higher Protein\r\n\r\n*Based on WPC Choco Malt Flavour\r\n\r\n\r\n\r\n\r\n\r\nKOMPOSISI:\r\n\r\n\r\n\r\nWPC : \r\n\r\n• WPC Choco Malt: Whey Protein Konsentrat (89%), Kakao Bubuk, Malt Extract, Perisa Sintetik Cokelat, Pemanis Buatan Sukralosa, Vitamin B6.\r\n\r\n• WPC Vanilla: Whey Protein Konsentrat (93.5%), Krimer Minuman, Perisa Sintetik Vanila, Pemanis Buatan Sukralosa, Vitamin B6\r\n\r\n• WPC Strawberry Yoghurt: Whey Protein Konsentrat (92%), Yoghurt Bubuk (mengandung laktosa & protein susu), Pengatur Keasaman Asam Sitrat, Perisa Sintetik, Pemanis Buatan Sukralosa, Vitamin B6.\r\n\r\n• WPC Matcha: Whey Protein Konsentrat (92%), Bubuk Matcha, Pemanis Buatan Sukralosa, Vitamin B6.\r\n\r\n• WPC Choco Eclair: Whey Protein Konsentrat (96%), Kakao Bubuk, Perisa Sintetik, Pemanis Buatan Sukralosa, Vitamin B6.\r\n\r\n• WPC Es Teler: Whey Protein Konsentrat (94%), Krimer Minuman, Perisa Sintetik, Pemanis Sucralose dan Vitamin B6. \r\n\r\n• WPC Plain: Whey Protein Konsentrat (99%), dan Vitamin B6.\r\n\r\n• WPC Salted Caramel: Whey Protein Konsentrat (94%), Krimer Minuman (mengandung protein susu), Perisa Sintetik, Pemanis Buatan Sukralosa, Garam dan Vitamin B6.\r\n\r\n\r\n\r\nMANFAAT : \r\n\r\n- Membantu penuhi kebutuhan protein harian\r\n\r\n- Membantu menjaga & meningkatkan massa otot\r\n\r\n- Membantu program diet\r\n\r\n\r\n\r\n* HALAL dan TERDAFTAR BPOM * \r\n\r\nWPC\r\n\r\nNO BPOM : \r\n\r\nMD 862312046010 (Choco Malt) \r\n\r\nMD 862312049010 (Vanilla)\r\n\r\nMD 241276001400103 (Strawberry Yoghurt)\r\n\r\nMD 241276002200103 (Matcha)\r\n\r\nMD 241276002300103  (Choco Eclair)\r\n\r\nMD 241276004300103 (Es Teler)\r\n\r\nMD 241276004500103 (Plain)\r\n\r\nMD 241276005000103 (Salted Caramel)\r\n\r\n\r\n\r\n(*mengandung sukralosa tidak disarankan untuk ibu hamil dan ibu menyusui)', '/uploads/1786986232832-475710906.png', '/uploads/1786986232860-215791874.png', '/uploads/1786986232881-367200502.png', 5, 4000, '2026-08-17 17:03:52', '2026-08-17 17:03:52'),
(21, 22, 'https://id.shp.ee/wxhiHT5b', 'UP Nutrition Performance Official Store', 'BPOM RI MD 243135009000010\r\n\r\nCoklat = 07 Juli 2028\r\n\r\nVanilla = 16 Maret 2028\r\n\r\n\r\n\r\nUP Nutrition Isoblend 90 adalah whey protein berkualitas tinggi dengan kadar protein mencapai 90%, cocok untuk membantu memenuhi kebutuhan protein harian dan mendukung pembentukan massa otot.\r\n\r\n\r\n\r\nKeunggulan:\r\n\r\n\r\n\r\nMengandung 27g protein per serving\r\n\r\n90% protein ratio (high protein, low impurities)\r\n\r\n0 lemak & gula – lebih bersih untuk diet\r\n\r\nMenggunakan natural flavor & color\r\n\r\nMudah dicerna dan cepat diserap tubuh\r\n\r\nCocok untuk fase cutting maupun lean muscle', '/uploads/1786986779568-739596227.jpeg', '/uploads/1786986779594-882805706.jpeg', '/uploads/1786986779608-562277177.jpeg', 4.5, 25, '2026-08-17 17:12:59', '2026-08-17 17:12:59'),
(22, 23, 'https://id.shp.ee/boo4bxcR', 'THE FIT ZONE STORE Official Store', 'FITLIFE PEAZY Protein Blend 900 Gram Whey Isolate Pea Consentrate\r\n\r\n\r\n\r\nUKURAN : 900 gram / 20 sajian\r\n\r\n\r\n\r\nVariant & Expired Product : \r\n\r\nFitlife Peazy 2 Lbs - Choco Peanut [02/2028]\r\n\r\n\r\n\r\nKELEBIHAN PRODUCT :\r\n\r\n100% Plant-Based Protein: Menggunakan protein nabati murni yang berasal dari kacang polong (pea protein) berkualitas tinggi.\r\n\r\nBebas Laktosa & Dairy Free: Pilihan tepat bagi Anda yang memiliki intoleransi laktosa atau menghindari produk olahan susu.\r\n\r\nMendukung Diet Vegan: Seluruh kandungan bahan bersifat ramah bagi pelaku gaya hidup vegan dan vegetarian.\r\n\r\nProfil Asam Amino Lengkap: Mengandung asam amino esensial yang dibutuhkan tubuh untuk membantu proses pemulihan dan pertumbuhan otot.\r\n\r\nRendah Kalori & Lemak: Sangat membantu bagi Anda yang sedang dalam program penurunan berat badan atau menjaga bentuk tubuh ideal.\r\n\r\nBebas Gluten & Gula Tambahan: Aman dikonsumsi harian tanpa menyebabkan lonjakan gula darah atau gangguan pencernaan bagi yang sensitif terhadap gluten.\r\n\r\n\r\n\r\nKANDUNGAN UTAMA :\r\n\r\nPea Protein Isolate: Sumber protein utama yang mudah diserap oleh tubuh.\r\n\r\nBCAA: Mendukung pemulihan jaringan otot setelah berolahraga.\r\n\r\nPemanis Alami Stevia: Memberikan rasa manis yang aman tanpa kalori tambahan.\r\n\r\n\r\n\r\nCARA PENGGUNAAN :\r\n\r\nCampurkan 1 scoop Fitlife Peazy dengan sekitar 250-300 ml air dingin.\r\n\r\nKocok menggunakan shaker hingga bubuk larut sepenuhnya.\r\n\r\nWaktu Terbaik: Konsumsi segera setelah latihan untuk pemulihan otot, atau di pagi hari sebagai tambahan nutrisi harian Anda.\r\n\r\n\r\n\r\nKONTRADIKSI :\r\n\r\nHindari penggunaan jika Anda memiliki alergi spesifik terhadap kacang polong atau produk kacang-kacangan lainnya.\r\n\r\nKonsultasikan dengan ahli gizi jika Anda sedang dalam kondisi hamil atau memiliki gangguan fungsi ginjal tertentu.\r\n\r\n\r\n\r\nBPOM MD 240976001900359', '/uploads/1786987121227-680171102.jpeg', '/uploads/1786987121262-728161407.jpeg', '/uploads/1786987121277-947782743.jpeg', 4.9, 240, '2026-08-17 17:18:41', '2026-08-17 17:18:41'),
(23, 24, 'https://id.shp.ee/Sk9qcHM7', 'Gorilla Supplement Official Store', 'LINDEN WHEY GOLD 2LBS adalah whey protein premium asal Amerika Serikat (Made in USA) yang diformulasikan untuk membantu memenuhi kebutuhan protein harian, mendukung pertumbuhan massa otot, mempercepat recovery setelah latihan, dan menjaga performa tubuh tetap optimal.\r\n\r\n\r\n\r\nMenggunakan kombinasi 5 sumber protein berkualitas tinggi, Linden Whey Gold memberikan profil asam amino lengkap dengan 10.8g Essential Amino Acids (EAAs) dan 5g BCAAs per serving untuk mendukung sintesis protein otot secara maksimal.\r\n\r\n\r\n\r\nKeunggulan LINDEN WHEY GOLD\r\n\r\n- 25g Protein per Serving\r\n\r\nMembantu pembentukan dan pemeliharaan massa otot.\r\n\r\n\r\n\r\n- 5-Source Protein Blend\r\n\r\nWhey Protein Concentrate\r\n\r\nWhey Protein Isolate\r\n\r\nHydrolyzed Whey Protein\r\n\r\nYeast Protein\r\n\r\nMilk Protein Concentrate\r\n\r\n\r\n\r\n- 10.8g Essential Amino Acids (EAAs)\r\n\r\nMendukung proses recovery dan pertumbuhan otot.\r\n\r\n\r\n\r\n-5g BCAAs per Serving\r\n\r\nLeucine, Isoleucine, dan Valine untuk membantu pemulihan setelah latihan.\r\n\r\n\r\n\r\n- Low Lactose Formula\r\n\r\nLebih nyaman di pencernaan dibanding whey protein biasa.\r\n\r\n\r\n\r\n- 150 Kalori per Serving\r\n\r\nCocok untuk program muscle building maupun menjaga asupan protein harian.\r\n\r\n\r\n\r\n- Brand Import Made in USA\r\n\r\nInformasi Nutrisi\r\n\r\n\r\n\r\nServing Size: 1 Scoop (38.2g)\r\n\r\nServings per Container: 24 Serving\r\n\r\nPer Serving:\r\n\r\nProtein : 25g\r\n\r\nKalori : 150\r\n\r\nKarbohidrat  7g\r\n\r\nGula : 1g\r\n\r\nLemak : 2.5g\r\n\r\nSodium : 210mg\r\n\r\nEAA : 10.8g\r\n\r\nBCAA : 5g\r\n\r\n\r\n\r\nCara Konsumsi\r\n\r\nCampurkan:\r\n\r\n1 scoop (38.2g) Linden Whey Gold\r\n\r\n236–354 ml air dingin atau susu rendah lemak\r\n\r\nKocok selama 15–30 detik hingga larut sempurna.\r\n\r\n\r\n\r\nWaktu konsumsi yang disarankan:\r\n\r\nSetelah latihan (post-workout)\r\n\r\nSaat sarapan\r\n\r\nDi antara waktu makan\r\n\r\nSebelum tidur untuk membantu memenuhi kebutuhan protein harian\r\n\r\n\r\n\r\nCocok Untuk\r\n\r\n Fitness & Gym Enthusiast\r\n\r\n Program Bulking\r\n\r\n Lean Muscle Building\r\n\r\n Menambah Asupan Protein Harian\r\n\r\n Recovery Setelah Latihan\r\n\r\n Pria & Wanita Dewasa Aktif\r\n\r\n', '/uploads/1786987394241-148373059.webp', '/uploads/1786987394274-104282594.webp', '/uploads/1786987394287-647562933.webp', 5, 20, '2026-08-17 17:23:14', '2026-08-17 17:23:14'),
(24, 25, 'https://id.shp.ee/TsKgW1Zz', 'Gorilla Supplement Official Store', 'RIMBALIFE WHEYGAN\r\n\r\nPlant Based Protein\r\n\r\nBebas Laktosa & Gluten\r\n\r\n1 SAJIAN MENGANDUNG:\r\n\r\n22g Protein\r\n\r\n1.5g Lemak\r\n\r\n4g Fiber\r\n\r\n135 Kalori\r\n\r\n3.92g BCAA\r\n\r\n\r\n\r\nSPESIFIKASI PRODUK\r\n\r\nEXP ; 2025\r\n\r\nBPOM - 662340160015\r\n\r\nVegan Friendly\r\n\r\nCARA PENYAJIAN\r\n\r\nCampurkan 1 scoop dengan 250ml air dingin di minum setelah olahraga atau di pagi hari.\r\n\r\nNOTE : JANGAN PAKAI AIR PANAS\r\n\r\n\r\n\r\nCocok Diminum Usia 15 Tahun ke Atas', '/uploads/1786987729942-67799649.jpeg', '/uploads/1786987729976-76878626.jpeg', '/uploads/1786987729992-673199139.jpeg', 4.9, 548, '2026-08-17 17:28:50', '2026-08-17 17:28:50'),
(25, 26, 'https://id.shp.ee/oRvikH5j', 'Susu Fitnesku', 'PROVUS LEAN ZERO \r\n\r\nWhey Protein Isolate + Fat Burner\r\n\r\nMenaikkan massa otot sekaligus menurunkan lemak berlebih Sangat Cocok untuk anda yang dalam program penurunan berat badan, Lean Zero memiliki kandungan L Carnitine, sebagai supporting ingredients untuk membantu membakar lemak, membantu recovery, menjaga nafsu makan, serta menjadi supply kebutuhan protein agar otot tetap mendapatkan nutrisi.\r\n\r\n\r\n\r\nWhey Protein Isolate dilengkapi dengan L- Carnitine, mengandung 25 gram protein dan 120 kalori per servingnya, 0 sugar 0 fat.\r\n\r\n\r\n\r\nVarian :\r\n\r\nChocolate\r\n\r\nVanilla\r\n\r\nStrawberry Banana\r\n\r\nWhite Coffee\r\n\r\nMatcha Latte\r\n\r\n\r\n\r\nServing per container : 15 serving\r\n\r\nServing size : 1 Scoop ( 30 gr)\r\n\r\n\r\n\r\nProvus Lean Zero dirancang untuk kalian yg sedang menjalani program defisit kalori dan penurunan berat badan. Provus Lean Zero memiliki 3 kandungan utama dalam membantu proses defisit kalori :\r\n\r\n\r\n\r\n1. Whey Protein Isolate \r\n\r\nWhey protein isolate merupakan sumber protein pilihan terbaik karena diserap lebih cepat oleh tubuh, sangat rendah kolesterol, serta aman bagi penderita intoleransi laktosa.\r\n\r\n\r\n\r\n2. L Carnitine \r\n\r\nL Carnitine merupakan asam amino yang berfungsi untuk membawa cadangan lemak di dalam tubuh yang kemudian dibakar menjadi energi. Dan dapat membantu pemulihan otot, mengontrol nafsu makan, serta meningkatkan metabolisme tubuh menjadi lebih optimal.\r\n\r\n\r\n\r\nKEUNGGULAN :\r\n\r\nWhey Protein Isolate \r\n\r\n83% Protein Rasio\r\n\r\n25 gram protein per sajian\r\n\r\nTidak mengandung gula dan lemak\r\n\r\nL-carnitine 500 mg per sajian\r\n\r\nCocok bagi penderita intoleransi laktosa\r\n\r\nHarga Ekonomis\r\n\r\n    \r\n\r\n\r\n\r\nPETUNJUK PENGGUNAAN:\r\n\r\nTambahkan 1 sendok takaran saji (30g) dengan 100-200 ml air dingin. Gunakan 2-3 kali sehari, setiap pagi hari, setelah latihan/olahraga, atau setiap anda membutuhkan asupan protein\r\n\r\n\r\n\r\nJangan menggunakan air mendidih \r\n\r\nSimpan di tempat dengan suhu ruangan atau di bawah 25 Derajat Celcius\r\n\r\n\r\n\r\n\r\n\r\nBPOM RI :\r\n\r\nRasa Cokelat MD 243176014700279\r\n\r\nRasa Vanilla MD 243176014500279', '/uploads/1786987900298-48730099.jpeg', '/uploads/1786987900301-75094306.jpeg', '/uploads/1786987900315-616711081.jpeg', 5, 15, '2026-08-17 17:31:40', '2026-08-17 17:31:40'),
(26, 27, 'https://id.shp.ee/V19u7MGV', 'Bstores Official Shop', 'Susu Protein terbaik dikelasnya dengan sumber protein dari Whey yang diformulasikan untuk meningkatkan massa otot.\r\n\r\n\r\n\r\nKeunggulan Sportigo Whey Protein Fuel Pro\r\n\r\n• Dengan kandungan 22g Protein\r\n\r\n• Mengandung 4.5g BCAA\r\n\r\n• Zero Sugar\r\n\r\n• Zero Lactose\r\n\r\n• 4g Fiber\r\n\r\nSudah tersertifikasi BPOM, Halal MUI, HACCP.\r\n\r\n\r\n\r\nBENTUK TUBUHMU, NO RIBET NO MAHAL DENGAN FUEL PRO\r\n\r\n\r\n\r\nKenapa harus Sportigo Whey Protein FUEL PRO\r\n\r\n• Sumber Protein Terbaik\r\n\r\nDengan Science-Backed Sport Nutrition Formula dan menggunakan Premium Ingredients yang sudah teruji dan digunakan para atlet\r\n\r\n• FUELPRO memberikan solusi paling worth it bagi kalian yang pengen menambah asupan protein harian.\r\n\r\n• Gedein otot dengan nyaman, konsumsi FUELPRO dengan nyaman karena rendah laktosa dan rendah gula\r\n\r\n• Efektif Menjaga berat badan IDEAL\r\n\r\nKandungan tinggi protein 22 gr/ serving dan mengandung 4 gr/serving serat pangan untuk proses metabolisme yang lancar dan maksimal\r\n\r\n\r\n\r\nSaran penyajian:\r\n\r\n• Masukkan 1 scoop (33g) Sportigo Whey Protein Fuel Pro ke dalam shaker\r\n\r\n• Campurkan dengan air atau minuman favorite anda sebanyak 250-300 ml\r\n\r\n• Aduk/Shake hingga rata dan siap disajikan\r\n\r\n\r\n\r\nNetto : 1.820g\r\n\r\nServing : 55 Serving\r\nNo. Izin Edar (BPOM, PIRT)\r\nBPOMRI', '/uploads/1786988605937-509417301.jpeg', '/uploads/1786988606000-389366685.jpeg', '/uploads/1786988606004-555961780.jpeg', 4.9, 341, '2026-08-17 17:43:26', '2026-08-17 17:43:26'),
(27, 28, 'https://id.shp.ee/3EjgHnBm', 'click here to visit shop mall shop badge Sport N Fit Official Shop', '*100% Whey Protein Profesional 500gr - 16x serving\r\n\r\n -dengan asam amino ekstra\r\n\r\n -dengan enzim pencernaan\r\n\r\n -dengan protein whey instan\r\n\r\n -bebas gula\r\n\r\nFungsi dan keunggulan :\r\n\r\n*100% Whey Protein* Kandungan protein whey profesional berkontribusi pada pertumbuhan dan pemeliharaan otot yang \r\n\r\n optimal serta pemeliharaan struktur tulang yang normal**. Protein bagi tubuh kita seperti batu bata di lokasi konstruksi. \r\n\r\n Terlebih lagi, kami telah menambahkan asam amino ekstra (leusin, glutamin, arginin dan taurin) ke dalam formula selain asam \r\n\r\n amino asli, serta enzim pencernaan seperti Papain dan Bromelain.  100% Whey Protein Professional sekarang juga bebas \r\n\r\n gluten. \r\n\r\n \r\n\r\n*Cara Pakai : Masukkan 3/4 scoop kedalam gelas berisi 250 ml air dingin, aduk hingga larut dan diminum setelah latihan.\r\n\r\n\r\n\r\n*Informasi Pemakaian : \r\n\r\nServing size            : 30gram (3/4 scoop)\r\n\r\nServing containe  : 16 kali pakai', '/uploads/1786988865948-649231469.jpeg', '/uploads/1786988865979-511725029.jpeg', '/uploads/1786988865997-804353942.jpeg', 5, 79, '2026-08-17 17:47:46', '2026-08-17 17:47:46'),
(28, 29, 'https://id.shp.ee/BfAHADsS', 'Susu Fitnesku', 'VECTORLABS MASTER WHEY adalah 100% Whey Protein Concentrate dan whey protein isolate yang diproduksi menggunakan teknologi membran ultrafiltrasi dingin, proses ini menghasilkan suatu Whey Protein denaturasi yang menjadikan Protein Kualitas Terbaik.\r\n\r\n\r\n\r\nWHEY PROTEIN merupakan suplemen utama dalam pembentukan otot. Dapat membantu meningkatkan pertumbuhan massa otot rendah lemak, mempercepat proses pemulihan otot, mampu mencegah otot agar tidak menyusut , dan meningkatkan metabolisme tubuh.\r\n\r\n\r\n\r\nDengan kandungan Protein 25 gram per saji, BCAA 4600 mg, dan rasa yg lezat dapat mendukung program Bulking Lean Muscle maupun Cutting anda. MASTER WHEY membantu memaintain otot anda !\r\n\r\n\r\n\r\nBPOM MD 662313014423', '/uploads/1786989098542-389133355.jpeg', '/uploads/1786989098639-707746757.jpeg', '/uploads/1786989098675-698720383.jpeg', 4.9, 390, '2026-08-17 17:51:38', '2026-08-17 17:51:38'),
(29, 30, 'https://id.shp.ee/N84j1Qfw', 'THE FIT ZONE STORE Official Store', 'Kevin Levrone Anabolic Mass 2 Lbs 900 Gram - Susu Penambah Berat Badan Kalori Tinggi Protein Whey Matrix | Suplemen Bulking Premium Pria Kurus Hardgainer Penggemuk Badan Cepat Padat Berotot Import Halal BPOM Original\r\n\r\n\r\n\r\nSPESIFIKASI & INFORMASI PRODUK\r\n\r\n- Nama Produk: Kevin Levrone Anabolic Mass Gainer\r\n\r\n- Kategori: Suplemen Fitness / Susu Weight Gainer Import Premium\r\n\r\n- Ukuran: 2 Lbs / 900 Gram (Trial & Weekly Pack)\r\n\r\n- Kemasan: Pouch Praktis Eksklusif\r\n\r\n- Legalitas: Terdaftar Resmi di BPOM RI (Sertifikasi ML) & Standar Mutu Internasional\r\n\r\n\r\n\r\nRASA & NOMOR REGISTRASI BPOM RI:\r\n\r\n- Coklat / Choco (EXP: 09/2028) -> BPOM RI ML 220976001200828\r\n\r\n- Strawberry (EXP: 05/2028) -> BPOM RI ML 240976001700828\r\n\r\n- Vanilla (EXP: 05/2028) -> BPOM RI ML 220976001300828\r\n\r\n\r\n\r\nSulit menaikkan berat badan karena tipe badan terlalu kurus (hardgainer) atau porsi makan harian tidak mampu mengimbangi metabolisme tubuh yang super cepat? Kevin Levrone Anabolic Mass Gainer 2 Lbs hadir sebagai solusi hidrasi nutrisi makro premium harian Anda. Diformulasikan langsung oleh legenda binaraga dunia Kevin Levrone, gainer ini memadukan kalori makro bersih dengan multi-stage protein matrix berkualitas tinggi untuk membantu Anda mendongkrak berat badan secara cepat, sehat, proporsional, dan padat berotot.\r\n\r\n\r\n\r\nKANDUNGAN UTAMA\r\n\r\n- Multi-Stage Protein Blend Matrix harian: Kombinasi Whey Protein Concentrate, Whey Isolate, dan Hydrolyzed Whey untuk suplai asam amino berkala jangka panjang ke sel otot.\r\n\r\n- Karbohidrat Kompleks Bersih (Maltodekstrin & Glukosa Premium): Menyediakan asupan energi makro tinggi harian untuk mempermudah tercapainya target surplus kalori tanpa menimbun lemak air jahat.\r\n\r\n- Anabolic & Power Support Complex: Diperkaya kandungan Creatine Monohydrate, Taurine, DAA, serta Arginine alami harian untuk mendongkrak tenaga angkatan dan mempercepat penyerapan gizi seluler tubuh.\r\n\r\n\r\n\r\nKHASIAT & KEUNGGULAN UTAMA\r\n\r\n- Pemicu Surplus Kalori Maksimal: Membantu mencukupi kebutuhan kalori harian dalam volume tinggi secara instan tanpa membebani kapasitas lambung Anda dengan porsi makan yang berlebihan.\r\n\r\n- Pertumbuhan Massa Otot Kering & Padat: Formula khususnya memastikan kenaikan berat badan didominasi oleh penambahan massa otot yang tebal, berisi, dan proporsional.\r\n\r\n- Pemulihan Fisik Super Cepat: Kandungan asam amino lengkap di dalamnya bekerja aktif mengurangi rasa pegal berlebih pasca-latihan beban intensitas tinggi (DOMS).\r\n\r\n- Kemasan 2 Lbs Praktis (Trial Pack): Sangat pas dijadikan stok mingguan, mudah dibawa bepergian harian, dan ideal bagi pemula yang ingin menguji keandalan formulanya.\r\n\r\n- Kualitas Import Mewah: Tekstur bubuknya super halus, gampang larut di shaker menggunakan air dingin, serta memiliki varian rasa legendaris yang sangat gurih, lezat, dan anti-mual.\r\n\r\n\r\n\r\nCARA PENGGUNAAN & PENYIMPANAN\r\n\r\n- Campurkan takaran saji Anabolic Mass harian (sesuai petunjuk sendok takar scoop pada kemasan) ke dalam 300-400 ml air dingin atau air suhu ruang ke dalam shaker Anda.\r\n\r\n- Shake atau kocok secara cepat hingga bubuk larut merata sempurna, lalu segera habiskan.\r\n\r\n- Konsumsi harian rutin 1-2 kali sehari sehabis latihan beban, di sela-sela jam makan utama harian, atau malam hari sebelum istirahat tidur malam.\r\n\r\n- Perhatian: Jangan diseduh menggunakan air panas agar stabilitas struktur protein matrix dan mikronutrisinya tidak rusak. Simpan kemasan di tempat yang kering, sejuk, dan terhindar dari paparan matahari langsung.\r\n\r\n\r\n\r\nKONTRAINDIKASI\r\n\r\n- TIDAK dianjurkan bagi individu yang memiliki riwayat alergi atau hipersensitivitas parah terhadap susu sapi dan segala produk turunannya (intoleransi laktosa berat).\r\n\r\n- Tidak ditujukan untuk anak-anak di bawah umur, wanita yang sedang hamil, atau ibu dalam masa menyusui tanpa pengawasan medis khusus.\r\n\r\n- Jika Anda memiliki riwayat gangguan fungsi organ dalam khusus (seperti masalah kesehatan ginjal kronis), diskusikan penggunaannya terlebih dahulu dengan dokter.', '/uploads/1786989355587-100060954.jpeg', '/uploads/1786989355625-527674815.jpeg', '/uploads/1786989355638-20760728.jpeg', 4.9, 379, '2026-08-17 17:55:55', '2026-08-17 17:55:55'),
(30, 31, 'https://id.shp.ee/7uoaBZ92', 'Suplemenfactory Official Store', ' Gainer import dari US yang sudah BPOM dan HALAL, mengandung 820 kalori dan 50 gram protein per servingnya.\r\n\r\n\r\n\r\n Manfaat Weight Gainer :\r\n\r\n Membantu Membangun Massa Otot\r\n\r\n Membantu Menaikan Berat Badan\r\n\r\n Mengenyangkan dan Mengurangi Rasa Lapar\r\n\r\n Membantu Memenuhi Kebutuhan Kalori dan Protein Harian\r\n\r\n\r\n\r\n Rasa :\r\n\r\n BPIBulkMuscleXL10,4lbs-Choco / BPOM RI ML 223176003400097 / September 2027\r\n\r\n\r\n\r\n Nutrition Facts Per Servings : \r\n\r\n Servings Per Container : 22\r\n\r\n Serving Size : 4 Scoops (215 Grams)\r\n\r\n Calories : 820 kcal\r\n\r\n Total Fat : 6 g\r\n\r\n Cholesterol : 165 mg\r\n\r\n Sodium : 320 mg\r\n\r\n Total Carbohydrate : 141 g\r\n\r\n Sugars : 9 g\r\n\r\n Protein : 50 g\r\n\r\n BCAA Per Serving : 11 g\r\n\r\n\r\n\r\n Cara Konsumsi :\r\n\r\n 2 Scoop dicampur air dingin/biasa sebanyak 400-500ml. Sebaiknya dikonsumsi waktu pagi dan setelah latihan.', '/uploads/1786989884103-589565168.jpeg', '/uploads/1786989884152-590702178.jpeg', '/uploads/1786989884172-996688365.jpeg', 4.9, 1400, '2026-08-17 18:04:44', '2026-08-17 18:04:44');

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
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `username_16` (`username`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `username_17` (`username`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `username_18` (`username`),
  ADD UNIQUE KEY `email_18` (`email`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `suplemen_details`
--
ALTER TABLE `suplemen_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

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
  ADD CONSTRAINT `favorites_ibfk_67` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_68` FOREIGN KEY (`suplemen_id`) REFERENCES `suplemens` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `suplemen_details`
--
ALTER TABLE `suplemen_details`
  ADD CONSTRAINT `suplemen_details_ibfk_1` FOREIGN KEY (`suplemen_id`) REFERENCES `suplemens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
