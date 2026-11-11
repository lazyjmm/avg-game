package com.game.repository;

import com.game.entity.SaveSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SaveSlotRepository extends JpaRepository<SaveSlot, Long> {
    Optional<SaveSlot> findByUserIdAndSlot(Long userId, Integer slot);
    List<SaveSlot> findByUserIdOrderBySlotAsc(Long userId);
}