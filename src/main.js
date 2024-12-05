import { createApp } from "vue";
import "./assets/css/app.css";
import router from "./router";
import App from "./App.vue";
axios.defaults.baseURL = "http://localhost:3000";
import 'boxicons'
const app = createApp(App);
app.use(router);
import FormInput from "./components/form/Input.vue";
import TextArea from "./components/form/TextArea.vue";
import axios from "axios";
app.component("FormInput", FormInput);
app.component("TextArea", TextArea);
app.mount("#app");
