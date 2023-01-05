<template>
    <v-container>
     
       <h1>Mis</h1>
    </v-container>
  
    <v-container>
      <v-row justify="center">
        <v-col lg="12">
          <h1 align="center" class="text-green">Bienvenido a tus postulación {{ userStore.userData?.email }}</h1>
            <h3 class="text-green">Agrega postulación</h3>
            <form @submit.prevent="handleSubmit">
                <div>
      <v-spacer/>
      <br>
                </div>
                <input  class="bg-light-green accent-1 text-white
" type="text" placeholder="Ingrese Nombre" v-model="nombre"><br> <br>
                <input class="bg-light-green accent-1
" type="text" placeholder="Ingrese Apellido" v-model="apellido"><br> <br>
                <input class="bg-light-green accent-1
" type="text" placeholder="Ingrese su total de años" v-model="anio"><br> <br>
                <input  style="width : 50rem" class="bg-light-green accent-1
" type="text" placeholder="Ingrese Área interesada" v-model="area"><br> <br>
                <input  style="width : 50rem" class="bg-light-green accent-1" type="text" placeholder="Ingrese su Imagen URL" v-model="image"> 
               
                <br> <br>
                <v-btn
        color="green"
       
      >
               <button type="submit" >Agregar Postulación</button>
          </v-btn>
  
            </form>
        </v-col>
      <v-col lg="12">
    
      
    <h1 class="text-green">Postulaciones agregadas</h1>
    <p v-if="databaseStore.loagingDoc">Cargando postulaciones...</p>
    <ul v-else>
      <li v-for="item of databaseStore.documents" :key="item.id">
        <strong>Nombre:</strong> {{ item.nombre }} <br>
        <strong>Apellido:</strong> {{ item.apellido }} <br>
        <strong>Años:</strong> {{ item.anio }} <br>
        <strong>Área:</strong> <p>{{ item.area }}</p>  <br>
        <v-img
    max-height="150"
    max-width="250"
    :src=item.image
  ></v-img>
        <br>  
        <v-btn
        color="cyan"
       
      >
      <button @click="router.push(`/editar/${item.id}`)">Editar</button>
    </v-btn>
        <v-btn
        color="error"
       
      >
      <button @click="databaseStore.deletePostulaciones(item.id)">Eliminar</button>
    </v-btn>
      
        
      </li>
    </ul> 
    
  </v-col>
  </v-row>
  </v-container>
  </template>
  
  <script setup>
  
  import {useUserStore} from '../store/usuario';
  import { useDatabaseStore } from '../store/database';
  import {ref} from 'vue';
  import {useRouter} from 'vue-router'
  const userStore = useUserStore()
  const databaseStore = useDatabaseStore()
  const router = useRouter()
  
  databaseStore.getPostulaciones()
  
  const nombre = ref('')
  const apellido = ref('')
  const anio = ref('')
  const area = ref('')
  const image = ref('')
  
  
  const handleSubmit =()=>{
    if(!nombre.value || !apellido.value  || !apellido.value   || !anio.value  || !area.value  || !image.value ){
      return alert('Rellene los campos para agregar proyectos')
  }
  
    databaseStore.addPostulaciones(nombre.value,apellido.value,  anio.value, area.value , image.value )
  }
  
  </script>
  
 