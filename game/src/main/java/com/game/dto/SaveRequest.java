package com.game.dto;

import lombok.Data;

@Data
public class SaveRequest {
    private String data;        // JSON 格式的存档数据
    private String sceneName;   // 存档时的场景名称
}