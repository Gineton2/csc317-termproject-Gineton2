-- SELECT * FROM users WHERE password="testing";
-- SELECT id FROM users WHERE email="test2@mail.com";

-- SELECT * FROM users;
-- 	UPDATE `sampadb`.`users`
-- 	SET `username` = "testuserneo"
-- 	WHERE `id` = 1;

-- DELETE FROM `sampadb`.`users`
-- WHERE `id`= 4;

INSERT INTO `sampadb`.`posts`
(`title`,
`description`,
`photopath`,
`thumbnail`,
`created`,
`fk_userid`)
VALUES
("test",
"testdesc",
"images/lofi-br.png",
"images/thumbnails/lofi-br.png",
now(),
5); -- needs to be an existing userid 
