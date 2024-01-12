<?php

require_once '../class/ExpensesManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $email = $data['email'];
  $groupId = $data['groupId'];

  $expensesManager = new ExpensesManager();
  $response = $expensesManager->addUnregisteredUserToGroup($email, $groupId);

  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}


?>