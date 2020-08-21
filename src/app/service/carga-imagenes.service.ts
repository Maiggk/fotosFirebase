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
    console.log(imagenes);
  }

  private guardarImagen( imagen: {nombre:string, url:string} ){
    this.afs.collection(`/${ this.CARPETA_IMAGENES }`).add( imagen );
  }

}
