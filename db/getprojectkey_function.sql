DELIMITER $$
CREATE FUNCTION `GETPROJECTKEY`(proj_id INT) RETURNS varchar(10) 
BEGIN
	DECLARE issuekey VARCHAR(10);
   select project_key INTO issuekey from project where project_id=proj_id;
    
RETURN issuekey;
END$$
DELIMITER ;
