-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 24, 2025 at 03:28 PM
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
-- Database: `dbtechmix`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('tech@techmix.com|127.0.0.1', 'i:2;', 1739284721),
('tech@techmix.com|127.0.0.1:timer', 'i:1739284721;', 1739284721);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `icon`) VALUES
(1, 'Computadores', 'Desktops, all-in-one e mini PCs', 'Monitor'),
(2, 'Notebooks', 'Notebooks para trabalho, estudo e jogos', 'Laptop'),
(3, 'Hardware', 'Componentes como placas-mãe, processadores e memórias', 'Cpu'),
(4, 'Periféricos', 'Teclados, mouses, headsets e outros acessórios', 'Keyboard'),
(5, 'Armazenamento', 'HDs, SSDs, pen drives e cartões de memória', 'Hard-drive'),
(6, 'Monitores', 'Monitores de diversas polegadas e resoluções', 'Monitor'),
(7, 'Impressoras', 'Impressoras a laser, jato de tinta e multifuncionais', 'Printer'),
(8, 'Redes', 'Roteadores, switches, cabos e adaptadores de rede', 'Wifi'),
(9, 'Smartphones', 'Celulares de diversas marcas e modelos', 'Smartphone'),
(10, 'Games', 'Consoles, jogos, acessórios e cadeiras gamers', 'Gamepad');

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `userId` bigint(20) UNSIGNED DEFAULT NULL,
  `storeId` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `userId`, `storeId`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-02-03 19:08:27', '2025-02-03 19:08:27');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `productId` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `userId`, `productId`, `created_at`, `updated_at`) VALUES
(16, 1, 1, '2025-02-17 15:21:09', '2025-02-17 15:21:09'),
(17, 1, 3, '2025-02-18 04:19:01', '2025-02-18 04:19:01'),
(18, 1, 4, '2025-02-18 04:19:02', '2025-02-18 04:19:02');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `chatId` int(11) NOT NULL,
  `senderId` bigint(20) UNSIGNED NOT NULL,
  `senderType` enum('user','store') NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `chatId`, `senderId`, `senderType`, `message`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'user', 'Olá!! Gostaria de saber que horas a loja fecha hoje', '2025-02-03 23:23:11', '2025-02-03 23:23:11'),
(2, 1, 1, 'store', 'Olá! Informamos que encerraremos nossas atividades no horário habitual hoje, ás 20:00.', '2025-02-04 03:14:11', '2025-02-04 03:14:11');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('barbosajesse419@gmail.com', '$2y$12$l6bUH5H0YSlMhkr8o0KjU.7OkB7px9OsRuL9uVm.JTEXU6NvhKebK', '2025-01-29 15:51:25');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` float NOT NULL,
  `imageURL` varchar(255) NOT NULL,
  `storeId` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `imageURL`, `storeId`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Smartphone 256gb 5g', 'Modelo mais recente com especificações avançadas.', 799.99, '/storage/products/guw1xpXzySvl1EbKPekcWZWWSihHqRZ07vJFDASe.png', 1, 1, '2025-02-04 12:02:55', '2025-02-06 14:26:57'),
(2, 'Fone de Ouvido Sem Fio', 'Fone de ouvido over-ear com cancelamento de ruído.', 199.99, '/storage/products/RXSmRpOsyCels9fCbZlUcH8DYOzScNL87PbHsQRS.jpg', 1, 1, '2025-02-04 12:02:55', '2025-02-05 16:30:49'),
(3, 'Notebook Gamer', 'Notebook de alto desempenho para jogos e trabalho.', 1499.99, '/storage/products/HMFaYfX3USIuPXkMZiX6ZwZMwCA47sNu0E0QdeGY.png', 1, 0, '2025-02-04 12:02:55', '2025-02-05 16:33:08'),
(4, 'Smartwatch Pro', 'Smartwatch à prova d’água com monitoramento fitness.', 299.99, '/storage/products/ya07yd2ouGYiXwHNTNgbaPH0zOQD83ENcMmg6ohc.png', 1, 1, '2025-02-04 12:02:55', '2025-02-05 16:35:28'),
(5, 'Caixa de Som Bluetooth', 'Caixa de som portátil com graves potentes e bateria de 12 horas.', 89.99, '/storage/products/XzjMfaao99WPPhehyRH5QyL6fMQVOyllTyonpJ5K.png', 1, 2, '2025-02-04 12:02:55', '2025-02-05 16:36:44'),
(9, 'Fone de Ouvido Wireless', 'Fone de ouvido com microfone e led', 255.99, '/storage/products/92Dg15RVPbrR0assDjGtU4GvrXsaXSYGAtCvMI5B.png', 1, 1, '2025-02-05 16:41:21', '2025-02-05 16:41:53');

-- --------------------------------------------------------

--
-- Table structure for table `remember_tokens`
--

CREATE TABLE `remember_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `stars` int(11) NOT NULL DEFAULT 5,
  `message` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `userId`, `productId`, `stars`, `message`, `created_at`) VALUES
