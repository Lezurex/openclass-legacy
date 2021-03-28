/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 22:43
 */

-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Erstellungszeit: 28. Mrz 2021 um 21:42
-- Server-Version: 10.5.8-MariaDB-1:10.5.8+maria~focal
-- PHP-Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `openclass`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `classes`
--

INSERT INTO `classes` (`id`, `name`) VALUES
(1, 'BIN20a'),
(2, 'AP20b');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `classRelation`
--

CREATE TABLE `classRelation` (
  `id` int(11) NOT NULL,
  `FK_user` int(11) NOT NULL,
  `FK_class` int(11) NOT NULL,
  `FK_role` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `classRelation`
--

INSERT INTO `classRelation` (`id`, `FK_user`, `FK_class`, `FK_role`) VALUES
(4, 1, 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `emailVerify`
--

CREATE TABLE `emailVerify` (
  `newEmail` varchar(45) NOT NULL,
  `code` varchar(6) NOT NULL,
  `expires` datetime NOT NULL,
  `FK_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `addTasks` tinyint(4) NOT NULL DEFAULT 0,
  `editTasks` tinyint(4) NOT NULL DEFAULT 0,
  `deleteTasks` tinyint(4) NOT NULL DEFAULT 0,
  `manageSubjects` tinyint(4) NOT NULL DEFAULT 0,
  `FK_class` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `roles`
--

INSERT INTO `roles` (`id`, `name`, `addTasks`, `editTasks`, `deleteTasks`, `manageSubjects`, `FK_class`) VALUES
(1, 'Editor', 1, 1, 1, 0, 1),
(2, 'Opfer', 0, 0, 0, 0, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `teacher` varchar(45) DEFAULT NULL,
  `FK_class` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `teacher`, `FK_class`) VALUES
(1, 'JavaScript', 'Mr. Right', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `body` text DEFAULT NULL,
  `dueDate` datetime NOT NULL,
  `FK_subject` int(11) NOT NULL,
  `FK_class` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `body`, `dueDate`, `FK_subject`, `FK_class`) VALUES
(1, 'Read the docs', 'Read the JavScript documentation.', '2021-08-01 12:42:00', 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ticks`
--

CREATE TABLE `ticks` (
  `id` int(11) NOT NULL,
  `FK_task` int(11) NOT NULL,
  `FK_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `ticks`
--

INSERT INTO `ticks` (`id`, `FK_task`, `FK_user`) VALUES
(4, 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `isAdmin` tinyint(4) NOT NULL DEFAULT 0,
  `FK_settings` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstname`, `lastname`, `isAdmin`, `FK_settings`) VALUES
(1, 'max.mustermann@mustermail.de', '$2b$10$Tmw9Bz6Ni444RUGbRVDNqOl9lr8hCcDADATunoWQnV7W3IcPvHvVi', NULL, NULL, 1, NULL);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `classRelation`
--
ALTER TABLE `classRelation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_user_idx` (`FK_user`),
  ADD KEY `FK_class_idx` (`FK_class`),
  ADD KEY `FK_role_idx` (`FK_role`);

--
-- Indizes für die Tabelle `emailVerify`
--
ALTER TABLE `emailVerify`
  ADD UNIQUE KEY `FK_user_UNIQUE` (`FK_user`),
  ADD KEY `FK_user_idx` (`FK_user`);

--
-- Indizes für die Tabelle `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_class_idx` (`FK_class`);

--
-- Indizes für die Tabelle `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_class_idx` (`FK_class`);

--
-- Indizes für die Tabelle `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_class_idx` (`FK_class`),
  ADD KEY `FK_subject_idx` (`FK_subject`);

--
-- Indizes für die Tabelle `ticks`
--
ALTER TABLE `ticks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_task_idx` (`FK_task`),
  ADD KEY `FK_user_idx` (`FK_user`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_settings_idx` (`FK_settings`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `classRelation`
--
ALTER TABLE `classRelation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `ticks`
--
ALTER TABLE `ticks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `classRelation`
--
ALTER TABLE `classRelation`
  ADD CONSTRAINT `FK_classRelation` FOREIGN KEY (`FK_class`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_roleRelation` FOREIGN KEY (`FK_role`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_userRelation` FOREIGN KEY (`FK_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `emailVerify`
--
ALTER TABLE `emailVerify`
  ADD CONSTRAINT `FK_userVerify` FOREIGN KEY (`FK_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `FK_classRole` FOREIGN KEY (`FK_class`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `FK_classSubject` FOREIGN KEY (`FK_class`) REFERENCES `classes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `FK_classTask` FOREIGN KEY (`FK_class`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_subjectTask` FOREIGN KEY (`FK_subject`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `ticks`
--
ALTER TABLE `ticks`
  ADD CONSTRAINT `FK_taskTick` FOREIGN KEY (`FK_task`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_userTick` FOREIGN KEY (`FK_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_userSettings` FOREIGN KEY (`FK_settings`) REFERENCES `settings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
