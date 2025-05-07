package com.example.budgetmanager.controller;

import com.example.budgetmanager.model.Budget;
import com.example.budgetmanager.service.BudgetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PostMapping
    public Budget createOrUpdateBudget(@RequestBody Budget budget) {
        return budgetService.createOrUpdateBudget(budget);
    }

    @GetMapping("/user/{userId}")
    public List<Budget> getBudgetsByUser(@PathVariable Long userId) {
        return budgetService.getBudgetsByUserId(userId);
    }
}
