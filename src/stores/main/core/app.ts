import { defineStore } from 'pinia'

export const app = defineStore({
    id: 'app',
    state: () => ({
        dark : false
    }),
    getters: {

    },
    actions: {
        switch() {
           this.dark = !this.dark;
        }
    }
  })
  