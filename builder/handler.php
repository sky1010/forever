<?php
    /************************************
        Author: Srishti & Yakshini
        Database related helper functions
    *************************************/

    /*
        Function --> select
            connection < DATABASE CONNECTION >
            sql < String SQL statement>
            operands < String[] Parameter value>

        Return --> Collection of associative database rows
    */
    function select($connection, $sql, $operands){
        isset_connection($connection);

        $stmt = $connection->prepare($sql);
        //uses the splat operator to unpack the array as arguments
        //if no known values for the sql are present, don't bind the values
        if(!empty($operands))
            $stmt->bind_param(types($operands), ...$operands);
        $stmt->execute();

        //create variables dynamicaly and unpack it using splat operator
        $variable_ref = create_variables($stmt->field_count);
        $stmt->bind_result(...$variable_ref);
        //Fetch all related rows metadata
        $stmt_meta = $stmt->get_result();
        $dataset = [];

        //iterate through the dataset
        if($stmt_meta->num_rows > 0){
            //fetch each rows in the result set
            while($row = $stmt_meta->fetch_assoc()){
                array_push($dataset, $row);
            }
        }

        //close the statement
        $stmt->close();
        return $dataset;
    }

    /*
        Function --> exec_sql
            connection < DATABASE CONNECTION >
            sql < String SQL statement>
            operands < String[] Parameter value>
        Return --> Void

        Executes an sql only for the operations INSERT, UPDATE and DELETE
    */
    function exec_sql($connection, $sql, $data){
        //check if there is a connection available before attempting queries
        isset_connection($connection);

        $stmt = $connection->prepare($sql);
        $stmt->bind_param(types($data), ...$data);
        $stmt->execute();

        $stmt->close();
    }

    /*
        Function --> db_connect
            localhost < Host name or IP address >
            user < String MySQL username>
            pwd < String MySQL password>
            db_name < String Database name>
        Return --> MySQLi connection object

        Creates a connection object to the specified database
    */
    function db_connect($localhost, $user, $pwd, $db_name){
        $mysqli = new mysqli($localhost, $user, $pwd, $db_name);
        $mysqli->autocommit(TRUE);  //Commit database transaction automcaticaly
        if($mysqli->connect_errno){
            throw new Exception('[FAILED] Connection to MySQL failed '.$mysqli->connect_errno);
        }

        return $mysqli;
    }

    /*
        Function --> isset_connection
            connection < DATABASE CONNECTION >
        Return --> void

        Evaluate if there is a connection to the specified database
    */
    function isset_connection($connection){
        if(empty($connection)){
            throw new Exception('[FAILED] Connection to database could not be retrieved');
        }
    }

    /*
        Function --> types
            sets < [] Prepared statement values >
        Return --> String i.e 'ssbi'

        Evaluate if there is a connection to the specified database
    */
    function types($sets){
        //MySQLi prepared statement types
        $type_ref = ["integer" => "i", "double" => "d", "string" => "s", "blob" => "b"];
        $types = "";

        //iterate through each operands
        foreach($sets as $set){
            //check if operand type exist in the hard coded type array
            if(array_key_exists(gettype($set), $type_ref)){
                //concatenate the types
                $types .= $type_ref[gettype($set)];
            }
        }
        return $types;
    }

    /*
        Function --> create_variables
            amount < Amount of variable to create >
        Return --> [] variable references
    */
    function create_variables($amount){
        $variable_ref = [];

        for($i = 0; $i < $amount; $i++){
            //Create and initialize variable to null
            //Push the variable reference to the variable array collection
            ${'var_'.$i} = null;
            array_push($variable_ref, ${'var_'.$i});
        }

        return $variable_ref;
    }

    /*
        Function --> db_disconnect
            connection < Database connection >
        Return --> void
    */
    function db_disconnect($connection){
        $connection->close();
    }
?>
