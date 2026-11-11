package com.game.controller;

import com.game.entity.User;
import com.game.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepo;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        Map<String, Object> res = new HashMap<>();
        if (username == null || password == null || username.trim().isEmpty()) {
            res.put("success", false);
            res.put("msg", "用户名或密码不能为空");
            return res;
        }
        if (userRepo.findByUsername(username).isPresent()) {
            res.put("success", false);
            res.put("msg", "用户名已存在");
            return res;
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(password); // 实际应加密
        user.setUnlockedEndings("");
        userRepo.save(user);
        res.put("success", true);
        return res;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> payload, HttpSession session) {
        String username = payload.get("username");
        String password = payload.get("password");
        Map<String, Object> res = new HashMap<>();
        Optional<User> opt = userRepo.findByUsername(username);
        // ✅ Java 8 中使用 isPresent() 判断是否存在
        if (!opt.isPresent() || !opt.get().getPassword().equals(password)) {
            res.put("success", false);
            res.put("msg", "用户名或密码错误");
            return res;
        }
        // ✅ 正确设置 session 属性
        session.setAttribute("userId", opt.get().getId());
        res.put("success", true);
        res.put("userId", opt.get().getId());
        res.put("username", opt.get().getUsername());
        // 登录时就把已解锁结局带回前端，否则登录后"结局回顾"是空的（要刷新页面才有）
        res.put("unlockedEndings", splitEndings(opt.get().getUnlockedEndings()));
        return res;
    }

    @GetMapping("/me")
    public Map<String, Object> me(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        Map<String, Object> res = new HashMap<>();
        if (userId == null) {
            res.put("success", false);
            res.put("msg", "未登录");
            return res;
        }
        Optional<User> opt = userRepo.findById(userId);
        if (!opt.isPresent()) {
            res.put("success", false);
            return res;
        }
        User user = opt.get();
        res.put("success", true);
        res.put("username", user.getUsername());
        res.put("userId", user.getId());
        res.put("unlockedEndings", splitEndings(user.getUnlockedEndings()));
        return res;
    }

    // 逗号分隔的结局ID -> 列表（未解锁时返回空列表）
    private List<String> splitEndings(String csv) {
        if (csv == null || csv.trim().isEmpty()) {
            return new ArrayList<>();
        }
        return new ArrayList<>(Arrays.asList(csv.split(",")));
    }
    @PostMapping("/logout")
    public Map<String, Object> logout(HttpSession session) {
        session.invalidate();  // 清除服务端 session
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        return res;
    }
    @PostMapping("/unlock-ending")
    public Map<String, Object> unlockEnding(@RequestBody Map<String, String> payload, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        Map<String, Object> res = new HashMap<>();
        if (userId == null) {
            res.put("success", false);
            res.put("msg", "未登录");
            return res;
        }
        String endingId = payload.get("endingId");
        if (endingId == null || endingId.trim().isEmpty()) {
            res.put("success", false);
            res.put("msg", "结局ID不能为空");
            return res;
        }
        Optional<User> opt = userRepo.findById(userId);
        if (!opt.isPresent()) {
            res.put("success", false);
            return res;
        }
        User user = opt.get();
        String current = user.getUnlockedEndings();
        Set<String> set = new HashSet<>();
        if (current != null && !current.isEmpty()) {
            set.addAll(Arrays.asList(current.split(",")));
        }
        if (set.add(endingId)) {
            user.setUnlockedEndings(String.join(",", set));
            userRepo.save(user);
        }
        res.put("success", true);
        return res;
    }
}