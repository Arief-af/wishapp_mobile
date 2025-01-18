import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: {},
    isLoggedIn: false,
    token: null,
  }),
  actions: {
    async register(data){
      try {
        const resp = await axios.post("/api/register", data);
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async login(data){
      try {
        const resp = await axios.post("/api/login", data);
        console.log(resp);
        this.token = resp.data.access_token;
        axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
        this.user = resp.data.user;
        this.isLoggedIn = true;
        await this.createBalance();
        return resp;
      } catch (error) {
        throw error;
      }
    },

    async createBalance(){
      try {
        const resp = await axios.post("/api/balance");
        return resp;
      } catch (error) {
        throw error;
      }
    },
   
    setUser(data){
      this.user = data;
      this.isLoggedIn = true;
    },

    refreshToken() {
      console.log("refreshing token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
    },
   
    async logout() {
      try {
        // await axios.post("/api/logout");
        this.token = null;
        axios.defaults.headers.common["Authorization"] = null;
        this.user = {};
        this.isLoggedIn = false;
        this.$reset();
        router.push("/login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
    clearState() {
      this.token = null;
      axios.defaults.headers.common["Authorization"] = null;
      this.user = {};
      this.isLoggedIn = false;
      this.$reset();
      router.push("/");
    },

    async history () {
      try {
        const resp = await axios.get("/api/history");
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async incomeList () {
      try {
        const resp = await axios.get("/api/incomes");
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async income (data){
      try {
        const resp = await axios.post("/api/incomes", data);
        return resp;
      } catch (error) {
        throw error;
      }
    },
    clearState() {
      this.token = null;
      axios.defaults.headers.common["Authorization"] = null;
      this.user = {};
      this.isLoggedIn = false;
      this.$reset();
      router.push("/");
    },
  },
  persist: true,
});