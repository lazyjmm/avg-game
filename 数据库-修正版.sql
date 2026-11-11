-- ============================================================
-- 基于 Spring Boot 和 Vue 的互动叙事游戏平台 —— 数据库实际结构
-- 记录日期：2026-09-20（直接在 MySQL 8.0.41 上查到的，不是推测）
--
-- 重要：本文件记录的是数据库里**真实存在**的结构。
-- 原有的 数据库.txt（GBK 编码）是废弃旧稿，与实际情况不符：
--   * 表名应为 save_slot（单数），旧稿写的是 save_slots；
--   * 旧稿把 slot 当主键，实际是自增 id 主键 + (user_id, slot) 唯一约束；
--   * 旧稿没有 user_id 外键，实际有 FOREIGN KEY → user(id) ON DELETE CASCADE；
--   * 旧稿的 dialogue_history 表并不存在（前端历史存在存档 JSON 里，后端未落表）。
-- 这套表是手工创建的（含外键、唯一键、DEFAULT CURRENT_TIMESTAMP，
-- 这些 Hibernate 的 ddl-auto 不会生成），当前实体映射与它一致，可正常读写。
--
-- 连接信息：MySQL 8.0.41，服务名 MySQL80，127.0.0.1:3306，库名 galgame
-- 编码：UTF-8
-- ============================================================

CREATE DATABASE IF NOT EXISTS `galgame`
    DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `galgame`;

-- ---------------- 玩家账号表（实体 com.game.entity.User） ----------------
CREATE TABLE IF NOT EXISTS `user` (
    `id`                BIGINT       NOT NULL AUTO_INCREMENT,
    `username`          VARCHAR(50)  NOT NULL,
    `password`          VARCHAR(255) NOT NULL COMMENT '毕设简化：明文存储，生产需 BCrypt',
    `unlocked_endings`  TEXT         NULL COMMENT '逗号分隔的已解锁结局ID',
    `created_at`        DATETIME     DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ---------------- 存档表（实体 com.game.entity.SaveSlot） ----------------
CREATE TABLE IF NOT EXISTS `save_slot` (
    `id`          BIGINT       NOT NULL AUTO_INCREMENT,
    `user_id`     BIGINT       NOT NULL,
    `slot`        INT          NOT NULL COMMENT '存档槽位 1-5',
    `save_data`   TEXT         NOT NULL COMMENT '游戏状态 JSON',
    `scene_name`  VARCHAR(255) DEFAULT NULL,
    `updated_at`  DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_user_slot` (`user_id`, `slot`),
    CONSTRAINT `save_slot_ibfk_1` FOREIGN KEY (`user_id`)
        REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ------------------------------------------------------------
-- 说明：
-- 1) save_data 是 TEXT，容量上限约 64KB。修复前存档 JSON 约 8100~10013 字符，
--    本来就不会超限；修复后（不再序列化静态剧本）约 2100 字符。
-- 2) 修复前创建的 5 条旧存档仍是旧格式（含 events 字段），字段齐全，
--    修复后的读档逻辑可以直接读，无需迁移。
-- 3) 遗留小问题：username 列是 VARCHAR(50)，而前端注册表单没有长度校验，
--    超过 50 字符的用户名会触发 SQL 错误，前端只会显示"服务器错误"。
--    可在 RegisterModal.vue 里加一个长度判断，或把列放宽。
-- ------------------------------------------------------------
