-- Forever SQL
DROP TABLE tbl_user CASCADE CONSTRAINTS;
DROP TABLE tbl_cart CASCADE CONSTRAINTS;
DROP TABLE tbl_category CASCADE CONSTRAINTS;
DROP TABLE tbl_orders CASCADE CONSTRAINTS;
DROP TABLE tbl_order_line CASCADE CONSTRAINTS;
DROP TABLE tbl_product CASCADE CONSTRAINTS;
DROP TABLE tbl_color CASCADE CONSTRAINTS;
DROP TABLE tbl_inventory CASCADE CONSTRAINTS;

CREATE TABLE tbl_user
(
  user_id NUMBER(2),
  username VARCHAR2 (60) NOT NULL UNIQUE,
  password VARCHAR2 (255) NOT NULL, -- Max length for password hashing
  email_address VARCHAR2 (100),
  account_status VARCHAR2 (10) CHECK ( account_status IN ('active', 'inactive')),
  CONSTRAINT tbl_user_user_id_pk PRIMARY KEY (user_id)
);

CREATE TABLE tbl_cart
(
  cart_id NUMBER (2),
  cart_qoh NUMBER (2),
  cart_product_qoh NUMBER (2),
  user_id NUMBER (2),
  CONSTRAINT tbl_cart_cart_id_pk PRIMARY KEY (cart_id),
  CONSTRAINT tbl_cart_user_id_fk FOREIGN KEY (user_id) REFERENCES tbl_user (user_id)
);

CREATE TABLE tbl_category
(
    cat_id NUMBER (2),
    cat_desc VARCHAR2 (255),
    CONSTRAINT tbl_category_cat_id_pk PRIMARY KEY ( cat_id )
);

CREATE TABLE tbl_product
(
  product_id NUMBER(2),
  prod_desc VARCHAR2 (255),
  prod_tags VARCHAR2 (255),
  prod_brand VARCHAR2 (255),
  prod_image VARCHAR2 (255),
  prod_gender VARCHAR2 (20) CHECK (gender IN ('female', 'male')),
  prod_age_group VARCHAR2 (20) CHECK (age_group IN ('adult', 'child')),
  cat_id NUMBER (2),
  cart_id NUMBER (2),
  CONSTRAINT tbl_product_product_id_pk PRIMARY KEY (product_id),
  CONSTRAINT tbl_product_cat_id_fk FOREIGN KEY (cat_id) REFERENCES tbl_category (cat_id),
  CONSTRAINT tbl_product_cart_id_fk FOREIGN KEY (cart_id) REFERENCES tbl_cart (cart_id)
);

CREATE TABLE tbl_orders
(
  order_id NUMBER (2),
  o_sub_total NUMBER (10, 2),
  o_tax NUMBER (2),
  o_shipping VARCHAR2 (255),
  o_methpayment VARCHAR2 (255) CHECK ( o_methpayment IN  ('CC', 'DB', 'VC', 'MC')),
  o_date DATE DEFAULT SYSDATE,
  user_id NUMBER (2),
  CONSTRAINT tbl_orders_order_id_pk PRIMARY KEY (order_id),
  CONSTRAINT tbl_orders_order_user_id_fk FOREIGN KEY (user_id) REFERENCES tbl_user ( user_id )
);

CREATE TABLE tbl_order_line
(
  product_id NUMBER (2),
  order_id NUMBER (2),
  ol_postal_code  NUMBER(5), -- Maurtius postal code format
  ol_quantity NUMBER (3),
  CONSTRAINT tbl_order_line_product_id_fk FOREIGN KEY (product_id) REFERENCES tbl_product ( product_id ),
  CONSTRAINT tbl_order_line_order_id_fk FOREIGN KEY (order_id) REFERENCES tbl_orders ( order_id )
);

CREATE TABLE tbl_color
(
  color_id NUMBER (2),
  color VARCHAR2 (10),
  CONSTRAINT tbl_color_color_id_pk PRIMARY KEY ( color_id )
);

CREATE TABLE tbl_inventory
(
  inventory_id NUMBER (2),
  inv_color VARCHAR2 (255),
  inv_size VARCHAR2 (100) CHECK ( inv_size IN ('S', 'L', 'M')),
  inv_qoh NUMBER (3),
  inv_price NUMBER (10, 2),
  color_id NUMBER (2),
  product_id NUMBER (2),
  CONSTRAINT tbl_inventory_inventory_id_pk PRIMARY KEY (inventory_id),
  CONSTRAINT tbl_inventory_color_id FOREIGN KEY (color_id) REFERENCES tbl_color (color_id),
  CONSTRAINT tbl_inventory_product_id FOREIGN KEY (product_id) REFERENCES tbl_product (product_id)
);
