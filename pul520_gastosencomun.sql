-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 24, 2024 at 12:41 PM
-- Server version: 10.6.19-MariaDB
-- PHP Version: 8.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pul520_gastosencomun`
--

-- --------------------------------------------------------

--
-- Table structure for table `CommonExpenses`
--

CREATE TABLE `CommonExpenses` (
  `id_expense` varchar(13) NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `user_id` varchar(13) DEFAULT NULL,
  `group_id` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `CommonExpenses`
--

INSERT INTO `CommonExpenses` (`id_expense`, `description`, `amount`, `date`, `is_active`, `user_id`, `group_id`) VALUES
('65cd0b73db242', 'test', 123132.00, '2024-02-14 13:50:27', 1, '65c15a898d090', '65cbdc69ef276'),
('65db94d840471', 'A', 4600.00, '2024-02-25 14:28:24', 1, '65db94b109c2b', '65db949d61bd4'),
('65db94e3bf39b', 'A', 2000.00, '2024-02-25 14:28:35', 1, '65db94b9d719f', '65db949d61bd4'),
('66f0a57f64be9', 'Super', 17000.00, '2024-09-22 19:17:19', 1, '66f0a55d6473c', '66f0a54fa4827'),
('66f0a58fa3fe3', 'Pizzas', 12500.00, '2024-09-22 19:17:35', 1, '66f0a56477d55', '66f0a54fa4827'),
('66f0a59a40a0e', 'Nafta', 8000.00, '2024-09-22 19:17:46', 1, '66f0a569dcf9f', '66f0a54fa4827'),
('66f0a7942689a', 'Fernet', 10500.00, '2024-09-22 19:26:12', 1, '66f0a55d6473c', '66f0a774cb99a'),
('66f0a7a427598', 'Birras', 6000.00, '2024-09-22 19:26:28', 1, '66f0a56477d55', '66f0a774cb99a'),
('670d9921e85aa', 'Super', 26700.00, '2024-10-14 18:20:17', 1, '65c15a898d090', '66f0a5da05e12'),
('670d9acd26280', 'Pan', 2000.00, '2024-10-14 18:27:25', 1, '66f0a55d6473c', '66f0a5da05e12'),
('670d9adba598c', 'Chinchus', 6000.00, '2024-10-14 18:27:39', 1, '66f0a55d6473c', '66f0a5da05e12');

-- --------------------------------------------------------

--
-- Table structure for table `Groups`
--

CREATE TABLE `Groups` (
  `id_group` varchar(13) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `password` varchar(255) NOT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT 0,
  `creator_user_id` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Groups`
--

INSERT INTO `Groups` (`id_group`, `name`, `date`, `password`, `is_public`, `creator_user_id`) VALUES
('65c923646a2b4', 'Cataratas', '2024-02-11 14:43:32', '$2y$10$PclYGL0fxYAYBVdPtEIzvu2lRYndKpsD.5CiYcygHY/qZ6rxEcGX2', 0, '65c15a898d090'),
('65cbdc69ef276', 'test', '2024-02-13 16:17:29', '$2y$10$Vi.4N1KxJDb.2lO29NVmO.QpttmxlOQ0yebAp5XAJt5OKCS1TF56C', 1, '65c15a898d090'),
('65db949d61bd4', 'Churros', '2024-02-25 14:27:25', '$2y$10$GJJymY.Vy99JwlDdCpq98uj2HypsoYArkwyBH5nMyUGep9qKufdj2', 1, '65c15a898d090'),
('66f0a54fa4827', 'Tano', '2024-09-22 19:16:31', '$2y$10$zkjsunKr4Wi.e3/f5JoF7eyVkvRuFEtwA07p5dsl3kLFyAlO/K916', 0, '65c15a898d090'),
('66f0a5da05e12', 'Tano', '2024-09-22 19:18:50', '$2y$10$fSJjyto9c8TUQqP/b43SbO7mRU6NQ9NK5QtkIQsisbz.fw56tG7pq', 1, '65c15a898d090'),
('66f0a774cb99a', 'Tano escabio', '2024-09-22 19:25:40', '$2y$10$W2q16rzPkqGSEkb.8qlGy.V6QU.c8eG9XxJdUjn1QT/XIYWGD5ega', 1, '65c15a898d090');

