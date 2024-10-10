<template>
    <div>
      <label :for="inputId" class="text-primary">
        <slot name="label"></slot>
      </label>
      <input
        :id="inputId"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="bg-dark input w-full mt-3"
      />
      <div class="text-sm text-red-500">
        <slot name="error"></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    }
  });
  
  const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`);
  </script>
  