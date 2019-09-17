
import axios from 'axios'       
export default {
    namespaced:true,

    state:{
        isLocationResolved:false,
        item:{
            city:'',
            country:''
        }
    },
    getters:{
        location (state) {
            const {city,country} = state.item
            return (city && country) ? (city + ', '+country):''
        }
    },
    actions:{
        fetchMetaData({commit}){
            return axios.get('/api/v1')
            .then((res)=>{
                const meta = res.data
                commit('setItem',{resource:'meta',item:meta},{root:true})
                commit('setLocationResolved',true)
                return meta
            })
            .catch(err => {
                commit('setLocationResolved',true)
                return err
            })
        }
    },
    mutations:{
        setLocationResolved(state,isLocationResolved){
            return state.isLocationResolved = isLocationResolved
        }
    }
}