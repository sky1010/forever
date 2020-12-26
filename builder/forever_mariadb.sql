-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 27, 2020 at 12:56 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `forever`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cart`
--

CREATE TABLE `tbl_cart` (
  `cart_id` int(2) NOT NULL,
  `user_id` int(2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_cart`
--

INSERT INTO `tbl_cart` (`cart_id`, `user_id`) VALUES
(1, 25),
(10, 47),
(9, 46),
(11, 46),
(12, 46),
(13, 48),
(14, 49);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `cat_id` int(2) NOT NULL,
  `cat_desc` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`cat_id`, `cat_desc`) VALUES
(1, 'Clothing'),
(2, 'Footwear'),
(3, 'Accesories'),
(4, 'Cosmetics');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inventory`
--

CREATE TABLE `tbl_inventory` (
  `inventory_id` int(2) NOT NULL,
  `inv_color` varchar(255) DEFAULT NULL,
  `inv_size` varchar(100) DEFAULT NULL,
  `inv_qoh` int(3) DEFAULT NULL,
  `inv_price` decimal(10,2) DEFAULT NULL,
  `product_id` int(2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_inventory`
--

INSERT INTO `tbl_inventory` (`inventory_id`, `inv_color`, `inv_size`, `inv_qoh`, `inv_price`, `product_id`) VALUES
(12, 'Yellow', 'S', 10, '25.00', 17),
(13, 'White', 'S', 10, '35.00', 18),
(14, 'Yellow', 'S', 20, '36.00', 19),
(15, 'Yellow', 'S', 10, '32.00', 20),
(16, 'Green', 'S', 10, '1475.00', 21),
(17, 'Purple', 'S', 20, '212.00', 22),
(18, 'Yellow', 'S', 20, '1231.00', 23),
(19, 'Purple', 'M', 20, '213.00', 24),
(20, 'Purple', 'S', 20, '113.00', 25);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_paid_product`
--

CREATE TABLE `tbl_paid_product` (
  `cart_id` int(2) NOT NULL,
  `product_id` int(2) NOT NULL,
  `product_price` int(2) NOT NULL,
  `prod_qty` int(2) NOT NULL,
  `prod_status` varchar(120) NOT NULL,
  `date_purchased` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_paid_product`
--

INSERT INTO `tbl_paid_product` (`cart_id`, `product_id`, `product_price`, `prod_qty`, `prod_status`, `date_purchased`) VALUES
(1, 20, 32, 1, 'completed', 'Sun Dec 27 2020 02:43:08 GMT+0400 (Mauritius Standard Time)'),
(1, 21, 1475, 1, 'completed', 'Sun Dec 27 2020 02:43:08 GMT+0400 (Mauritius Standard Time)'),
(1, 24, 213, 1, 'completed', 'Sun Dec 27 2020 02:43:08 GMT+0400 (Mauritius Standard Time)'),
(1, 17, 25, 2, 'completed', 'Sun Dec 27 2020 02:59:43 GMT+0400 (Mauritius Standard Time)'),
(14, 17, 25, 1, 'completed', 'Sun Dec 27 2020 03:41:03 GMT+0400 (Mauritius Standard Time)'),
(14, 21, 1475, 1, 'completed', 'Sun Dec 27 2020 03:41:03 GMT+0400 (Mauritius Standard Time)'),
(14, 20, 32, 1, 'completed', 'Sun Dec 27 2020 03:41:03 GMT+0400 (Mauritius Standard Time)'),
(14, 23, 1231, 1, 'completed', 'Sun Dec 27 2020 03:41:03 GMT+0400 (Mauritius Standard Time)');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment`
--

CREATE TABLE `tbl_payment` (
  `payment_id` int(2) NOT NULL,
  `cart_id` int(2) NOT NULL,
  `payment_date` varchar(255) NOT NULL,
  `payment_amount` int(6) NOT NULL,
  `status` varchar(60) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_payment`
--

