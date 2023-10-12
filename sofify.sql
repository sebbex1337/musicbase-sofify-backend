-- MySQL dump 10.13  Distrib 8.1.0, for macos13.3 (arm64)
--
-- Host: localhost    Database: sofify
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

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `releaseDate` year DEFAULT NULL,
  `image` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (1,'Fearless (Taylor\'s Version)',2021,'https://upload.wikimedia.org/wikipedia/en/5/5b/Fearless_%28Taylor%27s_Version%29_%282021_album_cover%29_by_Taylor_Swift.png'),(2,'Speak Now (Taylor\'s Version)',2023,'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F_SazowGG2pFA%2FTNQ7SubCIMI%2FAAAAAAAAACQ%2FH74aTq2C1zE%2Fs1600%2FTaylorSwiftSpeakNowCover.png&f=1&nofb=1&ipt=89da52a7ed2ca509167244cb67ee5b4e9df78c4693e556cb9e1ea78f766f5d83&ipo=images'),(3,'Red (Taylor\'s Version)',2021,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.thetedellis.com%2Fv7%2Fthetedellis.com%2Fwp-content%2Fuploads%2F2021%2F08%2FTed-Ellis-Taylor-Swift-Red-Version.jpg&f=1&nofb=1&ipt=7c878ccd86701982caccb8eb21b5bbe7f49cd0f4e0d26b9c63dd496fca6e0fb7&ipo=images'),(4,'1989',2014,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.U1rCP4hx4cA_AfKxLL4NcgHaHZ%26pid%3DApi&f=1&ipt=5978e4f726a74bd9326328b44e92b58a54a4161567e4df9bc17d2df046fbba9c&ipo=images'),(5,'Reputation',2017,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Co1DpJ0SxLYcvBrXCF3zDAHaHa%26pid%3DApi&f=1&ipt=f9cebd2376d60b238b168aa401f0c4f277a0860be4c344f2d67803bfbd22d442&ipo=images'),(6,'Lover',2019,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.TtnQwm1NDKf9XJsMuZhJMwHaHa%26pid%3DApi&f=1&ipt=1feba41a094bf0958c8c06781b0b47634c1929ae5db27a65f3572c0dcda174c8&ipo=images'),(7,'folklore',2020,'https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png'),(8,'evermore',2020,'https://upload.wikimedia.org/wikipedia/en/0/0a/Taylor_Swift_-_Evermore.png'),(9,'÷ (Divide)',2008,'https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png'),(10,'x (Multiply)',2008,'https://upload.wikimedia.org/wikipedia/en/a/ad/X_cover.png'),(11,'+(Plus)',2008,'https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Ed_Sheeran_%2B_cover.png/220px-Ed_Sheeran_%2B_cover.png'),(12,'No.6 Collaborations Project',2008,'https://upload.wikimedia.org/wikipedia/en/4/4f/Ed_Sheeran_-_No._6_Collaborations_Project.png'),(13,'Dangerously In Love',2003,'https://upload.wikimedia.org/wikipedia/en/8/84/Dangerously_In_Love_Album%282003%29.png'),(14,'B\'Day',2006,'https://upload.wikimedia.org/wikipedia/en/c/c4/Beyonc%C3%A9_-_B%27Day.png'),(15,'I Am... Sasha Fierce',2008,'https://upload.wikimedia.org/wikipedia/en/9/96/I_Am..._Sasha_Fierce.png'),(16,'4',2011,'https://upload.wikimedia.org/wikipedia/en/c/ca/Beyonc%C3%A9_-_4.png'),(17,'Beyoncé',2013,'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Beyonc%C3%A9_-_Beyonc%C3%A9.svg/1200px-Beyonc%C3%A9_-_Beyonc%C3%A9.svg.png'),(18,'Thank Me Later',2010,'https://upload.wikimedia.org/wikipedia/en/9/9c/Drake_-_Thank_Me_Later_cover.jpg'),(19,'Take Care',2011,'https://upload.wikimedia.org/wikipedia/en/a/ae/Drake_-_Take_Care_cover.jpg'),(20,'Nothing Was the Same',2013,'https://i.scdn.co/image/ab67616d0000b273a4dfa7122ec07fe3a1af22e7'),(21,'Views',2016,'https://upload.wikimedia.org/wikipedia/en/a/af/Drake_-_Views_cover.jpg'),(22,'Scorpion',2018,'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Scorpion_by_Drake.jpg/220px-Scorpion_by_Drake.jpg'),(23,'Yours Truly',2013,'https://upload.wikimedia.org/wikipedia/en/c/cb/Ariana_Grande_-_Yours_Truly.png'),(24,'My Everything',2014,'https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png'),(25,'Dangerous Woman',2016,'https://static.wikia.nocookie.net/arianagrande/images/1/1f/Ariana_Grande_-_Dangerous_Woman_Official_Standard_Album_Cover.jpg/revision/latest?cb=20220320165207'),(26,'Sweetener',2018,'https://upload.wikimedia.org/wikipedia/en/7/7a/Sweetener_album_cover.png'),(27,'Thank U, Next',2019,'https://upload.wikimedia.org/wikipedia/en/b/b2/Ariana_Grande_Thank_U_Next.png');
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` text,
  `website` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (1,'Taylor Swift update','https://kindnessblogdotcom1.files.wordpress.com/2015/01/taylor-swift.jpg','https://www.taylorswift.com'),(2,'Ed Sheeran','https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/12/05/18/Ed-Sheeran.jpg','https://www.edsheeran.com'),(3,'Beyoncé','https://upload.wikimedia.org/wikipedia/commons/1/17/Beyonc%C3%A9_at_The_Lion_King_European_Premiere_2019.png','https://www.beyonce.com'),(4,'Drake','https://media1.popsugar-assets.com/files/thumbor/zan-t_Me63if8oqWYE9ENiPLlhA/0x224:2826x3050/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/02/11/894/n/1922398/87f6bb525e430e7bd44e40.22278576_/i/Drake.jpg','https://www.drakeofficial.com'),(5,'Ariana Grande','https://static.billboard.com/files/2020/05/Ariana-Grande-grammy-red-carpet-2020-billboard-1548-1588772822-1024x677.jpg','https://www.arianagrande.com'),(6,'Kendrick Lamar','https://heartbeats.dk/wp-content/uploads/2019/12/kendricklamar-new.jpg','https://www.kendricklamar.com'),(7,'Adele','https://imgix.viunge.dk/2021-10-06/adele-ny-sang-easy-on-me-.jpg?ixlib=vue-2.9.1&auto=format&ar=414%3A548&fit=min&fp-x=0.5&fp-y=0.5','https://www.adele.com'),(8,'Justin Bieber','https://static.accessonline.com/uploads/2019/06/GettyImages-472253196.jpg','https://www.justinbiebermusic.com'),(9,'Rihanna','https://imageio.forbes.com/specials-images/imageserve/5ceec355142c500008f42068/Rihanna-Diamond-Ball-Forbes-Women/0x0.jpg?format=jpg&crop=1950%2C1950%2Cx32%2Cy257%2Csafe&height=1950&width=1950','https://www.rihannanow.com'),(10,'Coldplay','https://i1.sndcdn.com/avatars-000237271265-7hhnty-t500x500.jpg','https://www.coldplay.com'),(11,'Slayer','https://getwallpapers.com/wallpaper/full/b/5/9/1124798-best-slayer-wallpaper-1920x1080.jpg','https://slayer.net'),(13,'testings','image.jpg','test.dk');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artists_albums`
