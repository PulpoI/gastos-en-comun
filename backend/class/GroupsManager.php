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
      $stmt = $this->conn->prepare("INSERT INTO ExpenseGroups (id_group, name, password, is_public, creator_user_id) VALUES (:idGroup, :name, :password, :isPublic, :userId)");
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
      return ['message' => 'Grupo creado exitosamente', 'status' => 201, 'groupId' => $uniqueIdGroup];
    } catch (PDOException $e) {
      http_response_code(500); // Internal Server Error
      return ['error' => 'No se pudo crear el grupo', 'status' => 500];
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
        return ['error' => 'El usuario no tiene permiso para agregar miembros al grupo', 'status' => 403];
      }

      // Verify that the user is not already in the group
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = (SELECT id_user FROM Users WHERE email = :userEmail) AND group_id = :groupId");
      $stmt->bindParam(':userEmail', $userEmail);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        http_response_code(409); // Conflict
        return ['error' => 'La usuario ya está en el grupo', 'status' => 409];
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
        return ['message' => 'Usuario agregado al grupo exitosamente', 'status' => 201];
      } else {
        http_response_code(404); // Not Found
        return ['error' => 'Usuario no encontrado', 'status' => 404];
      }
    } catch (PDOException $e) {
      http_response_code(500); // Internal Server Error
      return ['error' => 'No se pudo agregar el usuario al grupo', 'status' => 500];
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
        return ['error' => 'El usuario no tiene permiso para agregar miembros al grupo', 'status' => 403];
      }

      // Verify that the user is not already in the group
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = :userId AND group_id = :groupId");
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        http_response_code(409); // Conflict
        return ['error' => 'El usuario ya está en el grupo', 'status' => 409];
      }

      // Insert user into UserGroups
      $stmt = $this->conn->prepare("INSERT INTO UserGroups (id_user_group, user_id, group_id) VALUES (:idUserGroup, :userId, :groupId)");
      $uniqueId = uniqid();
      $stmt->bindParam(':idUserGroup', $uniqueId);
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      http_response_code(201); // Created
      return ['message' => 'Usuario agregado al grupo exitosamente', 'status' => 201];
    } catch (PDOException $e) {
      http_response_code(500); // Internal Server Error
      return ['error' => 'No se pudo agregar el usuario al grupo', 'status' => 500];
    }
  }
  public function verifyGroupPassword($groupId, $enteredPassword)
  {
    try {
      // Get the stored password for the group
      $stmt = $this->conn->prepare("SELECT password FROM ExpenseGroups WHERE id_group = :groupId");
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        $groupData = $stmt->fetch(PDO::FETCH_ASSOC);
        $storedPassword = $groupData['password'];
        // Virify entered password
        if (password_verify($enteredPassword, $storedPassword)) {
          return ['message' => 'Verificación de contraseña exitosa', 'status' => 200];
        } else {
          http_response_code(401); // Unauthorized
          return ['error' => 'Contraseña de grupo incorrecta', 'status' => 401];
        }
      } else {
        http_response_code(404); // Not Found
        return ['error' => 'Grupo no encontrado', 'status' => 404];
      }
    } catch (PDOException $e) {
      http_response_code(500); // Internal Server Error
      return ['error' => 'No se pudo verificar la contraseña del grupo', 'status' => 500];
    }
  }

  public function getGroupsByUserId($userId)
  {
    try {
      $stmt = $this->conn->prepare("
      SELECT ExpenseGroups.id_group, ExpenseGroups.creator_user_id, ExpenseGroups.name, ExpenseGroups.date, ExpenseGroups.is_public, ExpenseGroups.password
      FROM ExpenseGroups
      INNER JOIN UserGroups ON ExpenseGroups.id_group = UserGroups.group_id
      WHERE UserGroups.user_id = :userId
      ");
      $stmt->bindParam(':userId', $userId);
      $stmt->execute();

      $groups = $stmt->fetchAll(PDO::FETCH_ASSOC);

      // get group users
      foreach ($groups as $key => $group) {
        $groupUsers = $this->getGroupUsers($group['id_group']);
        $groups[$key]['users'] = $groupUsers;
        $groups[$key]['creator_name'] = $this->getUserNameById($group['creator_user_id']);
      }
      return ['groups' => $groups, 'status' => 200];
    } catch (PDOException $e) {
      return ['error' => 'Failed to get groups', 'status' => 500];
    }
  }

  public function getGroupUsers($groupId)
  {
    try {
      $stmt = $this->conn->prepare("SELECT Users.id_user, Users.name, Users.email, Users.creator_user_id FROM Users INNER JOIN UserGroups ON Users.id_user = UserGroups.user_id WHERE UserGroups.group_id = :groupId");
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
      foreach ($users as $key => $user) {
        $users[$key]['creator_name'] = $this->getUserNameById($user['creator_user_id']);
      }

      return $users;
    } catch (PDOException $e) {
      return ['error' => 'Failed to get group users', 'status' => 500];
    }
  }

  public function getGroup($groupId)
  {
    try {
      $stmt = $this->conn->prepare("SELECT * FROM ExpenseGroups WHERE id_group = :groupId");
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      $group = $stmt->fetch(PDO::FETCH_ASSOC);

      foreach ($group as $key => $value) {
        if ($key === 'creator_user_id') {
          $group['creator_name'] = $this->getUserNameById($value);
        }
      }

      // $users = $this->getGroupUsers($groupId);

      return
        $group
        // 'users' => $users,
        // 'status' => 200
      ;
    } catch (PDOException $e) {
      return ['error' => 'Failed to get group', 'status' => 500];
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


  private function getUserNameById($userId)
  {
    $stmt = $this->conn->prepare("SELECT name FROM Users WHERE id_user = :userId");
    $stmt->bindParam(':userId', $userId);
    $stmt->execute();
    return $stmt->fetchColumn();
  }

  public function checkUserInGroup($userId, $groupId)
  {
    try {
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = :userId AND group_id = :groupId");
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        http_response_code(200); // OK
        return true;
      } else {
        http_response_code(200); // Not Found
        return false;
      }
    } catch (PDOException $e) {
      return ['error' => 'Failed to check if user is in group', 'status' => 500];
    }
  }

  public function deleteGroup($groupId, $userId, $creatorUserId)
  {
    try {

      // Verify that the user is a member of the group
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = :userId AND group_id = :groupId");
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() === 0) {
        http_response_code(403); // Forbidden
        return [
          'error' => 'El usuario no tiene permiso para eliminar el grupo.',
          'status' => 403
        ];
      }

      // Verify that the user is the administrator of the group in the table ExpenseGroups 
      $stmt = $this->conn->prepare("SELECT creator_user_id FROM ExpenseGroups WHERE creator_user_id = :creatorUserId AND id_group = :groupId");
      $stmt->bindParam(':creatorUserId', $creatorUserId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();
      if ($stmt->rowCount() === 0) {
        http_response_code(403); // Forbidden
        return [
          'error' => 'El usuario no tiene permiso para eliminar el grupo. Solo el administrador puede eliminar el grupo.',
          'status' => 403
        ];
      }
      // first delete all expenses of the group
      $stmt = $this->conn->prepare("DELETE FROM CommonExpenses WHERE group_id = :groupId");
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      // second delete usergroups of the group
      $stmt = $this->conn->prepare("DELETE FROM UserGroups WHERE group_id = :groupId");
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      // Delete group from UserGroups
      $stmt = $this->conn->prepare("DELETE FROM ExpenseGroups WHERE id_group = :groupId");
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      // http_response_code(200); // OK
      return ['message' => 'Grupo eliminado exitosamente', 'status' => 200];
    } catch (PDOException $e) {
      return ['error' => 'Failed to delete group', 'status' => 500];
    }
  }

  public function deleteUserToGroup($groupId, $userId, $creatorUserId)
  {
    try {
      // Verify that the user is a member of the group
      $stmt = $this->conn->prepare("SELECT user_id FROM UserGroups WHERE user_id = :userId AND group_id = :groupId");
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      if ($stmt->rowCount() === 0) {
        http_response_code(403); // Forbidden
        return [
          'error' => 'El usuario no existe en el grupo.',
          'status' => 403
        ];
      }

      // Verify that the user is the administrator of the group in the table ExpenseGroups 
      $stmt = $this->conn->prepare("SELECT creator_user_id FROM ExpenseGroups WHERE creator_user_id = :creatorUserId AND id_group = :groupId");
      $stmt->bindParam(':creatorUserId', $creatorUserId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();
      if ($stmt->rowCount() === 0) {
        http_response_code(403); // Forbidden
        return [
          'error' => 'Solo el administrador puede eliminar a un miembro.',
          'status' => 403
        ];
      }

      // verify that the user admin is not deleting himself
      if ($userId === $creatorUserId) {
        http_response_code(403); // Forbidden
        return [
          'error' => 'El administrador no puede eliminarse a sí mismo.',
          'status' => 403
        ];
      }

      // first delete all expenses of the group
      $stmt = $this->conn->prepare("DELETE FROM CommonExpenses WHERE group_id = :groupId AND user_id = :userId");
      $stmt->bindParam(':groupId', $groupId);
      $stmt->bindParam(':userId', $userId);
      $stmt->execute();

      // Delete user from UserGroups
      $stmt = $this->conn->prepare("DELETE FROM UserGroups WHERE user_id = :userId AND group_id = :groupId");
      $stmt->bindParam(':userId', $userId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();

      http_response_code(200); // OK
      return ['message' => 'Usuario eliminado exitosamente', 'status' => 200];
    } catch (PDOException $e) {
      return ['error' => 'Failed to delete user from group', 'status' => 500];
    }
  }
}
