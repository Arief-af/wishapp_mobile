<template>
  <div>
    <router-view />
    <Notification
      v-if="notificationStore.notification.show"
      :variant="notificationStore.notification.variant"
    >
      {{ notificationStore.notification.message }}
    </Notification>
  </div>
</template>

<script setup>
import { useNotificationStore } from "./stores/notification";
import Notification from "./components/notification/Index.vue";
const notificationStore = useNotificationStore();
import { useAuthStore } from './stores/authStore';
const authStore = useAuthStore();
authStore.refreshToken();
</script>