import { Directive, Input, Output,
         ElementRef, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover',['$event'])
  public onDragEnter( event:any ){
    this.mouseOver.emit( true );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(){
    this.mouseOver.emit( false );
  }

}
