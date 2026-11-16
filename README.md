# AVG 互动叙事游戏平台

基于 Spring Boot + Vue 3 的互动叙事（AVG / 视觉小说）游戏平台。
剧本以事件数组驱动，支持分支选择、多结局与云存档。

> 本科毕业设计项目。

## 功能

- **事件驱动叙事引擎**：剧本由扁平事件数组组织，通过选项的 `targetId` 跳转实现分支，支持台词 / 选项 / 结局三类事件
- **异步推进主循环**：点击推进对话，快进时以 epoch 计数中断在途链，避免跳过选项
- **多结局与回顾**：不同选择通往不同结局，已解锁结局可回看
- **云端存档**：5 个存档槽位，支持读档、历史记录
- **账号系统**：注册 / 登录

## 技术栈

| 端 | 技术 |
|---|---|
| 前端 | Vue 3 + Pinia + Vue Router + Axios + Vite |
| 后端 | Spring Boot 2.7 + Spring Data JPA + MySQL 8 + Lombok |
| 构建 | Maven（后端）/ Vite（前端） |

## 目录结构

```
.
├── game/                      后端（Spring Boot）
│   ├── src/main/java/com/game/
│   │   ├── controller/        接口层
│   │   ├── entity/            实体（User / SaveSlot）
│   │   ├── repository/        JPA 数据访问
│   │   └── dto/               请求体
│   └── src/main/resources/
│       └── application.example.yml   配置模板（复制成 application.yml 再改）
├── gamefinal/                 前端（Vue 3）
│   ├── src/
│   └── public/assets/         立绘与背景
├── 数据库-修正版.sql           建库建表脚本
└── 数据库.txt                 数据库说明
```

## 怎么跑起来

### 1. 建数据库

用 MySQL 8 执行：

```bash
mysql -u root -p < 数据库-修正版.sql
```

### 2. 配置后端

把 `game/src/main/resources/application.example.yml` 复制一份，改名为 `application.yml`，填入你自己的数据库账号密码：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/你的库名?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: 你的账号
    password: 你的密码
```

> `application.yml` 已在 `.gitignore` 中排除，不会提交到仓库。

### 3. 启动后端

```bash
cd game
mvn spring-boot:run
```

默认端口 `8080`。

### 4. 启动前端

```bash
cd gamefinal
npm install
npm run dev
```

按终端提示的地址打开浏览器（通常是 `http://localhost:5173`）。

## 说明

- 立绘素材在 `gamefinal/public/assets/characters/`
- 如需重新生成数据库表：JPA 已配置 `ddl-auto: update`，启动时会自动建表
