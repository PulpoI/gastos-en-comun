<?php

require_once 'class/GroupsManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $userId = $_GET['userId'];

  $groupsManager = new GroupsManager();
  $response = $groupsManager->getGroupsByUserId($userId);

  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}

?>