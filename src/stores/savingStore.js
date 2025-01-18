import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

export const useSavingStore = defineStore({
  id: "saving",
  actions: {
    async get(id) {
      try {
        const resp = await axios.get("/api/saving/"+ id);
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async post(id, data) {
      try {
        const resp = await axios.post("/api/saving/wish/" + id , data);
        return resp;
      } catch (error) {
        throw error;
      }
    },
  },
  persist: true,
});
