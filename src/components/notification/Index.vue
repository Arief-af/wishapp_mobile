<template>
    <div :class="notificationClasses" role="alert">
      <slot></slot>
    </div>
  </template>
  
  <script>
  import { defineComponent, computed } from 'vue';
  import { cva } from 'class-variance-authority';
  const notification = cva([
    'p-4',
    'rounded',
    'shadow-lg',
    'text-white',
    'flex',
    'items-center',
    'space-x-2',
    'fixed',
    'top-5',
    'right-6',
    'z-50'
  ], {
    variants: {
      variant: {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
      }
    },
    defaultVariants: {
      variant: 'info'
    }
  });
  
  export default defineComponent({
    name: 'Notification',
    props: {
      variant: {
        type: String,
        default: 'info',
        validator: value => ['success', 'error', 'warning', 'info'].includes(value)
      }
    },
    setup(props) {
      const notificationClasses = computed(() => notification({ variant: props.variant }));
      return { notificationClasses };
    }
  });
  </script>
  