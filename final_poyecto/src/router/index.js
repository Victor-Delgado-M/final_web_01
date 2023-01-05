import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "../store/usuario";
import HomeView from '../views/HomeView.vue'

const requireAuth = async(to, from, next) =>{
  const userStore =   useUserStore()
  userStore.loagingSession = true
  const user = await userStore.currentUser()
  if(user){
    next();
  }else{
    next('/login');
  }
  userStore.loagingSession = false
}



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/mision',
    name: 'mision',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MisionView.vue')
  },
  {
    path: '/funciones',
    name: 'funciones',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FuncionesView.vue')
  },
  {
    path: '/objetivo',
    name: 'objetivo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ObjetivoView.vue')
  },
  {
    path: '/horario',
    name: 'horario',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HorarioView.vue')
  },
  {
    path: '/equipo',
    name: 'equipo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EquipoView.vue'),
 
  },
  {
    path: '/json',
    name: 'json',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/JsonView.vue')
  },
  {
    path: '/xml',
    name: 'xml',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/XmlView.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/formulario',
    name: 'formulario',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Formulario.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/editar/:id',
    name: 'editar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Editar.vue'),
    beforeEnter: requireAuth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
