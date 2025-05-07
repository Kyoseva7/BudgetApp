package com.example.budgetmanager.service;

import com.example.budgetmanager.model.Goal;
import com.example.budgetmanager.repository.GoalRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class GoalService {

    private final GoalRepository goalRepository;

    public GoalService(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    public Goal createGoal(Goal goal) {
        return goalRepository.save(goal);
    }

    public List<Goal> getGoalsByUserId(Long userId) {
        return goalRepository.findByUserId(userId);
    }

    public Goal updateGoalProgress(Long goalId, Double amount) {
        Goal goal = goalRepository.findById(goalId).orElseThrow();
        goal.setCurrentAmount(goal.getCurrentAmount() + amount);
        if (goal.getCurrentAmount() >= goal.getTargetAmount()) {
            goal.setStatus("COMPLETED");
        } else if (goal.getTargetDate().isBefore(LocalDate.now())) {
            goal.setStatus("FAILED");
        }
        return goalRepository.save(goal);
    }
}
