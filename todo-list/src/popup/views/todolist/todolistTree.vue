<template>
  <div>
    <div v-for="(task, index) in tasks" :key="index" style="margin-left: 15px;">
      <TodolistItem 
      :task = "task" 
      :newTask="newTask"
      :id="`${prefix}-${index}`">
    </TodolistItem>
      <todolistTree v-if="task.children && task.children.length > 0" 
        :tasks="task.children" 
        :newTask="newTask"
        :prefix="`${prefix}-${index}`">
      </todolistTree>
    </div>
  </div>
</template>

<script setup>
import TodolistItem from './todolistItem.vue';

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
</script>

<style lang="less" scoped>
</style>