SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `city` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `del` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `device` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `del` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ip` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `del` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `page` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `del` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `server` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `del` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `pass` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` int(11) NOT NULL,
  `updatedAt` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updatedBy` int(11) NOT NULL,
  `deletedAt` datetime NOT NULL,
  `deletedBy` int(11) NOT NULL,
  `del` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `visitors` (
  `id` int(11) NOT NULL,
  `id_server` int(11) NOT NULL,
  `id_page` int(11) NOT NULL,
  `id_ip` int(11) NOT NULL,
  `id_city` int(11) NOT NULL,
  `id_device` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `del` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `city`
  ADD PRIMARY KEY (`id`);
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `device`
  ADD PRIMARY KEY (`id`);
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `ip`
  ADD PRIMARY KEY (`id`);
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `page`
  ADD PRIMARY KEY (`id`);
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `server`
  ADD PRIMARY KEY (`id`);
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`);
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