--

DROP TABLE IF EXISTS `artists_albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists_albums` (
  `artistID` int NOT NULL,
  `albumID` int NOT NULL,
  PRIMARY KEY (`artistID`,`albumID`),
  FOREIGN KEY (`artistID`) REFERENCES `artists` (`id`),
  FOREIGN KEY (`albumID`) REFERENCES `albums` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists_albums`
--

LOCK TABLES `artists_albums` WRITE;
/*!40000 ALTER TABLE `artists_albums` DISABLE KEYS */;
INSERT INTO `artists_albums` VALUES (1,1),(13,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(2,9),(2,10),(2,11),(2,12),(3,13),(3,14),(3,15),(3,16),(3,17),(4,18),(4,19),(4,20),(4,21),(4,22),(5,23),(5,24),(5,25),(5,26),(5,27);
/*!40000 ALTER TABLE `artists_albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artists_tracks`
--

DROP TABLE IF EXISTS `artists_tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists_tracks` (
  `artistID` int NOT NULL,
  `trackID` int NOT NULL,
  PRIMARY KEY (`artistID`,`trackID`),
  FOREIGN KEY (`artistID`) REFERENCES `artists` (`id`),
  FOREIGN KEY (`trackID`) REFERENCES `tracks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists_tracks`
--

LOCK TABLES `artists_tracks` WRITE;
/*!40000 ALTER TABLE `artists_tracks` DISABLE KEYS */;
INSERT INTO `artists_tracks` VALUES (1,1),(13,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(2,11),(2,12),(2,13),(2,14),(2,15),(2,16),(2,17),(2,18),(2,19),(2,20),(2,21),(2,22),(2,23),(2,24),(2,25),(2,26),(2,27),(2,28),(2,29),(2,30),(3,31),(3,32),(3,33),(3,34),(3,35),(3,36),(3,37),(3,38),(3,39),(3,40),(3,41),(3,42),(3,43),(3,44),(3,45),(3,46),(3,47),(3,48),(3,49),(3,50),(4,51),(4,52),(4,53),(4,54),(4,55),(4,56),(4,57),(4,58),(4,59),(4,60),(4,61),(4,62),(4,63),(4,64),(4,65),(4,66),(4,67),(4,68),(4,69),(4,70),(5,71),(5,72),(5,73),(5,74),(5,75),(5,76),(5,77),(5,78),(5,79),(5,80),(5,81),(5,82),(5,83),(5,84),(5,85),(5,86),(5,87),(5,88),(5,89),(5,90),(1,94);
/*!40000 ALTER TABLE `artists_tracks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracks`
--

DROP TABLE IF EXISTS `tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `duration` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracks`
--

LOCK TABLES `tracks` WRITE;
/*!40000 ALTER TABLE `tracks` DISABLE KEYS */;
INSERT INTO `tracks` VALUES (1,'Love Story','00:03:56'),(2,'You Belong with Me','00:03:51'),(3,'Blank Space','00:03:51'),(4,'Shake It Off','00:03:39'),(5,'Bad Blood','00:03:19'),(6,'Delicate','00:03:52'),(7,'All Too Well','00:05:29'),(8,'I Knew You Were Trouble','00:03:39'),(9,'Style','00:03:51'),(10,'Wildest Dreams','00:03:40'),(11,'Shape of You','00:03:53'),(12,'Thinking Out Loud','00:04:41'),(13,'Photograph','00:04:18'),(14,'Perfect','00:04:23'),(15,'Castle on the Hill','00:04:21'),(16,'Galway Girl','00:02:50'),(17,'The A Team','00:04:18'),(18,'I Don\'t Care (med Justin Bieber)','00:03:40'),(19,'Bloodstream','00:05:00'),(20,'Sing','00:03:56'),(21,'Lego House','00:03:04'),(22,'Give Me Love','00:05:23'),(23,'Happier','00:03:27'),(24,'Don\'t','00:03:39'),(25,'You Need Me, I Don\'t Need You','00:03:40'),(26,'One','00:04:12'),(27,'Afire Love','00:05:14'),(28,'Drunk','00:03:20'),(29,'Eraser','00:03:47'),(30,'Bibia Be Ye Ye','00:02:56'),(31,'Crazy in Love','00:03:56'),(32,'Halo','00:04:22'),(33,'Single Ladies (Put a Ring on It)','00:03:13'),(34,'Love On Top','00:04:27'),(35,'Irreplaceable','00:03:47'),(36,'Formation','00:03:25'),(37,'If I Were a Boy','00:04:10'),(38,'Drunk in Love','00:05:23'),(39,'Sorry','00:03:53'),(40,'Run the World (Girls)','00:03:55'),(41,'Sweet Dreams','00:03:28'),(42,'Countdown','00:03:33'),(43,'Partition','00:05:19'),(44,'Hold Up','00:03:41'),(45,'7/11','00:03:33'),(46,'Flawless (Remix)','00:04:10'),(47,'End of Time','00:03:44'),(48,'Pretty Hurts','00:04:16'),(49,'Diva','00:03:21'),(50,'XO','00:03:36'),(51,'God\'s Plan','00:03:18'),(52,'In My Feelings','00:03:38'),(53,'Hotline Bling','00:04:27'),(54,'One Dance','00:02:54'),(55,'Started From the Bottom','00:02:54'),(56,'Passionfruit','00:04:58'),(57,'Controlla','00:04:05'),(58,'Nonstop','00:03:59'),(59,'Hold On, We\'re Going Home','00:03:51'),(60,'Chicago Freestyle','00:03:40'),(61,'Fake Love','00:03:31'),(62,'Energy','00:03:01'),(63,'Marvins Room','00:05:47'),(64,'Money In The Grave','00:03:26'),(65,'Forever','00:05:57'),(66,'Tootsie Slide','00:04:07'),(67,'Headlines','00:03:55'),(68,'The Motto','00:03:01'),(69,'Passionate','00:02:36'),(70,'Take Care','00:04:37'),(71,'Thank U, Next','00:03:27'),(72,'7 Rings','00:02:59'),(73,'No Tears Left to Cry','00:03:25'),(74,'Into You','00:04:04'),(75,'Break Up with Your Girlfriend, I\'m Bored','00:03:10'),(76,'God Is a Woman','00:03:18'),(77,'Bang Bang','00:03:19'),(78,'Side to Side','00:03:46'),(79,'Breathin','00:03:18'),(80,'Dangerous Woman','00:03:55'),(81,'Love Me Harder','00:03:56'),(82,'The Way','00:03:47'),(83,'Problem','00:03:13'),(84,'One Last Time','00:03:17'),(85,'Be Alright','00:02:59'),(86,'Everyday','00:03:14'),(87,'NASA','00:03:02'),(88,'Needy','00:02:51'),(89,'Ghostin','00:02:59'),(90,'Rain On Me','00:03:02'),(94,'testings test','00:03:51');
/*!40000 ALTER TABLE `tracks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracks_albums`
--

DROP TABLE IF EXISTS `tracks_albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracks_albums` (
  `trackID` int NOT NULL,
  `albumID` int NOT NULL,
  PRIMARY KEY (`trackID`,`albumID`),
  FOREIGN KEY (`trackID`) REFERENCES `tracks` (`id`),
  FOREIGN KEY (`albumID`) REFERENCES `albums` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracks_albums`
--

LOCK TABLES `tracks_albums` WRITE;
/*!40000 ALTER TABLE `tracks_albums` DISABLE KEYS */;
INSERT INTO `tracks_albums` VALUES (1,1),(2,1),(3,4),(4,4),(5,4),(9,4),(10,4),(11,9),(14,9),(15,9),(16,9),(23,9),(29,9),(30,9),(12,10),(13,10),(19,10),(20,10),(24,10),(26,10),(27,10),(17,11),(21,11),(22,11),(25,11),(28,11),(18,12),(31,13),(32,15),(37,15),(41,15),(49,15),(34,16),(42,16),(47,16),(38,17),(43,17),(45,17),(46,17),(48,17),(50,17),(63,19),(67,19),(68,19),(70,19),(55,20),(59,20),(53,21),(54,21),(57,21),(51,22),(52,22),(58,22),(82,23),(77,24),(81,24),(83,24),(84,24),(74,25),(78,25),(80,25),(85,25),(86,25),(73,26),(76,26),(79,26),(71,27),(72,27),(75,27),(87,27),(88,27),(89,27);
/*!40000 ALTER TABLE `tracks_albums` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06 17:40:57
