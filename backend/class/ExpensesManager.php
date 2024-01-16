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

  // Post
  public function addCommonExpense($description, $amount, $userId, $groupId)
  {
    try {
      // Verify that the user is a member of the group
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = :userId AND group_id = :groupId");
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() === 0) {
        http_response_code(403); // Forbidden
        return ['error' => 'User does not have permission to add expenses to the group', 'status' => 403];
      }

      // Insert the expense
      $stmt = $this->conn->prepare("INSERT INTO CommonExpenses (id_expense, description, amount, date, user_id, group_id) VALUES (:idExpense, :description, :amount, NOW(), :userId, :groupId)");
      $uniqueId = uniqid();
      $stmt->bindParam(':idExpense', $uniqueId);
      $stmt->bindParam(':description', $description);
      $stmt->bindParam(':amount', $amount);
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      http_response_code(201); // Created
      return ['message' => 'Common expense added successfully', 'status' => 201];
    } catch (PDOException $e) {
      http_response_code(500); // Internal Server Error
      return ['error' => 'Failed to add common expense', 'status' => 500];
    }
  }

  // Update
  public function updateCommonExpense($expenseId, $description, $amount, $userId, $groupId)
  {
    try {
      // Verify that the user is a member of the group
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = :userId AND group_id = :groupId");
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() === 0) {
        http_response_code(403); // Forbidden
        return ['error' => 'User does not have permission to update expenses in the group', 'status' => 403];
      }

      // Update the expense
      $stmt = $this->conn->prepare("UPDATE CommonExpenses SET description = :description, amount = :amount WHERE id_expense = :expenseId AND user_id = :userId AND group_id = :groupId");
      $stmt->bindParam(':expenseId', $expenseId);
      $stmt->bindParam(':description', $description);
      $stmt->bindParam(':amount', $amount);
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        return ['message' => 'Common expense updated successfully', 'status' => 200];
      } else {
        http_response_code(404); // Not Found
        return ['error' => 'Expense not found or user does not have permission to update it', 'status' => 404];
      }
    } catch (PDOException $e) {
      http_response_code(500); // Internal Server Error
      return ['error' => 'Failed to update common expense', 'status' => 500];
    }
  }


  // Delete
  public function deleteCommonExpense($expenseId, $userId, $groupId)
  {
    try {
      // Verify that the user is a member of the group
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = :userId AND group_id = :groupId");
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() === 0) {
        http_response_code(403); // Forbidden
        return ['error' => 'User does not have permission to delete expenses in the group', 'status' => 403];
      }

      // Delete the expense
      $stmt = $this->conn->prepare("DELETE FROM CommonExpenses WHERE id_expense = :expenseId AND user_id = :userId AND group_id = :groupId");
      $stmt->bindParam(':expenseId', $expenseId);
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        return ['message' => 'Common expense deleted successfully', 'status' => 200];
      } else {
        http_response_code(404); // Not Found
        return ['error' => 'Expense not found or user does not have permission to delete it', 'status' => 404];
      }
    } catch (PDOException $e) {
      http_response_code(500); // Internal Server Error
      return ['error' => 'Failed to delete common expense', 'status' => 500];
    }
  }

  // Get all expenses from a group
  public function getGroupExpenses($groupId)
  {
    try {
      $stmt = $this->conn->prepare("SELECT * FROM CommonExpenses WHERE group_id = :groupId");
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);

      $total_expenses = $this->getGroupExpensesTotal($groupId);
      $divide_expenses = $this->divideExpenses($groupId);

      $balance = $this->getBalance('65a5bfcc99c0c', $groupId);

      return [
        'expenses' => $expenses, 
        'total_expenses' => $total_expenses, 
        'divide_expenses' => $divide_expenses,
        'balances' => $balance,
        'status' => 200];
    } catch (PDOException $e) {
      return ['error' => 'Failed to retrieve group expenses', 'status' => 500];
    }
  }

  // Calculate the total amount of expenses from a group (for the dashboard)
  public function getGroupExpensesTotal($groupId)
  {
    try {
      $stmt = $this->conn->prepare("SELECT SUM(amount) AS total FROM CommonExpenses WHERE group_id = :groupId");
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      $total = $stmt->fetch(PDO::FETCH_ASSOC);
      return $total;
      // return ['total' => $total, 'status' => 200];
    } catch (PDOException $e) {
      return ['error' => 'Failed to retrieve group expenses total', 'status' => 500];
    }
  }

  // Divide the expenses between the group members
  public function divideExpenses($groupId)
  {
    try {
      // Get the total amount of expenses
      $total = $this->getGroupExpensesTotal($groupId);
      $total = $total['total'];

      // Get the number of group members with the same id
      $stmt = $this->conn->prepare("SELECT COUNT(user_id) AS members FROM UserGroups WHERE group_id = :groupId");
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      $members = $stmt->fetch(PDO::FETCH_ASSOC); 

      $members = $members['members'];

      // Divide the total amount of expenses between the members
      $amount = $total / $members;
      return $amount;
    } catch (PDOException $e) {
      return ['error' => 'Failed to divide expenses', 'status' => 500];
    }
  }

  // Calculate the amount of money that a user owes to the group and vice versa
  public function getBalance($userId, $groupId)
  {
    try {
      // Get the total amount of expenses
      $total = $this->getGroupExpensesTotal($groupId);
      $total = $total['total'];

      // Get the number of members in the group
      $stmt = $this->conn->prepare("SELECT COUNT(user_id) AS members FROM UserGroups WHERE group_id = :groupId");
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      $members = $stmt->fetch(PDO::FETCH_ASSOC);
      $members = $members['members'];

      // Divide the total amount of expenses between the members
      $amount = $total / $members;

      // Get the amount of money that the user has spent
      $stmt = $this->conn->prepare("SELECT SUM(amount) AS total FROM CommonExpenses WHERE user_id = :userId AND group_id = :groupId");
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      $spent = $stmt->fetch(PDO::FETCH_ASSOC);
      $spent = $spent['total'];

      // Calculate the balance
      $balance = $spent - $amount;
      return $members;
    } catch (PDOException $e) {
      return ['error' => 'Failed to calculate balance', 'status' => 500];
    }
  }
}


?>