import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-registro-filho',
  templateUrl: './registro-filho.component.html',
  styleUrls: ['./registro-filho.component.css']
})
export class RegistroFilhoComponent {
  @Input() ident:any;
  @Input() hora:any;
  @Input() quantidade:any;

  @Output() meuEvento = new EventEmitter<any>();
  @Output() eventoFilhoAtualiza = new EventEmitter<{ ident: string, hora: string, quantidade: string }>();

  filhoExcluido(evento:any){
    this.meuEvento.emit(evento.target.parentElement.parentElement)
  }

  filhoAtualizaPai(){
    this.eventoFilhoAtualiza.emit({ ident: this.ident, hora: this.hora, quantidade: this.quantidade });
  }
}
