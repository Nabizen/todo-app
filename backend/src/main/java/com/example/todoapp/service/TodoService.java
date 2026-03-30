package com.example.todoapp.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.todoapp.model.Task;
import com.example.todoapp.repository.TodoRepo;

@Service
public class TodoService {

    private final TodoRepo repo;

    public TodoService(TodoRepo repo) {
        this.repo = repo;
    }
    
    public List<Task> getTodo() {
        return repo.findAll();
    }

    public void addTodo(Task task) {
        repo.save(task);
    }

    public void deleteTodo(int id) {
        repo.deleteById(id);
    }

    public void updateTodo(int id) {
        Task task = repo.findById(id).orElseThrow();
        task.setDone(!task.isDone());
        repo.save(task);
    }
}
