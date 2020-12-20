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
                    try{
                        $connection = db_connect(HOST, USER, PASSWORD, DB_NAME);
        
                        exec_sql(
                            $connection,
                            'INSERT INTO tbl_product (prod_name, prod_desc, prod_tags, prod_brand, prod_image, prod_age_group,cat_id) VALUES (? , ?, ?, ?, ?, ?, ?)',
                            [$_REQUEST['product_name'], $_REQUEST['product_desc'], $_REQUEST['product_tags'], $_REQUEST['product_brand'] ,'../uploads/users_avatar/default_avatar.jpg',$_REQUEST['product_gender_cat'] , $_REQUEST['category'] ]
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
