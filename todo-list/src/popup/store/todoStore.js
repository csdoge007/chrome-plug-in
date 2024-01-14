import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  
  state: () => {
    return {
      newTask: '',
    }
  },
  getters: {
    getTasks: (state) => state.tasks,
  },
  actions: {
    addTask({fa, content}) {
      if (fa !== undefined) {
        (fa.children || (fa.children = [])).push(this.newTodo(content));
      } else {
        this.tasks.push(this.newTodo(content));
      }
      this.saveTasks();
    },
    loadTasks() {
      const savedTasks = localStorage.getItem('tasks');
      this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
      this.newTask = '';
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    newTodo(content) {
      return {
        content,
        done: false,
      }
    },
    removeTask(task) {
      function dfs(tasks) {
        const idx = tasks.findIndex(item => item === task);
        if (idx !== -1) {
          tasks.splice(idx, 1);
        }
        tasks.forEach((t) => t.children && t.children.length > 0 && dfs(t.children));
      }
      dfs(this.tasks);
      this.saveTasks();
    },
    toggleChecked(task) {
      function dfs(task) {
        task.done = !task.done;
        if (task.children && task.children.length > 0) {
          task.children.forEach((t) => dfs(t));
        }
      }
      dfs(task);
      this.saveTasks();
    },
  }
});
