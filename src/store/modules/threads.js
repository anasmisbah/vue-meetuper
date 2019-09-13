import Vue from 'vue'
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
        },
        sendPost({dispatch},{text,threadId}){
            const postCreate = {text,thread:threadId}
            
            return axiosInstance.post('/api/v1/posts',postCreate)
            .then((res)=>{
                const postCreated = res.data
                dispatch('addPostToThread',{post: postCreated,threadId})
                return postCreated
            })
        },
        addPostToThread({state,commit},{post,threadId}){
            const indexThread = state.items.findIndex(thread => thread._id === threadId)
            if (indexThread > -1) {
                const posts = state.items[indexThread].posts
                posts.unshift(post)
                commit('savePostToThread',{posts,indexThread})
            }
        }
    },
    mutations:{
        savePostToThread(state,{posts,indexThread}){
            Vue.set(state.items[indexThread],'posts',posts)
        }
    }
}