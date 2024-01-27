CREATE TABLE Users (
    id_user VARCHAR(13) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    is_registered BOOLEAN DEFAULT true,
    creator_user_id VARCHAR(13)
);

CREATE TABLE SessionTokens (
    id_token VARCHAR(13) PRIMARY KEY,
    user_id VARCHAR(13),
    token VARCHAR(255) UNIQUE NOT NULL,
    expiration_time DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id_user)
);

CREATE TABLE Groups (
    id_group VARCHAR(13) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR(255) NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT false,
    creator_user_id VARCHAR(13),
    FOREIGN KEY (creator_user_id) REFERENCES Users(id_user)
);

CREATE TABLE UserGroups (
    id_user_group VARCHAR(13) PRIMARY KEY,
    user_id VARCHAR(13),
    group_id VARCHAR(13),
    FOREIGN KEY (user_id) REFERENCES Users(id_user),
    FOREIGN KEY (group_id) REFERENCES Groups(id_group)
);

CREATE TABLE CommonExpenses (
    id_expense VARCHAR(13) PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT true,
    user_id VARCHAR(13),
    group_id VARCHAR(13),
    FOREIGN KEY (user_id) REFERENCES Users(id_user),
    FOREIGN KEY (group_id) REFERENCES Groups(id_group)
);



