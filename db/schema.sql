-- Project Table
CREATE TABLE `project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `project_key` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `project_description` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  UNIQUE KEY `project_key_UNIQUE` (`project_key`),
  UNIQUE KEY `project_name_UNIQUE` (`project_name`)
);

-- User Table
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `isadmin` int(11) DEFAULT '0',
  `firstname` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastname` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- projectusers table
CREATE TABLE `projectusers` (
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`project_id`),
  KEY `fk_project_id_idx` (`project_id`),
  CONSTRAINT `fk_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- label table
CREATE TABLE `label` (
  `label_id` int(11) NOT NULL AUTO_INCREMENT,
  `label_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`label_id`)
);


-- projectlabels table
CREATE TABLE `projectlabels` (
  `project_id` int(11) NOT NULL,
  `label_id` int(11) NOT NULL,
  PRIMARY KEY (`project_id`,`label_id`),
  KEY `f_label_id_idx` (`label_id`),
  CONSTRAINT `f_label_id` FOREIGN KEY (`label_id`) REFERENCES `label` (`label_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `f_project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION
);

-- resolution table
CREATE TABLE `resolution` (
  `resolution_id` int(11) NOT NULL AUTO_INCREMENT,
  `resolution_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`resolution_id`)
);

-- status table
CREATE TABLE `status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`status_id`)
) ;


-- issue table
CREATE TABLE `issue` (
  `issue_id` int(11) NOT NULL AUTO_INCREMENT,
  `summary` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(4000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reported_by` int(11) DEFAULT NULL,
  `reported_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `assigned_to` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `priority` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modified_on` date DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `resolution_id` int(11) DEFAULT NULL,
  `label` int(11) DEFAULT NULL,
  PRIMARY KEY (`issue_id`),
  KEY `fk_status_id_idx` (`status`),
  KEY `fk_status_idx` (`status`),
  KEY `project_id_idx` (`project_id`),
  KEY `fk_resolution_id_idx` (`resolution_id`),
  KEY `f_label_idx` (`label`),
  KEY `assigned_to_idx` (`assigned_to`),
  KEY `reported_by_idx` (`reported_by`),
  CONSTRAINT `assigned_to` FOREIGN KEY (`assigned_to`) REFERENCES `projectusers` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `f_label` FOREIGN KEY (`label`) REFERENCES `projectlabels` (`label_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  CONSTRAINT `fk_resolution_id` FOREIGN KEY (`resolution_id`) REFERENCES `resolution` (`resolution_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_status` FOREIGN KEY (`status`) REFERENCES `status` (`status_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reported_by` FOREIGN KEY (`reported_by`) REFERENCES `projectusers` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
);

-- comment table
CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_text` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `issue_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_date_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `fk_issue_id_idx` (`issue_id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `ix_user_id_idx` (`user_id`),
  CONSTRAINT `f_user_id` FOREIGN KEY (`user_id`) REFERENCES `projectusers` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_issue_id` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`issue_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
