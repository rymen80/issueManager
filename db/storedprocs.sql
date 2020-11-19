-- assign_labels stored proc
DELIMITER $$
CREATE PROCEDURE `assign_labels`(IN projid INT)
BEGIN
DECLARE labelId INT;
DECLARE done BOOLEAN default 0;
DECLARE curLabelId CURSOR FOR SELECT label_id FROM label;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

OPEN curLabelId;
REPEAT
FETCH curLabelId INTO labelId;
INSERT IGNORE INTO projectlabels (project_id,label_id) VALUES(projid,labelId);
UNTIL done END REPEAT;
CLOSE curLabelId;
END$$
DELIMITER ;

-- assign_users stored proc
DELIMITER $$
CREATE PROCEDURE `assign_users`(IN projid INT)
BEGIN
DECLARE userId INT;
DECLARE done BOOLEAN default 0;
DECLARE curUserId CURSOR FOR SELECT id FROM user;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

OPEN curUserId;
REPEAT
FETCH curUserId INTO userId;
INSERT IGNORE INTO projectusers (project_id,user_id) VALUES(projid,userId);
UNTIL done END REPEAT;
CLOSE curUserId;
END$$
DELIMITER ;

-- assignNewUserToAllProjects stored proc
DELIMITER $$
CREATE  PROCEDURE `assignNewUserToAllProjects`(IN userid INT)
BEGIN
DECLARE projId INT;
DECLARE done BOOLEAN default 0;
DECLARE curProjId CURSOR FOR SELECT project_id FROM project;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

OPEN curProjId;
REPEAT
FETCH curProjId INTO projId;
INSERT IGNORE INTO projectusers (project_id,user_id) VALUES(projId,userid);
UNTIL done END REPEAT;
CLOSE curProjId;
END$$
DELIMITER ;

