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
                $result = select($connection, 'SELECT * FROM tbl_user WHERE user_id = ?', [1]);
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
                    'INSERT INTO tbl_user (user_username, user_password, user_email, user_address, user_zip_code) VALUES (? , ?, ?, ?, ?)',
                    [$_REQUEST['username'], password_hash($_REQUEST['pass'], PASSWORD_DEFAULT), $_REQUEST['email'], $_REQUEST['address'], 1254]
                );

                $result = select($connection, 'SELECT * FROM tbl_user WHERE user_username = ?', [$_REQUEST['username']]);
                echo json_encode($result);

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
