-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2020 at 11:41 AM
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
  `cart_qoh` int(2) DEFAULT NULL,
  `cart_product_qoh` int(2) DEFAULT NULL,
  `user_id` int(2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_orders`
--

CREATE TABLE `tbl_orders` (
  `order_id` int(2) NOT NULL,
  `o_sub_total` decimal(10,2) DEFAULT NULL,
  `o_tax` int(2) DEFAULT NULL,
  `o_shipping` varchar(255) DEFAULT NULL,
  `o_methpayment` varchar(255) DEFAULT NULL,
  `o_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order_line`
--

CREATE TABLE `tbl_order_line` (
  `product_id` int(2) DEFAULT NULL,
  `order_id` int(2) DEFAULT NULL,
  `ol_quantity` int(3) DEFAULT NULL,
  `ol_postal_code` int(5) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
  `cat_id` int(2) DEFAULT NULL,
  `cart_id` int(2) DEFAULT NULL
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
  `account_status` varchar(10) DEFAULT NULL,
  `avatar` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `username`, `password`, `email_address`, `account_status`, `avatar`, `role`) VALUES
(25, 'pills', 'YASHveer2510#', 'pills@gmail.com', 'inactive', '../uploads/users_avatar/default_avatar.jpg', 'client'),
(26, 'sky', 'YASHveer2510#', 'skyrider2531@gmail.cpm', 'active', '../uploads/users_avatar/default_avatar.jpg', 'admin'),
(27, 'beast', 'YASHveer2510#', 'beast@gmail.com', 'active', '../uploads/users_avatar/default_avatar.jpg', 'client');

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
-- Indexes for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `tbl_orders_order_user_id_fk` (`user_id`);

--
-- Indexes for table `tbl_order_line`
--
ALTER TABLE `tbl_order_line`
  ADD KEY `tbl_order_line_product_id_fk` (`product_id`),
  ADD KEY `tbl_order_line_order_id_fk` (`order_id`);

--
-- Indexes for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `tbl_product_cat_id_fk` (`cat_id`),
  ADD KEY `tbl_product_cart_id_fk` (`cart_id`);

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
  MODIFY `cart_id` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `cat_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  MODIFY `inventory_id` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  MODIFY `order_id` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_product`
--
ALTER TABLE `tbl_product`
  MODIFY `product_id` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
