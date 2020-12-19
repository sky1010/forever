/************************************
    Author: -
    Date: 20201205 -- FOREVER SQL
*************************************/

-- Database creation
DROP TABLE tbl_user CASCADE;

-- tbl_user
CREATE TABLE tbl_user (
    user_id INT (2) NOT NULL AUTO_INCREMENT,
    user_username VARCHAR (60) UNIQUE,
    user_password VARCHAR (255),
    user_email VARCHAR (30),
    user_address VARCHAR (60),
    user_zip_code INT (5),
    CONSTRAINT tbl_user_user_id_pk PRIMARY KEY (user_id)
);
