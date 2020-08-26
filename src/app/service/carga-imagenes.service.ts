import { Injectable } from '@angular/core';
import { FileItem } from '../models/file-item';

import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor(private afs:AngularFirestore) { }

  cargarImagenesFirebase( imagenes:FileItem[] ){
    // console.log(imagenes);

    //Obtener referencia firebase storage
    const storageRef =  firebase.storage().ref()

    for( const item of imagenes ){
      item.estaSubiendo =  true;
      if( item.progreso >= 100 ){
        //Si la carga del elemento finalizo continua con el sig. elemento
        continue;
      }

      //Configurar la tarea de subida con los parametros requeridos firebase
      const uploadTask:  firebase.storage.UploadTask =
            storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`)
                      .put( item.archivo );

      //Iniciar la operacion de carga
      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
        ( error ) => console.error('Error al subir', error),
        () => {
            console.log('Imagen cargada correctamente.');
            // item.url = uploadTask.snapshot.downloadURL;
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              item.url = downloadURL;
              item.estaSubiendo = false;
              this.guardarImagen({
                nombre: item.nombreArchivo,
                url: item.url
              });
            });
        });

    }
  }

  private guardarImagen( imagen: {nombre:string, url:string} ){
    this.afs.collection(`/${ this.CARPETA_IMAGENES }`).add( imagen );
  }

}
