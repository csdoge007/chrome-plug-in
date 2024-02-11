<template>
  <div class="task">
    <input :id="id" :checked="task.done" @change="toggleChecked(task)" type="checkbox" />
    <label class="content" :for="id">
      {{ task.content }}
    </label>
    <a class="add" @click="addTodoItem(task)">
      +
    </a>
    <a class="sub" @click="subTodoItem(task)">
      -
    </a>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/popup/store/todoStore';
import { storeToRefs } from 'pinia';
const todoStore = useTodoStore();
const { newTask } = storeToRefs(todoStore);
const props = defineProps({
  task: {
    type: Object,
    default: {},
  },
  id: {
    type: String,
    default: '',
  }
});
const emit = defineEmits(['edit']);
const addTodoItem = (task) => {
  if (task.done) return;
  if (newTask.value.trim() !== '') {
    todoStore.addTask({fa: task, content: newTask.value});
    newTask.value = '';
  } else {
    emit('edit');
  }
}
const subTodoItem = (task) => {
  todoStore.removeTask(task);
}

const toggleChecked = (task) => {
  todoStore.toggleChecked(task);
}
</script>

<style lang="less" scoped>
.task {
  position: relative;
  height: 20px;

  .content {
    position: absolute;
    left: 0px;
  }

  .add {
    position: absolute;
    right: 20px;
  }

  .sub {
    position: absolute;
    right: 0px;
  }

  input:checked+label {
    text-decoration: line-through;
  }
}
</style>