import Vue from 'vue'
import Axios from "axios";
import jwt from 'jsonwebtoken'
import axiosInstance from '@/services/axios'
import {rejectError} from '@/helpers'

function checkTokenValidity(token){
    if (token) {
        const decodedToken = jwt.decode(token)

        return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
    }
    return false
}

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
        },
        isMeetupOwner: (state) => (meetupCreaterid) => {
            if (!state.user) {
                return false
            }
            return state.user._id === meetupCreaterid
        },
        isMember : (state) => (meetupId) => {
            return state.user &&
            state.user['joinedMeetups'] &&
            state.user['joinedMeetups'].includes(meetupId)
        }
    },
    actions:{
        loginWithEmailAndPassword ({commit},form) {
            return Axios.post('/api/v1/users/login',form)
            .then(res => {
                const user = res.data
                localStorage.setItem('vue-meetuper-jwt',user.token)
                commit('setAuthUser',user)
            })
            .catch(err =>rejectError(err))
        },
        registerUser(context,form){
            return Axios.post('/api/v1/users/register',form)
            .catch(err => rejectError(err))
        },
        getAuthUser({commit,getters}){
            const authUser = getters['authUser']
            const token = localStorage.getItem('vue-meetuper-jwt')
            const isTokenValid = checkTokenValidity(token)
            if (authUser && isTokenValid) {
                return Promise.resolve(authUser)
            }

            return axiosInstance.get('/api/v1/users/me')
            .then((res)=>{
                const user = res.data
                localStorage.setItem('vue-meetuper-jwt',user.token)
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
            //for session authentication 
            // return Axios.post('/api/v1/users/logout')
            // .then(()=>{
            //     commit('setAuthUser',null)
            //     return true
            // })
            // .catch(err=>{
            //     return err
            // })

            return new Promise((resolve)=>{
                localStorage.removeItem('vue-meetuper-jwt')
                commit('setAuthUser',null)
                resolve(true)
            })
        },
        addMeetupToAuthUser({commit,state},meetupId){
            const userMeetups = [...state.user['joinedMeetups'],meetupId]
            commit('setMeetupsToAuthUser',userMeetups)
        },
        removeMeetupFromAuthUser({commit,state},meetupId){
            const userMeetupsIds = [...state.user['joinedMeetups']]
            const index = userMeetupsIds.findIndex(userMeetupId => userMeetupId === meetupId)

            userMeetupsIds.splice(index,1)
            commit('setMeetupsToAuthUser',userMeetupsIds)
        },
        updateUser({commit},user){
            return axiosInstance.patch(`/api/v1/users/${user._id}`,user)
            .then((res)=>{
                const userUpdated = res.data
                commit('setAuthUser',userUpdated)
                return userUpdated
            })
        }
    },
    mutations:{
        setAuthUser(state,user){
            return state.user = user
            // return Vue.set(state.user,{},user)
        },
        setAuthState(state, authState){
            return state.isAuthResolved = authState
        },
        setMeetupsToAuthUser(state,userMeetups){
            return Vue.set(state.user,'joinedMeetups',userMeetups)
        }
    }

}