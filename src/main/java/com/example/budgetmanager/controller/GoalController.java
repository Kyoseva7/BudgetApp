package com.example.budgetmanager.controller;

import com.example.budgetmanager.model.Goal;
import com.example.budgetmanager.service.GoalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping
    public Goal createGoal(@RequestBody Goal goal) {
        return goalService.createGoal(goal);
    }

    @GetMapping("/user/{userId}")
    public List<Goal> getGoalsByUser(@PathVariable Long userId) {
        return goalService.getGoalsByUserId(userId);
    }

    @PutMapping("/{goalId}/progress")
    public Goal updateGoalProgress(@PathVariable Long goalId, @RequestParam Double amount) {
        return goalService.updateGoalProgress(goalId, amount);
    }
}
