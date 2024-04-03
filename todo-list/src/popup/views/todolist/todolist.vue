<template>
  <div id="app">
    <el-card class="task-card">
      <h1 class="title">Vue 3 ToDoList</h1>
      <el-input v-model="newTask" @keyup.enter="addTask" placeholder="Add a new task" />
      <el-button type="primary" @click="addTask">Add Task</el-button>
      <el-divider></el-divider>
      <TodolistTree 
        v-if="tasks.length > 0" 
        :tasks="tasks" 
        :newTask = "newTask"
        prefix="root">
      </TodolistTree>
      <p v-else>No tasks available.</p>
    </el-card>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/popup/store/todoStore';
import { storeToRefs } from 'pinia';
import TodolistTree from './todolistTree.vue';
const todoStore = useTodoStore();
const { newTask } = storeToRefs(todoStore);
todoStore.loadTasks();
const tasks = todoStore.getTasks;

const addTask = () => {
  if (newTask.value.trim() !== '') {
    todoStore.addTask({content:newTask.value.trim()});
    newTask.value = '';
  }
};

</script>

<style lang="less">
#app {
  display: fixed;
  justify-content: end;
  align-items: end;
}

.task-card {
  width: 400px;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.el-input {
  width: 100%;
  margin-bottom: 10px;
}

.el-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-button {
  color: #ff4a4a;
}
</style>