-- --------------------------------------------------------

--
-- Table structure for table `GroupsHistory`
--

CREATE TABLE `GroupsHistory` (
  `id_group_history` varchar(13) NOT NULL,
  `group_id` varchar(13) DEFAULT NULL,
  `action_description` varchar(255) NOT NULL,
  `json_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`json_data`)),
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id_generated` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `GroupsHistory`
--

INSERT INTO `GroupsHistory` (`id_group_history`, `group_id`, `action_description`, `json_data`, `date`, `user_id_generated`) VALUES
('65cbdc28d543d', '65c923646a2b4', 'Cataratas', '{\"users\":[{\"id_user\":\"65c15a898d090\",\"name\":\"Pablo Duarte\",\"email\":\"pablo37942@gmail.com\",\"creator_user_id\":\"65c15a898d090\",\"creator_name\":\"Pablo Duarte\"},{\"id_user\":\"65c9236d452ac\",\"name\":\"Cami\",\"email\":null,\"creator_user_id\":\"65c15a898d090\",\"creator_name\":\"Pablo Duarte\"},{\"id_user\":\"65c923762e9c0\",\"name\":\"Fer\",\"email\":null,\"creator_user_id\":\"65c15a898d090\",\"creator_name\":\"Pablo Duarte\"},{\"id_user\":\"65c9237c45133\",\"name\":\"Shani\",\"email\":null,\"creator_user_id\":\"65c15a898d090\",\"creator_name\":\"Pablo Duarte\"}],\"group\":{\"id_group\":\"65c923646a2b4\",\"name\":\"Cataratas\",\"date\":\"2024-02-11 14:43:32\",\"password\":\"$2y$10$PclYGL0fxYAYBVdPtEIzvu2lRYndKpsD.5CiYcygHY\\/qZ6rxEcGX2\",\"is_public\":\"0\",\"creator_user_id\":\"65c15a898d090\",\"creator_name\":\"Pablo Duarte\"},\"expenses\":[{\"id_expense\":\"65c92897d1c40\",\"description\":\"Nafta\",\"amount\":\"15000.00\",\"date\":\"2024-02-11 15:05:43\",\"is_active\":\"1\",\"user_id\":\"65c9236d452ac\",\"group_id\":\"65c923646a2b4\",\"is_registered\":0,\"name\":\"Cami\"},{\"id_expense\":\"65c9288d79369\",\"description\":\"Nafta\",\"amount\":\"15000.00\",\"date\":\"2024-02-11 15:05:33\",\"is_active\":\"1\",\"user_id\":\"65c15a898d090\",\"group_id\":\"65c923646a2b4\",\"is_registered\":1,\"name\":\"Pablo Duarte\"},{\"id_expense\":\"65c92872e133b\",\"description\":\"Remises\",\"amount\":\"9000.00\",\"date\":\"2024-02-11 15:05:06\",\"is_active\":\"1\",\"user_id\":\"65c15a898d090\",\"group_id\":\"65c923646a2b4\",\"is_registered\":1,\"name\":\"Pablo Duarte\"},{\"id_expense\":\"65c9284d398ed\",\"description\":\"Remis\",\"amount\":\"10000.00\",\"date\":\"2024-02-11 15:04:29\",\"is_active\":\"1\",\"user_id\":\"65c15a898d090\",\"group_id\":\"65c923646a2b4\",\"is_registered\":1,\"name\":\"Pablo Duarte\"},{\"id_expense\":\"65c9281c0eb15\",\"description\":\"Alfajores\",\"amount\":\"1600.00\",\"date\":\"2024-02-11 15:03:40\",\"is_active\":\"1\",\"user_id\":\"65c9236d452ac\",\"group_id\":\"65c923646a2b4\",\"is_registered\":0,\"name\":\"Cami\"},{\"id_expense\":\"65c92810e1e15\",\"description\":\"Alfajores\",\"amount\":\"1600.00\",\"date\":\"2024-02-11 15:03:28\",\"is_active\":\"1\",\"user_id\":\"65c15a898d090\",\"group_id\":\"65c923646a2b4\",\"is_registered\":1,\"name\":\"Pablo Duarte\"},{\"id_expense\":\"65c927fdcaedc\",\"description\":\"Super\",\"amount\":\"10200.00\",\"date\":\"2024-02-11 15:03:09\",\"is_active\":\"1\",\"user_id\":\"65c15a898d090\",\"group_id\":\"65c923646a2b4\",\"is_registered\":1,\"name\":\"Pablo Duarte\"},{\"id_expense\":\"65c927ebc2255\",\"description\":\"Fly park\",\"amount\":\"44000.00\",\"date\":\"2024-02-11 15:02:51\",\"is_active\":\"1\",\"user_id\":\"65c15a898d090\",\"group_id\":\"65c923646a2b4\",\"is_registered\":1,\"name\":\"Pablo Duarte\"},{\"id_expense\":\"65c927df86944\",\"description\":\"Chipa\",\"amount\":\"3200.00\",\"date\":\"2024-02-11 15:02:39\",\"is_active\":\"1\",\"user_id\":\"65c9236d452ac\",\"group_id\":\"65c923646a2b4\",\"is_registered\":0,\"name\":\"Cami\"},{\"id_expense\":\"65c9275ed0dcf\",\"description\":\"Agua\",\"amount\":\"1500.00\",\"date\":\"2024-02-11 15:00:30\",\"is_active\":\"1\",\"user_id\":\"65c9236d452ac\",\"group_id\":\"65c923646a2b4\",\"is_registered\":0,\"name\":\"Cami\"},{\"id_expense\":\"65c9275356756\",\"description\":\"Tragos\",\"amount\":\"9100.00\",\"date\":\"2024-02-11 15:00:19\",\"is_active\":\"1\",\"user_id\":\"65c9236d452ac\",\"group_id\":\"65c923646a2b4\",\"is_registered\":0,\"name\":\"Cami\"},{\"id_expense\":\"65c9274204b82\",\"description\":\"Propina cena\",\"amount\":\"1500.00\",\"date\":\"2024-02-11 15:00:02\",\"is_active\":\"1\",\"user_id\":\"65c15a898d090\",\"group_id\":\"65c923646a2b4\",\"is_registered\":1,\"name\":\"Pablo Duarte\"},{\"id_expense\":\"65c9273808251\",\"description\":\"Cena\",\"amount\":\"37200.00\",\"date\":\"2024-02-11 14:59:52\",\"is_active\":\"1\",\"user_id\":\"65c9236d452ac\",\"group_id\":\"65c923646a2b4\",\"is_registered\":0,\"name\":\"Cami\"},{\"id_expense\":\"65c926af1bc70\",\"description\":\"Gomon\",\"amount\":\"50000.00\",\"date\":\"2024-02-11 14:57:35\",\"is_active\":\"1\",\"user_id\":\"65c9236d452ac\",\"group_id\":\"65c923646a2b4\",\"is_registered\":0,\"name\":\"Cami\"},{\"id_expense\":\"65c926a37c942\",\"description\":\"Gomon\",\"amount\":\"150000.00\",\"date\":\"2024-02-11 14:57:23\",\"is_active\":\"1\",\"user_id\":\"65c15a898d090\",\"group_id\":\"65c923646a2b4\",\"is_registered\":1,\"name\":\"Pablo Duarte\"},{\"id_expense\":\"65c9267f84911\",\"description\":\"Yerba\",\"amount\":\"4000.00\",\"date\":\"2024-02-11 14:56:47\",\"is_active\":\"1\",\"user_id\":\"65c9236d452ac\",\"group_id\":\"65c923646a2b4\",\"is_registered\":0,\"name\":\"Cami\"},{\"id_expense\":\"65c926673a7ca\",\"description\":\"Vuelta brasil\",\"amount\":\"12000.00\",\"date\":\"2024-02-11 14:56:23\",\"is_active\":\"1\",\"user_id\":\"65c9236d452ac\",\"group_id\":\"65c923646a2b4\",\"is_registered\":0,\"name\":\"Cami\"},{\"id_expense\":\"65c9265b45ace\",\"description\":\"Ida brasil\",\"amount\":\"13000.00\",\"date\":\"2024-02-11 14:56:11\",\"is_active\":\"1\",\"user_id\":\"65c15a898d090\",\"group_id\":\"65c923646a2b4\",\"is_registered\":1,\"name\":\"Pablo Duarte\"},{\"id_expense\":\"65c926495ce26\",\"description\":\"Video gomon\",\"amount\":\"5000.00\",\"date\":\"2024-02-11 14:55:53\",\"is_active\":\"1\",\"user_id\":\"65c9236d452ac\",\"group_id\":\"65c923646a2b4\",\"is_registered\":0,\"name\":\"Cami\"},{\"id_expense\":\"65c9263ca1fb4\",\"description\":\"Video gomon\",\"amount\":\"5000.00\",\"date\":\"2024-02-11 14:55:40\",\"is_active\":\"1\",\"user_id\":\"65c15a898d090\",\"group_id\":\"65c923646a2b4\",\"is_registered\":1,\"name\":\"Pablo Duarte\"}],\"groupName\":\"Cataratas\",\"totalExpenses\":397900,\"averageExpense\":99475,\"userDetails\":[{\"userId\":\"65c15a898d090\",\"name\":\"Pablo Duarte\",\"is_registered\":1,\"creator_name\":\"Pablo Duarte\",\"totalExpense\":259300,\"amountPaid\":259300,\"amountOwed\":0,\"amountToReceive\":159825},{\"userId\":\"65c9236d452ac\",\"name\":\"Cami\",\"is_registered\":0,\"creator_name\":\"Pablo Duarte\",\"totalExpense\":138600,\"amountPaid\":138600,\"amountOwed\":0,\"amountToReceive\":39125},{\"userId\":\"65c923762e9c0\",\"name\":\"Fer\",\"is_registered\":0,\"creator_name\":\"Pablo Duarte\",\"totalExpense\":0,\"amountPaid\":0,\"amountOwed\":99475,\"amountToReceive\":0},{\"userId\":\"65c9237c45133\",\"name\":\"Shani\",\"is_registered\":0,\"creator_name\":\"Pablo Duarte\",\"totalExpense\":0,\"amountPaid\":0,\"amountOwed\":99475,\"amountToReceive\":0}],\"status\":200,\"message\":[{\"operation\":\"FER debe pagarle 99475 a PABLO DUARTE\",\"debtor\":\"Fer\",\"creditor\":\"Pablo Duarte\",\"amount\":99475},{\"operation\":\"SHANI debe pagarle 60350 a PABLO DUARTE\",\"debtor\":\"Shani\",\"creditor\":\"Pablo Duarte\",\"amount\":60350},{\"operation\":\"SHANI debe pagarle 39125 a CAMI\",\"debtor\":\"Shani\",\"creditor\":\"Cami\",\"amount\":39125}]}', '2024-02-13 16:16:24', '65c15a898d090'),
('670d9913b6046', '66f0a5da05e12', 'Tano', '{\"users\":[{\"id_user\":\"65c15a898d090\",\"name\":\"Pablo Duarte\",\"email\":\"pablo37942@gmail.com\",\"creator_user_id\":\"65c15a898d090\",\"creator_name\":\"Pablo Duarte\"},{\"id_user\":\"66f0a56477d55\",\"name\":\"Pola\",\"email\":null,\"creator_user_id\":\"65c15a898d090\",\"creator_name\":\"Pablo Duarte\"},{\"id_user\":\"66f0a569dcf9f\",\"name\":\"Chicho\",\"email\":null,\"creator_user_id\":\"65c15a898d090\",\"creator_name\":\"Pablo Duarte\"},{\"id_user\":\"66f0a55d6473c\",\"name\":\"Zulma\",\"email\":null,\"creator_user_id\":\"65c15a898d090\",\"creator_name\":\"Pablo Duarte\"}],\"group\":{\"id_group\":\"66f0a5da05e12\",\"name\":\"Tano\",\"date\":\"2024-09-22 19:18:50\",\"password\":\"$2y$10$fSJjyto9c8TUQqP\\/b43SbO7mRU6NQ9NK5QtkIQsisbz.fw56tG7pq\",\"is_public\":\"1\",\"creator_user_id\":\"65c15a898d090\",\"creator_name\":\"Pablo Duarte\"},\"expenses\":[{\"id_expense\":\"66f0a6474116a\",\"description\":\"Nafta\",\"amount\":\"8000.00\",\"date\":\"2024-09-22 19:20:39\",\"is_active\":\"1\",\"user_id\":\"66f0a569dcf9f\",\"group_id\":\"66f0a5da05e12\",\"is_registered\":0,\"name\":\"Chicho\"},{\"id_expense\":\"66f0a62cd8789\",\"description\":\"Pizzas\",\"amount\":\"12500.00\",\"date\":\"2024-09-22 19:20:12\",\"is_active\":\"1\",\"user_id\":\"66f0a56477d55\",\"group_id\":\"66f0a5da05e12\",\"is_registered\":0,\"name\":\"Pola\"},{\"id_expense\":\"66f0a61fd06af\",\"description\":\"Super\",\"amount\":\"17000.00\",\"date\":\"2024-09-22 19:19:59\",\"is_active\":\"1\",\"user_id\":\"66f0a55d6473c\",\"group_id\":\"66f0a5da05e12\",\"is_registered\":0,\"name\":\"Zulma\"}],\"groupName\":\"Tano\",\"totalExpenses\":37500,\"averageExpense\":9375,\"userDetails\":[{\"userId\":\"65c15a898d090\",\"name\":\"Pablo Duarte\",\"is_registered\":1,\"creator_name\":\"Pablo Duarte\",\"totalExpense\":0,\"amountPaid\":0,\"amountOwed\":9375,\"amountToReceive\":0},{\"userId\":\"66f0a56477d55\",\"name\":\"Pola\",\"is_registered\":0,\"creator_name\":\"Pablo Duarte\",\"totalExpense\":12500,\"amountPaid\":12500,\"amountOwed\":0,\"amountToReceive\":3125},{\"userId\":\"66f0a569dcf9f\",\"name\":\"Chicho\",\"is_registered\":0,\"creator_name\":\"Pablo Duarte\",\"totalExpense\":8000,\"amountPaid\":8000,\"amountOwed\":1375,\"amountToReceive\":0},{\"userId\":\"66f0a55d6473c\",\"name\":\"Zulma\",\"is_registered\":0,\"creator_name\":\"Pablo Duarte\",\"totalExpense\":17000,\"amountPaid\":17000,\"amountOwed\":0,\"amountToReceive\":7625}],\"status\":200,\"message\":[{\"operation\":\"PABLO DUARTE debe pagarle 3125 a POLA\",\"debtor\":\"Pablo Duarte\",\"creditor\":\"Pola\",\"amount\":3125},{\"operation\":\"PABLO DUARTE debe pagarle 6250 a ZULMA\",\"debtor\":\"Pablo Duarte\",\"creditor\":\"Zulma\",\"amount\":6250},{\"operation\":\"CHICHO debe pagarle 1375 a ZULMA\",\"debtor\":\"Chicho\",\"creditor\":\"Zulma\",\"amount\":1375}]}', '2024-10-14 18:20:03', '65c15a898d090');

-- --------------------------------------------------------

--
-- Table structure for table `SessionTokens`
--

CREATE TABLE `SessionTokens` (
  `id_token` varchar(13) NOT NULL,
  `user_id` varchar(13) DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `expiration_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `SessionTokens`
--

INSERT INTO `SessionTokens` (`id_token`, `user_id`, `token`, `expiration_time`) VALUES
('65c2586bb6ac9', '65c15a898d090', 'e49129dfca1e6051673ca4f1f938cc129badee0c0615e7173efff9a6c73cd46c', '2025-02-06 11:03:55'),
('65c25b2f60f23', '65c15a898d090', '7e95bcc8252817b6d40375fb993c3e124e02b9287b89e4cfff096fa2ef5e212e', '2025-02-06 11:15:43'),
('65c92349dfb79', '65c15a898d090', 'e5cc8c91845b21cfc119af48ed887f175e05a88a4ea5de4fc5c97aa1418abcec', '2025-02-11 14:43:05'),
('65cbdd26cf499', '65c15a898d090', '6db554f2fb78e20089dc9ed998d10feb02e3e5a6d7e0cab4f332a1bf3edef7da', '2025-02-13 16:20:38'),
('65cd0b3452569', '65c15a898d090', '94b1353b6a2515e20360fe1dc4b45694e3f93a4217955cb463f34ef2f87604da', '2025-02-14 13:49:24'),
('66f0a536050bf', '65c15a898d090', '26a3bfa1e69f82d82d18df3f07ad308de1c2c46ecc58719aa3becfd0230a612d', '2025-09-22 19:16:06'),
('66f0dfa043c2b', '65c15a898d090', '38649759db1ce5412d98258dd1c2e925be9786e0dcbde9ff5a07cf2962cc7c90', '2025-09-22 23:25:20');

-- --------------------------------------------------------

--
-- Table structure for table `UserGroups`
--

CREATE TABLE `UserGroups` (
  `id_user_group` varchar(13) NOT NULL,
  `user_id` varchar(13) DEFAULT NULL,
  `group_id` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `UserGroups`
--

INSERT INTO `UserGroups` (`id_user_group`, `user_id`, `group_id`) VALUES
('65c923646e2e9', '65c15a898d090', '65c923646a2b4'),
('65c9236d8b565', '65c9236d452ac', '65c923646a2b4'),
('65c9237673114', '65c923762e9c0', '65c923646a2b4'),
('65c9237c8a1d4', '65c9237c45133', '65c923646a2b4'),
('65cbdc69f1c37', '65c15a898d090', '65cbdc69ef276'),
('65db949d6577a', '65c15a898d090', '65db949d61bd4'),
('65db94a5b33e5', '65c9236d452ac', '65db949d61bd4'),
('65db94b14f599', '65db94b109c2b', '65db949d61bd4'),
('65db94ba23df1', '65db94b9d719f', '65db949d61bd4'),
('65db94c2ada04', '65db94c262c62', '65db949d61bd4'),
('65db94c9242e0', '65db94c8d600b', '65db949d61bd4'),
('66f0a54fb672a', '65c15a898d090', '66f0a54fa4827'),
('66f0a55db5a54', '66f0a55d6473c', '66f0a54fa4827'),
('66f0a564c074c', '66f0a56477d55', '66f0a54fa4827'),
('66f0a56a3c3c9', '66f0a569dcf9f', '66f0a54fa4827'),
('66f0a5da0ccd6', '65c15a898d090', '66f0a5da05e12'),
('66f0a5e00db96', '66f0a56477d55', '66f0a5da05e12'),
('66f0a60b17d88', '66f0a569dcf9f', '66f0a5da05e12'),
('66f0a610a801d', '66f0a55d6473c', '66f0a5da05e12'),
('66f0a774d5d00', '65c15a898d090', '66f0a774cb99a'),
('66f0a77a10f04', '66f0a56477d55', '66f0a774cb99a'),
('66f0a782911df', '66f0a55d6473c', '66f0a774cb99a');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id_user` varchar(13) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_registered` tinyint(1) DEFAULT 1,
  `creator_user_id` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id_user`, `name`, `email`, `password`, `is_registered`, `creator_user_id`) VALUES
('65c15a898d090', 'Pablo Duarte', 'pablo37942@gmail.com', '$2y$10$65nph92ocnyq1NnjEgpYu.xkVK4BQ9QKQn/HUvCIsyo8ithml6MuG', 1, '65c15a898d090'),
('65c24179da405', 'user 5', '5@gmail.com', '$2y$10$p1qEIJL3ctrlFUDyfpnSDuQ4kSotT8qGKSs7MB9zAkhK0jMmNhrAG', 1, '65c24179da405'),
('65c9236d452ac', 'Cami', NULL, NULL, 0, '65c15a898d090'),
('65c923762e9c0', 'Fer', NULL, NULL, 0, '65c15a898d090'),
('65c9237c45133', 'Shani', NULL, NULL, 0, '65c15a898d090'),
('65db94b109c2b', 'Romi', NULL, NULL, 0, '65c15a898d090'),
('65db94b9d719f', 'Eva', NULL, NULL, 0, '65c15a898d090'),
('65db94c262c62', 'Toto', NULL, NULL, 0, '65c15a898d090'),
('65db94c8d600b', 'Zulma', NULL, NULL, 0, '65c15a898d090'),
('66f0a55d6473c', 'Zulma', NULL, NULL, 0, '65c15a898d090'),
('66f0a56477d55', 'Pola', NULL, NULL, 0, '65c15a898d090'),
('66f0a569dcf9f', 'Chicho', NULL, NULL, 0, '65c15a898d090');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CommonExpenses`
--
ALTER TABLE `CommonExpenses`
  ADD PRIMARY KEY (`id_expense`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `Groups`
--
ALTER TABLE `Groups`
  ADD PRIMARY KEY (`id_group`),
  ADD KEY `creator_user_id` (`creator_user_id`);

--
-- Indexes for table `GroupsHistory`
--
ALTER TABLE `GroupsHistory`
  ADD PRIMARY KEY (`id_group_history`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `user_id_generated` (`user_id_generated`);

--
-- Indexes for table `SessionTokens`
--
ALTER TABLE `SessionTokens`
  ADD PRIMARY KEY (`id_token`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `UserGroups`
--
ALTER TABLE `UserGroups`
  ADD PRIMARY KEY (`id_user_group`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CommonExpenses`
--
ALTER TABLE `CommonExpenses`
  ADD CONSTRAINT `CommonExpenses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id_user`),
  ADD CONSTRAINT `CommonExpenses_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`id_group`);

--
-- Constraints for table `Groups`
--
ALTER TABLE `Groups`
  ADD CONSTRAINT `Groups_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `Users` (`id_user`);

--
-- Constraints for table `GroupsHistory`
--
ALTER TABLE `GroupsHistory`
  ADD CONSTRAINT `GroupsHistory_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`id_group`),
  ADD CONSTRAINT `GroupsHistory_ibfk_2` FOREIGN KEY (`user_id_generated`) REFERENCES `Users` (`id_user`);

--
-- Constraints for table `SessionTokens`
--
ALTER TABLE `SessionTokens`
  ADD CONSTRAINT `SessionTokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id_user`);

--
-- Constraints for table `UserGroups`
--
ALTER TABLE `UserGroups`
  ADD CONSTRAINT `UserGroups_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id_user`),
  ADD CONSTRAINT `UserGroups_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`id_group`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
