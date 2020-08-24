import { Directive, Input, Output,
         ElementRef, EventEmitter, HostListener } from '@angular/core';
import { FileItem }  from '../models/file-item';


@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos:FileItem[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover',['$event'])
  public onDragEnter( event:any ){
    this.mouseOver.emit( true );
    this._prevenirDetener( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(){
    this.mouseOver.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event ){
    const transferencia = this._getTransferencia(event);

    if(!transferencia){ return; }

    this._extraerArchivos( transferencia.files );
    this._prevenirDetener( event );
    this.mouseOver.emit( false );
  }

  private _getTransferencia( event:any ){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(  archivosLista: FileList){
    // console.log(archivosLista);

    for(const propiedad in Object.getOwnPropertyNames(archivosLista)){
      const archivoTemporal = archivosLista[propiedad];
      if(this._puedeSerCargado(archivoTemporal)){
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }
  }

  //Validaciones

  private _puedeSerCargado( archivo:File ):boolean{
    if( !this._archivoRepetido( archivo.name ) && this._esImagen( archivo.type ) ){
      return true;
    }else{
      return false;
    }

  }

  private _prevenirDetener( event ){
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoRepetido( nombreArchivo:string ):boolean{

    for(const archivo of this.archivos){
      if( archivo.nombreArchivo ==  nombreArchivo ){
        console.log('El archivo '+ nombreArchivo +' ya esta agregado');
        return true;
      }
    }

    return false;
  }

  private _esImagen( tipoArchivo: string ){
    return ( tipoArchivo === '' || tipoArchivo === undefined ) ? false: tipoArchivo.startsWith('image');
  }

}
