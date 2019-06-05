<?php
require_once './db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");

startup();

if(!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}

$firstName = $_POST['first_name'];
$lastName = $_POST['last_name'];
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];

$postQuery = "INSERT INTO `user`(`first_name`, `last_name`, `username`, `password`, `email`) 
    VALUES ('{$firstName}','{$lastName}','{$username}','{$password}','{$email}')";

$response = mysqli_query($conn, $postQuery);

if ($response) {
    $lastId = mysqli_insert_id($conn);
    $getQuery = "SELECT * FROM `user` WHERE `id` = {$lastId}";
    $result = mysqli_query($conn, $getQuery);

    if ($result) {
        $numRows = mysqli_num_rows($result);
    } else {
        throw new Exception('there is an error' . mysqli_connect_error());
    }
    
    if ($numRows === 0) {
      throw new Exception("no projects!");
    }
    
    $output = [];
    
    while ($row = mysqli_fetch_assoc($result)) {   
      $output[] = $row;
    }
    
    $json_output = json_encode($output);
    print $json_output;

} else {
    throw new Exception("failed to create user: " . mysqli_connect_error());
}

?>