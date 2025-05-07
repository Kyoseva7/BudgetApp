package com.example.budgetmanager.controller;

import com.example.budgetmanager.service.ReportService;
import com.example.budgetmanager.service.ReportService.ReportData;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping
    public ReportData generateReport(
            @RequestParam Long userId,
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {
        return reportService.generateReport(
                userId,
                LocalDate.parse(startDate),
                LocalDate.parse(endDate)
        );
    }
}