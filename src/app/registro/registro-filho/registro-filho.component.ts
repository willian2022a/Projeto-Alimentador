import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-registro-filho',
  templateUrl: './registro-filho.component.html',
  styleUrls: ['./registro-filho.component.css']
})
export class RegistroFilhoComponent {
  @Input() registroFilho:any

  @Output() meuEvento = new EventEmitter<any>();

  filhoExcluido(evento:any){
    this.meuEvento.emit(evento.target.parentElement.parentElement)
  }
}
