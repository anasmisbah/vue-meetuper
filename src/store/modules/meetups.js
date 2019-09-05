import axios from 'axios'
import axiosInstance from '@/services/axios'

export default {
    namespaced: true,
    state:{
        items:[],
        item:{}
    },
    actions:{
        fetchMeetups ({state,commit}){
            commit('setItems',{resource : 'meetups', items: []},{root:true})
            return axios.get('/api/v1/meetups')
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
            .then(res => {
                dispatch('auth/addMeetupToAuthUser',meetupId,{root:true})

                const joinedPeople = state.item.joinedPeople
                commit('addUserToMeetup',[...joinedPeople,user])
                return true
            })
        }
    },
    mutations:{
        addUserToMeetup(state,joinedPeople){
            return Vue.set(state.item,'joinedPeople',joinedPeople)
        }
    }
}