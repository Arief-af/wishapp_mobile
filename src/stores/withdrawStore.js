import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

export const useWithdrawStore = defineStore({
  id: "withdraw",
  actions: {
    async post(id, data) {
      try {
        const resp = await axios.post("/api/withdraw/wish/" + id , data);
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async get(id) {
      try {
        const resp = await axios.get("/api/withdraw/"+ id);
        return resp;
      } catch (error) {
        throw error;
      }
    }
  },
  persist: true,
});
