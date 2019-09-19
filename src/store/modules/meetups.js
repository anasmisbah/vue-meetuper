import Vue from 'vue'
import axios from 'axios'
import axiosInstance from '@/services/axios'
import { applyFilters } from '@/helpers'

export default {
    namespaced: true,
    state:{
        items:[],
        item:{}
    },
    actions:{
        fetchMeetups ({state,commit},options = {}){
            commit('setItems',{resource : 'meetups', items: []},{root:true})

            const url = applyFilters('/api/v1/meetups',options.filter)    

            

            return axios.get(url)
            .then(res =>{
              const meetups = res.data
              commit('setItems',{resource : 'meetups', items: meetups},{root:true})
              return state.items
            })
        },
        
        fetchDetailMeetup({state,commit},meetupId){
            commit('setItem',{resource: 'meetups',item:{}},{root:true})
            return axios.get(`/api/v1/meetups/${meetupId}`)
            .then(res =>{
                const meetup = res.data
                commit('setItem',{resource: 'meetups',item:meetup},{root:true})
                return state.item
            })
        },
        createMeetup({rootState},meetups){
            meetups.processedLocation = meetups.location.toLowerCase().replace(/[\s,]+/g,'').trim()
            meetups.meetupCreator = rootState.auth.user
            return axiosInstance.post('/api/v1/meetups', meetups)
            .then(res => res.data)
            
        },
        joinMeetups({state,rootState,commit,dispatch},meetupId){
            const user = rootState.auth.user

            return axiosInstance.post(`/api/v1/meetups/${meetupId}/join`)
            .then(() => {
                dispatch('auth/addMeetupToAuthUser',meetupId,{root:true})

                const joinedPeople = state.item.joinedPeople
                commit('addUserToMeetup',[...joinedPeople,user])
                return true
            })
        },
        leaveMeetup({state,rootState,commit,dispatch},meetupId){
            const user =  rootState.auth.user

            return axiosInstance.post(`/api/v1/meetups/${meetupId}/leave`)
            .then(()=>{
                dispatch('auth/removeMeetupFromAuthUser',meetupId,{root:true})
                const joinedPeople = state.item.joinedPeople
                const index = joinedPeople.findIndex(jUser=>jUser._id == user._id)
                joinedPeople.splice(index,1)
                commit('addUserToMeetup',joinedPeople)
                
            })
        },
        updateMeetup({commit,state},meetupData){
            meetupData.processedLocation = meetupData.location.toLowerCase().replace(/[\s,]+/g,'').trim()
            return axiosInstance.patch(`/api/v1/meetups/${meetupData._id}`,meetupData)
            .then(res => {
                const meetup = res.data
                commit('mergeMeetup',meetup)
                return state.item
            })
        }
    },
    mutations:{
        addUserToMeetup(state,joinedPeople){
            Vue.set(state.item,'joinedPeople',joinedPeople)
        },
        mergeMeetup(state,meetupData){
            state.item = {...state.item,...meetupData}
        }
    }
}