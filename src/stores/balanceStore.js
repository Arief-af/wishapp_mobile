import { defineStore } from "pinia";
import axios from "axios";

export const useBalanceStore = defineStore({
  id: "balance",
  actions: {
    async get(id) {
      try {
        const resp = await axios.get("/api/balance");
        return resp;
      } catch (error) {
        throw error;
      }
    },
  },
  persist: true,
});
