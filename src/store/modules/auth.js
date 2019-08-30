import Axios from "axios";

export default {
    namespaced:true,
    state:{
        user:null
    },
    getters:{
        authUser(state){
            return state.user || null
        },
        isAuthenticated(state){
            return !!state.user
        }
    },
    actions:{
        loginWithEmailAndPassword ({commit},form) {
            return Axios.post('/api/v1/users/login',form)
            .then(res => {
                const user = res.data
                commit('setAuthUser',user)
            })
        },
        registerUser(context,form){
            return Axios.post('/api/v1/users/register',form)
        }
    },
    mutations:{
        setAuthUser(state,user){
            return state.user = user
        }
    }

}