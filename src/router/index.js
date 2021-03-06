import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import PageHome from '../pages/PageHome.vue'
import PageMeetupDetail from '../pages/PageMeetupDetail.vue'
import PageMeetupFind from '../pages/PageMeetupFind.vue'
import PageNotFound from '../pages/PageNotFound.vue'
import PageLogin from '../pages/PageLogin.vue'
import PageRegsiter from '../pages/PageRegister.vue'
import PageSecret from '../pages/PageSecret.vue'
import PageNotAuthenticated from '../pages/PageNotAuthenticated.vue'
import PageMeetupCreate from '../pages/PageMeetupCreate.vue'
import PageProfile from '../pages/PageProfile.vue'
import PageMeetupEdit from '../pages/PageMeetupEdit.vue'

Vue.use(Router)

const router = new Router({
    routes:[
        {
            path:'/',
            name: 'PageHome',
            component:PageHome
        },
        {
            path:'/find/:category',
            name : 'PageFindCategory',
            component: PageMeetupFind,
            props:true // super interesting
            
        },
        {
            path:'/find',
            name : 'PageFind',
            component: PageMeetupFind
        },
        {
            path: '/meetups/new',
            name: 'PageMeetupCreate',
            component: PageMeetupCreate,
            meta: {onlyAuthUser: true}
        },
        {
            path:'/meetups/secret',
            name: 'PageSecret',
            component : PageSecret,
            meta : {onlyAuthUser:true}
        },
        {
            path:'/meetups/:id',
            name: 'PageMeetupDetail',
            component : PageMeetupDetail
        },
        {
            path:'/meetups/:meetupId/edit',
            name: 'PageMeetupEdit',
            component : PageMeetupEdit,
            meta : {onlyAuthUser:true},
            props:true
        },
        {
            path: '/login',
            name : 'PageLogin',
            component: PageLogin,
            meta : {onlyGuestUser:true}
        },
        {
            path : '/register',
            name : 'PageRegister',
            component : PageRegsiter,
            meta : {onlyGuestUser:true}
        },
        {
            path:'/me',
            name: 'PageProfile',
            component : PageProfile,
            meta : {onlyAuthUser:true}
        },
        {
            path: '/401',
            name : 'PageNotAuthenticated',
            component : PageNotAuthenticated
        },
        {
            path: '*',
            name : 'PageNotFound',
            component : PageNotFound
        }
    ],
    mode: 'history'
})

router.beforeEach((to,from,next)=>{
    store.dispatch('auth/getAuthUser')
    .then(() =>{
        const isAuthenticated = store.getters['auth/isAuthenticated']
        if (to.meta.onlyAuthUser) {
            if (isAuthenticated) {
                next()
            }else{
                next({name: 'PageNotAuthenticated'})
            }
        }else if(to.meta.onlyGuestUser){
            if (isAuthenticated) {
                next({name: 'PageHome'})
            } else {
                next()
            }
        }else{
            next()
        }

    })
})

export default router