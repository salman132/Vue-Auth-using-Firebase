import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from "@/components/Home/GMap";
import Welcome from "@/components/Welcome";
import Signup from "@/components/Auth/Signup";
import Login from "@/components/Auth/Login";
import firebase from "firebase";


Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true,
      }
    }

  ]
})

router.beforeEach((to,from,next) =>{
  //Auth route check
  if(to.matched.some(rec=>rec.meta.requiresAuth)){
    //Check auth state
    let user = firebase.auth().currentUser;
    if(user){
      //passed
      next()
    }
    else{
      //Denied
      next({name: 'Login'})
    }
  }
  else{
    next()
  }
})


export default router;
