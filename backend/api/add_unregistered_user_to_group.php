<?php

require_once 'class/GroupsManager.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $userId = $data['userId'];
  $groupId = $data['groupId'];
  $creatorUserId = $data['creatorUserId'];

  $groupsManager = new GroupsManager();
  $response = $groupsManager->addUnregisteredUserToGroup($userId, $groupId, $creatorUserId);

  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}

?>