<?php

require_once 'class/GroupsManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $userId = $data['userId'];
  $groupName = $data['name'];
  $groupPassword = $data['password'];
  $isPublic = $data['isPublic'];

  $groupManager = new GroupsManager();
  $response = $groupManager->createGroup($userId, $groupName, $groupPassword, $isPublic);

  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}


?>