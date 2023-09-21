-- MySQL dump 10.13  Distrib 8.1.0, for macos13.3 (arm64)
--
-- Host: 127.0.0.1    Database: sofify
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `albums`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `releaseDate` year DEFAULT NULL,
  `image` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `name`, `releaseDate`, `image`) VALUES (1,'Fearless (Taylor\'s Version)',2021,'fearless_album.jpg'),(2,'Speak Now (Taylor\'s Version)',2023,'speak_now_album.jpg'),(3,'Red (Taylor\'s Version)',2021,'red_album.jpg'),(4,'1989',2014,'1989_album.jpg'),(5,'Reputation',2017,'reputation_album.jpg'),(6,'Lover',2019,'lover_album.jpg'),(7,'folklore',2020,'folklore_album.jpg'),(8,'evermore',2020,'evermore_album.jpg'),(9,'÷ (Divide)',2008,'÷ (Divide)_album.jpg'),(10,'x (Multiply)',2008,'÷ (Divide)_album.jpg'),(11,'+(Plus)',2008,'÷ (Divide)_album.jpg'),(12,'No.6 Collaborations Project',2008,'÷ (Divide)_album.jpg'),(13,'Dangerously In Love',2003,'dangerously_in_love.jpg'),(14,'B\'Day',2006,'b_day.jpg'),(15,'I Am... Sasha Fierce',2008,'i_am_sasha_fierce.jpg'),(16,'4',2011,'4.jpg'),(17,'Beyoncé',2013,'beyonce.jpg'),(18,'Thank Me Later',2010,'thank_me_later.jpg'),(19,'Take Care',2011,'take_care.jpg'),(20,'Nothing Was the Same',2013,'nothing_was_the_same.jpg'),(21,'Views',2016,'views.jpg'),(22,'Scorpion',2018,'scorpion.jpg'),(23,'Yours Truly',2013,'yours_truly.jpg'),(24,'My Everything',2014,'my_everything.jpg'),(25,'Dangerous Woman',2016,'dangerous_woman.jpg'),(26,'Sweetener',2018,'sweetener.jpg'),(27,'Thank U, Next',2019,'thank_u_next.jpg');

