CREATE DATABASE NHL;
USE NHL;

CREATE TABLE player (
id int ,
name varchar(100),
age int,
number int,
position varchar(100),
assists int,
goal int,
hits  int ,
points int, 
penaltyMinutes int,
primary key(id)
)