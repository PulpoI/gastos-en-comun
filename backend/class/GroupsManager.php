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

  public function createGroup($userId, $groupName, $groupPassword, $isPublic = false)
  {
    try {
      $hashedPassword = password_hash($groupPassword, PASSWORD_DEFAULT);
      // Insert new group
      $stmt = $this->conn->prepare("INSERT INTO Groups (id_group, name, password, is_public, creator_user_id) VALUES (:idGroup, :name, :password, :isPublic, :userId)");
      $uniqueIdGroup = uniqid();
      $stmt->bindParam(':idGroup', $uniqueIdGroup);
      $stmt->bindParam(':name', $groupName);
      $stmt->bindParam(':password', $hashedPassword);
      $stmt->bindParam(':isPublic', $isPublic);
      $stmt->bindParam(':userId', $userId);
      $stmt->execute();

      // Add group administrator to UserGroups
      $stmt = $this->conn->prepare("INSERT INTO UserGroups (id_user_group, user_id, group_id) VALUES (:idUserGroup, :userId, :groupId)");
      $uniqueIdUserGroup = uniqid();
      $stmt->bindParam(':idUserGroup', $uniqueIdUserGroup);
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $uniqueIdGroup);
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
      // Verify that the user is the administrator of the group
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = :adminUserId AND group_id = :groupId");
      $stmt->bindParam(':adminUserId', $adminUserId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() === 0) {
        http_response_code(403); // Forbidden
        return ['error' => 'User does not have permission to add others to the group', 'status' => 403];
      }

      // Verify that the user is not already in the group
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = (SELECT id_user FROM Users WHERE email = :userEmail) AND group_id = :groupId");
      $stmt->bindParam(':userEmail', $userEmail);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        http_response_code(409); // Conflict
        return ['error' => 'User is already in the group', 'status' => 409];
      }

      // Obtener el ID del usuario que se va a agregar al grupo
      $stmt = $this->conn->prepare("SELECT id_user FROM Users WHERE email = :userEmail");
      $stmt->bindParam(':userEmail', $userEmail);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);
        $userId = $userData['id_user'];

        // Insert user into UserGroups
        $stmt = $this->conn->prepare("INSERT INTO UserGroups (id_user_group, user_id, group_id) VALUES (:idUserGroup, :userId, :groupId)");
        $uniqueId = uniqid();
        $stmt->bindParam(':idUserGroup', $uniqueId);
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

  public function addUnregisteredUserToGroup($userId, $groupId, $creatorUserId)
  {
    try {
      // Verify that the user is the administrator of the group
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = :creatorUserId AND group_id = :groupId");
      $stmt->bindParam(':creatorUserId', $creatorUserId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() === 0) {
        http_response_code(403); // Forbidden
        return ['error' => 'User does not have permission to add others to the group', 'status' => 403];
      }

      // Verify that the user is not already in the group
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = :userId AND group_id = :groupId");
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        http_response_code(409); // Conflict
        return ['error' => 'User is already in the group', 'status' => 409];
      }

      // Insert user into UserGroups
      $stmt = $this->conn->prepare("INSERT INTO UserGroups (id_user_group, user_id, group_id) VALUES (:idUserGroup, :userId, :groupId)");
      $uniqueId = uniqid();
      $stmt->bindParam(':idUserGroup', $uniqueId);
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      http_response_code(201); // Created
      return ['message' => 'User added to group successfully', 'status' => 201];
    } catch (PDOException $e) {
      http_response_code(500); // Internal Server Error
      return ['error' => 'Failed to add user to group', 'status' => 500];
    }
  }
  public function verifyGroupPassword($groupId, $enteredPassword)
  {
    try {
      // Get the stored password for the group
      $stmt = $this->conn->prepare("SELECT password FROM Groups WHERE id_group = :groupId");
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        $groupData = $stmt->fetch(PDO::FETCH_ASSOC);
        $storedPassword = $groupData['password'];
        // Virify entered password
        if (password_verify($enteredPassword, $storedPassword)) {
          return ['message' => 'Password verification successful', 'status' => 200];
        } else {
          http_response_code(401); // Unauthorized
          return ['error' => 'Incorrect group password', 'status' => 401];
        }
      } else {
        http_response_code(404); // Not Found
        return ['error' => 'Group not found', 'status' => 404];
      }
    } catch (PDOException $e) {
      http_response_code(500); // Internal Server Error
      return ['error' => 'Failed to verify group password', 'status' => 500];
    }
  }

  public function getGroupsByUserId($userId)
  {
    try {
      $stmt = $this->conn->prepare("SELECT * FROM Groups INNER JOIN UserGroups ON Groups.id_group = UserGroups.group_id WHERE UserGroups.user_id = :userId");
      $stmt->bindParam(':userId', $userId);
      $stmt->execute();

      $groups = $stmt->fetchAll(PDO::FETCH_ASSOC);

      // get group users
      foreach ($groups as $key => $group) {
        $groupUsers = $this->getGroupUsers($group['id_group'])['users'];
        $groups[$key]['users'] = $groupUsers;


        foreach ($groupUsers as $user) {
          if ($user['id_user'] === $group['creator_user_id']) {
            $groups[$key]['creator_name'] = $user['name'];
          }
        }
      }



      return ['groups' => $groups, 'status' => 200];
    } catch (PDOException $e) {
      return ['error' => 'Failed to get groups', 'status' => 500];
    }
  }

  public function getGroupUsers($groupId)
  {
    try {
      $stmt = $this->conn->prepare("SELECT Users.id_user, Users.name, Users.email FROM Users INNER JOIN UserGroups ON Users.id_user = UserGroups.user_id WHERE UserGroups.group_id = :groupId");
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

      return ['users' => $users, 'status' => 200];
    } catch (PDOException $e) {
      return ['error' => 'Failed to get group users', 'status' => 500];
    }
  }


  public function calculateUserBalances($groupId)
  {
    try {
      $users = $this->getGroupUsers($groupId)['users'];

      return ['users' => $users, 'status' => 200];


    } catch (PDOException $e) {
      return ['error' => 'Failed to calculate user balances', 'status' => 500];
    }
  }




}
