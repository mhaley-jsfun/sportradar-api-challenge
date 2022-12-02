CREATE DATABASE NHL;
USE NHL;
CREATE TABLE player
 (
 player_id int NOT NULL  AUTO_INCREMENT,
 player_name VARCHAR(20) NOT NULL,
 team_id int NOT NULL,
 player_age int NOT NULL,
 player_number int NOT NULL,
 player_position varchar(100) NOT NULL,
 assist int NOT NULL,
 hits int NOT NULL,
 points int NOT NULL,
 penality_minitues int ,
 opponent_team varchar(100),
primary key (player_id)
 );
