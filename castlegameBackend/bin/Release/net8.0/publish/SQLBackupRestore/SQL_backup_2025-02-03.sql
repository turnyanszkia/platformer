-- MySqlBackup.NET 2.3.8.0
-- Dump Time: 2025-02-03 11:27:52
-- --------------------------------------
-- Server version 10.4.32-MariaDB mariadb.org binary distribution


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 
-- Definition of jatekosok
-- 

DROP TABLE IF EXISTS `jatekosok`;
CREATE TABLE IF NOT EXISTS `jatekosok` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nev` varchar(10) NOT NULL,
  `Helyezes` int(11) NOT NULL,
  `Pont` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 
-- Dumping data for table jatekosok
-- 

/*!40000 ALTER TABLE `jatekosok` DISABLE KEYS */;

/*!40000 ALTER TABLE `jatekosok` ENABLE KEYS */;

-- 
-- Definition of user
-- 

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `LoginNev` varchar(16) NOT NULL,
  `HASH` varchar(64) NOT NULL,
  `SALT` varchar(64) NOT NULL,
  `Name` varchar(64) NOT NULL,
  `PermissionId` int(11) NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `Email` varchar(64) NOT NULL,
  `ProfilePicturePath` varchar(64) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `LoginNev` (`LoginNev`),
  UNIQUE KEY `Email` (`Email`),
  KEY `Jog` (`PermissionId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 
-- Dumping data for table user
-- 

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user`(`Id`,`LoginNev`,`HASH`,`SALT`,`Name`,`PermissionId`,`Active`,`Email`,`ProfilePicturePath`) VALUES(1,'kerenyir','dcedbd2d352d19c6eae0dfb12271b74d985c825b8d774afd2abd0d101b6e57ef','jQGX8grO1yjNqhiZbtROcseiqj1NVZJd2iqlfxPx1GKLJ9H8smnLJ9dloScCK6Zp','Kerényi Róbert Nandor',9,0,'kerenyir@kkszki.hu','default.jpg'),(12,'Bence','dcedbd2d352d19c6eae0dfb12271b74d985c825b8d774afd2abd0d101b6e57ef','jQGX8grO1yjNqhiZbtROcseiqj1NVZJd2iqlfxPx1GKLJ9H8smnLJ9dloScCK6Zp','Bencsik Bence',9,1,'bence@gamil.com','8584b9ac6c7e60b8fa01a8b95e889745.jpg\t');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


-- Dump completed on 2025-02-03 11:27:52
-- Total time: 0:0:0:0:90 (d:h:m:s:ms)
