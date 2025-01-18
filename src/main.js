import { createApp } from "vue";
import "./assets/css/app.css";
import router from "./router";
import App from "./App.vue";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
import 'boxicons'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);
app.use(pinia)
app.use(router);
import FormInput from "./components/form/Input.vue";
import TextArea from "./components/form/TextArea.vue";
import axios from "axios";
app.component("FormInput", FormInput);
app.component("TextArea", TextArea);
app.mount("#app");
