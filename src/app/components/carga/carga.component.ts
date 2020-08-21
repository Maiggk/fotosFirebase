import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../service/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [
  ]
})
export class CargaComponent implements OnInit {

  archivos:FileItem[] = [];

  constructor(public _cargaImagenes:CargaImagenesService) { }

  ngOnInit(): void {
  }

  cargarImagenes(){
    this._cargaImagenes.cargarImagenesFirebase( this.archivos );
  }

}
