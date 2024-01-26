CREATE DATABASE  IF NOT EXISTS `sampadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sampadb`;
-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: sampadb
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `comment` mediumtext NOT NULL,
  `fk_author_id` int unsigned NOT NULL,
  `fk_post_id` int unsigned NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `key_touserstable_idx` (`fk_author_id`),
  KEY `key_toposttable_idx` (`fk_post_id`),
  CONSTRAINT `fk_comment_post_id` FOREIGN KEY (`fk_post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `fk_comment_user_id` FOREIGN KEY (`fk_author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'this is a comment from curl!',14,7,'2023-10-20 20:14:17'),(2,'this is a comment from curl!',14,7,'2023-10-20 20:19:21'),(3,'Test!',16,12,'2023-11-14 17:59:27'),(4,'This is a comment from a logged-in user in the browser!',16,7,'2023-11-14 18:00:36'),(5,'And another comment!',16,7,'2023-11-14 18:01:24'),(6,'This is a live comment',16,7,'2023-11-14 18:54:54'),(7,'test',16,7,'2023-11-14 18:56:34'),(8,'testing live updating',16,7,'2023-11-14 18:58:25'),(9,'another live update test',16,7,'2023-11-14 19:01:00'),(10,'another live update test',16,7,'2023-11-14 19:01:16'),(11,'Hello?',16,12,'2023-11-14 19:01:30'),(12,'Nice!',16,12,'2023-11-14 19:01:36'),(13,'Testing comment text clearing after submission.',15,11,'2023-11-14 19:05:21'),(14,'Testing comment text clearing after submission.',15,11,'2023-11-14 19:06:34'),(15,'Testing comment text clearing after submission.',15,11,'2023-11-14 19:08:52'),(16,'again',15,11,'2023-11-14 19:13:04'),(17,'It worked!',15,11,'2023-11-14 19:13:09'),(18,'Did I break anything?',16,12,'2023-11-14 19:18:11'),(19,'What about now?',16,12,'2023-11-14 19:23:23'),(20,'Is it working?',19,12,'2023-12-01 16:27:16'),(21,'Nice!',19,12,'2023-12-01 16:27:24'),(22,'Checking messaging functionality still works after moving logic to separate file.',19,12,'2023-12-04 12:49:47'),(23,'Interesting picture',20,14,'2024-01-25 20:07:29'),(24,'Pretty, isn\'t it?',20,18,'2024-01-25 22:38:01'),(25,'Fast internet!',20,19,'2024-01-25 23:19:10'),(26,'exciting!',20,19,'2024-01-25 23:19:22'),(27,'Woo!',20,19,'2024-01-25 23:20:49'),(28,'Hello, world!',22,20,'2024-01-25 23:52:46'),(29,'It\'s nice out here!',22,20,'2024-01-25 23:52:52'),(30,'Beautiful!',25,21,'2024-01-26 00:03:06');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_user_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `posts to users_idx` (`fk_user_id`),
  CONSTRAINT `fk_post_user_id` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (7,'Sampa Title','Sampa Desc','public/images/uploads/eb34eb6c6905aabc5de133.png','public/images/uploads/thumbnail-eb34eb6c6905aabc5de133.png',0,'2023-08-18 19:55:11',16),(8,'AJAX test','again test','public/images/uploads/3659d0111768be60b58120.png','public/images/uploads/thumbnail-3659d0111768be60b58120.png',0,'2023-08-18 20:43:18',16),(9,'axios test','testing axios','public/images/uploads/032fcbb655ba6fa9581770.jpeg','public/images/uploads/thumbnail-032fcbb655ba6fa9581770.jpeg',0,'2023-08-18 21:09:52',16),(10,'axios without alert','no alert','public/images/uploads/2b78afd62e01f4e14bfe50.png','public/images/uploads/thumbnail-2b78afd62e01f4e14bfe50.png',0,'2023-08-18 21:21:15',16),(11,'axios with flash','attempt 2','public/images/uploads/201c8d7a84de63598b8a45.png','public/images/uploads/thumbnail-201c8d7a84de63598b8a45.png',0,'2023-08-18 21:24:35',16),(12,'Wedding Props','Vows, Crowns, and Rings','public/images/uploads/fb7b90a331ccbf877ff601.jpeg','public/images/uploads/thumbnail-fb7b90a331ccbf877ff601.jpeg',0,'2023-09-18 21:26:54',17),(13,'test','testing','public/images/uploads/f251b2fc5171ecf85f91a9.png','public/images/uploads/thumbnail-f251b2fc5171ecf85f91a9.png',0,'2023-12-11 18:46:22',19),(14,'use policy checked','explicitly changed value of checkbox to \"checked.\"','public/images/uploads/02ec7fb85e4a946087e7bf.png','public/images/uploads/thumbnail-02ec7fb85e4a946087e7bf.png',0,'2024-01-10 18:58:07',20),(15,'Tilamook','ice cream','public/images/uploads/9ddb0713e61c9aa477128e.jpeg','public/images/uploads/thumbnail-9ddb0713e61c9aa477128e.jpeg',0,'2024-01-25 20:11:01',20),(16,'JWST','Deep Field','public/images/uploads/1c862d743cb9df39cc8dd0.png','public/images/uploads/thumbnail-1c862d743cb9df39cc8dd0.png',0,'2024-01-25 20:16:48',20),(17,'SF Twilight','Union Square','public/images/uploads/ce0ade3d70300f36984460.jpeg','public/images/uploads/thumbnail-ce0ade3d70300f36984460.jpeg',0,'2024-01-25 21:39:33',20),(18,'Conservatory of Flowers','Winter decoration','public/images/uploads/f5db71bbd28271eda579ab.jpeg','public/images/uploads/thumbnail-f5db71bbd28271eda579ab.jpeg',0,'2024-01-25 21:43:07',20),(19,'new router','tp-link','public/images/uploads/f71e7c22377312ee590fd8.jpeg','public/images/uploads/thumbnail-f71e7c22377312ee590fd8.jpeg',0,'2024-01-25 21:59:56',20),(20,'Cupertino','Posted from a macbook','public/images/uploads/9b78dfde86b783c55e8d30.jpeg','public/images/uploads/thumbnail-9b78dfde86b783c55e8d30.jpeg',0,'2024-01-25 23:52:15',22),(21,'Dahlias','Flowers!','public/images/uploads/9fdb65caba34fa0f1b9e4c.jpeg','public/images/uploads/thumbnail-9fdb65caba34fa0f1b9e4c.jpeg',0,'2024-01-26 00:02:37',25);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dangerousscript','test@mail.com','testing',0,0,'2023-05-29 15:07:13'),(5,'caetano','velo@so.com','hunter2',0,0,'2023-05-30 01:52:52'),(6,'imjustatestuser3121','return@tosender.io','monkeyseemonkeydo',0,0,'2023-07-17 15:13:00'),(10,'user12','user12@12.net','MV;Zx7f:@@:U4v.',0,0,'2023-07-27 17:45:34'),(11,'hash0test','hash0@test.com','MV;Zx7f:@@:U4v.',0,0,'2023-07-31 18:07:24'),(12,'hash1test','hash1@test.com','m3E)2a%4Jw\".Vp!',0,0,'2023-07-31 18:10:03'),(13,'hash2test','hash2@test.com','Hash2test@',0,0,'2023-07-31 18:21:52'),(14,'hash3test','hash3@test.com','$2b$10$I7hYlx3ombjPUHdyGc/UAOorxzx7Hc/EM3gpYFUFJ9C20Kb1qPvSe',0,0,'2023-07-31 18:26:06'),(15,'hash4test','hash4@test.com','$2b$11$FYdKZoDHG6SNP0vSb1Un9.wMyDlo1fBfFiPJcT/bW9jjRczv4HEHe',0,0,'2023-07-31 19:07:23'),(16,'hash5test','hash5@test.com','$2b$11$s0r0mXUKj8VJsu0n/X3nAesU8sHfFtHICRTL/5jWbTdXZI2poEr/i',0,0,'2023-07-31 20:06:43'),(17,'userModelTest','userModelTest@email.net','$2b$11$YJhMuR8DL47KYF90aTJCGeiwACbq7AwWqFZpzgjVUrHHZFL6F..Vm',0,0,'2023-09-18 13:03:51'),(18,'serversideuser','serverside@test.com','$2b$11$zrr9ljNleuRo6OpOHTPKQODhCFF3NgboZemlG3P1rMMi6avdabXh6',0,0,'2023-11-15 19:48:26'),(19,'newbrowseracc','acc@newreg.com','$2b$11$frp1ct.TZ753C8w1UI9oSO3TvGXbMjx9Qywi5sYf1vRqS62PLG//W',0,0,'2023-12-01 16:26:53'),(20,'regvalidationtest','reg@validation.test','$2b$11$rNy0zQKE6BD910zQ4PXsBedgZlC43vJGvWDFDAS7nGCl1Dt98zz7G',0,0,'2024-01-10 18:19:31'),(21,'testuser','testuser@email.com','$2b$11$g3tuTevSzcTuUwS0IzUC2OulIVU0sX.IQD4DQhRGhHOrDIP4rlQCy',0,0,'2024-01-25 23:42:16'),(22,'testuser123','testemail@email.com','$2b$11$f15eoWVYawK17tDT76iOiuMctuftWyb6iQgmsCM9jRyq6liyvCmzK',0,0,'2024-01-25 23:51:12'),(23,'testuser12345','email@email.com','$2b$11$JKwrkvyH3F47zWzAoOVsb.U10drah0vNDOU5nBM9jQ7rFynKCBf6O',0,0,'2024-01-25 23:57:54'),(24,'testuser789','testemail@email.net','$2b$11$ytkSNp4E5T1n.cX6xDzjfODxRbbjWWduNvfNTLVSZR.JamcbtU7G6',0,0,'2024-01-26 00:00:12'),(25,'newuser','newuser@email.net','$2b$11$WmGLQ1u9lMhmVyQz0WM0B.fX2xF6zAN1FeWJSfMZ2VwiCVA3LQ1o2',0,0,'2024-01-26 00:01:47');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-26  0:25:43
