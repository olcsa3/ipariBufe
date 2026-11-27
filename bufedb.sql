-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Nov 27. 11:06
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `bufedb`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `breaks`
--

CREATE TABLE `breaks` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `break_id` int(11) NOT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `total_price` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` int(11) NOT NULL,
  `category` varchar(20) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `category`, `stock`, `image_url`) VALUES
(1, 'Nagy bismarck', NULL, 880, 'Édes', 0, NULL),
(2, 'Bismarck', NULL, 630, 'Édes', 0, NULL),
(3, 'Isler', NULL, 680, 'Édes', 0, NULL),
(4, 'Brownie', NULL, 880, 'Édes', 0, NULL),
(5, 'Kókusz kocka', NULL, 680, 'Édes', 0, NULL),
(6, 'Virslis csónak', NULL, 730, 'Húsos, sós', 0, NULL),
(7, 'Sajtos pogácsa', NULL, 630, 'Sós', 0, NULL),
(8, 'Molnárka', NULL, 710, 'Édes', 0, NULL),
(9, 'Csokis croissant', NULL, 680, 'Édes', 0, NULL),
(10, 'Sós kifli', NULL, 430, 'Sós', 0, NULL),
(11, 'Szalámis szendvics', 'Magos zsemlében', 680, 'Húsos, sós', 0, NULL),
(12, 'Rántott húsos szendvics', NULL, 980, 'Húsos, sós', 0, NULL),
(13, 'Szalámis melegszendics', NULL, 780, 'Húsos, sós', 0, NULL),
(14, 'Kakaós csiga', NULL, 680, 'Édes', 0, NULL),
(15, 'Csokis csiga', NULL, 680, 'Édes', 0, NULL),
(16, 'Pizzás csiga', NULL, 630, 'Sós', 0, NULL),
(17, 'Croissant', NULL, 680, 'Édes', 0, NULL),
(18, 'Rántott sajtos szendvics', NULL, 980, 'Sós', 0, NULL),
(19, 'Sonkás melegszendvics', NULL, 780, 'Húsos, sós', 0, NULL),
(20, 'Kolbászos pizzaszelet', NULL, 850, 'Húsos, sós', 0, NULL),
(21, 'Kukoricás pizzaszelet', NULL, 750, 'Húsos, sós', 0, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `class_name` varchar(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `first_name`, `surname`, `email`, `password_hash`, `role_id`, `class_name`, `created_at`) VALUES
(1, 'Dzsordzs', 'Kész', '22c-kesz@ipari.vein.hu', '$2b$10$yHMg2NclmkEqPPN04K37Z.B2BsAbmXerj3hgkAUyYdcGBD.qWpDdu', NULL, NULL, '2026-11-18 09:59:53'),
(2, 'Tamás', 'Hoffer', '22c-hoffer@ipari.vein.hu', '$2b$10$/RdzqtU9/p.e8Nk354ojSOlUkuV7fWWoi4fVcHBGaettWoF0EhCCe', NULL, NULL, '2026-11-18 10:00:43'),
(3, 'Kristóf', 'Tóth', '22c-toth@ipari.vein.hu', '$2b$10$VyHUq2CaDdI5y4u334xqB.gYi1SQ4CjQbhTe4z3RxVtljPuzyJYeG', NULL, NULL, '2026-11-18 10:01:52'),
(4, 'Patrik', 'Pók', '22c-pok@ipari.vein.hu', '$2b$10$7s7YuDodr.rnI02QrI99XOh/kOXVhPc9FgLFHdbfWQ/WJMC038Cqa', NULL, NULL, '2026-11-18 10:24:32'),
(5, 'Olcsa', 'Bankett', '22c-banko@ipari.vein.hu', '$2b$10$doVtIJ5SlTorFY39FZ6uVOdbCbJOoGfd1fpyLcfyC1TXbO/SVUnEq', NULL, NULL, '2026-11-25 11:16:14');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `breaks`
--
ALTER TABLE `breaks`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `break_id` (`break_id`);

--
-- A tábla indexei `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `breaks`
--
ALTER TABLE `breaks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`break_id`) REFERENCES `breaks` (`id`);

--
-- Megkötések a táblához `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
