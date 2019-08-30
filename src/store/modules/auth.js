import Axios from "axios";

export default {
    namespaced:true,
    state:{
        user:null,
        isAuthResolved : false 
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
        },
        getAuthUser({commit}){
            return Axios.get('/api/v1/users/me')
            .then((res)=>{
                const user = res.data
                commit('setAuthUser',user)
                commit('setAuthState',true)
                return user
            })
            .catch((err) =>{
                commit('setAuthUser',null)
                commit('setAuthState',true)
                return err
            })
        },
        userLogout({commit}){
            return Axios.post('/api/v1/users/logout')
            .then(()=>{
                commit('setAuthUser',null)
                return true
            })
            .catch(err=>{
                return err
            })
        }
    },
    mutations:{
        setAuthUser(state,user){
            return state.user = user
        },
        setAuthState(state, authState){
            return state.isAuthResolved = authState
        }
    }

}