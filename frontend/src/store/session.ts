import {defineStore} from "pinia";

export const userSessionStore = defineStore({
    id: "session",
    state: () => ({
        user: null as string | null
    }),
    actions: {
        login(email:string, password:string){
            this.user = email;
            this.user = password;
        },
        logout(){
            this.user = null
        },

    },
})