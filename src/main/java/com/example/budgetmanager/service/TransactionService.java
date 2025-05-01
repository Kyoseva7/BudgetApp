package com.example.budgetmanager.service;

import com.example.budgetmanager.model.Transaction;
import com.example.budgetmanager.model.User;
import com.example.budgetmanager.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactionsForUser(User user) {
        return transactionRepository.findByUser(user);
    }

    public List<Transaction> getTransactionsByDateRange(User user, LocalDate start, LocalDate end) {
        return transactionRepository.findByUserAndDateBetween(user, start, end);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}
