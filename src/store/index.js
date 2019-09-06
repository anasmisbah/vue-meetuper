import Vue from 'vue'
import Vuex from 'vuex'


import meetups from './modules/meetups'
import categories from './modules/categories'
import threads from './modules/threads'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({

    modules:{
        meetups,
        categories,
        threads,
        auth
    },
    //didalam atribut state kita menjaga data kita agar dapat dibagikan kepada semua komponen yang ada
    // state:{
    //     meetups:[],
    //     categories:[],
    //     threads:[],
    //     meetup:{}
    // },
    // // getter mirip dengan computed yaitu sebuah fungsi untuk mendapatkan sebuah state
    // getters:{
        
    // },
    // // atribut action mirip seperti sebuah method. action tidak diharuskan melakukan perubahan pada state
    // // tempat terbaik untuk melakukan penarikan data. pemanggilan atribut action biasanya harus menghasilkan data
    // actions:{
        
        
    // },
    // simple function untuk melakukan perubahan data
    mutations:{
        setItems (state,{resource,items}){
            state[resource].items = items
        },
        setItem(state,{resource,item}){
            state[resource].item = item
        },
        addItemToArray(state,{item,index,resource}){
            Vue.set(state[resource].items,index,item)
        }
    }
})