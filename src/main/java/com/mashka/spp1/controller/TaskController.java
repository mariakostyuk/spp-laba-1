package com.mashka.spp1.controller;

import com.mashka.spp1.entity.Task;
import com.mashka.spp1.repository.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/tasks")
    public String getTasks(@RequestParam(required = false, name = "filter") String filter, Model model) {
        List<Task> tasks;
        if (filter == null) {
            tasks = taskRepository.findAll();
        } else if (filter.equals("done")) {
            tasks = taskRepository.findAllByIsDone(true);
        } else {
            tasks = taskRepository.findAllByIsDone(false);
        }
        model.addAttribute("tasks", tasks);
        model.addAttribute("filter", filter);
        return "tasks";
    }

    @PostMapping("/tasks")
    public @ResponseBody
    ResponseEntity addTask(@RequestBody Task task) {
        task.setId(0);
        System.out.println(task.getTitle());
        var status = HttpStatus.OK;
        try {
            taskRepository.save(task);
        } catch (Exception e) {
            System.out.println("adding not succesful :: " + e);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(status);
    }

    @PostMapping("/tasks/{id}/edit")
    public @ResponseBody
    ResponseEntity editTask(@PathVariable("id") long id, @RequestBody Task task) {
        var status = HttpStatus.OK;
        System.out.println(id + " " + task.getIsDone());
        task.setId(id);
        try {
            taskRepository.save(task);
        } catch (Exception e) {
            System.out.println("Cannot edit task" + e);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(status);
    }

    @DeleteMapping("/tasks/{id}")
    public @ResponseBody
    ResponseEntity deleteTask(@PathVariable("id") long id) {
        var status = HttpStatus.OK;
        System.out.println(id + " " + id);
        try {
            taskRepository.deleteById(id);
        } catch (Exception e) {
            System.out.println("Cannot delete task" + e);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(status);
    }


}
