package com.example.todoapp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;


import java.util.List;
//When doing ctrl+left on the local of npm run dev, it runs http://127.0.0.1:5173/ instead of http://localhost:5173.
//Keep this in mind when running a frontend backend connection test
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/todos")
public class TodoappController {
    @GetMapping
    public List<String> getTodos() {
        return List.of("Test Todo 1", "Test Todo 2");
    }
}