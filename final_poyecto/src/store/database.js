import {defineStore} from 'pinia';
import { collection, query, where, getDocs, addDoc, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore/lite";
import {db} from '../firebaseConfig'
import { auth } from '../firebaseConfig'
import {nanoid } from 'nanoid'
import router from '../router/index';

export const useDatabaseStore = defineStore('database', {
        state: ()=> ({
            documents: [],
            loagingDoc: false
        }),
        actions: {
            async getPostulaciones(){
                if(this.documents.length !== 0){
                    return;
                }
                this.loagingDoc = true
                try {
                    const q = query(collection(db, "postulaciones"), where("user", "==", auth.currentUser.uid))
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                    this.documents.push(
                        {id: doc.id,
                         ...doc.data() }
                        )
                      });
                } catch (error) {
                    console.log(error)
                } finally {
                    this.loagingDoc = false
                }
            },
            async addPostulaciones(nombre,apellido,anio,area,image){
                try {
                    const objetoDoc = {
                        nombre:nombre,
                        apellido:apellido,
                        anio:anio,
                        area:area,
                        image:image,
                        short:nanoid(6),
                        user:auth.currentUser.uid
                    }
                    const docRef = await addDoc(collection(db, "postulaciones"), objetoDoc);
                    //console.log(docRef);
                    this.documents.push({
                        ...objetoDoc,
                        id: docRef.id
                    })
                } catch (error) {
                    console.log(error)
                } finally{

                }
            },
            async leerPostulaciones(id){
                try {
                    const docRef = doc(db, 'postulaciones', id);
                    
                    const docSnap = await getDoc(docRef);

                    if(!docSnap.exists()){
                        throw new Error("no existe el doc")
                    }
                    if(docSnap.data().user !== auth.currentUser.uid){
                        throw new Error("no le pertenece este documento")
                    }

                    return[docSnap.data().nombre, docSnap.data().apellido,
                      docSnap.data().anio,
                        docSnap.data().area,
                      docSnap.data().image]
                } catch (error) {
                    console.log(error)
                } finally{

                }
            },
            async updatePostulaciones(id,nombre,apellido,anio,area,image ){
                try {
                    const docRef = doc(db, 'postulaciones', id);

                    const docSnap = await getDoc(docRef)
                    if(!docSnap.exists()){
                        throw new Error("no existe el doc")
                    }
                    if(docSnap.data().user !== auth.currentUser.uid){
                        throw new Error("no le pertenece este documento")
                    }
                    await updateDoc(docRef, {
                        nombre:nombre,
                        apellido:apellido,
                        anio:anio,
                        area:area,
                        image:image
                    })
                    
                    this.documents = this.documents.map(item => item.id===id ? ({...item, nombre:nombre, apellido:apellido, anio:anio,area:area,image:image}): item);
                    router.push('/formulario')
                } catch (error) {
                    console.log(error)
                } finally{

                }
            },
            async deletePostulaciones(id){
                try {
                    const docRef = doc(db, 'postulaciones', id);

                    const docSnap = await getDoc(docRef)
                    if(!docSnap.exists()){
                        throw new Error("no existe el doc")
                    }
                    if(docSnap.data().user !== auth.currentUser.uid){
                        throw new Error("no le pertenece este documento")
                    }
                    await deleteDoc(docRef);
                    this.documents = this.documents.filter((item) => item.id !== id)
                } catch (error) {
                    console.log(error)
                } finally{

                }
            }
        }
});