package com.example.budgetmanager.service;

import com.example.budgetmanager.model.Budget;
import com.example.budgetmanager.repository.BudgetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;

    public BudgetService(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    public Budget createOrUpdateBudget(Budget budget) {
        // Проверка дали вече съществува бюджет за тази категория
        Budget existing = budgetRepository.findByUserIdAndCategory(
                budget.getUser().getId(), budget.getCategory()
        );
        if (existing != null) {
            existing.setLimitAmount(budget.getLimitAmount());
            return budgetRepository.save(existing);
        }
        return budgetRepository.save(budget);
    }

    public List<Budget> getBudgetsByUserId(Long userId) {
        return budgetRepository.findByUserId(userId);
    }
}
