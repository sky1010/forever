-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 19, 2020 at 03:55 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

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

DROP TABLE IF EXISTS `tbl_cart`;
CREATE TABLE IF NOT EXISTS `tbl_cart` (
  `cart_id` int(2) NOT NULL AUTO_INCREMENT,
  `cart_qoh` int(2) DEFAULT NULL,
  `cart_product_qoh` int(2) DEFAULT NULL,
  `user_id` int(2) DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `tbl_cart_user_id_fk` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

DROP TABLE IF EXISTS `tbl_category`;
CREATE TABLE IF NOT EXISTS `tbl_category` (
  `cat_id` int(2) NOT NULL AUTO_INCREMENT,
  `cat_desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_color`
--

DROP TABLE IF EXISTS `tbl_color`;
CREATE TABLE IF NOT EXISTS `tbl_color` (
  `color_id` int(2) NOT NULL AUTO_INCREMENT,
  `color` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`color_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inventory`
--

DROP TABLE IF EXISTS `tbl_inventory`;
CREATE TABLE IF NOT EXISTS `tbl_inventory` (
  `inventory_id` int(2) NOT NULL AUTO_INCREMENT,
  `inv_color` varchar(255) DEFAULT NULL,
  `inv_size` varchar(100) DEFAULT NULL,
  `inv_qoh` int(3) DEFAULT NULL,
  `inv_price` decimal(10,2) DEFAULT NULL,
  `color_id` int(2) DEFAULT NULL,
  `product_id` int(2) DEFAULT NULL,
  PRIMARY KEY (`inventory_id`),
  KEY `tbl_inventory_color_id` (`color_id`),
  KEY `tbl_inventory_product_id` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_orders`
--

DROP TABLE IF EXISTS `tbl_orders`;
CREATE TABLE IF NOT EXISTS `tbl_orders` (
  `order_id` int(2) NOT NULL AUTO_INCREMENT,
  `o_sub_total` decimal(10,2) DEFAULT NULL,
  `o_tax` int(2) DEFAULT NULL,
  `o_shipping` varchar(255) DEFAULT NULL,
  `o_methpayment` varchar(255) DEFAULT NULL,
  `o_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(2) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `tbl_orders_order_user_id_fk` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order_line`
--

DROP TABLE IF EXISTS `tbl_order_line`;
CREATE TABLE IF NOT EXISTS `tbl_order_line` (
  `product_id` int(2) DEFAULT NULL,
  `order_id` int(2) DEFAULT NULL,
  `ol_quantity` int(3) DEFAULT NULL,
  KEY `tbl_order_line_product_id_fk` (`product_id`),
  KEY `tbl_order_line_order_id_fk` (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

DROP TABLE IF EXISTS `tbl_product`;
CREATE TABLE IF NOT EXISTS `tbl_product` (
  `product_id` int(2) NOT NULL AUTO_INCREMENT,
  `prod_desc` varchar(255) DEFAULT NULL,
  `prod_tags` varchar(255) DEFAULT NULL,
  `prod_brand` varchar(255) DEFAULT NULL,
  `prod_image` varchar(255) DEFAULT NULL,
  `cat_id` int(2) DEFAULT NULL,
  `cart_id` int(2) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `tbl_product_cat_id_fk` (`cat_id`),
  KEY `tbl_product_cart_id_fk` (`cart_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `user_id` int(2) NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_address` varchar(100) DEFAULT NULL,
  `phone_number` int(8) DEFAULT NULL,
  `postal_code` int(5) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `age_group` varchar(20) DEFAULT NULL,
  `account_status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
