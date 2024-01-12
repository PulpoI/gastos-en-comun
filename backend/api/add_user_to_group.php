<?php

require_once 'class/GroupsManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $adminUserId = $data['adminUserId'];
  $groupId = $data['groupId'];
  $userEmail = $data['userEmail'];

  $groupManager = new GroupsManager();
  $response = $groupManager->addUserToGroup($adminUserId, $groupId, $userEmail);

  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}



?>