import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    //didalam atribut state kita menjaga data kita agar dapat dibagikan kepada semua komponen yang ada
    state:{
        meetups:[],
        categories:[],
        threads:[],
        meetup:{}
    },
    // getter mirip dengan computed yaitu sebuah fungsi untuk mendapatkan sebuah state
    getters:{
        
    },
    // atribut action mirip seperti sebuah method. action tidak diharuskan melakukan perubahan pada state
    // tempat terbaik untuk melakukan penarikan data. pemanggilan atribut action biasanya harus menghasilkan data
    actions:{
        fetchMeetups ({state,commit}){
            axios.get('/api/v1/meetups')
            .then(res =>{
              const meetups = res.data
              commit('setMeetups',meetups)
              return state.meetups
            })
        },
        fetchCategories({state,commit}){
            axios.get('/api/v1/categories')
            .then( res =>{
              const categories = res.data
              commit('setCategories',categories)
              return state.categories
            })
        },
        fetchDetailMeetup({state,commit},meetupId){
            axios.get(`/api/v1/meetups/${meetupId}`)
            .then(res =>{
                const meetup = res.data
                commit('setDetailMeetup',meetup)
                return state.meetup
            })
        },
        fetchThreads({state,commit},meetupId){
            axios.get(`/api/v1/threads?meetupId=${meetupId}`)
            .then(res=>{
              const threads = res.data
              commit('setThreads',threads)
              return state.threads
            }) 
        }
    },
    // simple function untuk melakukan perubahan data
    mutations:{
        setMeetups (state,meetups) {
            state.meetups = meetups
        },
        setCategories (state, categories){
            state.categories = categories
        },
        setDetailMeetup(state,meetup){
            state.meetup = meetup
        },
        setThreads(state,threads){
            state.threads = threads
        }
    }
})