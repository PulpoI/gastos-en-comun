<?php

require_once 'Database.php';

class ExpensesManager
{
  private $conn;
  private $userDetailsExepnses;

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
  public function getGroupExpensesSummary($groupId)
  {
    try {
      // 1. Get all users in the group
      $stmtUsers = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE group_id = :groupId");
      $stmtUsers->bindParam(':groupId', $groupId);
      $stmtUsers->execute();
      $userIds = $stmtUsers->fetchAll(PDO::FETCH_COLUMN);

      // 2. Get all expenses in the group
      $stmtExpenses = $this->conn->prepare("SELECT * FROM CommonExpenses WHERE group_id = :groupId");
      $stmtExpenses->bindParam(':groupId', $groupId);
      $stmtExpenses->execute();
      $expenses = $stmtExpenses->fetchAll(PDO::FETCH_ASSOC);

      // 3. Get the total number of users in the group
      $userCount = count($userIds);

      // 4. Calculate the total expenses and the average expense per user
      $totalExpenses = 0;
      foreach ($expenses as $expense) {
        $totalExpenses += (float) $expense['amount'];
      }
      $averageExpense = $totalExpenses / $userCount;

      // 5. Get the details of each user
      $userDetails = [];
      foreach ($userIds as $userId) {
        if (!isset($userDetails[$userId])) {
          $userDetails[$userId] = [
            'name' => $this->getUserNameById($userId),
            'totalExpense' => 0,
            'amountPaid' => 0,
            'amountOwed' => 0,
            'amountToReceive' => 0,
          ];
        }
      }

      // 6. Calculate the total expense and amount paid for each user
      foreach ($expenses as $expense) {
        $userId = $expense['user_id'];
        $amount = $expense['amount'];

        $userDetails[$userId]['totalExpense'] += $amount;
        $userDetails[$userId]['amountPaid'] += $amount;
      }

      // 7. Identify the users that did not pay anything
      foreach ($userDetails as $userId => &$details) {
        if ($details['amountPaid'] == 0) {
          $details['amountToReceive'] = 0;
          $details['amountOwed'] = $averageExpense;
        } else {
          $details['amountToReceive'] = max(0, $details['amountPaid'] - $averageExpense);
          $details['amountOwed'] = max(0, $averageExpense - $details['amountPaid']);
        }
      }

      return [
        'totalExpenses' => $totalExpenses,
        'averageExpense' => $averageExpense,
        'userDetails' => $userDetails,
        'status' => 200
      ];
    } catch (PDOException $e) {
      return ['error' => 'Failed to retrieve group expenses summary', 'status' => 500];
    }
  }


  // Get the name of a user by its id
  private function getUserNameById($userId)
  {
    $stmt = $this->conn->prepare("SELECT name FROM Users WHERE id_user = :userId");
    $stmt->bindParam(':userId', $userId);
    $stmt->execute();
    return $stmt->fetchColumn();
  }

  // Generate debt operations
  public function generateDebtOperations($userDetailsExepnses)
  {
    $debtOperations = [];

    // Filter users that owe money
    $debtors = array_filter($userDetailsExepnses, function ($user) {
      return $user['amountOwed'] > 0;
    });

    // Filter users that are owed money
    $creditors = array_filter($userDetailsExepnses, function ($user) {
      return $user['amountToReceive'] > 0;
    });

    // Get the total amount owed
    $totalDebt = array_sum(array_column($debtors, 'amountOwed'));

    // Each creditor will receive the same amount
    foreach ($creditors as $creditorId => $creditor) {
      $creditorToReceive = $creditor['amountToReceive'];

      // Each debtor will pay the same amount
      foreach ($debtors as $debtorId => $debtor) {
        $debtorOwed = $debtor['amountOwed'];

        // If the creditor has already received all the money, stop
        if ($creditorToReceive > 0 && $debtorOwed > 0) {
          $debtAmount = min($debtorOwed, $creditorToReceive);

          // Register the debt operation
          $operationKey = "operacion_" . count($debtOperations) + 1;
          $debtOperations[$operationKey] = strtoupper($debtor['name']) . " debe pagarle " . $debtAmount . " a " . $creditor['name'];

          $debtorOwed -= $debtAmount;
          $creditorToReceive -= $debtAmount;

          // Update the amount owed by the debtor
          $debtors[$debtorId]['amountOwed'] = $debtorOwed;
        }
      }
    }

    return [$debtOperations];
  }


}


?>