INSERT INTO `tbl_payment` (`payment_id`, `cart_id`, `payment_date`, `payment_amount`, `status`) VALUES
(9, 14, 'Sun Dec 27 2020 03:41:03 GMT+0400 (Mauritius Standard Time)', 2763, 'completed'),
(8, 1, 'Sun Dec 27 2020 02:59:43 GMT+0400 (Mauritius Standard Time)', 50, 'completed'),
(7, 1, 'Sun Dec 27 2020 02:43:08 GMT+0400 (Mauritius Standard Time)', 1720, 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

CREATE TABLE `tbl_product` (
  `product_id` int(2) NOT NULL,
  `prod_name` varchar(120) NOT NULL,
  `prod_desc` varchar(255) DEFAULT NULL,
  `prod_tags` varchar(255) DEFAULT NULL,
  `prod_brand` varchar(255) DEFAULT NULL,
  `prod_image` varchar(255) DEFAULT NULL,
  `prod_age_group` varchar(100) DEFAULT NULL,
  `cat_id` int(2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_product`
--

INSERT INTO `tbl_product` (`product_id`, `prod_name`, `prod_desc`, `prod_tags`, `prod_brand`, `prod_image`, `prod_age_group`, `cat_id`) VALUES
(17, 'Foot', 'This is a foot', '{\"prod_name\":\"Foot\",\"prod_brand\":\"Baron\",\"prod_category\":\"Footwear\",\"prod_size\":\"S\",\"prod_color\":\"Yellow\",\"prod_price\":\"25\",\"prod_gender\":\"man\"}', 'Baron', './uploads/products/man-2.jpg', 'man', 2),
(18, 'Purse', 'Pretty purse', '{\"prod_name\":\"Purse\",\"prod_brand\":\"Baron\",\"prod_category\":\"Accesories\",\"prod_color\":\"White\",\"prod_price\":\"35\",\"prod_gender\":\"women\"}', 'Baron', './uploads/products/women-4.jpg', 'women', 3),
(19, 'Hat', 'This is a hat', '{\"prod_name\":\"Hat\",\"prod_brand\":\"Baron\",\"prod_category\":\"Cosmetics\",\"prod_color\":\"Yellow\",\"prod_price\":\"36\",\"prod_gender\":\"kid\"}', 'Baron', './uploads/products/product-5.jpg', 'kid', 4),
(20, 'Jacket', 'Pretty jacket', '{\"prod_name\":\"Jacket\",\"prod_brand\":\"Vincy\",\"prod_category\":\"Clothing\",\"prod_size\":\"S\",\"prod_color\":\"Yellow\",\"prod_price\":\"32\",\"prod_gender\":\"women\"}', 'Vincy', './uploads/products/product-6.jpg', 'women', 1),
(21, 'Product test 1', 'This is a test', '{\"prod_name\":\"Product test 1\",\"prod_brand\":\"Baron\",\"prod_category\":\"Clothing\",\"prod_size\":\"S\",\"prod_color\":\"Green\",\"prod_price\":\"1475\",\"prod_gender\":\"women\"}', 'Baron', './uploads/products/product-3.jpg', 'women', 1),
(22, 'Product test 2', 'This is a test', '{\"prod_name\":\"Product test 2\",\"prod_brand\":\"Baron\",\"prod_category\":\"Accesories\",\"prod_color\":\"Purple\",\"prod_price\":\"212\",\"prod_gender\":\"women\"}', 'Baron', './uploads/products/product-4.jpg', 'women', 3),
(23, 'Product test 3', 'This is a test', '{\"prod_name\":\"Product test 3\",\"prod_brand\":\"Baron\",\"prod_category\":\"Accesories\",\"prod_color\":\"Yellow\",\"prod_price\":\"1231\",\"prod_gender\":\"man\"}', 'Baron', './uploads/products/man-4.jpg', 'man', 3),
(24, 'Product test 4', 'This is a test', '{\"prod_name\":\"Product test 4\",\"prod_brand\":\"Baron\",\"prod_category\":\"Clothing\",\"prod_size\":\"S\",\"prod_color\":\"Purple\",\"prod_price\":\"213\",\"prod_gender\":\"women\"}', 'Baron', './uploads/products/women-2.jpg', 'women', 1),
(25, 'Product test 5', 'This is a test', '{\"prod_name\":\"Product test 5\",\"prod_brand\":\"Baron\",\"prod_category\":\"Clothing\",\"prod_size\":\"S\",\"prod_color\":\"Purple\",\"prod_price\":\"113\",\"prod_gender\":\"women\"}', 'Baron', './uploads/products/women-3.jpg', 'women', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_cart`
--

CREATE TABLE `tbl_product_cart` (
  `cart_id` int(2) NOT NULL,
  `product_id` int(2) NOT NULL,
  `prod_qty` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` int(2) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_address` varchar(100) DEFAULT NULL,
  `firstname` varchar(120) NOT NULL,
  `lastname` varchar(120) NOT NULL,
  `country` varchar(120) NOT NULL,
  `street_address` varchar(120) NOT NULL,
  `postal_code` int(9) NOT NULL,
  `town` varchar(120) DEFAULT NULL,
  `phone_number` int(8) NOT NULL,
  `account_status` varchar(10) DEFAULT NULL,
  `avatar` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `username`, `password`, `email_address`, `firstname`, `lastname`, `country`, `street_address`, `postal_code`, `town`, `phone_number`, `account_status`, `avatar`, `role`) VALUES
(25, 'pills', 'YASHveer2510#', 'pills@gmail.com', 'Pills', 'Panadol', 'Mauritius', 'Royal Road Curepipe', 52000, 'curepipe', 57894121, 'active', '../uploads/users_avatar/default_avatar.jpg', 'client'),
(47, 'test', 'YASHveer2510#', 'test@gmail.com', '', '', '', '', 0, NULL, 0, 'active', '../uploads/users_avatar/default_avatar.jpg', 'client'),
(46, 'sky', 'YASHveer2510#', 'sky@gmail.com', '', '', '', '', 0, NULL, 0, 'active', '../uploads/users_avatar/default_avatar.jpg', 'admin'),
(48, 'wdq', 'YASHveer2510#', 'wdq@Gmail.com', 'awfe', 'wdq', 'Afganistan', 'qwd', 2, '2qdw', 5, 'active', '../uploads/users_avatar/default_avatar.jpg', 'client'),
(49, 'yash', 'YASHveer2510#', 'yashmungur1530@gmail.com', 'Yashveer', 'Mungur', 'Mauritius', 'Royal Road', 40501, 'Flacq', 59072057, 'active', '../uploads/users_avatar/default_avatar.jpg', 'client');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `tbl_cart_user_id_fk` (`user_id`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `tbl_inventory_product_id` (`product_id`);

--
-- Indexes for table `tbl_paid_product`
--
ALTER TABLE `tbl_paid_product`
  ADD PRIMARY KEY (`cart_id`,`product_id`);

--
-- Indexes for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Indexes for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `tbl_product_cat_id_fk` (`cat_id`);

--
-- Indexes for table `tbl_product_cart`
--
ALTER TABLE `tbl_product_cart`
  ADD PRIMARY KEY (`cart_id`,`product_id`),
  ADD KEY `tbl_product_cart_cart_id_fk` (`cart_id`),
  ADD KEY `tbl_product_cart_product_id_fk` (`product_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  MODIFY `cart_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `cat_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  MODIFY `inventory_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  MODIFY `payment_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_product`
--
ALTER TABLE `tbl_product`
  MODIFY `product_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
