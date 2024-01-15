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
  public function addCommonExpense($description, $amount, $userId, $unregistered_user_id, $groupId, $isRegistered = true)
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
      // Check if unregisteredUserId is provided and validate that it corresponds to an unregistered user created by the $userId
      if ($unregistered_user_id !== null) {
        $stmt = $this->conn->prepare("SELECT id_unregistered_user FROM UnregisteredUsers WHERE id_unregistered_user = :unregisteredUserId AND creator_user_id = :userId AND group_id = :groupId");
        $stmt->bindParam(':unregisteredUserId', $unregistered_user_id);
        $stmt->bindParam(':userId', $userId);
        $stmt->bindParam(':groupId', $groupId);
        $stmt->execute();

        if ($stmt->rowCount() === 0) {
          http_response_code(403); // Forbidden
          return ['error' => 'Invalid unregistered user ID', 'status' => 403];
        }
      }

      // Insert the expense
      $stmt = $this->conn->prepare("INSERT INTO CommonExpenses (description, amount, date, user_id, unregistered_user_id, group_id) VALUES (:description, :amount, NOW(), :userId, :unregisteredUserId, :groupId)");
      $stmt->bindParam(':description', $description);
      $stmt->bindParam(':amount', $amount);
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':unregisteredUserId', $unregistered_user_id);
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
      // Verificar si el usuario pertenece al grupo
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = :userId AND group_id = :groupId");
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() === 0) {
        http_response_code(403); // Forbidden
        return ['error' => 'User does not have permission to delete expenses in the group', 'status' => 403];
      }

      // Eliminar el gasto en común de la base de datos
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

      return ['expenses' => $expenses, 'status' => 200];
    } catch (PDOException $e) {
      return ['error' => 'Failed to retrieve group expenses', 'status' => 500];
    }
  }

}


?>