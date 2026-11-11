package com.game.controller;

import com.game.dto.SaveRequest;
import com.game.entity.SaveSlot;
import com.game.repository.SaveSlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final SaveSlotRepository saveSlotRepo;

    // 存档
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestParam int slot,
                                  @RequestBody SaveRequest request,
                                  HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("未登录");
        }
        // 查找是否已有该用户的该槽位存档
        Optional<SaveSlot> existing = saveSlotRepo.findByUserIdAndSlot(userId, slot);
        SaveSlot entity;
        if (existing.isPresent()) {
            entity = existing.get();
        } else {
            entity = new SaveSlot();
            entity.setUserId(userId);
            entity.setSlot(slot);
        }
        entity.setSaveData(request.getData());
        entity.setSceneName(request.getSceneName());
        entity.setUpdatedAt(LocalDateTime.now());
        saveSlotRepo.save(entity);
        return ResponseEntity.ok().build();
    }

    // 读档
    @GetMapping("/load/{slot}")
    public ResponseEntity<SaveSlot> load(@PathVariable int slot, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        return saveSlotRepo.findByUserIdAndSlot(userId, slot)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}