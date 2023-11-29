import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useLoginUserStore = defineStore("loginuser", {
  state: ()=>({
    userid: useStorage("userid", ""),
    email:  useStorage("email", ""),
  }),
  getters: {
    getEmail: (state)=>{
      return state.email;
    },
    getUserid: (state)=>{
      return state.userid;
    },
  },
  actions: {
    clearStorage() {
      this.userid= "";
      this.email = "";
    }
  }
});

// export const useStorageStore = defineStore("loginuser", {
//   state: () => ({
//     firstName: useStorage("firstName",""),
//     lastName: useStorage("lastName",""),
//     email: useStorage("email",""),
//     isPwd: useStorage("isPwd",""),
//     password: useStorage("password",""),
//     dateOfBirth: useStorage("dateOfBirth",""),
//     address: useStorage("address",""),
//     phoneNumber: useStorage("phoneNumber",""),
//     role: 2,
//   }),
//   mutations: {
//     setFirstName(state, value) {
//       state.firstName = value;
//     },
//     setLastName(state, value) {
//       state.lastName = value;
//     },

//   },
//   actions: {
//     updateFirstName({ commit }, value) {
//       commit('setFirstName', value);
//     },
//     updateLastName({ commit }, value) {
//       commit('setLastName', value);
//     },
//   },
// });
