import Vue from 'vue'
import axios from 'axios'
import axiosInstance from '@/services/axios'
import { applyFilters } from '@/helpers'

export default {
    namespaced: true,
    state:{
        isThreadsLoaded : false,
        items:[],
    },
    actions:{
        fetchThreads({state,commit},{meetupId,filter = {},init}){  

            if (init) {
            commit('setItems',{resource : 'threads', items: []},{root:true})                
            }

            const url = applyFilters(`/api/v1/threads?meetupId=${meetupId}`,filter) 

            return axios.get(url)
            .then(res=>{
              const {threads,isAllDataLoaded} = res.data
              commit('setAllDataLoaded',isAllDataLoaded)
              commit('mergeThreads',threads)
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
        },
        setAllDataLoaded(state,isDataLoaded){
            state.isThreadsLoaded = isDataLoaded
        },
        mergeThreads(state,threads){
            state.items = [...state.items,...threads]
        }
    }
}