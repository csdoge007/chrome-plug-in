<template>
  <div>
    <div v-for="(task, index) in tasks" :key="index" style="margin-left: 15px;">
      <TodolistItem 
      :task = "task" 
      :newTask="newTask"
      :id="`${prefix}-${index}`"
      @edit="changeEdit(task)">
    </TodolistItem>
    <el-input v-if="task.editing" placeholder="输入待办任务～" v-model="input" @blur="updateItem(task)"></el-input>
      <todolistTree v-if="task.children && task.children.length > 0" 
        :tasks="task.children" 
        :newTask="newTask"
        :prefix="`${prefix}-${index}`">
      </todolistTree>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/popup/store/todoStore';
import TodolistItem from './todolistItem.vue';
import { ref } from 'vue';
const todoStore = useTodoStore();
const input = ref('');
const updateItem = (task) => {
    todoStore.addTask({ fa: task, content: input.value });
    input.value = '';
    task.editing = false;
};
const props = defineProps({
  tasks: {
    type: Array,
    default: [],
  },
  newTask: {
    type: String,
    default: '',
  },
  prefix: {
    type: String,
    default: '',
  }
})
// const editing = ref(false);
const changeEdit = (task) => task.editing = true;

</script>

<style lang="less" scoped>
.el-input {
  position: relative;
  left: 15px;
}
</style>