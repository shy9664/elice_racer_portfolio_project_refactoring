CREATE DATABASE racer_portfolio;

USE racer_portfolio;

CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` VARCHAR(20) NOT NULL UNIQUE, 
    `user_pw` VARCHAR(255) NOT NULL,
    `name` VARCHAR(10) NOT NULL
);

CREATE TABLE `introduction` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` VARCHAR(20) NOT NULL UNIQUE, 
    `name` VARCHAR(10) NOT NULL,
    `photo` VARCHAR(100), 
    `introduction` VARCHAR(50),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `achievement` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` VARCHAR(20) NOT NULL, 
    `school` VARCHAR(20) NOT NULL,
    `major` VARCHAR(20) NOT NULL,
    `degree` VARCHAR(20) NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `award` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` VARCHAR(20) NOT NULL, 
    `title` VARCHAR(20) NOT NULL,
    `detail` VARCHAR(50) NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `project` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` VARCHAR(20) NOT NULL, 
    `title` VARCHAR(20) NOT NULL,
    `detail` VARCHAR(50) NOT NULL,
    `period` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `certificate` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` VARCHAR(20) NOT NULL, 
    `title` VARCHAR(20) NOT NULL,
    `organization` VARCHAR(20) NOT NULL,
    `date` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
);

INSERT INTO `user`(`user_id`, `user_pw`, `name`)
VALUES('asdf', 'adfg', 'adfg');


INSERT INTO `introduction`(`user_id`, `name`)
VALUES('aasdg', 'adfg');
