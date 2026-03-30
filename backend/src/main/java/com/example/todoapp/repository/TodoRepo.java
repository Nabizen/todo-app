package com.example.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.todoapp.model.Task;

@Repository
public interface TodoRepo extends JpaRepository<Task, Integer> {
    
}
