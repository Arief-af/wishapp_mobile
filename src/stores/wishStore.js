import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

export const useWishStore = defineStore({
  id: "wish",
  actions: {
    async post(data) {
      try {
        const resp = await axios.post("/api/wish", data);
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async get() {
      try {
        const resp = await axios.get("/api/wish");
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async put(id, data) {
      try {
        const resp = await axios.put("/api/wish/" + id, data);
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async delete(id) {
      try {
        const resp = await axios.delete("/api/wish/" + id);
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async getById(id) {
      try {
        const resp = await axios.get("/api/wish/detail/" + id);
        return resp;
      } catch (error) {
        throw error;
      }
    },
  },

  persist: true,
});
