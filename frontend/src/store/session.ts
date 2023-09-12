import {defineStore} from "pinia";

export const userSessionStore = defineStore({
    id: "session",
    state: () => ({
        user: null as string | null
    }),
    actions: {
        login(email:string){
            this.user = email;
        },
        logout(){
            this.user = null
        },

    },
})