import { defineStore } from 'pinia'
import { api } from '@/stores/main/core/api';

export const user = defineStore({
    id: 'user',
    state: () => ({
        xios : api()?.xios,
        current : api()?.user,
    }),
    getters: {
    //   current : (state) => state.current
    },
    actions: {
        async fetch(context:any, value:any) {
            return await this.xios.get(api()?.endpoint + "user");
        }
    }
  })
  