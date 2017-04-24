use wingsum;


CREATE TABLE IF NOT EXISTS `user`(
    `id` bigint NOT NULL Primary KEY AUTO_INCREMENT,
    `phone` varchar(11) NOT NULL,
    `name` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `sex` int NOT NULL,
    `type` int NOT NULL,
    `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    KEY (`phone`),
    KEY (`type`)
) CHARACTER SET `utf8mb4`;


CREATE TABLE IF NOT EXISTS `notice`(
    `id` bigint NOT NULL Primary KEY AUTO_INCREMENT,
    `content` varchar(255) NOT NULL,
    `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `user_id` bigint NOT NULL,
    constraint `FK_user_id` foreign key(`user_id`) references `user`(`id`) on delete cascade
) CHARACTER SET `utf8mb4`;

/*class_time用,分割三个值，分别是周几，上课时间，下课时间*/
CREATE TABLE IF NOT EXISTS `lesson`(
    `id` bigint NOT NULL Primary KEY AUTO_INCREMENT,
    `teacher_id` bigint NOT NULL,
    `student_id` bigint NOT NULL,
    `name` varchar(20) NOT NULL,
    `class_time` varchar(20) NOT NULL,
    `start_date` Date NOT NULL,
    `end_date` Date NOT NULL,
    `class_room` varchar(255) NOT NULL,
    `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    constraint `FK_teacher_id` foreign key(`teacher_id`) references `user`(`id`) on delete cascade,
    constraint `FK_student_id` foreign key(`student_id`) references `user`(`id`) on delete cascade
) CHARACTER SET `utf8mb4`;

CREATE TABLE IF NOT EXISTS `feedback`(
    `id` bigint NOT NULL Primary KEY AUTO_INCREMENT,
    `lesson_id` bigint NOT NULL,
    `content` varchar(255) NOT NULL,
    `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    constraint `FK_lesson_id` foreign key(`lesson_id`) references `lesson`(`id`) on delete cascade
) CHARACTER SET `utf8mb4`;



/* test */

/* user */
insert into user (phone, name, password, sex, type)
    values('15622323113', 'admin', 'fe9000f2d2cabe2c65e99da668fdeea3099b9ef108dfacd02e789b63b7a839b9', 0, 99);

/* notice */
insert into notice (content, user_id)
    values('蛤蛤', 1)
    on duplicate key update content = values(content);

update notice
    set content = 'asdasdsad'
    where id = 1;

insert into lesson (teacher_id, student_id, name, class_time, start_date, end_date, class_room)
    values (11, 7, '拉丁舞', '1,10:00,12:00', '2017-03-26', '2017-08-03', 'D301')