(1, 1, 2, 5, 'Fone muito bom, qualidade sensacional', '2025-02-03 17:09:10'),
(2, 1, 2, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id diam vitae augue varius venenatis et sit amet tortor. Pellentesque sit amet nulla non nisi tempus iaculis', '2025-02-03 17:09:10');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('2NMXhvPGEXVJgT4K5faVI8Zlgu8nhLTPJ6t4hl4g', 1, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiWThyYUZGOGRmNElSVG9uVHdNOEVlVG5Tc3dsU3U0d1hQWHJzclV4OSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYXNoYm9hcmQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1739878382),
('CE9SbX1eUtmtD8tdXlG257ABd2IVfi9DM4p58Tis', 1, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoid0Y0WXVZTEhJZzg2SmtvaVpETDRTU1dPbVRmZ1p5Yk5GbUNSanZPZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYXNoYm9hcmQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM6InVybCI7YTowOnt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1739842746),
('XbWLpAhXpL11cGCgQg1HuzAmwrYP9uy1Y1jRqHhw', 1, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZklpYXYzTTlIRWtXd0xleGZzUzZTd1hyS0h3R0twS2ZOdmdtQWhmdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1739889781);

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `cnpj` char(18) NOT NULL,
  `imageURL` varchar(255) DEFAULT NULL,
  `street` varchar(255) NOT NULL,
  `number` varchar(10) NOT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `neighborhood` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(2) NOT NULL,
  `postalCode` varchar(10) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `remember_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `name`, `email`, `password`, `description`, `cnpj`, `imageURL`, `street`, `number`, `complement`, `neighborhood`, `city`, `state`, `postalCode`, `status`, `created_at`, `updated_at`, `remember_token`) VALUES
(1, 'TechMix', 'techmix@techmix.com', '$2y$12$r8Y8UDbZpeyVYprf70vWVevmLlYxhz6nBOKJDgIghADq5b5GW9zIO', 'Olá!! Esta é a loja oficial da TechMix', '00.000.000/0000-00', '/storage/stores/cRRpQmsceAP12zbAb06pDi1HmoJsR9Eb1LkQWzNc.png', 'Avenida Paulista', '1234', 'Conjunto 45', 'Bela Vista', 'São Paulo', 'SP', '01311-200', 1, '2025-01-27 19:24:19', '2025-02-06 23:39:40', 'Ux9hi5ofzmmmTUsfhRSolSIDLehHNM4LZVnW8QCM5sSJWkeu5KSOmNEgnJ1u'),
(2, 'PointTech', 'pointtechoficial@gmail.com', '$2y$12$bPJY/rZVSoKzkT00gZwE5.lzrxKE2no1pH9rwDwEon5343t.xBhCK', NULL, '00.000.000/0000-00', NULL, 'Avenida Paulista', '12345', NULL, 'Bela Vista', 'São Paulo', 'SP', '01311200', 1, '2025-02-06 17:07:08', '2025-02-06 17:07:08', 'wUJSLAAoQeEg3BhbtkNtUkoVYY5cPAtD4ZXFzOGRDlS2AzyI9ak7ULt4eMas');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `imageURL` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `imageURL`, `created_at`, `updated_at`) VALUES
(1, 'Jessé Barbosa Moreira', 'barbosajesse419@gmail.com', '$2y$12$LVomNzAjVk20AlnpFNtrQuQZ3rg1X9OzpG.2XOFkdgxK8nInba/nm', NULL, '2025-01-23 17:19:11', '2025-01-23 17:19:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`,`storeId`),
  ADD KEY `chats_ibfk_1` (`storeId`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chatId` (`chatId`),
  ADD KEY `senderId` (`senderId`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `remember_tokens`
--
ALTER TABLE `remember_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `remember_tokens`
--
ALTER TABLE `remember_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`storeId`) REFERENCES `stores` (`id`),
  ADD CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chatId`) REFERENCES `chats` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`senderId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `remember_tokens`
--
ALTER TABLE `remember_tokens`
  ADD CONSTRAINT `remember_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
