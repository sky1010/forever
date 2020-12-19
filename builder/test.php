<?php
    require 'handler.php';

    try{
        $connection = db_connect("localhost", "root", "", "bookstore");

        //exec_sql($connection, "INSERT INTO books VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [10, "Two murderers","Jacob floyd","2019","description4","Science Fiction","English","9780345511270","5.6","Beg"]);
        //exec_sql($connection, "UPDATE books SET title = ? WHERE id = ?", ["Two murderers", 4]);

        db_disconnect($connection);
    }catch(Exception $e){
        echo $e;
    }
?>

