<template>
    <v-container>
    <h1>Mis</h1>
    </v-container>
    <v-container>
        <v-row justify="center">
            <div>
            <h1 class="text-green">Editar</h1>
             </div>
          
        </v-row>
    </v-container>

    <v-container>
        <v-row justify="center">
            <form @submit.prevent="handleSubmit">
              <div>
                <v-alert
                outlined
      type="success"
      prominent
      border="left"
    > 
      Editando postulación
    </v-alert>
    <v-spacer/>
    <br>
              </div>
              <label>Nombre: </label>
              <input  class="bg-lime lighten-4" type="text" placeholder="Ingrese Nombre" v-model="nombre"><br> <br>
              <label>Apellido: </label>
              <input class="bg-lime lighten-4" type="text" placeholder="Ingrese apellido" v-model="Apellido"><br> <br>
              <label>Año: </label>
              <input class="bg-lime lighten-4" type="text" placeholder="Ingrese Año" v-model="anio"><br> <br>
              <label>Área: </label>
              <input  style="width : 50rem" class="bg-lime lighten-4" type="text" placeholder="Ingrese Área" v-model="area"><br> <br>
              <label>URL Imagen: </label>
              <input  style="width : 50rem" class="bg-lime lighten-4" type="text" placeholder="Ingrese Imagen URL" v-model="image"> 

              <br> <br>
              <v-btn
      color="success"
     
    >
             <button type="submit" >Editar Proyecto</button>
        </v-btn>

          </form>
          
        </v-row>
    </v-container>

    
   
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {useDatabaseStore}  from '../store/database';


const databaseStore = useDatabaseStore();

const route = useRoute();

const handleSubmit =()=>{
    if(!nombre.value || !apellido.value  || !apellido.value   || !anio.value  || !area.value  || !image.value ){
    return alert('Rellene los campos para editar el proyecto')
}
   databaseStore.updatePostulaciones(route.params.id, nombre.value, apellido.value, anio.value, area.value, image.value)
}

const nombre = ref('')
const apellido = ref('')
const anio = ref('')
const area = ref('')
const image = ref('')


onMounted(async()=>{
  [nombre.value,apellido.value, anio.value, area.value, image.value]  = await databaseStore.leerPostulaciones(route.params.id)

  ok= [nombre.value] = await databaseStore.leerPostulaciones(route.params.id)
  
})

</script>