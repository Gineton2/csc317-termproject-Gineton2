-- INSERT INTO `users` (`username`, `email`, `password`, `created`)
-- 	VALUE ("testuser2", "test2@mail.com", "testing", now());

-- SELECT * FROM posts;

SELECT users.username, 
	posts.title, 
    users.id, 
    posts.id,
    posts.description, 
    posts.photopath, 
    posts.created,
    posts.fk_userid
FROM sampadb.users
INNER JOIN sampadb.posts ON users.id=posts.fk_userid;