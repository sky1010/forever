<?php
    /************************************
        Author: -
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
                    'INSERT INTO tbl_user (username, password, email_address, account_status, avatar, role) VALUES (? , ?, ?, ?, ?, ?)',
                    [$_REQUEST['username'], $_REQUEST['pass'], $_REQUEST['email'], 'active', '../uploads/users_avatar/default_avatar.jpg', 'client']
                );

                $result = select($connection, 'SELECT * FROM tbl_user WHERE username = ?', [$_REQUEST['username']]);
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
                $result = select($connection, 'SELECT * FROM tbl_user WHERE username = ? AND password = ? ', [$_REQUEST['username'], $_REQUEST['password']]);
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
                        [$_REQUEST['product_color'], $_REQUEST['clothing_size'], $_REQUEST['product_qty'], $_REQUEST['product_price'] , $result[0]['product_id'] ]
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
        default:
            // HTTTP CODE BAD REQUEST
            http_response_code(400);
            break;
    }
?>
