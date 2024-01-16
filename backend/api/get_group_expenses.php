<?php

require_once 'class/ExpensesManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $groupId = $_GET['groupId'];

  $expensesManager = new ExpensesManager();
  $response = $expensesManager->getGroupExpensesSummary($groupId);
  $response['mensaje'] = $expensesManager->generateDebtOperations($response['userDetails']);


  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}

?>