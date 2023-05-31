CREATE DATABASE job_insight;
USE job_insight;

CREATE TABLE users (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    skills VARCHAR(255),
    languages VARCHAR(255),
    degree VARCHAR(20),
    craeted_dt TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_dt TIMESTAMP NOT NULL DEFAULT NOW()
);