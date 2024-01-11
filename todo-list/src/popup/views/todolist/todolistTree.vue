<template>
  <div>
    <div v-for="(task, index) in tasks" :key="index" style="margin-left: 5px;">
      <div class="task">
        <label class="content">
          {{ task.content }}
        </label>
        <a class="add" @click="addTodoItem(task)">
          +
        </a>
        <a class="sub" @click="subTodoItem(task)">
          -
        </a>
      </div>
      <todolistTree v-if="task.children && task.children.length > 0" :tasks="task.children" :newTask="newTask"></todolistTree>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/popup/store/todoStore';

const todoStore = useTodoStore();

const props = defineProps({
  tasks: {
    type: Array,
    default: [],
  },
  newTask: {
    type: String,
    default: {},
  }
})
const addTodoItem = (task) => {
  if (props.newTask.trim() !== '') {
    todoStore.addTask({fa: task, content: props.newTask});
  }
}
const subTodoItem = (task) => {
  todoStore.removeTask(task);
}
</script>

<style lang="less" scoped>
.task {
  position: relative;
  height: 20px;
  .content {
    position: absolute;
    left:0px;
  }
  .add {
    position:absolute;
    right: 20px;
  }
  .sub {
    position: absolute;
    right: 0px;
  }
}
</style>