package com.example.budgetmanager.repository;

import com.example.budgetmanager.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUserId(Long userId);
    Budget findByUserIdAndCategory(Long userId, String category);
}
