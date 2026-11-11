package com.game.entity;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class SaveSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                 // 自增主键

    private Long userId;             // 关联用户ID

    private Integer slot;            // 存档槽位（1-20）

    @Column(columnDefinition = "TEXT")
    private String saveData;         // 游戏状态JSON

    private String sceneName;        // 场景名

    private java.time.LocalDateTime updatedAt;

    @PreUpdate
    public void preUpdate() {
        updatedAt = java.time.LocalDateTime.now();
    }
}