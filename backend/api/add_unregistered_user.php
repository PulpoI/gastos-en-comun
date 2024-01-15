<?php


require_once 'class/UsersManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $creatorUserId = $data['creatorUserId'];
  $name = $data['name'];
  $groupId = $data['groupId'];

  $usersManager = new UsersManager();
  $response = $usersManager->addUnregisteredUserToGroup($creatorUserId, $name, $groupId);

  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}

?>