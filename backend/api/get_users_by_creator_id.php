<?php

require_once 'class/UsersManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {


  $creatorId = $_GET['creatorId'];

  $usersManager = new UsersManager();
  $response = $usersManager->getUsersByCreatorId($creatorId);

  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}



?>