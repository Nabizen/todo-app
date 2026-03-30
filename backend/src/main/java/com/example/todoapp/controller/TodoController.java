package com.example.todoapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.todoapp.model.Task;
import com.example.todoapp.service.TodoService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

	@GetMapping("/tasks")
	public List<Task> getTodo(){
		return service.getTodo();
	}

    @PostMapping("/tasks")
    public void addTodo(@RequestBody Task task) {
        service.addTodo(task);
    }

    @DeleteMapping("/tasks/{id}")
    public void deleteTodo(@PathVariable int id) {
        service.deleteTodo(id);
    }

    @PatchMapping("/tasks/{id}")
    public void updateTodo(@PathVariable int id) {
        service.updateTodo(id);
    }
}