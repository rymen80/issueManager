DROP DATABASE IF EXISTS fwitter_db;

CREATE DATABASE fwitter_db;

USE fwitter_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(16) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE fweets (
	id INT AUTO_INCREMENT NOT NULL,
    fweet VARCHAR(255) NOT NULL,
    userId INT references users(id),
    PRIMARY KEY (id)
);

