import axios from 'axios'
import axiosInstance from '@/services/axios'

export default {
    namespaced: true,
    state:{
        items:[],
    },
    actions:{
        fetchThreads({state,commit},meetupId){
            commit('setItems',{ resource: 'threads', items: []},{root:true})
            return axios.get(`/api/v1/threads?meetupId=${meetupId}`)
            .then(res=>{
              const threads = res.data
              commit('setItems',{ resource: 'threads', items: threads},{root:true})
              return state.items
            }) 
        },
        postThread({state,commit},threadData){         
            return axiosInstance.post('/api/v1/threads',threadData)
            .then(res =>{
                const createdThread = res.data
                const index = state.items.length

                commit('addItemToArray',{item:createdThread,index,resource:'threads'},{root:true})
                return createdThread
            })
        }
    }
}