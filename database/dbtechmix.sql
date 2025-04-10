-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 10, 2025 at 12:30 PM
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
(10, 'Games', 'Consoles, jogos, acessórios e cadeiras gamers', 'Gamepad'),
(11, 'Áudio', 'Caixas de som, suportes de áudio, Microfone', 'Headphones'),
(12, 'Outros', 'Produtos mais específicos', 'Category');

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
(1, 1, 1, '2025-02-03 19:08:27', '2025-02-03 19:08:27'),
(3, 1, 4, '2025-04-10 02:33:46', '2025-04-10 02:33:46');

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
(17, 1, 3, '2025-02-18 04:19:01', '2025-02-18 04:19:01'),
(18, 1, 4, '2025-02-18 04:19:02', '2025-02-18 04:19:02'),
(23, 1, 2, '2025-03-25 13:35:31', '2025-03-25 13:35:31');

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
(2, 1, 1, 'store', 'Olá! Informamos que encerraremos nossas atividades no horário habitual hoje, ás 20:00.', '2025-02-04 03:14:11', '2025-02-04 03:14:11'),
(26, 1, 1, 'user', 'Boa noite, posso visitar a loja amanhã às 7:00hrs?', '2025-04-09 02:12:13', '2025-04-09 02:12:13'),
(27, 1, 1, 'store', 'Perfeito Jessé! Vamos preparar tudo antes das 7:00.', '2025-04-09 02:18:27', '2025-04-09 02:18:27'),
(28, 1, 1, 'user', 'Ok, obrigado!', '2025-04-09 02:25:34', '2025-04-09 02:25:34'),
(29, 1, 1, 'store', 'De nada! Tenha uma boa noite, Jessé!', '2025-04-09 02:25:51', '2025-04-09 02:25:51');

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
  `categoryId` int(11) NOT NULL,
  `storeId` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `imageURL`, `categoryId`, `storeId`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Smartphone 256gb 5g', 'Modelo mais recente com especificações avançadas.', 799.99, '/storage/products/guw1xpXzySvl1EbKPekcWZWWSihHqRZ07vJFDASe.png', 9, 1, 1, '2025-02-04 12:02:55', '2025-03-06 17:34:58'),
