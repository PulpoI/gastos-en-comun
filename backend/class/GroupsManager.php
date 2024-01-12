<?php

require_once 'Database.php';

class GroupsManager
{
  private $conn;

  public function __construct()
  {
    $db = new Database();
    $this->conn = $db->getConnection();
  }

  public function createGroup($userId, $groupName, $groupPassword)
  {
    try {
      // Insert new group
      $stmt = $this->conn->prepare("INSERT INTO Groups (name, password) VALUES (:name, :password)");
      $stmt->bindParam(':name', $groupName);
      $stmt->bindParam(':password', $groupPassword);
      $stmt->execute();

      $groupId = $this->conn->lastInsertId(); // Get the ID of the newly created group

      // Add group administrator to UserGroups
      $stmt = $this->conn->prepare("INSERT INTO UserGroups (user_id, group_id) VALUES (:userId, :groupId)");
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      http_response_code(201); // Created
      return ['message' => 'Group created successfully', 'status' => 201];
    } catch (PDOException $e) {
      http_response_code(500); // Internal Server Error
      return ['error' => 'Failed to create group', 'status' => 500];
    }
  }

  public function addUserToGroup($adminUserId, $groupId, $userEmail)
  {
    try {
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = (SELECT id_user FROM Users WHERE email = :userEmail) AND group_id = :groupId");
      $stmt->bindParam(':userEmail', $userEmail);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        http_response_code(409); // Conflict
        return ['error' => 'User is already in the group', 'status' => 409];
      }

      $stmt = $this->conn->prepare("SELECT id_user FROM Users WHERE email = :userEmail");
      $stmt->bindParam(':userEmail', $userEmail);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);
        $userId = $userData['id_user'];

        $stmt = $this->conn->prepare("INSERT INTO UserGroups (user_id, group_id) VALUES (:userId, :groupId)");
        $stmt->bindParam(':userId', $userId);
        $stmt->bindParam(':groupId', $groupId);
        $stmt->execute();

        http_response_code(201); // Created
        return ['message' => 'User added to group successfully', 'status' => 201];
      } else {
        http_response_code(404); // Not Found
        return ['error' => 'User not found', 'status' => 404];
      }
    } catch (PDOException $e) {
      http_response_code(500); // Internal Server Error
      return ['error' => 'Failed to add user to group', 'status' => 500];
    }
  }

  public function verifyGroupPassword($groupId, $enteredPassword)
  {
    $stmt = $this->conn->prepare("SELECT password FROM Groups WHERE id_group = :groupId");
    $stmt->bindParam(':groupId', $groupId);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
      $group = $stmt->fetch(PDO::FETCH_ASSOC);
      return password_verify($enteredPassword, $group['password']);
    }

    return false;
  }

}
