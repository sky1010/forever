<?php
    /************************************
        Author: -
        Date: 20201205
        Database language: Mysqli
    *************************************/

    //select, return result set matching sql statement
    function select($connection, $sql, $operands){
        isset_connection($connection);

        $stmt = $connection->prepare($sql);
        //uses the splat operator to unpack the array as arguments
        $stmt->bind_param(types($operands), ...$operands);
        $stmt->execute();

        //create variables dynamicaly and unpack it using splat operator
        $variable_ref = create_variables($stmt->field_count);
        $stmt->bind_result(...$variable_ref);
        $stmt->fetch_assoc();
        $stmt->close();

        return $variable_ref;
    }

    //exec_sql, insert, delete or update dataset of a specified table
    function exec_sql($connection, $sql, $data){
        isset_connection($connection);

        $stmt = $connection->prepare($sql);
        $stmt->bind_param(types($data), ...$data);
        $stmt->execute();

        $stmt->close();
    }

    //db_connect, setup the database connection
    function db_connect($localhost, $user, $pwd, $db_name){
        $mysqli = new mysqli($localhost, $user, $pwd, $db_name);
        $mysqli->autocommit(TRUE);  //Commit database transaction automcaticaly
        if($mysqli->connect_errno){
            throw new Exception('[FAILED] Connection to MySQL failed '.$mysqli->connect_errno);
        }

        return $mysqli;
    }

    function isset_connection($connection){
        if(empty($connection)){
            throw new Exception('[FAILED] Connection to database could not be retrieved');
        }
    }

    function types($sets){
        $type_ref = ["integer" => "i", "double" => "d", "string" => "s", "blob" => "b"];
        $types = "";

        foreach($sets as $set){
            if(array_key_exists(gettype($set), $type_ref)){
                $types .= $type_ref[gettype($set)];
            }
        }

        return $types;
    }

    //create_variables, dynamically create and init variables
    function create_variables($amount){
        $variable_ref = [];

        for($i = 0; $i < $amount; $i++){
            ${'var_'.$i} = null;
            array_push($variable_ref, ${'var_'.$i});
        }

        return $variable_ref;
    }

    function db_disconnect($connection){
        $connection->close();
    }
?>
