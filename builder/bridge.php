<?php
    /************************************
        Author: --
        Date: 20201205
        Javascript helper functions
    *************************************/
    require('handler.php');

    define('HOST', "localhost");
    define('USER', "root");
    define('PASSWORD', "");
    define('DB_NAME', "forever");
    $request = $_REQUEST['request_type'];

    switch ($request) {
        case 'test_request':
            try{
                //[ TODO ]
                $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);
                $result = select($connection, 'SELECT * FROM tbl_user', []);
                db_disconnect($connection);

                echo json_encode($result);

            }catch(Exception $e){
                http_response_code(400);
            }

            break;
        case 'db_insert_user':
            try{
                $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);
                exec_sql(
                    $connection,
                    'INSERT INTO tbl_user (username, password, email_address, firstname, lastname, country, street_address, postal_code, town, phone_number,account_status, avatar, role) VALUES (? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [$_REQUEST['username'], $_REQUEST['pass'], $_REQUEST['email'], $_REQUEST['firstname'], $_REQUEST['lastname'], $_REQUEST['country'], $_REQUEST['address'],
                    $_REQUEST['zipcode'], $_REQUEST['town'], $_REQUEST['number'], 'active', '../uploads/users_avatar/default_avatar.jpg', 'client']
                );

                $user_id = select($connection, 'SELECT user_id FROM tbl_user WHERE username = ?', [$_REQUEST['username']]);

                exec_sql(
                    $connection,
                    'INSERT INTO tbl_cart (user_id) VALUES (?)',
                    [$user_id[0]['user_id']]
                );

                $result = select($connection, 'SELECT u.*, c.cart_id FROM tbl_user u INNER JOIN tbl_cart c ON u.user_id = c.user_id WHERE username = ?', [$_REQUEST['username']]);
                echo json_encode($result);

                db_disconnect($connection);
                http_response_code(200);
            }catch(Exception $e){
                http_response_code(400);
            }
            break;
        case 'db_user_login':
            try{
                $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);
                $result = select($connection, 'SELECT u.*, c.cart_id FROM tbl_user u INNER JOIN tbl_cart c ON u.user_id = c.user_id  WHERE username = ? AND password = ? ', [$_REQUEST['username'], $_REQUEST['password']]);
                echo json_encode($result);

                db_disconnect($connection);
                http_response_code(200);
            }catch(Exception $e){
                http_response_code(400);
            }
            break;
        case 'allUsers':
                try{
                    //[ TODO ]
                    $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);
                    $result = select($connection, 'SELECT * FROM tbl_user ', []);
                    db_disconnect($connection);

                    echo json_encode($result);

                }catch(Exception $e){
                    http_response_code(400);
                }

                break;
        case 'update_user_suspended':
            try{
                $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);

                exec_sql(
                    $connection,
                    'UPDATE tbl_user SET account_status = "inactive" WHERE user_id = ?',  [$_REQUEST['data']]
                );

                $result = select($connection, 'SELECT * FROM tbl_user ', []);
                echo json_encode($result);

                db_disconnect($connection);
                http_response_code(200);
            }catch(Exception $e){
                http_response_code(400);
            }

            break;

        case 'update_user_approved':
                try{
                    $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);

                    exec_sql(
                        $connection,
                        'UPDATE tbl_user SET account_status = "active" WHERE user_id = ?',  [$_REQUEST['data']]
                    );

                    $result = select($connection, 'SELECT * FROM tbl_user ', []);
                    echo json_encode($result);

                    db_disconnect($connection);
                    http_response_code(200);
                }catch(Exception $e){
                    http_response_code(400);
                }

                break;

        case 'db_insert_product':
            $target_dir = "./uploads/products/";
            $target_file = $target_dir.basename($_FILES["product_image"]["name"]);
            try{
                if(move_uploaded_file($_FILES["product_image"]["tmp_name"], "../".$target_file)){
                    $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);

                    exec_sql(
                        $connection,
                        'INSERT INTO tbl_product (prod_name, prod_desc, prod_tags, prod_brand, prod_image, prod_age_group,cat_id) VALUES (? , ?, ?, ?, ?, ?, ?)',
                        [$_REQUEST['product_name'], $_REQUEST['product_desc'], $_REQUEST['product_tags'], $_REQUEST['product_brand'] ,$target_file,$_REQUEST['product_gender_cat'] , $_REQUEST['category'] ]
                    );

                    $result = select($connection, 'SELECT product_id FROM tbl_product WHERE prod_name = ?', [$_REQUEST['product_name']]);
                    // echo json_encode($result);

                    exec_sql(
                        $connection,
                        'INSERT INTO tbl_inventory (inv_color, inv_size, inv_qoh, inv_price, product_id) VALUES (? , ?, ?, ?, ?)',
                        [$_REQUEST['product_color'], array_key_exists('clothing_size', $_REQUEST)?$_REQUEST['clothing_size']:'S', $_REQUEST['product_qty'], $_REQUEST['product_price'] , $result[0]['product_id'] ]
                    );
                    echo json_encode(['data' => 'success']);

                    db_disconnect($connection);
                    http_response_code(200);
                }
            }catch(Exception $e){
                http_response_code(400);
            }
            break;
        case 'modify_user':
            $target_dir = "./uploads/users_avatar/";
            $target_file = $target_dir.basename($_FILES["user_profile"]["name"]);
            try{
                if(move_uploaded_file($_FILES["user_profile"]["tmp_name"], "../".$target_file)){
                    $outputHandler["path"] = ".".$target_file;
                    $outputHandler["email"] = $_POST["email"];
                    $outputHandler["password"] = $_POST["pass"];

                    $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);

                    exec_sql(
                        $connection,
                        'UPDATE tbl_user SET email_address = ? , password = ?, avatar = ? WHERE user_id = ?',
                        [$outputHandler["email"], $outputHandler["password"], $outputHandler["path"], $_REQUEST['user_id']]
                    );

                    $result = select($connection, 'SELECT * FROM tbl_user WHERE user_id = ?', [$_REQUEST['user_id']]);
                    echo json_encode($result);

                    db_disconnect($connection);
                }
            }catch(Exception $e){
                echo json_encode($e->getMessage());
            }
            break;

        case 'allProducts':
            try{
                //[ TODO ]
                $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);
                $result = select($connection, 'SELECT * FROM tbl_product p INNER JOIN tbl_category c ON p.cat_id = c.cat_id INNER JOIN tbl_inventory n ON p.product_id = n.product_id', []);
                db_disconnect($connection);

                echo json_encode($result);

            }catch(Exception $e){
                http_response_code(400);
            }
            break;

        case 'delete_product':
            try{
                $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);

                exec_sql(
                    $connection,
                    'DELETE FROM tbl_product WHERE product_id = ?',  [$_REQUEST['data']]
                );

                exec_sql(
                    $connection,
                    'DELETE FROM tbl_inventory WHERE product_id = ?',  [$_REQUEST['data']]
                );

                $result = select($connection, 'SELECT * FROM tbl_product ', []);
                echo json_encode($result);

                db_disconnect($connection);
                http_response_code(200);
            }catch(Exception $e){
                http_response_code(400);
            }
            break;

        case 'get_product':
            try{
                //[ TODO ]
                $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);
                $result = select($connection, 'SELECT * FROM tbl_product p, tbl_inventory i, tbl_category c WHERE p.product_id = i.product_id AND c.cat_id = p.cat_id AND p.product_id = ?', [$_REQUEST['data']]);
                db_disconnect($connection);

                echo json_encode($result);

            }catch(Exception $e){
                http_response_code(400);
            }
            break;
        case 'get_related_product':
            try{
                //[ TODO ]
                $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);
                $result = select($connection, 'SELECT * FROM tbl_product p, tbl_inventory i, tbl_category c WHERE p.product_id = i.product_id AND c.cat_id = p.cat_id AND p.cat_id = ?', [$_REQUEST['category_id']]);
                db_disconnect($connection);

                echo json_encode($result);

            }catch(Exception $e){
                http_response_code(400);
            }
            break;
        case 'db_update_product':
            $target_file = null;
            if(!empty($_FILES["product_image"]["tmp_name"])){
                $target_dir = "./uploads/products/";
                $target_file = $target_dir.basename($_FILES["product_image"]["name"]);
            }
            try{
                $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);
                $trigger_update = true;
                if(!empty($_FILES["product_image"]["tmp_name"])){
                    if(!move_uploaded_file($_FILES["product_image"]["tmp_name"], "../".$target_file)){
                        $trigger_update = false;
                    }
                }

                if(!empty($_FILES["product_image"]["tmp_name"])){
                    $arr = [$_REQUEST['product_name'], $_REQUEST['product_desc'], $_REQUEST['product_tags'], $_REQUEST['product_brand'], $target_file ,$_REQUEST['product_gender_cat'] , $_REQUEST['category'],  $_REQUEST['product_id']];
                }else{
                    $arr = [$_REQUEST['product_name'], $_REQUEST['product_desc'], $_REQUEST['product_tags'], $_REQUEST['product_brand'] ,$_REQUEST['product_gender_cat'] , $_REQUEST['category'],  $_REQUEST['product_id']];
                }

                if($trigger_update){
                    exec_sql(
                        $connection,
                        'UPDATE tbl_product set prod_name = ?, prod_desc = ?, prod_tags = ?, prod_brand = ? '.(empty($_FILES["product_image"]["tmp_name"])?'':', prod_image = ?').' , prod_age_group = ?,cat_id = ? WHERE product_id = ?',
                        $arr
                    );

                    // echo json_encode($result);
                    echo json_encode(['data' => 'success']);

                    db_disconnect($connection);
                    http_response_code(200);
                }
            }catch(Exception $e){
                http_response_code(400);
            }
            break;
            case 'usercart':
                try{
                    //[ TODO ]
                    $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);

                    $result = select($connection, 'SELECT * FROM tbl_cart c , tbl_product p ,tbl_product_cart pc, tbl_inventory i WHERE c.cart_id = pc.cart_id AND p.product_id = pc.product_id AND p.product_id = i.product_id AND c.cart_id = ?', [$_REQUEST['data']]);

                    echo json_encode($result);

                    db_disconnect($connection);
                    http_response_code(200);
                }catch(Exception $e){
                    http_response_code(400);
                }
                break;
            case 'addtocart':

            try{
                $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);

                exec_sql(
                    $connection,
                    'INSERT INTO tbl_product_cart (cart_id, product_id, prod_qty) VALUES (? , ?, ?)',
                    [$_REQUEST['cart_id'], $_REQUEST['prod_id'], 1]
                );



                $result = select($connection, 'SELECT * FROM tbl_cart c , tbl_product p ,tbl_product_cart pc, tbl_inventory i WHERE c.cart_id = pc.cart_id AND p.product_id = pc.product_id AND p.product_id = i.product_id AND c.cart_id = ?', [$_REQUEST['cart_id']]);
                echo json_encode($result);

                db_disconnect($connection);
                http_response_code(200);
            }catch(Exception $e){
                http_response_code(400);
            }
            break;
            case 'cart_delete_product':
                try{
                    $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);

                    exec_sql(
                        $connection,
                        'DELETE FROM tbl_product_cart WHERE product_id = ?',  [$_REQUEST['data']]
                    );


                    $result = select($connection, 'SELECT * FROM tbl_cart c , tbl_product p ,tbl_product_cart pc, tbl_inventory i WHERE c.cart_id = pc.cart_id AND p.product_id = pc.product_id AND p.product_id = i.product_id AND c.cart_id = ?', [$_REQUEST['cart_id']]);
                    echo json_encode($result);

                    db_disconnect($connection);
                    http_response_code(200);
                }catch(Exception $e){
                    http_response_code(400);
                }
                break;
        case 'checkCart':
                    try{
                        $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);

                        $result = select($connection, 'SELECT * FROM tbl_product_cart  WHERE cart_id = ? AND product_id = ?', [$_REQUEST['cart_id'],$_REQUEST['prod_id']]);
                        echo json_encode($result);

                        db_disconnect($connection);
                        http_response_code(200);
                    }catch(Exception $e){
                        http_response_code(400);
                    }
                    break;
        case 'IncrementCart':
                        try{
                            $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);

                            $prod_qty = select($connection, 'SELECT prod_qty FROM tbl_product_cart  WHERE cart_id = ? AND product_id = ?', [$_REQUEST['cart_id'],$_REQUEST['prod_id']]);
                            $prod_inc = $prod_qty[0]['prod_qty'] +1;
                            exec_sql(
                                $connection,
                                'UPDATE tbl_product_cart SET prod_qty = ? WHERE cart_id = ? AND product_id = ?',
                                [$prod_inc, $_REQUEST['cart_id'], $_REQUEST['prod_id']]
                            );



                            $result = select($connection, 'SELECT * FROM tbl_cart c , tbl_product p ,tbl_product_cart pc, tbl_inventory i WHERE c.cart_id = pc.cart_id AND p.product_id = pc.product_id AND p.product_id = i.product_id AND c.cart_id = ?', [$_REQUEST['cart_id']]);
                            echo json_encode($result);

                            db_disconnect($connection);
                            http_response_code(200);
                        }catch(Exception $e){
                            http_response_code(400);
                        }
        break;

        case 'IncrementShoppingCart':
            try{
                $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);

                exec_sql(
                    $connection,
                    'UPDATE tbl_product_cart SET prod_qty = ? WHERE cart_id = ? AND product_id = ?',
                    [$_REQUEST['prod_qty'], $_REQUEST['cart_id'], $_REQUEST['prod_id']]
                );



                $result = select($connection, 'SELECT * FROM tbl_cart c , tbl_product p ,tbl_product_cart pc, tbl_inventory i WHERE c.cart_id = pc.cart_id AND p.product_id = pc.product_id AND p.product_id = i.product_id AND c.cart_id = ?', [$_REQUEST['cart_id']]);
                echo json_encode($result);

                db_disconnect($connection);
                http_response_code(200);
            }catch(Exception $e){
                http_response_code(400);
            }
        break;

        case 'deleteAll':
            try{
                $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);

                exec_sql(
                    $connection,
                    'DELETE FROM tbl_product_cart WHERE cart_id = ?',  [$_REQUEST['data']]
                );


                $result = select($connection, 'SELECT * FROM tbl_cart c , tbl_product p ,tbl_product_cart pc, tbl_inventory i WHERE c.cart_id = pc.cart_id AND p.product_id = pc.product_id AND p.product_id = i.product_id AND c.cart_id = ?', [$_REQUEST['data']]);
                echo json_encode($result);

                db_disconnect($connection);
                http_response_code(200);
            }catch(Exception $e){
                http_response_code(400);
            }
            break;

            case 'fetchuserpayment':
                try{
                    //[ TODO ]
                    $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);
                    $result = select($connection, 'SELECT * FROM tbl_user WHERE user_id = ? ',[$_REQUEST['data']]);
                    db_disconnect($connection);

                    echo json_encode($result);

                }catch(Exception $e){
                    http_response_code(400);
                }

        break;

        case 'search_product':
            $keys = array_keys($_REQUEST);
            $arr = null;

            $filtered_keys = array_filter($keys, function($value){
                $exclusion = ['request_type', 'minimum_price', 'maximum_price', 'S', 'M', 'L', 'product_size'];
                return !in_array($value, $exclusion);
            });

            $products_size = explode(', ', $_REQUEST['product_size']);
            $number_of_params = explode(' ', str_repeat('? ', count($products_size)));
            array_pop($number_of_params);

            if(!empty($filtered_keys)){
                $filtered_keys = array_map(function($value){
                    return '%'.$value.'%';
                }, $filtered_keys);

                $condition = 'WHERE prod_tags LIKE ';
                $condition .= implode(' OR prod_tags LIKE ', array_fill(0, count($filtered_keys), '?'));
                $condition .= ' AND inv_price BETWEEN ? AND ? AND inv_size IN ( '.implode(', ', $number_of_params).' )';
                $arr = array_merge($filtered_keys, [$_REQUEST['minimum_price'], $_REQUEST['maximum_price']], $products_size);
            }else{
                $condition = 'WHERE inv_price BETWEEN ? AND ? AND inv_size IN ( '.implode(', ', $number_of_params).' )';
                $arr = array_merge([$_REQUEST['minimum_price'], $_REQUEST['maximum_price']], $products_size);
            }

            try{
                //[ TODO ]
                $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);
                $result = select($connection,
                    'SELECT * FROM tbl_product p INNER JOIN tbl_inventory n ON p.product_id = n.product_id INNER JOIN tbl_category c
                    ON p.cat_id = c.cat_id '.$condition, $arr);
                db_disconnect($connection);

                echo json_encode($result);
            }catch(Exception $e){
                http_response_code(400);
            }

            break;
        default:

            // HTTTP CODE BAD REQUEST
            http_response_code(400);
            break;
    }
?>