(2, 'Fone de Ouvido Sem Fio', 'Fone de ouvido over-ear com cancelamento de ruído.', 199.99, '/storage/products/RXSmRpOsyCels9fCbZlUcH8DYOzScNL87PbHsQRS.jpg', 11, 1, 1, '2025-02-04 12:02:55', '2025-03-06 17:33:42'),
(3, 'Notebook Office', 'Notebook de alto desempenho para trabalho e jogos.', 1499.99, '/storage/products/HMFaYfX3USIuPXkMZiX6ZwZMwCA47sNu0E0QdeGY.png', 2, 1, 0, '2025-02-04 12:02:55', '2025-04-10 13:08:35'),
(4, 'Smartwatch Pro', 'Smartwatch à prova d’água com monitoramento fitness.', 299.99, '/storage/products/ya07yd2ouGYiXwHNTNgbaPH0zOQD83ENcMmg6ohc.png', 9, 1, 1, '2025-02-04 12:02:55', '2025-02-28 23:15:22'),
(5, 'Caixa de Som Bluetooth', 'Caixa de som portátil com graves potentes e bateria de 12 horas.', 89.99, '/storage/products/XzjMfaao99WPPhehyRH5QyL6fMQVOyllTyonpJ5K.png', 11, 1, 2, '2025-02-04 12:02:55', '2025-02-28 23:15:29'),
(6, 'Fone de Ouvido Wireless', 'Fone de ouvido com microfone e led', 255.99, '/storage/products/92Dg15RVPbrR0assDjGtU4GvrXsaXSYGAtCvMI5B.png', 11, 1, 1, '2025-02-05 16:41:21', '2025-04-09 10:40:14'),
(9, 'Desktop Gamer RGB', 'PC gamer com iluminação RGB, processador de alta velocidade e placa de vídeo dedicada.', 2499.99, '/storage/products/Dqa2xzx8zsyugPknVoDs78kLSVe13DSM2SAOFoUq.jpg', 1, 5, 1, '2025-02-10 13:40:00', '2025-04-09 15:18:42'),
(12, 'Mini PC 4K', 'Computador compacto com suporte a vídeo 4K e conectividade Wi-Fi 6.', 799.99, '/storage/products/nRFnm9XfJu8r1wgRIUtemd3hd1OcsyJ7E8YyjiKq.jpg', 1, 7, 1, '2025-02-10 13:55:00', '2025-04-09 16:49:32'),
(14, 'Notebook Gamer 15.6\"', 'Notebook para jogos com placa gráfica dedicada e teclado RGB customizável.', 1899.99, '/storage/products/WrarMqe8zE7X6P9rNWPbIJCGuVGjWfsviBA7PAKM.jpg', 2, 5, 1, '2025-02-10 14:05:00', '2025-04-09 15:19:54'),
(16, 'Notebook Profissional', 'Notebook para uso empresarial com segurança reforçada e processador poderoso.', 1799.99, '/storage/products/YiClyaheAj6B27vwYXrvwW3LZlWpaifNNBHc0aKL.jpg', 2, 6, 1, '2025-02-10 14:15:00', '2025-04-09 16:35:42'),
(18, 'Notebook Premium', 'Notebook de alto padrão com acabamento em alumínio e especificações premium.', 2299.99, '/storage/products/ZVLorgl21RdKeNk3gPOVQmZVQTujW2AqLzfGL8r5.jpg', 2, 4, 1, '2025-02-10 14:25:00', '2025-04-09 15:04:00'),
(19, 'Notebook para Criadores', 'Notebook com tela de alta precisão de cores para designers e editores.', 2499.99, '/storage/products/R9ljrDR2OsZdUluAoMSWWYwSnU7d5Qxmrv4aJVvl.jpg', 2, 3, 1, '2025-02-10 14:30:00', '2025-04-09 14:31:04'),
(21, 'Placa Mãe Gaming', 'Placa-mãe com suporte a overclocking e recursos avançados para jogos.', 349.99, '/storage/products/lDDEGIdaHZ8hj43YUMTUOQ0Q2xt0YeWg2CmpVwtc.jpg', 3, 5, 1, '2025-02-10 14:40:00', '2025-04-09 15:20:49'),
(22, 'Memória RAM 16GB', 'Kit de memória RAM de alta velocidade para desempenho otimizado.', 129.99, '/storage/products/0NlBP5rPq3lje4nBbT8CX2gflMnqufH3Yhyg6sTL.jpg', 3, 6, 1, '2025-02-10 14:45:00', '2025-04-09 16:36:17'),
(23, 'Placa de Vídeo 8GB', 'GPU potente para jogos e aplicações gráficas com resfriamento eficiente.', 699.99, '/storage/products/3i4zI8zxVDkVLBlffONu3hx0xZyAgdfdJw8vaZ73.jpg', 3, 5, 1, '2025-02-10 14:50:00', '2025-04-09 15:22:08'),
(25, 'Cooler para Processador', 'Sistema de resfriamento avançado com controle de temperatura inteligente.', 89.99, '/storage/products/QrqiuE6mv1oiqOStrypOvydVZX682iznb5evzZtS.jpg', 3, 3, 1, '2025-02-10 15:00:00', '2025-04-09 14:35:07'),
(28, 'Mouse Gamer RGB', 'Mouse com sensor ótico preciso e iluminação RGB personalizável.', 79.99, '/storage/products/bQGDv0TpiUVliR3BbRkrYwNp6CniQWNuExneHYHR.jpg', 4, 5, 1, '2025-02-10 15:15:00', '2025-04-09 15:24:32'),
(29, 'Teclado Mecânico', 'Teclado com switches mecânicos para digitação precisa e responsiva.', 149.99, '/storage/products/Pu2vNerul70ynmMsa3M8ab790JJYGjTxBp5DGG8y.jpg', 4, 1, 1, '2025-02-10 15:20:00', '2025-04-09 14:02:46'),
(30, 'Headset 7.1 Surround', 'Headset com som surround virtual 7.1 e microfone com cancelamento de ruído.', 129.99, '/storage/products/m8owalTKuadZrbQC7sk3T1E623KHDHW4fnK9Y5cp.jpg', 4, 5, 1, '2025-02-10 15:25:00', '2025-04-09 15:24:53'),
(31, 'Webcam HD', 'Webcam com resolução 1080p e microfone embutido para videoconferências.', 89.99, '/storage/products/widugSQoJN2P6jVvRVjH643AFJavFc3gEvjuffKW.jpg', 4, 4, 1, '2025-02-10 15:30:00', '2025-04-09 15:05:11'),
(34, 'Suporte para Monitor', 'Suporte ergonômico ajustável para melhor posicionamento do monitor.', 59.99, '/storage/products/jg5kPaQjwQurQApcyc4PVTXq9bMCssgSAz826iGo.jpg', 4, 7, 1, '2025-02-10 15:45:00', '2025-04-09 16:55:11'),
(35, 'Teclado sem Fio', 'Teclado compacto sem fio com bateria de longa duração.', 69.99, '/storage/products/QyDoEkt0FqnAqPBCkIbMvS7fIV7b7FxbTuWPFztI.jpg', 4, 6, 1, '2025-02-10 15:50:00', '2025-04-09 16:36:58'),
(36, 'Controle Bluetooth', 'Controle bluetooth compatível com múltiplas plataformas.', 79.99, '/storage/products/VdNjc2wDeKhAweief8vcx7ySpKUQ4P3RJE1oSn6i.jpg', 4, 5, 1, '2025-02-10 15:55:00', '2025-04-09 15:32:33'),
(37, 'Mesa Digitalizadora', 'Mesa digitalizadora para designers e ilustradores com caneta sensível à pressão.', 199.99, '/storage/products/fJhqWjONT5BWk3u08xYqZT5GHaSRSGG3bMGJj6gD.jpg', 4, 3, 1, '2025-02-10 16:00:00', '2025-04-09 14:40:09'),
(38, 'SSD 1TB', 'Unidade de estado sólido com alto desempenho para armazenamento rápido.', 149.99, '/storage/products/Gg94UxOwJzWME29rwlVKLplEcqNRMELYGYwgUEyT.jpg', 5, 1, 1, '2025-02-10 16:05:00', '2025-04-09 14:05:37'),
(40, 'Pen Drive 128GB', 'Dispositivo USB compacto para transporte fácil de arquivos.', 39.99, '/storage/products/8gMzLDEqAelgco5tZzhjf3QL2mJQBGLjUQyCzrdP.png', 5, 7, 1, '2025-02-10 16:15:00', '2025-04-09 16:57:24'),
(41, 'SSD NVMe 500GB', 'SSD ultra-rápido com interface PCIe para desempenho extremo.', 119.99, '/storage/products/xLH6w3E8EEeHBzdbzXBXQNwNb7i7BtzRJtUb4TR1.jpg', 5, 6, 1, '2025-02-10 16:20:00', '2025-04-09 16:38:14'),
(43, 'HD Interno 2TB', 'Disco rígido tradicional com grande capacidade de armazenamento.', 89.99, '/storage/products/l95jzXg3ZR1L03PIQZM8Cx5WPH1JcIbMLM1q0ZwX.jpg', 5, 7, 1, '2025-02-10 16:30:00', '2025-04-09 16:57:48'),
(49, 'Monitor Ultrawide', 'Monitor ultralargo para multitarefas e produtividade avançada.', 499.99, '/storage/products/EkVkVNjdbgqr5VzHRsvdVsmKSJFSH5BUilF4MhJB.jpg', 6, 3, 1, '2025-02-10 17:00:00', '2025-04-09 14:44:15'),
(51, 'Monitor Portátil 15.6\"', 'Monitor secundário portátil com conexão USB-C para uso em movimento.', 199.99, '/storage/products/kkLg0rO70BIMkdT2eCfasY2aVElxm1lcbqg4VWA6.jpg', 6, 1, 1, '2025-02-10 17:10:00', '2025-04-09 14:07:35'),
(52, 'Monitor Touchscreen', 'Monitor com tela sensível ao toque para interação direta.', 449.99, '/storage/products/0NNxzY09npAfHLUZmq7RJ1kuONOZ6a5JTJXAVhWg.jpg', 6, 7, 1, '2025-02-10 17:15:00', '2025-04-09 16:58:20'),
(55, 'Impressora Fotográfica', 'Impressora especializada para fotos de alta qualidade.', 279.99, '/storage/products/aN1JarJKH6Ti4kYdQi8F5xoqDdF32uz10kGWdOcM.jpg', 7, 4, 1, '2025-02-10 17:30:00', '2025-04-09 15:07:11'),
(56, 'Impressora 3D', 'Impressora para criação de objetos tridimensionais em plástico.', 699.99, '/storage/products/hivkauIhLpcmmuoAC0bQqWCNSlrrJ1uGVKoHZA0H.jpg', 7, 3, 1, '2025-02-10 17:35:00', '2025-04-09 14:46:19'),
(57, 'Multifuncional Laser', 'Equipamento multifuncional com tecnologia laser para escritórios.', 499.99, '/storage/products/VPCAXUmd6YLFXqtyi55WeQogStNp1FnT9gkOEQHv.png', 7, 7, 1, '2025-02-10 17:40:00', '2025-04-09 16:59:34'),
(59, 'Roteador Wi-Fi 6', 'Roteador de última geração com cobertura ampla e velocidades elevadas.', 149.99, '/storage/products/lAXA25kxAs8KTEg607zz1SkgQtv1QNJeGRsZYZ3e.jpg', 8, 1, 1, '2025-02-10 17:50:00', '2025-04-09 14:08:05'),
(61, 'Sistema Mesh Wi-Fi', 'Kit com 3 pontos para cobertura Wi-Fi em toda a casa sem pontos cegos.', 299.99, '/storage/products/BD4KplZVl5PXGPFHg6t9ySw2Kx6VyAPzTf6LYAhz.jpg', 8, 4, 1, '2025-02-10 18:00:00', '2025-04-09 15:08:37'),
(62, 'Adaptador USB Wi-Fi', 'Adaptador para adicionar conectividade Wi-Fi a dispositivos desktop.', 39.99, '/storage/products/QE8eLHwqjeXwdl8KcHmSc88X9TN9gdB3UYJc6HdY.jpg', 8, 6, 1, '2025-02-10 18:05:00', '2025-04-09 16:40:37'),
(63, 'Cabo Ethernet 3m', 'Cabo de rede Cat 6 para conexões estáveis e de alta velocidade.', 12.99, '/storage/products/0FbLBwhLPevj1QMAD0hF8kXRKyLNpFyWYx7CdlUx.jpg', 8, 3, 1, '2025-02-10 18:10:00', '2025-04-09 14:47:05'),
(66, 'Smartphone Premium', 'Smartphone topo de linha com câmeras avançadas e processador potente.', 1299.99, '/storage/products/ZdBtfdyCzX32HxmGMKoGIsdi3zyjDRc27tSC2zet.jpg', 9, 4, 1, '2025-02-10 18:25:00', '2025-04-09 15:09:18'),
(67, 'Smartphone Intermediário', 'Smartphone com ótimo custo-benefício e bom desempenho geral.', 699.99, '/storage/products/sPpCTbGrabCSwmVDTsb5QCGp3ReSEaJf97P7Gtf3.jpg', 9, 6, 1, '2025-02-10 18:30:00', '2025-04-09 16:41:44'),
(69, 'Smartphone Dobrável', 'Smartphone com tecnologia de tela dobrável para maior versatilidade.', 1999.99, '/storage/products/H3fKa3kdf8YIyCZlf5m2WYLzuYvWuBsW84GdOX8e.jpg', 9, 4, 1, '2025-02-10 18:40:00', '2025-04-09 15:10:05'),
(70, 'Smartphone Gamer', 'Smartphone otimizado para jogos com sistema de resfriamento avançado.', 1099.99, '/storage/products/fuwicjIMMUW8FJJ2VXdsmSxADjkImMe8gLF2aZ46.jpg', 9, 5, 1, '2025-02-10 18:45:00', '2025-04-09 15:36:20'),
(72, 'Tablet 10\"', 'Tablet versátil para entretenimento e produtividade em movimento.', 499.99, '/storage/products/Kz2cItGBa3UbC4Kc1rMrbL0OmjS6Pj1V6hI9Iu8M.jpg', 9, 1, 1, '2025-02-10 18:55:00', '2025-04-09 14:09:38'),
(73, 'Smartwatch Fitness', 'Relógio inteligente com foco em monitoramento de saúde e exercícios.', 199.99, '/storage/products/nrzLJ88nkLl9QbfSjmhFDi2HWOA8zdiNw3fOLeIT.jpg', 9, 6, 1, '2025-02-10 19:00:00', '2025-04-09 16:42:31'),
(75, 'Controle para Console', 'Controle adicional com bateria recarregável e conexão sem fio.', 89.99, '/storage/products/mnGxUGJqrLXDRQTligJ1OOFV9IQAhVzTwf84kWyR.jpg', 10, 5, 1, '2025-02-10 19:10:00', '2025-04-09 15:38:44'),
(77, 'Console Portátil', 'Console portátil para jogar em qualquer lugar com tela HD.', 349.99, '/storage/products/eX124dXU7sGLlRC86jVgweRBtICs806H35m6X1CY.jpg', 10, 4, 1, '2025-02-10 19:20:00', '2025-04-09 15:10:38'),
(79, 'Volante para Simulação', 'Volante e pedais para simuladores de corrida realistas.', 249.99, '/storage/products/SBPmf7umTik9LRzXsfmGd2T5RFytSM34wPck6plQ.jpg', 10, 3, 1, '2025-02-10 19:25:00', '2025-04-09 14:52:01'),
(80, 'Óculos VR', 'Óculos de realidade virtual para experiências imersivas de jogo.', 499.99, '/storage/products/vyDhRYjx5Gzx1HcoMf94NBGztK0oIml0XGn6MPfd.jpg', 10, 5, 1, '2025-02-10 19:30:00', '2025-04-09 15:39:51'),
(83, 'Console Retrô', 'Console com jogos clássicos pré-instalados para nostalgia dos anos 80 e 90.', 149.99, '/storage/products/97QKTtzJZMvh66wkruqLq0vEjXeD6pK9tHYVlpQ1.jpg', 10, 7, 1, '2025-02-10 19:45:00', '2025-04-09 17:02:51'),
(84, 'Soundbar 2.1', 'Soundbar com subwoofer para melhorar o áudio da sua TV.', 249.99, '/storage/products/AZjhxeEel6M2KgnwdXU5ARpw90ROMe5wpqQ8EX2R.jpg', 11, 3, 1, '2025-02-10 19:50:00', '2025-04-09 14:52:38'),
(85, 'Caixa de Som Bluetooth Portátil', 'Caixa de som compacta com bateria de longa duração e resistente à água.', 99.99, '/storage/products/b5t0XPkWtpus0yHIxUnGA4y1RjIDjXoSxcEZUPBW.jpg', 11, 1, 1, '2025-02-10 19:55:00', '2025-04-09 14:10:14'),
(86, 'Fone de Ouvido Profissional', 'Fone de ouvido com qualidade de estúdio para músicos e produtores.', 179.99, '/storage/products/27TrCh8dZwhC177Ql3KvAmtio7aoIcDbXlDBJAiW.jpg', 11, 6, 1, '2025-02-10 20:00:00', '2025-04-09 16:43:14'),
(87, 'Microfone Condensador', 'Microfone de alta qualidade para gravações e streaming.', 149.99, '/storage/products/GWAfV24eMFJtqFdhgAYPRusJ5txlVbYzGlU0eh8R.jpg', 11, 4, 1, '2025-02-10 20:05:00', '2025-04-09 15:13:08'),
(88, 'Sistema de Som 5.1', 'Sistema de áudio surround completo para home theater.', 499.99, '/storage/products/yvAH7X0tu0P0oRM1f5yl5lC5o3SuQmGaqoA02Kgv.png', 11, 7, 1, '2025-02-10 20:10:00', '2025-04-09 17:04:27'),
(92, 'Câmera de Segurança Wi-Fi', 'Câmera inteligente para monitoramento remoto via smartphone.', 129.99, '/storage/products/WJGt9wNJ8SNRfofxwiPf9y2n9iLr9XVq8unNjkZ6.jpg', 12, 7, 1, '2025-02-10 20:30:00', '2025-04-09 14:05:29'),
(94, 'Câmera DSLR', 'Câmera digital profissional para fotografia de alta qualidade.', 899.99, '/storage/products/UfDyXzr7qgj4hZyIEN18meJtiAbyJb5TVSqRAXDE.jpg', 12, 3, 1, '2025-02-10 20:40:00', '2025-04-09 11:56:39'),
(95, 'Smart TV 50\"', 'Televisor inteligente com resolução 4K e múltiplas conexões.', 699.99, '/storage/products/YBySV3ePfJF9sKl08Dj6fwpcAdLITWKDDDHDtQZu.jpg', 12, 6, 1, '2025-02-10 20:45:00', '2025-04-09 13:46:28'),
(96, 'Drone com Câmera', 'Drone para captura de vídeos e fotos aéreas com estabilização.', 499.99, '/storage/products/Fp9o1dVgRxayuAHyOV1Yflh0NFzTFXPVYAaaemps.jpg', 12, 5, 1, '2025-02-10 20:50:00', '2025-04-09 12:41:12'),
(99, 'Leitor de eBooks', 'Dispositivo com tela e-ink para leitura confortável e bateria de longa duração.', 179.99, '/storage/products/uMs1NRYHBfdBdOH4qn6G20ds5cj1Wrn63IHFxsuy.png', 12, 7, 1, '2025-02-10 21:05:00', '2025-04-09 14:06:48'),
(100, 'Relógio Inteligente Premium', 'Smartwatch com monitoramento de saúde avançado e design premium.', 349.99, '/storage/products/aOdCKx5Lm8zuqELFoqy7rxlIUKluneWYKXNmM0sd.jpg', 9, 3, 1, '2025-02-10 21:10:00', '2025-04-09 14:58:12'),
(101, 'Câmera de Ação', 'Câmera resistente à água para capturar aventuras e esportes radicais.', 249.99, '/storage/products/zoxxERkfOjPVfXAreew38pJv9gzU4n6kyxwESqp6.jpg', 12, 5, 1, '2025-02-10 21:15:00', '2025-04-09 12:43:05'),
(102, 'Purificador de Ar Smart', 'Purificador de ar com controle via aplicativo e monitoramento de qualidade.', 299.99, '/storage/products/D1gnqJ5qUVk6HlPjIJV0SnDEWmq0eAEXRZQav5qS.jpg', 12, 6, 1, '2025-02-10 21:20:00', '2025-04-09 13:47:41'),
(105, 'Carregador Portátil 20000mAh', 'Power bank de alta capacidade para múltiplos carregamentos de dispositivos.', 79.99, '/storage/products/ySCxBuxam7UoJXO2oEZgSmaAyYNQ7npm58jZgaAs.jpg', 12, 4, 1, '2025-02-10 21:35:00', '2025-04-09 12:17:42');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `userId`, `productId`, `stars`, `message`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 5, 'Fone muito bom, qualidade sensacional', '2025-02-03 17:09:10', '2025-03-18 21:43:46'),
(12, 10, 2, 5, 'Muito resistente, qualidade excelente. 5 estrelas!!', '2025-03-25 13:23:09', '2025-03-25 10:23:09'),
(13, 11, 2, 1, 'Muito ruim', '2025-03-25 13:24:15', '2025-03-25 10:24:15');

