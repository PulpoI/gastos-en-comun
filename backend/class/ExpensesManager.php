<?php

require_once 'Database.php';

class ExpensesManager
{
  private $conn;

  public function __construct()
  {
    $db = new Database();
    $this->conn = $db->getConnection();
  }

  public function addCommonExpense($description, $amount, $userId, $groupId)
  {
  }

  public function getGroupExpenses($groupId)
  {
  }

  public function getGroupUsers($groupId)
  {
  }

  public function addUnregisteredUserToGroup($email, $groupId)
  {
  }
}


?>