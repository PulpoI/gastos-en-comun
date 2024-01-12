<?php

require_once '../class/ExpensesManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $description = $data['description'];
  $amount = $data['amount'];
  $userId = $data['userId'];
  $groupId = $data['groupId'];

  $expensesManager = new ExpensesManager();
  $response = $expensesManager->addCommonExpense($description, $amount, $userId, $groupId);

  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}


?>