-- --------------------------------------------------------

--
-- Table structure for table `search_history`
--

CREATE TABLE `search_history` (
  `id` int(11) NOT NULL,
  `userId` bigint(20) UNSIGNED DEFAULT NULL,
  `searchMessage` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `search_history`
--

INSERT INTO `search_history` (`id`, `userId`, `searchMessage`, `created_at`, `updated_at`) VALUES
(12, 1, 'Smartphone', '2025-02-27 03:52:51', '2025-04-08 14:32:49'),
(13, 1, 'Bluetooth', '2025-02-27 03:53:25', '2025-04-09 04:32:43'),
(16, 1, 'Fone', '2025-02-27 04:14:37', '2025-04-08 15:07:48'),
(17, 1, 'bl', '2025-04-03 14:53:25', '2025-04-03 14:53:25'),
(18, 1, 'blue', '2025-04-03 14:54:24', '2025-04-10 02:26:02'),
(20, 1, 'Smart', '2025-04-03 16:26:53', '2025-04-08 15:07:11'),
(21, 1, 'notebook', '2025-04-04 15:01:56', '2025-04-04 15:14:23'),
(22, 1, 'TechMix', '2025-04-07 15:12:08', '2025-04-08 15:08:35'),
(23, 1, 'Tech', '2025-04-08 13:51:04', '2025-04-08 15:15:23'),
(24, 1, 'tech mix', '2025-04-08 14:30:27', '2025-04-08 14:30:28'),
(25, 1, 'headset', '2025-04-08 15:07:41', '2025-04-08 15:07:42'),
(26, 1, 'Fone de ouvido sem fio', '2025-04-09 13:37:15', '2025-04-09 13:37:15'),
(27, 10, 'Smart', '2025-04-10 02:28:22', '2025-04-10 02:28:37'),
(28, 10, 'Tech', '2025-04-10 02:28:47', '2025-04-10 02:28:47'),
(29, 1, 'S', '2025-04-10 03:31:38', '2025-04-10 03:31:38'),
(31, 10, 's', '2025-04-10 13:29:40', '2025-04-10 13:29:42');

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
('q0ziZjHunJvsyQkzGNdNVJPfEJMiVge2gU0GtiTy', 4, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoidVd5bWFic2c1WGZLYWRqWEF0Y0NPQnFtOE41cVZsTHJVUnZNd21VOSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wcm9kdXRvcyI7fXM6MzoidXJsIjthOjA6e31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTo0O30=', 1744280779);

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
(1, 'TechMix', 'techmix@techmix.com', '$2y$12$r8Y8UDbZpeyVYprf70vWVevmLlYxhz6nBOKJDgIghADq5b5GW9zIO', 'Seja muito bem-vindo à loja oficial da TechMix, somos gratos pela sua escolha! Esperamos que você aproveite e se encante com as novidades que temos a oferecer. Estamos aqui para tornar sua experiência ainda mais especial!', '00.000.000/0000-00', '/storage/stores/cRRpQmsceAP12zbAb06pDi1HmoJsR9Eb1LkQWzNc.png', 'Avenida Paulista', '1234', 'Conjunto 45', 'Bela Vista', 'São Paulo', 'SP', '01311-200', 1, '2025-01-27 19:24:19', '2025-02-06 23:39:40', 'NnBUBeY22wEldOi8xE2106nnS5WUYBdIvJO9kJzMQoND28yG3poww3DbmeYZ'),
(3, 'InfoStore', 'contato@infostore.com.br', '$2y$12$bPJY/rZVSoKzkT00gZwE5.lzrxKE2no1pH9rwDwEon5343t.xBhCK', 'A InfoStore é especialista em equipamentos de informática de alta performance. Contamos com produtos de marcas renomadas e atendimento personalizado para atender todas as suas necessidades tecnológicas.', '12.345.678/0001-90', '/storage/stores/M3Lyk09SarOkxr8dG4PakPc7GqWSAdFm7ZhPKMoa.png', 'Rua da Informação', '456', 'Loja 3', 'Centro', 'Rio de Janeiro', 'RJ', '20031-170', 1, '2025-01-15 17:32:10', '2025-04-09 17:17:30', 'J2lhtOdkINXPJIuP9LqOQAI1IZey2aC6ptnqJzAo6erKCD4cVFuIgHPEhH0o'),
(4, 'Mundo Digital', 'atendimento@mundodigital.com.br', '$2y$12$bPJY/rZVSoKzkT00gZwE5.lzrxKE2no1pH9rwDwEon5343t.xBhCK', 'No Mundo Digital você encontra tudo para o seu universo tecnológico! Desde componentes para montar seu PC até os acessórios mais modernos para seu setup.', '23.456.789/0001-01', '/storage/stores/f1sG75ZSU8CD7IBchbEhoxsFLmbCK55BQnfYJ9VE.jpg', 'Avenida Digital', '789', 'Piso 2, Loja 45', 'Boa Viagem', 'Recife', 'PE', '51021-140', 1, '2025-01-22 12:15:43', '2025-04-10 01:31:05', '520aItX12bhCqFuGRsjFtI7qD6qL5tKdyTTQ34leSNA78o3l1HGOYuZq0dLl'),
(5, 'GamerZone', 'contato@gamerzone.com.br', '$2y$12$bPJY/rZVSoKzkT00gZwE5.lzrxKE2no1pH9rwDwEon5343t.xBhCK', 'A loja preferida dos gamers! Aqui você encontra tudo para elevar seu gameplay: periféricos de alta performance, cadeiras ergonômicas e hardware de última geração.', '34.567.890/0001-12', '/storage/stores/dvGAbhlXZtb5Bd6WbSWykgqqnVCnENwA9QZbfD64.jpg', 'Alameda dos Games', '1010', NULL, 'Vila Gamer', 'Belo Horizonte', 'MG', '30140-060', 1, '2025-02-01 21:22:55', '2025-04-09 17:18:41', 'a7f8zM1FNbrZg62XYPSITVrxNGltKaDWIbhBJAR4pKOAKsTpRcdlqp3Oh5Di'),
(6, 'TechPro', 'vendas@techpro.com.br', '$2y$12$bPJY/rZVSoKzkT00gZwE5.lzrxKE2no1pH9rwDwEon5343t.xBhCK', 'A TechPro é especializada em soluções profissionais para empresas e usuários que buscam alta performance. Oferecemos produtos top de linha com garantia estendida e suporte técnico exclusivo.', '45.678.901/0001-23', '/storage/stores/qkgrLf9hWZiGDklxIjh3GT3WuDABsDzRxJElwaCb.jpg', 'Rua dos Profissionais', '2022', 'Bloco B, Sala 101', 'Alphaville', 'Barueri', 'SP', '06454-050', 1, '2025-01-18 14:42:37', '2025-04-09 18:16:35', 'xm6A4TwGV72ifu0WOGtpTO91upTqpZGr1eZ8ymiBjDfx44ziLoR29kwPKAHO'),
(7, 'TechPoint', 'sac@techpoint.com.br', '$2y$12$bPJY/rZVSoKzkT00gZwE5.lzrxKE2no1pH9rwDwEon5343t.xBhCK', 'Na TechPoint você encontra o melhor custo-benefício em informática. Somos referência em atendimento rápido e produtos de qualidade com os melhores preços do mercado.', '56.789.012/0001-34', '/storage/stores/QpoL9gqV9QnzskJnBdwTsmDL0qk4FmMhi3LNa25X.png', 'Avenida da Computação', '321', NULL, 'Setor Bueno', 'Goiânia', 'GO', '74215-030', 1, '2025-02-05 18:18:29', '2025-04-10 01:55:45', 'TB1bAZTpWOqOtQ2uizJuubDVZpUiFl9vmNrAxKyrbmnEPWFJIRJcQKXfYdlc');

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
(1, 'Jessé Barbosa Moreira', 'barbosajesse419@gmail.com', '$2y$12$LVomNzAjVk20AlnpFNtrQuQZ3rg1X9OzpG.2XOFkdgxK8nInba/nm', NULL, '2025-01-23 17:19:11', '2025-04-09 04:16:33'),
(10, 'João', 'joao@gmail.com', '$2y$12$5EkSBBRyOYMgEGuigzkCUugPpmmFuHNjsfDqZLjvK.12p7F8IMCV.', NULL, '2025-03-25 13:21:33', '2025-03-25 13:21:33'),
(11, 'José', 'josé@gmail.com', '$2y$12$pRwH9ZVc3I02IwQjvfu7RugEEgGtJpcyIH0.FjK3fiZr8.JmHuR.S', NULL, '2025-03-25 13:23:24', '2025-03-25 13:23:24');

-- --------------------------------------------------------

--
-- Table structure for table `visited_products`
--

CREATE TABLE `visited_products` (
  `id` int(11) NOT NULL,
  `userId` bigint(20) UNSIGNED DEFAULT NULL,
  `productId` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visited_products`
--

INSERT INTO `visited_products` (`id`, `userId`, `productId`, `created_at`, `updated_at`) VALUES
(29, 1, 1, '2025-04-08 15:07:11', '2025-04-08 15:07:11'),
(30, 1, 4, '2025-04-08 15:07:18', '2025-04-08 15:07:18'),
(31, 1, 5, '2025-04-08 15:07:30', '2025-04-08 15:08:06'),
(32, 1, 2, '2025-04-08 15:07:50', '2025-04-08 15:14:33');

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_category` (`categoryId`);

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
-- Indexes for table `search_history`
--
ALTER TABLE `search_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`userId`);

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
-- Indexes for table `visited_products`
--
ALTER TABLE `visited_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `remember_tokens`
--
ALTER TABLE `remember_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `search_history`
--
ALTER TABLE `search_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `visited_products`
--
ALTER TABLE `visited_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

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
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `remember_tokens`
--
ALTER TABLE `remember_tokens`
  ADD CONSTRAINT `remember_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `search_history`
--
ALTER TABLE `search_history`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
