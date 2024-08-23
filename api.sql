-- --------------------------------------------------------
-- Host:                         localhost
-- Versione server:              PostgreSQL 15.8 (Debian 15.8-1.pgdg120+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 12.2.0-14) 12.2.0, 64-bit
-- S.O. server:                  
-- HeidiSQL Versione:            12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dump della struttura di tabella public.blog
CREATE TABLE IF NOT EXISTS "blog" (
	"id" UUID NOT NULL DEFAULT gen_random_uuid(),
	"slug" VARCHAR(256) NOT NULL,
	"name" VARCHAR(256) NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE "blog_slug_unique" ("slug")
);

-- L’esportazione dei dati non era selezionata.

-- Dump della struttura di tabella public.post
CREATE TABLE IF NOT EXISTS "post" (
	"id" UUID NOT NULL DEFAULT gen_random_uuid(),
	"title" TEXT NULL DEFAULT NULL,
	"content" TEXT NOT NULL,
	"viewCount" INTEGER NULL DEFAULT 0,
	"blog_id" UUID NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "post_blog_id_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blog" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- L’esportazione dei dati non era selezionata.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
