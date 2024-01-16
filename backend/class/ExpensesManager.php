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
  public function getGroupExpensesSummary($groupId)
  {
    try {
      // 1. Obtener todos los usuarios del grupo
      $stmtUsers = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE group_id = :groupId");
      $stmtUsers->bindParam(':groupId', $groupId);
      $stmtUsers->execute();
      $userIds = $stmtUsers->fetchAll(PDO::FETCH_COLUMN);

      // 2. Obtener todos los gastos del grupo
      $stmtExpenses = $this->conn->prepare("SELECT * FROM CommonExpenses WHERE group_id = :groupId");
      $stmtExpenses->bindParam(':groupId', $groupId);
      $stmtExpenses->execute();
      $expenses = $stmtExpenses->fetchAll(PDO::FETCH_ASSOC);

      // 3. Obtener la cantidad de usuarios en el grupo
      $userCount = count($userIds);

      // 4. Calcular el total de gastos y el total dividido por la cantidad de usuarios
      $totalExpenses = 0;
      foreach ($expenses as $expense) {
        $totalExpenses += (float) $expense['amount'];
      }
      $averageExpense = $totalExpenses / $userCount;

      // 5. Obtener información detallada por usuario
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

      // 6. Calcular deudas y montos a recibir
      foreach ($expenses as $expense) {
        $userId = $expense['user_id'];
        $amount = $expense['amount'];

        $userDetails[$userId]['totalExpense'] += $amount;
        $userDetails[$userId]['amountPaid'] += $amount;
      }

      // 7. Identificar usuarios que no han registrado gastos y asignarles el averageExpense
      foreach ($userDetails as $userId => &$details) {
        if ($details['amountPaid'] == 0) {
          $details['amountToReceive'] = 0;
          $details['amountOwed'] = $averageExpense;
        } else {
          $details['amountToReceive'] = max(0, $details['amountPaid'] - $averageExpense);
          $details['amountOwed'] = max(0, $averageExpense - $details['amountPaid']);
          if ($details['amountPaid'] > 0) {
            $details['amountOwed'] += max(0, $averageExpense - $details['amountPaid']);
          }
        }
      }


      // 8. Crear un mensaje descriptivo de las deudas y montos a recibir
      $debtMessage = $this->generateDebtOperations($userDetails);

      return [
        'totalExpenses' => $totalExpenses,
        'averageExpense' => $averageExpense,
        'userDetails' => $userDetails,
        'debtMessage' => $debtMessage,
        'status' => 200
      ];
    } catch (PDOException $e) {
      return ['error' => 'Failed to retrieve group expenses summary', 'status' => 500];
    }
  }


  // Función auxiliar para obtener el nombre de un usuario por su ID
  private function getUserNameById($userId)
  {
    $stmt = $this->conn->prepare("SELECT name FROM Users WHERE id_user = :userId");
    $stmt->bindParam(':userId', $userId);
    $stmt->execute();
    return $stmt->fetchColumn();
  }

  // Función auxiliar para generar un mensaje descriptivo de las deudas y montos a recibir
  private function generateDebtOperations($userDetails)
  {
    $debtOperations = [];

    // Filtrar usuarios que deben dinero
    $debtors = array_filter($userDetails, function ($user) {
      return $user['amountOwed'] > 0;
    });

    // Filtrar usuarios a los que les deben dinero
    $creditors = array_filter($userDetails, function ($user) {
      return $user['amountToReceive'] > 0;
    });

    // Obtener el total que se debe entre todos los deudores
    $totalDebt = array_sum(array_column($debtors, 'amountOwed'));

    // Iterar sobre los acreedores
    foreach ($creditors as $creditorId => $creditor) {
      $creditorToReceive = $creditor['amountToReceive'];

      // Iterar sobre los deudores
      foreach ($debtors as $debtorId => $debtor) {
        $debtorOwed = $debtor['amountOwed'];

        // Si el acreedor aún espera recibir y el deudor aún debe dinero
        if ($creditorToReceive > 0 && $debtorOwed > 0) {
          $debtAmount = min($debtorOwed, $creditorToReceive);

          // Registrar la operación
          $operationKey = "operacion_" . count($debtOperations) + 1;
          $debtOperations[$operationKey] = strtoupper($debtor['name']) . " debe pagarle " . $debtAmount . " a " . $creditor['name'];

          $debtorOwed -= $debtAmount;
          $creditorToReceive -= $debtAmount;

          // Actualizar la deuda del deudor
          $debtors[$debtorId]['amountOwed'] = $debtorOwed;
        }
      }
    }

    return $debtOperations;
  }



}


?>