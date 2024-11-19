CREATE TABLE user(
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(30) UNIQUE,
    password VARCHAR(30) NOT NULL,
    image BLOB,
    content TEXT
);