--
-- Table structure for table `artists`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` text,
  `website` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`id`, `name`, `image`, `website`) VALUES (1,'Taylor Swift update','taylor_swift.jpg','https://www.taylorswift.com'),(2,'Ed Sheeran','ed_sheeran.jpg','https://www.edsheeran.com'),(3,'Beyoncé','beyonce.jpg','https://www.beyonce.com'),(4,'Drake','drake.jpg','https://www.drakeofficial.com'),(5,'Ariana Grande','ariana_grande.jpg','https://www.arianagrande.com'),(6,'Kendrick Lamar','kendrick_lamar.jpg','https://www.kendricklamar.com'),(7,'Adele','adele.jpg','https://www.adele.com'),(8,'Justin Bieber','justin_bieber.jpg','https://www.justinbiebermusic.com'),(9,'Rihanna','rihanna.jpg','https://www.rihannanow.com'),(10,'Coldplay','coldplay.jpg','https://www.coldplay.com'),(11,'Slayer','Slayer.jpg','https://slayer.net');

--
-- Table structure for table `artists_albums`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists_albums` (
  `artistID` int NOT NULL,
  `albumID` int NOT NULL,
  PRIMARY KEY (`artistID`,`albumID`),
  KEY `albumID` (`albumID`),
  CONSTRAINT `artists_albums_ibfk_1` FOREIGN KEY (`artistID`) REFERENCES `artists` (`id`),
  CONSTRAINT `artists_albums_ibfk_2` FOREIGN KEY (`albumID`) REFERENCES `albums` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists_albums`
--

INSERT INTO `artists_albums` (`artistID`, `albumID`) VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(2,9),(2,10),(2,11),(2,12),(3,13),(3,14),(3,15),(3,16),(3,17),(4,18),(4,19),(4,20),(4,21),(4,22),(5,23),(5,24),(5,25),(5,26),(5,27);

--
-- Table structure for table `artists_tracks`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists_tracks` (
  `artistID` int NOT NULL,
  `trackID` int NOT NULL,
  PRIMARY KEY (`artistID`,`trackID`),
  KEY `trackID` (`trackID`),
  CONSTRAINT `artists_tracks_ibfk_1` FOREIGN KEY (`artistID`) REFERENCES `artists` (`id`),
  CONSTRAINT `artists_tracks_ibfk_2` FOREIGN KEY (`trackID`) REFERENCES `tracks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists_tracks`
--

INSERT INTO `artists_tracks` (`artistID`, `trackID`) VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(2,11),(2,12),(2,13),(2,14),(2,15),(2,16),(2,17),(2,18),(2,19),(2,20),(2,21),(2,22),(2,23),(2,24),(2,25),(2,26),(2,27),(2,28),(2,29),(2,30),(3,31),(3,32),(3,33),(3,34),(3,35),(3,36),(3,37),(3,38),(3,39),(3,40),(3,41),(3,42),(3,43),(3,44),(3,45),(3,46),(3,47),(3,48),(3,49),(3,50),(4,51),(4,52),(4,53),(4,54),(4,55),(4,56),(4,57),(4,58),(4,59),(4,60),(4,61),(4,62),(4,63),(4,64),(4,65),(4,66),(4,67),(4,68),(4,69),(4,70),(5,71),(5,72),(5,73),(5,74),(5,75),(5,76),(5,77),(5,78),(5,79),(5,80),(5,81),(5,82),(5,83),(5,84),(5,85),(5,86),(5,87),(5,88),(5,89),(5,90);

--
-- Table structure for table `playlists`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--


--
-- Table structure for table `playlists_tracks`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists_tracks` (
  `playlistID` int DEFAULT NULL,
  `trackID` int DEFAULT NULL,
  KEY `playlistID` (`playlistID`),
  KEY `trackID` (`trackID`),
  CONSTRAINT `playlists_tracks_ibfk_1` FOREIGN KEY (`playlistID`) REFERENCES `playlists` (`id`),
  CONSTRAINT `playlists_tracks_ibfk_2` FOREIGN KEY (`trackID`) REFERENCES `tracks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists_tracks`
--


--
-- Table structure for table `tracks`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `duration` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`id`, `name`, `duration`) VALUES (1,'Love Story','00:03:56'),(2,'You Belong with Me','00:03:51'),(3,'Blank Space','00:03:51'),(4,'Shake It Off','00:03:39'),(5,'Bad Blood','00:03:19'),(6,'Delicate','00:03:52'),(7,'All Too Well','00:05:29'),(8,'I Knew You Were Trouble','00:03:39'),(9,'Style','00:03:51'),(10,'Wildest Dreams','00:03:40'),(11,'Shape of You','00:03:53'),(12,'Thinking Out Loud','00:04:41'),(13,'Photograph','00:04:18'),(14,'Perfect','00:04:23'),(15,'Castle on the Hill','00:04:21'),(16,'Galway Girl','00:02:50'),(17,'The A Team','00:04:18'),(18,'I Don\'t Care (med Justin Bieber)','00:03:40'),(19,'Bloodstream','00:05:00'),(20,'Sing','00:03:56'),(21,'Lego House','00:03:04'),(22,'Give Me Love','00:05:23'),(23,'Happier','00:03:27'),(24,'Don\'t','00:03:39'),(25,'You Need Me, I Don\'t Need You','00:03:40'),(26,'One','00:04:12'),(27,'Afire Love','00:05:14'),(28,'Drunk','00:03:20'),(29,'Eraser','00:03:47'),(30,'Bibia Be Ye Ye','00:02:56'),(31,'Crazy in Love','00:03:56'),(32,'Halo','00:04:22'),(33,'Single Ladies (Put a Ring on It)','00:03:13'),(34,'Love On Top','00:04:27'),(35,'Irreplaceable','00:03:47'),(36,'Formation','00:03:25'),(37,'If I Were a Boy','00:04:10'),(38,'Drunk in Love','00:05:23'),(39,'Sorry','00:03:53'),(40,'Run the World (Girls)','00:03:55'),(41,'Sweet Dreams','00:03:28'),(42,'Countdown','00:03:33'),(43,'Partition','00:05:19'),(44,'Hold Up','00:03:41'),(45,'7/11','00:03:33'),(46,'Flawless (Remix)','00:04:10'),(47,'End of Time','00:03:44'),(48,'Pretty Hurts','00:04:16'),(49,'Diva','00:03:21'),(50,'XO','00:03:36'),(51,'God\'s Plan','00:03:18'),(52,'In My Feelings','00:03:38'),(53,'Hotline Bling','00:04:27'),(54,'One Dance','00:02:54'),(55,'Started From the Bottom','00:02:54'),(56,'Passionfruit','00:04:58'),(57,'Controlla','00:04:05'),(58,'Nonstop','00:03:59'),(59,'Hold On, We\'re Going Home','00:03:51'),(60,'Chicago Freestyle','00:03:40'),(61,'Fake Love','00:03:31'),(62,'Energy','00:03:01'),(63,'Marvins Room','00:05:47'),(64,'Money In The Grave','00:03:26'),(65,'Forever','00:05:57'),(66,'Tootsie Slide','00:04:07'),(67,'Headlines','00:03:55'),(68,'The Motto','00:03:01'),(69,'Passionate','00:02:36'),(70,'Take Care','00:04:37'),(71,'Thank U, Next','00:03:27'),(72,'7 Rings','00:02:59'),(73,'No Tears Left to Cry','00:03:25'),(74,'Into You','00:04:04'),(75,'Break Up with Your Girlfriend, I\'m Bored','00:03:10'),(76,'God Is a Woman','00:03:18'),(77,'Bang Bang','00:03:19'),(78,'Side to Side','00:03:46'),(79,'Breathin','00:03:18'),(80,'Dangerous Woman','00:03:55'),(81,'Love Me Harder','00:03:56'),(82,'The Way','00:03:47'),(83,'Problem','00:03:13'),(84,'One Last Time','00:03:17'),(85,'Be Alright','00:02:59'),(86,'Everyday','00:03:14'),(87,'NASA','00:03:02'),(88,'Needy','00:02:51'),(89,'Ghostin','00:02:59'),(90,'Rain On Me','00:03:02');

--
-- Table structure for table `tracks_albums`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracks_albums` (
  `trackID` int NOT NULL,
  `albumID` int NOT NULL,
  PRIMARY KEY (`trackID`,`albumID`),
  KEY `albumID` (`albumID`),
  CONSTRAINT `tracks_albums_ibfk_1` FOREIGN KEY (`trackID`) REFERENCES `tracks` (`id`),
  CONSTRAINT `tracks_albums_ibfk_2` FOREIGN KEY (`albumID`) REFERENCES `albums` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracks_albums`
--

INSERT INTO `tracks_albums` (`trackID`, `albumID`) VALUES (1,1),(2,1),(3,4),(4,4),(5,4),(9,4),(10,4),(11,9),(14,9),(15,9),(16,9),(23,9),(29,9),(30,9),(12,10),(13,10),(19,10),(20,10),(24,10),(26,10),(27,10),(17,11),(21,11),(22,11),(25,11),(28,11),(18,12),(31,13),(32,15),(37,15),(41,15),(49,15),(34,16),(42,16),(47,16),(38,17),(43,17),(45,17),(46,17),(48,17),(50,17),(63,19),(67,19),(68,19),(70,19),(55,20),(59,20),(53,21),(54,21),(57,21),(51,22),(52,22),(58,22),(82,23),(77,24),(81,24),(83,24),(84,24),(74,25),(78,25),(80,25),(85,25),(86,25),(73,26),(76,26),(79,26),(71,27),(72,27),(75,27),(87,27),(88,27),(89,27);
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-21  9:26:17
