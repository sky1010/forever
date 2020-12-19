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
        default:
            // HTTTP CODE BAD REQUEST
            http_response_code(400);
            break;
    }
?>
