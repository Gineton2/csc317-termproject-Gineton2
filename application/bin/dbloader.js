"use strict";
const mysql = require("mysql2/promise");

function displayWarningMessage(warning) {
  switch (warning.Code) {
    case 1007:
      console.log(`Skipping Database Creation --> ${warning.Message}`);
      break;
    case 1050:
      console.log(`Skipping Table Creation --> ${warning.Message}`);
      break;
  }
}

async function getConnection() {
  return await mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    multipleStatements: true,
  });
}

async function makeDatabase(connection) {
  const [result, _] = await connection.query(
    "CREATE DATABASE IF NOT EXISTS sampadb;"
  );
  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Database!");
  }
}

async function makeUsersTable(connection) {
  const [result, _] = await connection.query(
    // Users Table SQL Goes here
    "DROP TABLE IF EXISTS `users`;\
    CREATE TABLE `users` (\
      `id` int unsigned NOT NULL AUTO_INCREMENT,\
      `username` varchar(64) NOT NULL,\
      `email` varchar(128) NOT NULL,\
      `password` varchar(128) NOT NULL,\
      `usertype` int NOT NULL DEFAULT '0',\
      `active` int NOT NULL DEFAULT '0',\
      `created` datetime NOT NULL,\
      PRIMARY KEY (`id`),\
      UNIQUE KEY `id_UNIQUE` (`id`),\
      UNIQUE KEY `username_UNIQUE` (`username`),\
      UNIQUE KEY `email_UNIQUE` (`email`)\
    ) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;"
  );

  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Users Table!");
  }
}

async function makePostsTable(connection) {
  const [result, _] = await connection.query(
    // Posts Table SQL Goes here
    "DROP TABLE IF EXISTS `posts`;\
    CREATE TABLE `posts` (\
      `id` int unsigned NOT NULL AUTO_INCREMENT,\
      `title` varchar(128) NOT NULL,\
      `description` varchar(4096) NOT NULL,\
      `photopath` varchar(4096) NOT NULL,\
      `thumbnail` varchar(4096) NOT NULL,\
      `active` int NOT NULL DEFAULT '0',\
      `created` datetime NOT NULL,\
      `fk_user_id` int unsigned NOT NULL,\
      PRIMARY KEY (`id`),\
      UNIQUE KEY `id_UNIQUE` (`id`),\
      KEY `posts to users_idx` (`fk_user_id`),\
      CONSTRAINT `fk_post_user_id` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`)\
    ) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;"
  );
  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Posts Table!");
  }
}

async function makeCommentsTable(connection) {
  const [result, _] = await connection.query(
    // Comments Table SQL Goes here
    " DROP TABLE IF EXISTS `comments`;\
    CREATE TABLE `comments` (\
      `id` int unsigned NOT NULL AUTO_INCREMENT,\
      `comment` mediumtext NOT NULL,\
      `fk_author_id` int unsigned NOT NULL,\
      `fk_post_id` int unsigned NOT NULL,\
      `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,\
      PRIMARY KEY (`id`),\
      UNIQUE KEY `id_UNIQUE` (`id`),\
      KEY `key_touserstable_idx` (`fk_author_id`),\
      KEY `key_toposttable_idx` (`fk_post_id`),\
      CONSTRAINT `fk_comment_post_id` FOREIGN KEY (`fk_post_id`) REFERENCES `posts` (`id`),\
      CONSTRAINT `fk_comment_user_id` FOREIGN KEY (`fk_author_id`) REFERENCES `users` (`id`)\
    ) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;"
  );
  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Comments Table!");
  }
}

(async function main() {
  let connection = null;
  try {
    connection = await getConnection();
    await makeDatabase(connection); // make DB
    await connection.query("USE sampadb"); // set new DB to the current DB
    await makeUsersTable(connection); // try to make user table
    await makePostsTable(connection); // try to make posts table
    await makeCommentsTable(connection); // try to make comments table
    connection.close();
    return;
  } catch (error) {
    console.error(error);
    if (connection != null) {
      connection.close();
    }
  }
})();
