CREATE VIEW `issue_view` AS
    SELECT 
        `i`.`issue_id` AS `issue_id`,
        CONCAT(GETPROJECTKEY(`i`.`project_id`),
                '-',
                `i`.`issue_id`) AS `issue_key`,
        `i`.`summary` AS `summary`,
        `i`.`description` AS `description`,
        `i`.`reported_by` AS `reported_by`,
        `i`.`reported_date` AS `reported_date`,
        `i`.`assigned_to` AS `assigned_to`,
        `i`.`status` AS `status`,
        `i`.`priority` AS `priority`,
        `i`.`modified_on` AS `modified_on`,
        `i`.`modified_by` AS `modified_by`,
        `i`.`project_id` AS `project_id`,
        `i`.`resolution_id` AS `resolution_id`,
        `i`.`label` AS `label`
    FROM
        `issue` `i`;
