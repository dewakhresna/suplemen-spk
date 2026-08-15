-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2026 at 10:00 PM
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

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `createdAt`, `updatedAt`, `suplemen_id`) VALUES
(8, 1, '2026-08-02 17:26:32', '2026-08-02 17:26:32', 1);

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
(1, 'Whey Protein Gold Standard', 850000, 2.5, 85, 9.2),
(3, 'suplemen2', 87000, 2.5, 87, 9.3),
(4, 'Protein OP', 120000, 2, 90, 9.4);

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
(1, 3, 'https://chatgpt.com/', 'Tes', 'tes123', '/uploads/1785202612467-111568179.jpg', '/uploads/1785202624205-417860833.png', '/uploads/1785202634438-546340107.png', 5, 3, '2026-07-28 00:54:55', '2026-07-28 01:37:17'),
(2, 4, 'https://chatgpt.com/', 'Toko Klewer', 'tes', '/uploads/1785690872751-367408255.png', NULL, NULL, 5, 189, '2026-08-02 17:14:32', '2026-08-02 17:14:32'),
(3, 1, 'https://chatgpt.com/', 'Tes5', 'tftyfuy', '/uploads/1785690902302-533671084.png', NULL, NULL, 4.1, 89, '2026-08-02 17:15:03', '2026-08-02 17:15:03');

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
(1, 'tes1', 'tes1', 'tes1@gmail.com', 'dff9e6ea7da1c66b86cfbe709268f6411b40abd06ef24f70c919e36e736a3264484bcf8a746b98d0da0e22f93ef7ba56e91b935dcdd2df93a496f8023db76f4a', 'admin', '/uploads/1785659221468-700539464.jpg', 1, '762485ae6d1181ee574f6648d730d606d957d35fad60eeec843e5c7b24a9ccfd9fe0ab4fc57781484c127e74226a3efadc5e8aad853ee53a82e40442b6cc7246', '2026-05-22 17:40:14', '2026-08-02 09:02:24'),
(2, 'tes2', 'tes2', 'tes2@gmail.com', 'dff9e6ea7da1c66b86cfbe709268f6411b40abd06ef24f70c919e36e736a3264484bcf8a746b98d0da0e22f93ef7ba56e91b935dcdd2df93a496f8023db76f4a', 'user', '/uploads/1785220930805-416276916.jpg', 1, '33e70df3336c53d862995721a6f90d7079a0cd3745d5599626504fb287ba31671e9059dc459e479c02bc5776e4db25a40de4ba505575e56aba8bf7d0c6c801a5', '2026-07-28 02:25:36', '2026-08-11 19:56:43');

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
  ADD UNIQUE KEY `email_12` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `suplemens`
--
ALTER TABLE `suplemens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `suplemen_details`
--
ALTER TABLE `suplemen_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  ADD CONSTRAINT `favorites_ibfk_55` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_56` FOREIGN KEY (`suplemen_id`) REFERENCES `suplemens` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `suplemen_details`
--
ALTER TABLE `suplemen_details`
  ADD CONSTRAINT `suplemen_details_ibfk_1` FOREIGN KEY (`suplemen_id`) REFERENCES `suplemens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
