CREATE TABLE Users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Groups (
    id_group INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE UserGroups (
    id_user_group INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    group_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id_user),
    FOREIGN KEY (group_id) REFERENCES Groups(id_group)
);

CREATE TABLE CommonExpenses (
    id_expense INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    group_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id_user),
    FOREIGN KEY (group_id) REFERENCES Groups(id_group)
);

