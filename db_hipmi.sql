-- MySQL dump 10.13  Distrib 8.4.5, for Linux (aarch64)
--
-- Host: 127.0.0.1    Database: db_hipmi
-- ------------------------------------------------------
-- Server version	8.4.5

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
-- Table structure for table `anggotas`
--

DROP TABLE IF EXISTS `anggotas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anggotas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `anggota_nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `anggota_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `anggota_telepon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `anggota_jabatan` bigint unsigned NOT NULL,
  `anggota_bidang` bigint unsigned NOT NULL,
  `anggota_perusahaan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `anggota_perusahaan_logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anggota_perusahaan_alamat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anggota_perusahaan_website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anggota_pengalaman` text COLLATE utf8mb4_unicode_ci,
  `anggota_foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anggota_instagram` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anggota_facebook` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anggota_linkedin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anggota_tiktok` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `anggotas_anggota_jabatan_foreign` (`anggota_jabatan`),
  KEY `anggotas_anggota_bidang_foreign` (`anggota_bidang`),
  CONSTRAINT `anggotas_anggota_bidang_foreign` FOREIGN KEY (`anggota_bidang`) REFERENCES `bidangs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `anggotas_anggota_jabatan_foreign` FOREIGN KEY (`anggota_jabatan`) REFERENCES `jabatans` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anggotas`
--

LOCK TABLES `anggotas` WRITE;
/*!40000 ALTER TABLE `anggotas` DISABLE KEYS */;
INSERT INTO `anggotas` VALUES (2,'Anggota 1','example@gmail.com','089876536432',1,1,'tes','anggota/vB0aC2Q6zL6yFfr10RlCelhkeQTLabfuCnAJpPdi.png','tes',NULL,'<p><strong class=\"ql-size-large\">Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit. Aliquam ac quam accumsan, dignissim ante eu, semper arcu. Etiam mi libero, gravida ut justo in, hendrerit dignissim mi. Mauris nulla nisi, blandit nec porta ut, scelerisque vitae dui. Aliquam sed mauris vitae erat vehicula varius ac sit amet turpis. Phasellus faucibus nibh enim, vel fermentum turpis pulvinar in. In quis mi at diam pellentesque venenatis a vitae tellus. Duis gravida enim convallis nisl commodo elementum.</p><p><br></p><p><strong class=\"ql-size-huge\"><em>Nulla quis venenatis lectus.</em></strong> Nullam rutrum pulvinar lacus, id feugiat erat pharetra convallis. Integer sit amet libero pulvinar, vehicula dolor eu, dignissim ante. In tempus mauris et efficitur pharetra. Vivamus placerat condimentum justo vestibulum consectetur. Etiam venenatis ultrices ligula. Proin lectus nisi, blandit eu convallis condimentum, vulputate in dui. Nam tincidunt odio dolor, nec tristique orci maximus eget. Vestibulum quis velit ac nunc auctor tempor at eu dui. Aenean consectetur vulputate nisl vel pulvinar. Ut tristique viverra erat, at congue tellus ultrices sed. Nullam at magna consectetur, fringilla diam sit amet, tempus lectus. Curabitur malesuada pretium eros et vulputate. Fusce tristique mi vitae eleifend vulputate. Vivamus ac hendrerit felis. Phasellus lacinia nec lacus et pulvinar.</p><p><br></p><p><em><u>Quisque dapibus odio ac nunc bibendum euismod. Aliquam dignissim neque condimentum lorem blandit, mollis ullamcorper dolor placerat. Phasellus laoreet dignissim augue id elementum. Nulla tempus a ex nec volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam eu sagittis metus, at dapibus dui. Phasellus mi tortor, porta a odio quis, euismod imperdiet sem. Quisque diam tellus, feugiat ac auctor non, vestibulum nec justo. Nam bibendum, nisl a posuere ornare, tortor mi aliquam turpis, vel lacinia diam turpis non sem. Phasellus quis faucibus nisi. Quisque in dolor in libero facilisis posuere quis ac erat. Maecenas mollis massa lorem. Pellentesque ullamcorper eros efficitur tortor viverra euismod vel non neque. Curabitur in tempor quam.</u></em></p><p><br></p><blockquote><span class=\"ql-font-serif\">Phasellus eu tincidunt magna, vehicula pulvinar eros. Ut lacus erat, venenatis non mollis a, tempor in leo. Praesent maximus ante at urna dapibus dignissim. Etiam tortor tellus, tincidunt in sapien eget, fringilla tempor velit. Proin faucibus elementum tortor a dignissim. Sed auctor est quam, a aliquet tortor rutrum sit amet. Sed tristique lacinia pellentesque. Etiam a pellentesque est. Nam molestie velit non accumsan accumsan. Proin finibus mi id accumsan laoreet. Pellentesque sodales velit eu dolor commodo, a viverra ipsum vehicula.</span></blockquote><p><br></p><p><span class=\"ql-font-monospace\">Donec rhoncus ipsum vitae nibh tristique placerat. Aliquam auctor lacus non scelerisque efficitur. Sed quis purus dui. Curabitur nisi tortor, elementum in dapibus vitae, viverra eget sem. Proin ut imperdiet arcu. Vivamus leo urna, efficitur sed massa eu, suscipit dictum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut nisl sed felis condimentum vestibulum eget a enim. Aenean at bibendum mauris.</span></p>','anggota/fomUjv2sHHYEJ2TJ9REaU3JWUpzHrVWjZENZhmUc.png','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL),(3,'Anggota 2','example@gmail.com','0000000000',3,2,'example','anggota/CtEk1iXgtiF2qFt9DMTzYtWVsW06zDz302KYOnVA.jpg','Jl. tes no 261',NULL,NULL,'anggota/8PpZ26rj4BfwGzcAKlCPuXyrn4HbhUR1PmfOnp3i.png','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL),(4,'Anggota 3','example@gmail.com','0000000000',4,1,'example','anggota/5Q0ZZB7714IaVb1QBuQqMbz3NE4pfXPHW4HKyukx.jpg','jl 123',NULL,'<p><strong class=\"ql-size-large\">Lorem ipsum dolor sit amet, </strong>consectetur adipiscing elit. Aliquam ac quam accumsan, dignissim ante eu, semper arcu. Etiam mi libero, gravida ut justo in, hendrerit dignissim mi. Mauris nulla nisi, blandit nec porta ut, scelerisque vitae dui. Aliquam sed mauris vitae erat vehicula varius ac sit amet turpis. Phasellus faucibus nibh enim, vel fermentum turpis pulvinar in. In quis mi at diam pellentesque venenatis a vitae tellus. Duis gravida enim convallis nisl commodo elementum.</p><h1>jbajdbaj</h1><p><s>Nulla quis venenatis lectus. Nullam rutrum pulvinar lacus, id feugiat erat pharetra convallis. Integer sit amet libero pulvinar, vehicula dolor eu, dignissim ante. In tempus mauris et efficitur pharetra. Vivamus placerat condimentum justo vestibulum consectetur. Etiam venenatis ultrices ligula. Proin lectus nisi, blandit eu convallis condimentum, vulputate in dui. Nam tincidunt odio dolor, nec tristique orci maximus eget. Vestibulum quis velit ac nunc auctor tempor at eu dui. Aenean consectetur vulputate nisl vel pulvinar. Ut tristique viverra erat, at congue tellus ultrices sed. Nullam at magna consectetur, fringilla diam sit amet, tempus lectus. Curabitur malesuada pretium eros et vulputate. Fusce tristique mi vitae eleifend vulputate. Vivamus ac hendrerit felis. Phasellus lacinia nec lacus et pulvinar.</s></p><p><br></p><blockquote><span class=\"ql-font-serif\">Quisque dapibus odio ac nunc bibendum euismod. Aliquam dignissim neque condimentum lorem blandit, mollis ullamcorper dolor placerat. Phasellus laoreet dignissim augue id elementum. Nulla tempus a ex nec volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam eu sagittis metus, at dapibus dui. Phasellus mi tortor, porta a odio quis, euismod imperdiet sem. Quisque diam tellus, feugiat ac auctor non, vestibulum nec justo. Nam bibendum, nisl a posuere ornare, tortor mi aliquam turpis, vel lacinia diam turpis non sem. Phasellus quis faucibus nisi. Quisque in dolor in libero facilisis posuere quis ac erat. Maecenas mollis massa lorem. Pellentesque ullamcorper eros efficitur tortor viverra euismod vel non neque. Curabitur in tempor quam.</span></blockquote><p><br></p><p><em class=\"ql-size-large\">Phasellus eu tincidunt magna, vehicula pulvinar eros. Ut lacus erat, venenatis non mollis a, tempor in leo. Praesent maximus ante at urna dapibus dignissim. Etiam tortor tellus, tincidunt in sapien eget, fringilla tempor velit. Proin faucibus elementum tortor a dignissim. Sed auctor est quam, a aliquet tortor rutrum sit amet. Sed tristique lacinia pellentesque. Etiam a pellentesque est. Nam molestie velit non accumsan accumsan. Proin finibus mi id accumsan laoreet. Pellentesque sodales velit eu dolor commodo, a viverra ipsum vehicula.</em></p><p><br></p><ol><li>Donec rhoncus ipsum vitae nibh tristique placerat. Aliquam auctor lacus non scelerisque efficitur. Sed quis purus dui. Curabitur nisi tortor, elementum in dapibus vitae, viverra eget sem. Proin ut imperdiet arcu. Vivamus leo urna, efficitur sed massa eu, suscipit dictum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut nisl sed felis condimentum vestibulum eget a enim. Aenean at bibendum mauris.</li><li>Donec rhoncus ipsum vitae nibh tristique placerat. Aliquam auctor lacus non scelerisque efficitur. Sed quis purus dui. Curabitur nisi tortor, elementum in dapibus vitae, viverra eget sem. Proin ut imperdiet arcu. Vivamus leo urna, efficitur sed massa eu, suscipit dictum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut nisl sed felis condimentum vestibulum eget a enim. Aenean at bibendum mauris.</li><li>Donec rhoncus ipsum vitae nibh tristique placerat. Aliquam auctor lacus non scelerisque efficitur. Sed quis purus dui. Curabitur nisi tortor, elementum in dapibus vitae, viverra eget sem. Proin ut imperdiet arcu. Vivamus leo urna, efficitur sed massa eu, suscipit dictum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut nisl sed felis condimentum vestibulum eget a enim. Aenean at bibendum mauris.</li><li>Donec rhoncus ipsum vitae nibh tristique placerat. Aliquam auctor lacus non scelerisque efficitur. Sed quis purus dui. Curabitur nisi tortor, elementum in dapibus vitae, viverra eget sem. Proin ut imperdiet arcu. Vivamus leo urna, efficitur sed massa eu, suscipit dictum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut nisl sed felis condimentum vestibulum eget a enim. Aenean at bibendum mauris.</li><li>Donec rhoncus ipsum vitae nibh tristique placerat. Aliquam auctor lacus non scelerisque efficitur. Sed quis purus dui. Curabitur nisi tortor, elementum in dapibus vitae, viverra eget sem. Proin ut imperdiet arcu. Vivamus leo urna, efficitur sed massa eu, suscipit dictum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut nisl sed felis condimentum vestibulum eget a enim. Aenean at bibendum mauris.</li><li><br></li></ol>','anggota/lNeietb5HvP29ipxvMyGj6wlNb7GfiZUw5vWuhMJ.jpg','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL),(5,'Anggota 4','example@gmail.com','089876536432',5,2,'tes','anggota/L1m3phDNVmmCZXy3DfK7UN4YNxd8IfPSEIwZ5kWO.jpg','tes','https://www.tes.com','<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac quam accumsan, dignissim ante eu, semper arcu. Etiam mi libero, gravida ut justo in, hendrerit dignissim mi. Mauris nulla nisi, blandit nec porta ut, scelerisque vitae dui. Aliquam sed mauris vitae erat vehicula varius ac sit amet turpis. Phasellus faucibus nibh enim, vel fermentum turpis pulvinar in. In quis mi at diam pellentesque venenatis a vitae tellus. Duis gravida enim convallis nisl commodo elementum.</p><p><br></p><p>Nulla quis venenatis lectus. Nullam rutrum pulvinar lacus, id feugiat erat pharetra convallis. Integer sit amet libero pulvinar, vehicula dolor eu, dignissim ante. In tempus mauris et efficitur pharetra. Vivamus placerat condimentum justo vestibulum consectetur. Etiam venenatis ultrices ligula. Proin lectus nisi, blandit eu convallis condimentum, vulputate in dui. Nam tincidunt odio dolor, nec tristique orci maximus eget. Vestibulum quis velit ac nunc auctor tempor at eu dui. Aenean consectetur vulputate nisl vel pulvinar. Ut tristique viverra erat, at congue tellus ultrices sed. Nullam at magna consectetur, fringilla diam sit amet, tempus lectus. Curabitur malesuada pretium eros et vulputate. Fusce tristique mi vitae eleifend vulputate. Vivamus ac hendrerit felis. Phasellus lacinia nec lacus et pulvinar.</p><p><br></p><p>Quisque dapibus odio ac nunc bibendum euismod. Aliquam dignissim neque condimentum lorem blandit, mollis ullamcorper dolor placerat. Phasellus laoreet dignissim augue id elementum. Nulla tempus a ex nec volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam eu sagittis metus, at dapibus dui. Phasellus mi tortor, porta a odio quis, euismod imperdiet sem. Quisque diam tellus, feugiat ac auctor non, vestibulum nec justo. Nam bibendum, nisl a posuere ornare, tortor mi aliquam turpis, vel lacinia diam turpis non sem. Phasellus quis faucibus nisi. Quisque in dolor in libero facilisis posuere quis ac erat. Maecenas mollis massa lorem. Pellentesque ullamcorper eros efficitur tortor viverra euismod vel non neque. Curabitur in tempor quam.</p><p><br></p><p>Phasellus eu tincidunt magna, vehicula pulvinar eros. Ut lacus erat, venenatis non mollis a, tempor in leo. Praesent maximus ante at urna dapibus dignissim. Etiam tortor tellus, tincidunt in sapien eget, fringilla tempor velit. Proin faucibus elementum tortor a dignissim. Sed auctor est quam, a aliquet tortor rutrum sit amet. Sed tristique lacinia pellentesque. Etiam a pellentesque est. Nam molestie velit non accumsan accumsan. Proin finibus mi id accumsan laoreet. Pellentesque sodales velit eu dolor commodo, a viverra ipsum vehicula.</p><p><br></p><p>Donec rhoncus ipsum vitae nibh tristique placerat. Aliquam auctor lacus non scelerisque efficitur. Sed quis purus dui. Curabitur nisi tortor, elementum in dapibus vitae, viverra eget sem. Proin ut imperdiet arcu. Vivamus leo urna, efficitur sed massa eu, suscipit dictum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut nisl sed felis condimentum vestibulum eget a enim. Aenean at bibendum mauris.</p><p><br></p>','anggota/H8EIkhc25B0eD6zrbJf0VsPe6sphW0Wk22Zsyxxy.png','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL),(6,'Anggota 5','example@gmail.com','089876536432',6,2,'example','anggota/oZsbHsDR0EHG1U6gs9d7G9G1279QYgp3zy6nKGck.jpg','example','https://www.tes.com','<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac quam accumsan, dignissim ante eu, semper arcu. Etiam mi libero, gravida ut justo in, hendrerit dignissim mi. Mauris nulla nisi, blandit nec porta ut, scelerisque vitae dui. Aliquam sed mauris vitae erat vehicula varius ac sit amet turpis. Phasellus faucibus nibh enim, vel fermentum turpis pulvinar in. In quis mi at diam pellentesque venenatis a vitae tellus. Duis gravida enim convallis nisl commodo elementum.</p><p><br></p><p>Nulla quis venenatis lectus. Nullam rutrum pulvinar lacus, id feugiat erat pharetra convallis. Integer sit amet libero pulvinar, vehicula dolor eu, dignissim ante. In tempus mauris et efficitur pharetra. Vivamus placerat condimentum justo vestibulum consectetur. Etiam venenatis ultrices ligula. Proin lectus nisi, blandit eu convallis condimentum, vulputate in dui. Nam tincidunt odio dolor, nec tristique orci maximus eget. Vestibulum quis velit ac nunc auctor tempor at eu dui. Aenean consectetur vulputate nisl vel pulvinar. Ut tristique viverra erat, at congue tellus ultrices sed. Nullam at magna consectetur, fringilla diam sit amet, tempus lectus. Curabitur malesuada pretium eros et vulputate. Fusce tristique mi vitae eleifend vulputate. Vivamus ac hendrerit felis. Phasellus lacinia nec lacus et pulvinar.</p><p><br></p><p>Quisque dapibus odio ac nunc bibendum euismod. Aliquam dignissim neque condimentum lorem blandit, mollis ullamcorper dolor placerat. Phasellus laoreet dignissim augue id elementum. Nulla tempus a ex nec volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam eu sagittis metus, at dapibus dui. Phasellus mi tortor, porta a odio quis, euismod imperdiet sem. Quisque diam tellus, feugiat ac auctor non, vestibulum nec justo. Nam bibendum, nisl a posuere ornare, tortor mi aliquam turpis, vel lacinia diam turpis non sem. Phasellus quis faucibus nisi. Quisque in dolor in libero facilisis posuere quis ac erat. Maecenas mollis massa lorem. Pellentesque ullamcorper eros efficitur tortor viverra euismod vel non neque. Curabitur in tempor quam.</p><p><br></p><p>Phasellus eu tincidunt magna, vehicula pulvinar eros. Ut lacus erat, venenatis non mollis a, tempor in leo. Praesent maximus ante at urna dapibus dignissim. Etiam tortor tellus, tincidunt in sapien eget, fringilla tempor velit. Proin faucibus elementum tortor a dignissim. Sed auctor est quam, a aliquet tortor rutrum sit amet. Sed tristique lacinia pellentesque. Etiam a pellentesque est. Nam molestie velit non accumsan accumsan. Proin finibus mi id accumsan laoreet. Pellentesque sodales velit eu dolor commodo, a viverra ipsum vehicula.</p><p><br></p><p>Donec rhoncus ipsum vitae nibh tristique placerat. Aliquam auctor lacus non scelerisque efficitur. Sed quis purus dui. Curabitur nisi tortor, elementum in dapibus vitae, viverra eget sem. Proin ut imperdiet arcu. Vivamus leo urna, efficitur sed massa eu, suscipit dictum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut nisl sed felis condimentum vestibulum eget a enim. Aenean at bibendum mauris.</p><p><br></p>','anggota/5p9VCil06N8npHr29c8MjdbjDzSUdyHEphzieUIN.png','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL),(7,'Anggota 6','example@gmail.com','089876536432',7,1,'tes','anggota/OJOfcYTMbCYk3ztzhTYPisLQqpgz8OpcI4zgB8T7.jpg','tes','https://www.tes.com',NULL,'anggota/h7EByIbMh0GCqiQjL9fPvyOs1DVpkUFFbFRhUwsZ.png','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL),(8,'Anggota 6','example@gmail.com','089876536432',7,1,'tes','anggota/OJOfcYTMbCYk3ztzhTYPisLQqpgz8OpcI4zgB8T7.jpg','tes','https://www.tes.com',NULL,'anggota/h7EByIbMh0GCqiQjL9fPvyOs1DVpkUFFbFRhUwsZ.png','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL),(9,'Anggota 6','example@gmail.com','089876536432',7,1,'tes','anggota/OJOfcYTMbCYk3ztzhTYPisLQqpgz8OpcI4zgB8T7.jpg','tes','https://www.tes.com',NULL,'anggota/h7EByIbMh0GCqiQjL9fPvyOs1DVpkUFFbFRhUwsZ.png','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL),(10,'Anggota 6','example@gmail.com','089876536432',7,1,'tes','anggota/OJOfcYTMbCYk3ztzhTYPisLQqpgz8OpcI4zgB8T7.jpg','tes','https://www.tes.com',NULL,'anggota/h7EByIbMh0GCqiQjL9fPvyOs1DVpkUFFbFRhUwsZ.png','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL),(11,'Anggota 6','example@gmail.com','089876536432',7,1,'tes','anggota/OJOfcYTMbCYk3ztzhTYPisLQqpgz8OpcI4zgB8T7.jpg','tes','https://www.tes.com',NULL,'anggota/h7EByIbMh0GCqiQjL9fPvyOs1DVpkUFFbFRhUwsZ.png','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL),(12,'Anggota 6','example@gmail.com','089876536432',7,1,'tes','anggota/OJOfcYTMbCYk3ztzhTYPisLQqpgz8OpcI4zgB8T7.jpg','tes','https://www.tes.com',NULL,'anggota/h7EByIbMh0GCqiQjL9fPvyOs1DVpkUFFbFRhUwsZ.png','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL),(13,'Anggota 6','example@gmail.com','089876536432',7,1,'tes','anggota/OJOfcYTMbCYk3ztzhTYPisLQqpgz8OpcI4zgB8T7.jpg','tes','https://www.tes.com',NULL,'anggota/h7EByIbMh0GCqiQjL9fPvyOs1DVpkUFFbFRhUwsZ.png','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL),(14,'Anggota 6','example@gmail.com','089876536432',7,1,'tes','anggota/OJOfcYTMbCYk3ztzhTYPisLQqpgz8OpcI4zgB8T7.jpg','tes','https://www.tes.com',NULL,'anggota/h7EByIbMh0GCqiQjL9fPvyOs1DVpkUFFbFRhUwsZ.png','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL),(15,'Anggota 6','example@gmail.com','089876536432',7,1,'tes','anggota/OJOfcYTMbCYk3ztzhTYPisLQqpgz8OpcI4zgB8T7.jpg','tes','https://www.tes.com',NULL,'anggota/h7EByIbMh0GCqiQjL9fPvyOs1DVpkUFFbFRhUwsZ.png','https://www.tes.com','https://www.tes.com','https://www.tes.com','https://www.tes.com',NULL,NULL);
/*!40000 ALTER TABLE `anggotas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beritas`
--

DROP TABLE IF EXISTS `beritas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beritas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `berita_judul` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `berita_isi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `berita_foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `berita_kategori` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `berita_tanggal` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beritas`
--

LOCK TABLES `beritas` WRITE;
/*!40000 ALTER TABLE `beritas` DISABLE KEYS */;
INSERT INTO `beritas` VALUES (7,'Lorem Ipsum','<p><strong class=\"ql-size-huge\">What is Lorem Ipsum?</strong> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p><br></p><blockquote>Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC.</blockquote><p><br></p><p>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Where can I get some? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>','berita/87hEkgHsePrSSqBbA9Dc3Dsb3jMjgiKPbNU5ACBf.jpg','Lorem','2025-05-23 00:00:00'),(8,'Lorem Ipsum','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac quam accumsan, dignissim ante eu, semper arcu. Etiam mi libero, gravida ut justo in, hendrerit dignissim mi. Mauris nulla nisi, blandit nec porta ut, scelerisque vitae dui. Aliquam sed mauris vitae erat vehicula varius ac sit amet turpis. Phasellus faucibus nibh enim, vel fermentum turpis pulvinar in. In quis mi at diam pellentesque venenatis a vitae tellus. Duis gravida enim convallis nisl commodo elementum.\r\n\r\nNulla quis venenatis lectus. Nullam rutrum pulvinar lacus, id feugiat erat pharetra convallis. Integer sit amet libero pulvinar, vehicula dolor eu, dignissim ante. In tempus mauris et efficitur pharetra. Vivamus placerat condimentum justo vestibulum consectetur. Etiam venenatis ultrices ligula. Proin lectus nisi, blandit eu convallis condimentum, vulputate in dui. Nam tincidunt odio dolor, nec tristique orci maximus eget. Vestibulum quis velit ac nunc auctor tempor at eu dui. Aenean consectetur vulputate nisl vel pulvinar. Ut tristique viverra erat, at congue tellus ultrices sed. Nullam at magna consectetur, fringilla diam sit amet, tempus lectus. Curabitur malesuada pretium eros et vulputate. Fusce tristique mi vitae eleifend vulputate. Vivamus ac hendrerit felis. Phasellus lacinia nec lacus et pulvinar.\r\n\r\nQuisque dapibus odio ac nunc bibendum euismod. Aliquam dignissim neque condimentum lorem blandit, mollis ullamcorper dolor placerat. Phasellus laoreet dignissim augue id elementum. Nulla tempus a ex nec volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam eu sagittis metus, at dapibus dui. Phasellus mi tortor, porta a odio quis, euismod imperdiet sem. Quisque diam tellus, feugiat ac auctor non, vestibulum nec justo. Nam bibendum, nisl a posuere ornare, tortor mi aliquam turpis, vel lacinia diam turpis non sem. Phasellus quis faucibus nisi. Quisque in dolor in libero facilisis posuere quis ac erat. Maecenas mollis massa lorem. Pellentesque ullamcorper eros efficitur tortor viverra euismod vel non neque. Curabitur in tempor quam.\r\n\r\nPhasellus eu tincidunt magna, vehicula pulvinar eros. Ut lacus erat, venenatis non mollis a, tempor in leo. Praesent maximus ante at urna dapibus dignissim. Etiam tortor tellus, tincidunt in sapien eget, fringilla tempor velit. Proin faucibus elementum tortor a dignissim. Sed auctor est quam, a aliquet tortor rutrum sit amet. Sed tristique lacinia pellentesque. Etiam a pellentesque est. Nam molestie velit non accumsan accumsan. Proin finibus mi id accumsan laoreet. Pellentesque sodales velit eu dolor commodo, a viverra ipsum vehicula.\r\n\r\nDonec rhoncus ipsum vitae nibh tristique placerat. Aliquam auctor lacus non scelerisque efficitur. Sed quis purus dui. Curabitur nisi tortor, elementum in dapibus vitae, viverra eget sem. Proin ut imperdiet arcu. Vivamus leo urna, efficitur sed massa eu, suscipit dictum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut nisl sed felis condimentum vestibulum eget a enim. Aenean at bibendum mauris.','berita/14moJQ8qnQrdmXmQrRokRFLVaoWVTS82FQosLjek.jpg','Inovasi','2025-05-22 00:00:00'),(9,'Lorem Ipsum','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac quam accumsan, dignissim ante eu, semper arcu. Etiam mi libero, gravida ut justo in, hendrerit dignissim mi. Mauris nulla nisi, blandit nec porta ut, scelerisque vitae dui. Aliquam sed mauris vitae erat vehicula varius ac sit amet turpis. Phasellus faucibus nibh enim, vel fermentum turpis pulvinar in. In quis mi at diam pellentesque venenatis a vitae tellus. Duis gravida enim convallis nisl commodo elementum.\r\n\r\nNulla quis venenatis lectus. Nullam rutrum pulvinar lacus, id feugiat erat pharetra convallis. Integer sit amet libero pulvinar, vehicula dolor eu, dignissim ante. In tempus mauris et efficitur pharetra. Vivamus placerat condimentum justo vestibulum consectetur. Etiam venenatis ultrices ligula. Proin lectus nisi, blandit eu convallis condimentum, vulputate in dui. Nam tincidunt odio dolor, nec tristique orci maximus eget. Vestibulum quis velit ac nunc auctor tempor at eu dui. Aenean consectetur vulputate nisl vel pulvinar. Ut tristique viverra erat, at congue tellus ultrices sed. Nullam at magna consectetur, fringilla diam sit amet, tempus lectus. Curabitur malesuada pretium eros et vulputate. Fusce tristique mi vitae eleifend vulputate. Vivamus ac hendrerit felis. Phasellus lacinia nec lacus et pulvinar.\r\n\r\nQuisque dapibus odio ac nunc bibendum euismod. Aliquam dignissim neque condimentum lorem blandit, mollis ullamcorper dolor placerat. Phasellus laoreet dignissim augue id elementum. Nulla tempus a ex nec volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam eu sagittis metus, at dapibus dui. Phasellus mi tortor, porta a odio quis, euismod imperdiet sem. Quisque diam tellus, feugiat ac auctor non, vestibulum nec justo. Nam bibendum, nisl a posuere ornare, tortor mi aliquam turpis, vel lacinia diam turpis non sem. Phasellus quis faucibus nisi. Quisque in dolor in libero facilisis posuere quis ac erat. Maecenas mollis massa lorem. Pellentesque ullamcorper eros efficitur tortor viverra euismod vel non neque. Curabitur in tempor quam.\r\n\r\nPhasellus eu tincidunt magna, vehicula pulvinar eros. Ut lacus erat, venenatis non mollis a, tempor in leo. Praesent maximus ante at urna dapibus dignissim. Etiam tortor tellus, tincidunt in sapien eget, fringilla tempor velit. Proin faucibus elementum tortor a dignissim. Sed auctor est quam, a aliquet tortor rutrum sit amet. Sed tristique lacinia pellentesque. Etiam a pellentesque est. Nam molestie velit non accumsan accumsan. Proin finibus mi id accumsan laoreet. Pellentesque sodales velit eu dolor commodo, a viverra ipsum vehicula.\r\n\r\nDonec rhoncus ipsum vitae nibh tristique placerat. Aliquam auctor lacus non scelerisque efficitur. Sed quis purus dui. Curabitur nisi tortor, elementum in dapibus vitae, viverra eget sem. Proin ut imperdiet arcu. Vivamus leo urna, efficitur sed massa eu, suscipit dictum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut nisl sed felis condimentum vestibulum eget a enim. Aenean at bibendum mauris.','berita/1ZejO4U7ZZZkAC0Xu7NFeNB4hf3zw8BkMNrRs7vU.png','Inovasi','2025-05-21 00:00:00'),(10,'Tes berita','<p><strong class=\"ql-size-large\">Lorem ipsum</strong> <strong><em>dolor sit amet</em></strong>, consectetur adipiscing elit. Aliquam ac quam accumsan, dignissim ante eu, semper arcu. Etiam mi libero, gravida ut justo in, hendrerit dignissim mi. Mauris nulla nisi, blandit nec porta ut, scelerisque vitae dui. Aliquam sed mauris vitae erat vehicula varius ac sit amet turpis. Phasellus faucibus nibh enim, vel fermentum turpis pulvinar in. In quis mi at diam pellentesque venenatis a vitae tellus. Duis gravida enim convallis nisl commodo elementum.</p><p><br></p><blockquote>Nulla quis venenatis lectus. Nullam rutrum pulvinar lacus, id feugiat erat pharetra convallis. Integer sit amet libero pulvinar, vehicula dolor eu, dignissim ante. In tempus mauris et efficitur pharetra. Vivamus placerat condimentum justo vestibulum consectetur. Etiam venenatis ultrices ligula. Proin lectus nisi, blandit eu convallis condimentum, vulputate in dui. Nam tincidunt odio dolor, nec tristique orci maximus eget. Vestibulum quis velit ac nunc auctor tempor at eu dui. Aenean consectetur vulputate nisl vel pulvinar. Ut tristique viverra erat, at congue tellus ultrices sed. Nullam at magna consectetur, fringilla diam sit amet, tempus lectus. Curabitur malesuada pretium eros et vulputate. Fusce tristique mi vitae eleifend vulputate. Vivamus ac hendrerit felis. Phasellus lacinia nec lacus et pulvinar.</blockquote><p><br></p><p>Quisque dapibus odio ac nunc bibendum euismod. Aliquam dignissim neque condimentum lorem blandit, mollis ullamcorper dolor placerat. Phasellus laoreet dignissim augue id elementum. Nulla tempus a ex nec volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam eu sagittis metus, at dapibus dui. Phasellus mi tortor, porta a odio quis, euismod imperdiet sem. Quisque diam tellus, feugiat ac auctor non, vestibulum nec justo. Nam bibendum, nisl a posuere ornare, tortor mi aliquam turpis, vel lacinia diam turpis non sem. Phasellus quis faucibus nisi. Quisque in dolor in libero facilisis posuere quis ac erat. Maecenas mollis massa lorem. Pellentesque ullamcorper eros efficitur tortor viverra euismod vel non neque. Curabitur in tempor quam.</p><p><br></p><p><u>Phasellus eu tincidunt magna, vehicula pulvinar eros. Ut lacus erat, venenatis non mollis a, tempor in leo. Praesent maximus ante at urna dapibus dignissim. Etiam tortor tellus, tincidunt in sapien eget, fringilla tempor velit. Proin faucibus elementum tortor a dignissim. Sed auctor est quam, a aliquet tortor rutrum sit amet. Sed tristique lacinia pellentesque. Etiam a pellentesque est. Nam molestie velit non accumsan accumsan. Proin finibus mi id accumsan laoreet. Pellentesque sodales velit eu dolor commodo, a viverra ipsum vehicula.</u></p><p><br></p><p><em>Donec rhoncus ipsum vitae nibh tristique placerat. Aliquam auctor lacus non scelerisque efficitur. Sed quis purus dui. Curabitur nisi tortor, elementum in dapibus vitae, viverra eget sem. Proin ut imperdiet arcu. Vivamus leo urna, efficitur sed massa eu, suscipit dictum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut nisl sed felis condimentum vestibulum eget a enim. Aenean at bibendum mauris.</em></p>','berita/L97eH02D4yx366j9kcG79vuCksnZYrXBW5Ng7v2i.png','Inovasi','2025-05-22 00:00:00'),(11,'berita 123','<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac quam accumsan, dignissim ante eu, semper arcu. Etiam mi libero, gravida ut justo in, hendrerit dignissim mi. Mauris nulla nisi, blandit nec porta ut, scelerisque vitae dui. Aliquam sed mauris vitae erat vehicula varius ac sit amet turpis. Phasellus faucibus nibh enim, vel fermentum turpis pulvinar in. In quis mi at diam pellentesque venenatis a vitae tellus. Duis gravida enim convallis nisl commodo elementum.</p><p><img src=\"http://localhost:8000/storage/editor_images/editor-1748069023-TvxBZ-editor-image-1748069023164.jpeg\"></p><p><br></p><p>Nulla quis venenatis lectus. Nullam rutrum pulvinar lacus, id feugiat erat pharetra convallis. Integer sit amet libero pulvinar, vehicula dolor eu, dignissim ante. In tempus mauris et efficitur pharetra. Vivamus placerat condimentum justo vestibulum consectetur. Etiam venenatis ultrices ligula. Proin lectus nisi, blandit eu convallis condimentum, vulputate in dui. Nam tincidunt odio dolor, nec tristique orci maximus eget. Vestibulum quis velit ac nunc auctor tempor at eu dui. Aenean consectetur vulputate nisl vel pulvinar. Ut tristique viverra erat, at congue tellus ultrices sed. Nullam at magna consectetur, fringilla diam sit amet, tempus lectus. Curabitur malesuada pretium eros et vulputate. Fusce tristique mi vitae eleifend vulputate. Vivamus ac hendrerit felis. Phasellus lacinia nec lacus et pulvinar.</p>','berita/Nm3DW5zIKUPKu6oALsfLO99hdup8xTfyHZKIj60Q.jpg','Inovasi','2025-05-24 00:00:00'),(12,'Lorem Ipsum','<p>tes</p>','berita/QjvO5dHLPb2GsTFeaqYIgXyqjQ4P8U5GasIJh6rn.jpg','Inovasi','2025-05-27 00:00:00'),(13,'Tes berita 1','<p>tes</p>','berita/YrDS4Pqg15ZDN1U1FzgpSh8GiG7aIwik7JbXRXWO.jpg','Inovasi','2025-05-27 00:00:00'),(14,'Tes berita 2','<p>tes</p>','berita/1hHdxWOShWtEahudRgPrKEg8sCDxi2apC4cgo7Af.jpg','Inovasi','2025-05-27 00:00:00'),(15,'berita 1','<p>tes</p>',NULL,'Inovasi','2025-05-27 00:00:00'),(16,'Tes berita','<p>tes</p>',NULL,'Inovasi','2025-05-27 00:00:00'),(17,'Tes berita','<p>tes</p>',NULL,'Inovasi','2025-05-27 00:00:00');
/*!40000 ALTER TABLE `beritas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bidangs`
--

DROP TABLE IF EXISTS `bidangs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bidangs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `bidang_nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bidangs`
--

