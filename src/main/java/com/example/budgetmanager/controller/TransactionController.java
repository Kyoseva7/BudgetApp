package com.example.budgetmanager.controller;

import com.example.budgetmanager.model.Transaction;
import com.example.budgetmanager.model.User;
import com.example.budgetmanager.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*") // Позволява заявки от frontend
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return transactionService.addTransaction(transaction);
    }

    @GetMapping("/user/{userId}")
    public List<Transaction> getAllTransactionsForUser(@PathVariable Long userId) {
        // Тук ще трябва да добавим метод за взимане на User по ID (временно симулираме)
        User user = new User();
        user.setId(userId);
        return transactionService.getAllTransactionsForUser(user);
    }

    @GetMapping("/user/{userId}/range")
    public List<Transaction> getTransactionsByDateRange(
            @PathVariable Long userId,
            @RequestParam String start,
            @RequestParam String end) {

        User user = new User();
        user.setId(userId);

        LocalDate startDate = LocalDate.parse(start);
        LocalDate endDate = LocalDate.parse(end);

        return transactionService.getTransactionsByDateRange(user, startDate, endDate);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
    }
}