LOCK TABLES `bidangs` WRITE;
/*!40000 ALTER TABLE `bidangs` DISABLE KEYS */;
INSERT INTO `bidangs` VALUES (1,'Tekstil'),(2,'Bidang2'),(3,'Industri'),(4,'Otomotif');
/*!40000 ALTER TABLE `bidangs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_upload`
--

DROP TABLE IF EXISTS `image_upload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_upload` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mime_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_upload`
--

LOCK TABLES `image_upload` WRITE;
/*!40000 ALTER TABLE `image_upload` DISABLE KEYS */;
INSERT INTO `image_upload` VALUES (1,'editor-1748062645-RWe00-placeholder.jpg','editor_images/editor-1748062645-RWe00-placeholder.jpg','image/jpeg',4357,'2025-05-24 04:57:25','2025-05-24 04:57:25'),(2,'editor-1748062665-rtygt-placeholder.jpg','editor_images/editor-1748062665-rtygt-placeholder.jpg','image/jpeg',4357,'2025-05-24 04:57:45','2025-05-24 04:57:45'),(3,'editor-1748062888-I7tVu-placeholder.jpg','editor_images/editor-1748062888-I7tVu-placeholder.jpg','image/jpeg',4357,'2025-05-24 05:01:28','2025-05-24 05:01:28'),(4,'editor-1748067543-cjtj6-placeholder.jpg','editor_images/editor-1748067543-cjtj6-placeholder.jpg','image/jpeg',4357,'2025-05-24 06:19:03','2025-05-24 06:19:03'),(5,'editor-1748067652-MPxtr-placeholder.jpg','editor_images/editor-1748067652-MPxtr-placeholder.jpg','image/jpeg',4357,'2025-05-24 06:20:52','2025-05-24 06:20:52'),(6,'editor-1748068030-N2itN-editor-image-1748068030734.jpeg','editor_images/editor-1748068030-N2itN-editor-image-1748068030734.jpeg','image/jpeg',4357,'2025-05-24 06:27:10','2025-05-24 06:27:10'),(7,'editor-1748068516-vabQS-editor-image-1748068516490.jpeg','editor_images/editor-1748068516-vabQS-editor-image-1748068516490.jpeg','image/jpeg',4357,'2025-05-24 06:35:16','2025-05-24 06:35:16'),(8,'editor-1748069023-TvxBZ-editor-image-1748069023164.jpeg','editor_images/editor-1748069023-TvxBZ-editor-image-1748069023164.jpeg','image/jpeg',4357,'2025-05-24 06:43:43','2025-05-24 06:43:43');
/*!40000 ALTER TABLE `image_upload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jabatans`
--

DROP TABLE IF EXISTS `jabatans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jabatans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `jabatan_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jabatans`
--

LOCK TABLES `jabatans` WRITE;
/*!40000 ALTER TABLE `jabatans` DISABLE KEYS */;
INSERT INTO `jabatans` VALUES (1,'Ketua Umum'),(3,'Wakil Ketua Umum 1'),(4,'Wakil Ketua Umum 2'),(5,'Wakil Ketua Umum 3'),(6,'Sekretaris Umum'),(7,'Bendahara Umum');
/*!40000 ALTER TABLE `jabatans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategori`
--

DROP TABLE IF EXISTS `kategori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategori` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kategori_nama` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kategori_kategori_nama_unique` (`kategori_nama`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategori`
--

LOCK TABLES `kategori` WRITE;
/*!40000 ALTER TABLE `kategori` DISABLE KEYS */;
INSERT INTO `kategori` VALUES (1,'Inovasi'),(2,'Pelatihan');
/*!40000 ALTER TABLE `kategori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kegiatans`
--

DROP TABLE IF EXISTS `kegiatans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kegiatans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kegiatan_judul` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kegiatan_isi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `kegiatan_foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kegiatan_kategori` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kegiatan_tanggal` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kegiatan_waktu` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kegiatan_lokasi` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kegiatans`
--

LOCK TABLES `kegiatans` WRITE;
/*!40000 ALTER TABLE `kegiatans` DISABLE KEYS */;
INSERT INTO `kegiatans` VALUES (3,'Lorem Ipsum','What is Lorem Ipsum?\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','kegiatan/UR8oICCm7tnZftgF4FAWk2MJGndVyLgrlUu2EGVw.jpg','LoremIpsum','2025-05-22','10:00','Hotel Patra'),(5,'Lorem Ipsum 3','Why do we use it?\r\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',NULL,'LoremIpsum','2025-05-31','13:00','Hotel'),(6,'Lorem Ipsum','Quisque dapibus odio ac nunc bibendum euismod. Aliquam dignissim neque condimentum lorem blandit, mollis ullamcorper dolor placerat. Phasellus laoreet dignissim augue id elementum. Nulla tempus a ex nec volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam eu sagittis metus, at dapibus dui. Phasellus mi tortor, porta a odio quis, euismod imperdiet sem. Quisque diam tellus, feugiat ac auctor non, vestibulum nec justo. Nam bibendum, nisl a posuere ornare, tortor mi aliquam turpis, vel lacinia diam turpis non sem. Phasellus quis faucibus nisi. Quisque in dolor in libero facilisis posuere quis ac erat. Maecenas mollis massa lorem. Pellentesque ullamcorper eros efficitur tortor viverra euismod vel non neque. Curabitur in tempor quam.\r\n\r\nPhasellus eu tincidunt magna, vehicula pulvinar eros. Ut lacus erat, venenatis non mollis a, tempor in leo. Praesent maximus ante at urna dapibus dignissim. Etiam tortor tellus, tincidunt in sapien eget, fringilla tempor velit. Proin faucibus elementum tortor a dignissim. Sed auctor est quam, a aliquet tortor rutrum sit amet. Sed tristique lacinia pellentesque. Etiam a pellentesque est. Nam molestie velit non accumsan accumsan. Proin finibus mi id accumsan laoreet. Pellentesque sodales velit eu dolor commodo, a viverra ipsum vehicula.',NULL,'LoremIpsum','2025-05-22','09:00','Hotel Patra'),(7,'Lorem Ipsum 5','Quisque dapibus odio ac nunc bibendum euismod. Aliquam dignissim neque condimentum lorem blandit, mollis ullamcorper dolor placerat. Phasellus laoreet dignissim augue id elementum. Nulla tempus a ex nec volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam eu sagittis metus, at dapibus dui. Phasellus mi tortor, porta a odio quis, euismod imperdiet sem. Quisque diam tellus, feugiat ac auctor non, vestibulum nec justo. Nam bibendum, nisl a posuere ornare, tortor mi aliquam turpis, vel lacinia diam turpis non sem. Phasellus quis faucibus nisi. Quisque in dolor in libero facilisis posuere quis ac erat. Maecenas mollis massa lorem. Pellentesque ullamcorper eros efficitur tortor viverra euismod vel non neque. Curabitur in tempor quam.\r\n\r\nPhasellus eu tincidunt magna, vehicula pulvinar eros. Ut lacus erat, venenatis non mollis a, tempor in leo. Praesent maximus ante at urna dapibus dignissim. Etiam tortor tellus, tincidunt in sapien eget, fringilla tempor velit. Proin faucibus elementum tortor a dignissim. Sed auctor est quam, a aliquet tortor rutrum sit amet. Sed tristique lacinia pellentesque. Etiam a pellentesque est. Nam molestie velit non accumsan accumsan. Proin finibus mi id accumsan laoreet. Pellentesque sodales velit eu dolor commodo, a viverra ipsum vehicula.',NULL,'Inovasi','2025-05-22','09:00','Hotel Patra'),(8,'Kegiatan tes','tes',NULL,'tes','2025-05-27','09:00','Hotel Patra'),(9,'Kegiatan tes','tes',NULL,'Inovasi','2025-05-27','09:00','Hotel'),(10,'Kegiatan tes','tes',NULL,'Inovasi','2025-05-27','09:00','Hotel'),(11,'Kegiatan tes','tes',NULL,'Inovasi','2025-05-27','09:00','Hotel'),(12,'Kegiatan tes','tes',NULL,'Inovasi','2025-05-27','09:00','Hotel'),(13,'Kegiatan tes','tes',NULL,'Inovasi','2025-05-27','09:00','Hotel'),(14,'Kegiatan tes','tes',NULL,'Inovasi','2025-05-27','09:00','Hotel');
/*!40000 ALTER TABLE `kegiatans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kontak`
--

DROP TABLE IF EXISTS `kontak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kontak` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kontak_alamat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kontak_telepon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kontak_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kontak_maps` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kontak`
--

LOCK TABLES `kontak` WRITE;
/*!40000 ALTER TABLE `kontak` DISABLE KEYS */;
INSERT INTO `kontak` VALUES (1,'Jl. Kanggraksan No.30, Harjamukti, Kec. Harjamukti, Kota Cirebon, Jawa Barat 45143','+62 812 2871 8278','halo@hipmicirebon.org','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.3660000000003!2d108.55880000000001!3d-6.720000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1d8ebc1e231d%3A0x3c8a6b75f9b0b075!2sAlun-Alun%20Kejaksan%20Cirebon!5e0!3m2!1sid!2sid!4v1678886400000!5m2!1sid!2sid');
/*!40000 ALTER TABLE `kontak` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `landing_page_components`
--

DROP TABLE IF EXISTS `landing_page_components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `landing_page_components` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `section` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `type` enum('text','image') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'text',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `landing_page_components`
--

LOCK TABLES `landing_page_components` WRITE;
/*!40000 ALTER TABLE `landing_page_components` DISABLE KEYS */;
INSERT INTO `landing_page_components` VALUES (1,'hero','image_1','landing/BZONGN6k04rCD4CGHcjsLSJsfQmOCltL80AjEL62.jpg','image',1,'2025-05-23 09:50:07','2025-05-26 06:12:39'),(2,'hero','image_2','landing/LndT3C8N9AsfEnSNCZAN7FmxVHFb7vrfObXPp7tz.jpg','image',2,'2025-05-23 09:50:07','2025-05-26 03:01:30'),(3,'hero','image_3','landing/pnMuyleMDit3auqupvsTIERyPw6b0lK4urdIuBA9.jpg','image',3,'2025-05-23 09:50:07','2025-05-26 03:01:30'),(4,'hero','text_main','<p>Bergabunglah bersama organisasi pengusaha muda terbesar di Indonesia</p>','text',4,'2025-05-23 09:50:07','2025-05-26 06:12:11'),(5,'aboutus','text','<p>Kami adalah organisasi yang berdedikasi untuk memajukan pengusaha muda di Kota Cirebon. Dengan berbagai program dan jaringan yang luas, kami berkomitmen untuk menciptakan ekosistem wirausaha yang dinamis dan inovatif.</p>','text',1,'2025-05-23 09:50:07','2025-05-23 14:26:01'),(6,'aboutus','image','landing/IujW0ujr0zOFiOGN05Y75mSIuVW2J5R25k05mqXK.jpg','image',2,'2025-05-23 09:50:07','2025-05-26 03:01:41'),(7,'visimisi','visi','<p>Menjadi organisasi pencetak pengusaha muda dan pembentuk ekosistem wirausaha terbaik di Kota Cirebon melalui program kerja yang tepat inovatif dengan semangat dan marwah organisasi HIPMI.</p>','text',1,'2025-05-23 09:50:07','2025-05-23 13:09:02'),(8,'visimisi','misi','<p>1. Bangun koneksi dan kolaborasi dengan semangat inovasi dan optimalisasi.</p><p>2. Pengembangan ilmu dan kompetensi untuk anggota.</p><p>3. Membantu solusi modal dan akses pasar untuk anggota.</p><p>4. Menyebarkan semangat kewirausahaan di Kota Cirebon.</p>','text',2,'2025-05-23 09:50:07','2025-05-23 14:26:02'),(9,'photoslide','slide_1','landing/Ui8X0qV8BPPfW0WkbbZfXE8W0ZkHHVSx3TWUu1bi.jpg','image',1,'2025-05-23 09:50:07','2025-05-26 03:02:01'),(10,'photoslide','slide_2','landing/mkG1mEHvvQ7Kk9MZe9GOaXNjGdmVjoVoBDskx0zk.jpg','image',2,'2025-05-23 09:50:07','2025-05-26 03:02:02'),(11,'photoslide','slide_3','landing/gASI9JWlv7EpLVg8kSzkZ5fm0OjVsmtNYfvvXGnK.jpg','image',3,'2025-05-23 09:50:07','2025-05-26 03:02:02'),(12,'anggota','description','<p>HIPMI Kota Cirebon adalah wadah bagi para pengusaha muda untuk bertumbuh, berkolaborasi, dan berkontribusi. Sebagai anggota, Anda akan mendapatkan akses ke berbagai program pengembangan diri, jaringan bisnis yang luas, serta kesempatan untuk terlibat dalam advokasi kebijakan yang mendukung ekosistem wirausaha.</p>','text',1,'2025-05-23 09:50:07','2025-05-23 12:41:48'),(13,'anggota','image','landing/qNBQY6JPp6l1W12tW06NASG5BK1CiFPr5MZ12hYR.jpg','image',2,'2025-05-23 09:50:07','2025-05-26 06:06:09'),(14,'photoslide','slide_4','landing/sabC2Jthh8ZXA49o72wg3gtjytaWArvSqRqqFU5x.jpg','image',4,'2025-05-23 09:50:07','2025-05-26 03:02:02'),(15,'photoslide','slide_5','landing/K49NNBwcw0EM6iZpowqyXtt8UeMuDzX008RpdivB.jpg','image',5,'2025-05-23 09:50:07','2025-05-26 03:02:02'),(16,'hero','infobox_1_title','48','text',5,NULL,NULL),(17,'hero','infobox_1_description','Tahun Berdiri','text',6,NULL,NULL),(18,'hero','infobox_2_title','6','text',7,NULL,NULL),(19,'hero','infobox_2_description','Cabang','text',8,NULL,NULL),(20,'hero','infobox_3_title','3000','text',9,NULL,NULL),(21,'hero','infobox_3_description','Anggota Aktif','text',10,NULL,NULL),(22,'hero','infobox_4_title','171','text',11,NULL,NULL),(23,'hero','infobox_4_description','Pengurus Inti','text',12,NULL,NULL),(24,'footer','description','1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac quam accumsan, dignissim ante eu, semper arcu. Etiam mi libero, gravida ut justo in, hendrerit dignissim mi.','text',2,NULL,'2025-05-24 09:02:39'),(25,'footer','address_line_1','Jl. Contoh Alamat No. 123,','text',3,NULL,'2025-05-26 02:36:09'),(26,'footer','address_line_2','Kota Cirebon, Jawa Barat, 45111','text',4,NULL,'2025-05-26 02:36:09'),(27,'footer','email_address','mail@example.com','text',5,NULL,'2025-05-24 09:02:39'),(28,'footer','faceook_url','https://www.facebok.com','text',6,NULL,NULL),(29,'footer','instagram_url','https://www.instagram.com','text',7,NULL,NULL),(30,'footer','twitter_url','https://www.x.com','text',8,NULL,NULL),(31,'footer','tiktok_url','https://www.tiktok.com','text',9,NULL,NULL),(32,'footer','logo_image','landing/VbaoxkggbS3JUpmkUKO9awZUchPTP5Wp4MM7j7B9.png','image',1,NULL,'2025-05-26 06:12:59'),(33,'photoslide','slide_6','landing/13xgwzWMU4t5tFicNOjj7gy3Opd1oyEQbd54iObc.jpg','image',6,'2025-05-23 09:50:07','2025-05-26 05:15:53'),(34,'photoslide','slide_7','landing/Ahuy12Y4nUzI9O0gDjOyKeeNNzskq0wrdGiASzyD.jpg','image',7,'2025-05-23 09:50:07','2025-05-26 05:15:53'),(35,'photoslide','slide_8','landing/GWdNTcyZiDbJBVbw7wvhinkds1t8xZs7TGR1Lu6j.jpg','image',8,'2025-05-23 09:50:07','2025-05-26 05:15:53');
/*!40000 ALTER TABLE `landing_page_components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (21,'2014_10_12_000000_create_users_table',1),(22,'2014_10_12_100000_create_password_reset_tokens_table',1),(23,'2019_08_19_000000_create_failed_jobs_table',1),(24,'2019_12_14_000001_create_personal_access_tokens_table',1),(42,'2025_05_21_014837_create_jabatans_table',2),(43,'2025_05_21_014848_create_bidangs_table',3),(44,'2025_05_19_042002_create_anggotas_table',4),(45,'2025_05_19_042002_create_beritas_table',5),(46,'2025_05_19_042002_create_kegiatans_table',5),(47,'2025_05_22_051941_add_lokasi_to_kegiatans_table',6),(48,'2025_05_22_082816_add_anggota_pengalaman_to_anggota_table',7),(51,'2025_05_23_022754_create_sejarah_table',8),(53,'2025_05_23_080647_create_landing_page_components_table',9),(54,'2025_05_24_043854_create_image_upload_table',10),(56,'2025_05_25_114742_create_kontak_table',11),(57,'2025_05_27_043435_create_kategori_table',12),(59,'2025_05_27_071742_create_pesans_table',13);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'Hipmi','8577bc002348e6eabc3a979899441fe750f7af2466a9972c9c686b5e3f8bd20c','[\"*\"]','2025-05-21 03:24:14',NULL,'2025-05-21 03:04:25','2025-05-21 03:24:14'),(2,'App\\Models\\User',1,'Hipmi','d1b6799d0fc6282251c5cce4ec755d4f0668640b5b4fa4c84c575d223b297766','[\"*\"]','2025-05-21 08:40:41',NULL,'2025-05-21 03:45:16','2025-05-21 08:40:41'),(3,'App\\Models\\User',1,'Hipmi','3fd9326a364f66891140133973b4b1988b223259cf9a5cd7b7e790cf7628c0e9','[\"*\"]','2025-05-21 10:28:40',NULL,'2025-05-21 08:57:34','2025-05-21 10:28:40'),(4,'App\\Models\\User',1,'Hipmi','a576cb48862fbfd493e65f4e090b4b5215f81594c82c8a2bf1672c6462829b9d','[\"*\"]','2025-05-21 09:31:19',NULL,'2025-05-21 09:27:55','2025-05-21 09:31:19'),(5,'App\\Models\\User',1,'Hipmi','90791117879ea7ff78d527124507cb2dfc1b842a511270a677198f2740ab815f','[\"*\"]','2025-05-21 09:31:44',NULL,'2025-05-21 09:31:29','2025-05-21 09:31:44'),(6,'App\\Models\\User',1,'Hipmi','87c6636866a3bd79d40ea8cf72e0123f16a13deb48b98b57bc19342c87cd131c','[\"*\"]','2025-05-21 09:32:25',NULL,'2025-05-21 09:31:49','2025-05-21 09:32:25'),(7,'App\\Models\\User',1,'Hipmi','da3663dc7117f47db431fc6c02ae04e1f6fae32771a70dad5f28d318b280fb0c','[\"*\"]','2025-05-21 09:32:35',NULL,'2025-05-21 09:32:29','2025-05-21 09:32:35'),(8,'App\\Models\\User',1,'Hipmi','773f541d7fd6484199917f3585a32ed88ba15d0689caad6ced51a9ef97196fbc','[\"*\"]','2025-05-21 09:32:51',NULL,'2025-05-21 09:32:39','2025-05-21 09:32:51'),(9,'App\\Models\\User',1,'Hipmi','1a8735a8047a426d46a4a4cc33f49b74933f0a96579379dcf1a733014faa486e','[\"*\"]','2025-05-21 09:32:58',NULL,'2025-05-21 09:32:56','2025-05-21 09:32:58'),(10,'App\\Models\\User',1,'Hipmi','50f7af2486265ec29e66e3ef9d1f9fa6b70804e3872cbd2b88add6f0dbbff6d9','[\"*\"]','2025-05-21 11:32:34',NULL,'2025-05-21 09:33:41','2025-05-21 11:32:34'),(11,'App\\Models\\User',1,'Hipmi','689f0a5826054418f28b4ad5aebcfd5b9baacf0e5d977d63e9789bfd918ebe43','[\"*\"]','2025-05-21 11:39:41',NULL,'2025-05-21 11:32:39','2025-05-21 11:39:41'),(12,'App\\Models\\User',1,'Hipmi','12522d7151e79f091d87667073932315d2b28fb2406216b44613763920d4c321','[\"*\"]','2025-05-21 11:46:01',NULL,'2025-05-21 11:46:00','2025-05-21 11:46:01'),(13,'App\\Models\\User',1,'Hipmi','c160c06041e54d0563f3479872364eb02dd5814328032f85dada251cbed5009c','[\"*\"]','2025-05-21 14:28:21',NULL,'2025-05-21 13:58:13','2025-05-21 14:28:21'),(14,'App\\Models\\User',1,'Hipmi','2d6c6d7d1f564866f1f6a185631d6f238cb6930cda84d318b2f77a96fb225968','[\"*\"]','2025-05-21 14:42:21',NULL,'2025-05-21 14:33:25','2025-05-21 14:42:21'),(15,'App\\Models\\User',1,'Hipmi','92b472242dc328e04e4d7769581d4ae771d06804179e2b823f7608fe785cb80f','[\"*\"]','2025-05-22 03:20:10',NULL,'2025-05-21 14:42:31','2025-05-22 03:20:10'),(16,'App\\Models\\User',1,'Hipmi','8e83a9dc946f31de0c2ceeb3c84884dd63cf7cc3e6abad1c93e2bfd1cb0c33bb','[\"*\"]','2025-05-22 04:41:36',NULL,'2025-05-22 03:34:33','2025-05-22 04:41:36'),(17,'App\\Models\\User',1,'Hipmi','3d31f8347b03e163605c72bc8597dfb4af345a324ef3cf924f30ff0ec674dcef','[\"*\"]','2025-05-22 05:15:38',NULL,'2025-05-22 04:55:17','2025-05-22 05:15:38'),(18,'App\\Models\\User',1,'Hipmi','cb2563d7fc61fc547157676dc7c803cda359ed2f03aeee16d31cf27269ad22d5','[\"*\"]','2025-05-22 07:23:49',NULL,'2025-05-22 05:35:46','2025-05-22 07:23:49'),(19,'App\\Models\\User',1,'Hipmi','080ae1715356e7b3b84359d05b77c3b648fae877e571ee1764f9d4a007d3fad5','[\"*\"]','2025-05-22 09:12:03',NULL,'2025-05-22 07:28:07','2025-05-22 09:12:03'),(20,'App\\Models\\User',1,'Hipmi','764e4666a79724524fc67df21ff3530af2e5444fecccf6ed6db8e17b46cfc00f','[\"*\"]','2025-05-23 02:22:17',NULL,'2025-05-22 13:41:18','2025-05-23 02:22:17'),(21,'App\\Models\\User',1,'Hipmi','d7b43fa290ab356b84f253e2dbdc27845b2b38c6da3933c88b6943ba82205338','[\"*\"]','2025-05-23 02:56:15',NULL,'2025-05-23 02:51:22','2025-05-23 02:56:15'),(22,'App\\Models\\User',1,'Hipmi','c150fa87106f98f494300377534358fd215f3896256a2602b8d320b06ae09410','[\"*\"]','2025-05-23 07:13:53',NULL,'2025-05-23 03:06:45','2025-05-23 07:13:53'),(23,'App\\Models\\User',1,'Hipmi','7f3c7de0369a497da805770c4834d30e0f9d9dd6be9453db62418df4b8626b02','[\"*\"]','2025-05-23 09:09:23',NULL,'2025-05-23 08:37:19','2025-05-23 09:09:23'),(24,'App\\Models\\User',1,'Hipmi','88693f1aa9cd0f047c3ebb8763f27d36dd04f053b765b541f44c465cc6a34cb4','[\"*\"]','2025-05-23 09:46:10',NULL,'2025-05-23 09:13:46','2025-05-23 09:46:10'),(25,'App\\Models\\User',1,'Hipmi','71edbdecc1132ee8e79bdaa6a169659155d17357666a644c1b03f5a4db2420a0','[\"*\"]','2025-05-23 15:50:06',NULL,'2025-05-23 09:50:25','2025-05-23 15:50:06'),(26,'App\\Models\\User',1,'Hipmi','dc56671dca6579b04ef8c88075b957f13721ef86425e7e1bdc82e5e6f02839b0','[\"*\"]','2025-05-24 08:33:54',NULL,'2025-05-24 04:54:52','2025-05-24 08:33:54'),(27,'App\\Models\\User',1,'Hipmi','9c4203e1892127c912e2f84dcac8f9d77c3bde880ff01c58d5b2f4d694f62b39','[\"*\"]','2025-05-24 09:21:40',NULL,'2025-05-24 08:49:27','2025-05-24 09:21:40'),(28,'App\\Models\\User',1,'Hipmi','73d881f49dc662779cccadedfc84b86ec299add8e121c637ada8df3f5bfc0e76','[\"*\"]','2025-05-25 16:06:30',NULL,'2025-05-25 12:12:26','2025-05-25 16:06:30'),(29,'App\\Models\\User',1,'Hipmi','105bad85114a961d206eb34c37a529d35d6f46f51ca31ae6530a2149595f1816','[\"*\"]','2025-05-26 02:34:23',NULL,'2025-05-26 02:34:07','2025-05-26 02:34:23'),(30,'App\\Models\\User',1,'Hipmi','c870278eafa6691d3831a3251a462de92bc1128aa74c6602db114118d63f9453','[\"*\"]','2025-05-26 05:55:32',NULL,'2025-05-26 02:34:36','2025-05-26 05:55:32'),(31,'App\\Models\\User',1,'Hipmi','f49f9dc0c4910c7adc5a2b50acc1e87ce76dff6ff9529b711561be541dae2fda','[\"*\"]','2025-05-26 05:57:05',NULL,'2025-05-26 05:55:38','2025-05-26 05:57:05'),(32,'App\\Models\\User',1,'Hipmi','63106eafa66527ad5093e3872dda55fce13567d8854181056b0d84d8bbadd5f1','[\"*\"]','2025-05-26 06:24:57',NULL,'2025-05-26 05:57:22','2025-05-26 06:24:57'),(33,'App\\Models\\User',1,'Hipmi','f012c2a67d7c3e8eef7fb128fa93b01ab24b8fd4572c835a3e74a78fd1fc7cff','[\"*\"]','2025-05-26 06:53:31',NULL,'2025-05-26 06:25:04','2025-05-26 06:53:31'),(34,'App\\Models\\User',1,'Hipmi','25a6241c897a90ec8031a2763b0a68b41a612919c5fa51b359f8845751b9068f','[\"*\"]','2025-05-26 06:54:03',NULL,'2025-05-26 06:53:49','2025-05-26 06:54:03'),(35,'App\\Models\\User',1,'Hipmi','b9bdcc251858a8cffbf8b98ff2450fb3cedc072047933ba17dc5f89d0225706e','[\"*\"]','2025-05-27 04:33:46',NULL,'2025-05-26 22:25:52','2025-05-27 04:33:46'),(36,'App\\Models\\User',1,'Hipmi','fe813c5750f65ec4170b3352495a1bff12fc75a716b6a35ead0d82b7a8252e10','[\"*\"]','2025-05-27 06:00:43',NULL,'2025-05-27 04:56:05','2025-05-27 06:00:43'),(37,'App\\Models\\User',1,'Hipmi','2eb6310204daf48f4ece8f82752c8b1807bbc2c87a8566ed0a012ffdd35588d5','[\"*\"]','2025-05-27 06:29:13',NULL,'2025-05-27 06:00:49','2025-05-27 06:29:13'),(38,'App\\Models\\User',1,'Hipmi','a0850f96148fb144a4f7274c995b471c6736b26eb0307b833df9b608f9d9f837','[\"*\"]','2025-05-27 06:32:13',NULL,'2025-05-27 06:29:33','2025-05-27 06:32:13'),(39,'App\\Models\\User',1,'Hipmi','0b73ee6d36d5a833a793b6e31d2ad77a9c38c51c52ada25df58b51ade3e4462a','[\"*\"]','2025-05-27 13:25:58',NULL,'2025-05-27 08:02:20','2025-05-27 13:25:58'),(40,'App\\Models\\User',1,'Hipmi','1f4d2cb166773220c00364556594819d066936cdc7d4055a7483454106ed6c03','[\"*\"]','2025-05-27 13:49:19',NULL,'2025-05-27 13:26:13','2025-05-27 13:49:19');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pesan`
--

DROP TABLE IF EXISTS `pesan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pesan` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `pesan_nama` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesan_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesan_subjek` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesan_isi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesan_status` enum('pending','read','replied') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pesan`
--

LOCK TABLES `pesan` WRITE;
/*!40000 ALTER TABLE `pesan` DISABLE KEYS */;
INSERT INTO `pesan` VALUES (2,'Andi','example@gmail.com','Pendaftaran','tes pesan','replied','2025-05-27 08:12:33','2025-05-27 08:45:01'),(3,'Andi','example@gmail.com','Pendaftaran','tes','replied','2025-05-27 08:57:38','2025-05-27 09:08:26'),(5,'Andi','example@gmail.com','Pendaftaran','tes','read','2025-05-27 09:11:25','2025-05-27 09:11:31'),(6,'Agus','example@gmail.com','Pendaftaran','tes','read','2025-05-27 09:14:08','2025-05-27 09:18:44');
/*!40000 ALTER TABLE `pesan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sejarah`
--

DROP TABLE IF EXISTS `sejarah`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sejarah` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `sejarah_konten` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sejarah_foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sejarah`
--

LOCK TABLES `sejarah` WRITE;
/*!40000 ALTER TABLE `sejarah` DISABLE KEYS */;
INSERT INTO `sejarah` VALUES (1,'<h2 class=\"ql-align-justify\"><strong>Lorem ipsum !</strong></h2><p class=\"ql-align-justify\">dolor sit amet, consectetur adipiscing elit. Aliquam ac quam accumsan, dignissim ante eu, semper arcu. Etiam mi libero, gravida ut justo in, hendrerit dignissim mi. Mauris nulla nisi, blandit nec porta ut, scelerisque vitae dui. Aliquam sed mauris vitae erat vehicula varius ac sit amet turpis. Phasellus faucibus nibh enim, vel fermentum turpis pulvinar in. In quis mi at diam pellentesque venenatis a vitae tellus. Duis gravida enim convallis nisl commodo elementum.</p><h2><strong>Nulla quis venenatis lectusz.</strong></h2><p>Nullam rutrum pulvinar lacus, id feugiat erat pharetra convallis. Integer sit amet libero pulvinar, vehicula dolor eu, dignissim ante. In tempus mauris et efficitur pharetra. Vivamus placerat condimentum justo vestibulum consectetur. Etiam venenatis ultrices ligula. Proin lectus nisi, blandit eu convallis condimentum, vulputate in dui. Nam tincidunt odio dolor, nec tristique orci maximus eget. Vestibulum quis velit ac nunc auctor tempor at eu dui. Aenean consectetur vulputate nisl vel pulvinar. Ut tristique viverra erat, at congue tellus ultrices sed. Nullam at magna consectetur, fringilla diam sit amet, tempus lectus. Curabitur malesuada pretium eros et vulputate. Fusce tristique mi vitae eleifend vulputate. Vivamus ac hendrerit felis. Phasellus lacinia nec lacus et pulvinar.</p><p class=\"ql-align-justify\"><br></p>','sejarah/RSbvTyG9eKuCJiJTBBGGyTVRis3N4vUa83xxENdA.jpg');
/*!40000 ALTER TABLE `sejarah` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin@example.com',NULL,'$2y$12$uoLuOR2DHTjN4jhmfbXq1Ogcmz3zLOm4TJA.IF3WFd.bRSvSeC1We',NULL,'2025-05-21 03:04:06','2025-05-27 06:29:14');
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

-- Dump completed on 2025-05-27 14:06:58
