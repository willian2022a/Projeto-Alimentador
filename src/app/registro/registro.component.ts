

import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { ServicosGeralService } from '../servicos-geral.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  @ViewChild('horaBase') horaBase: ElementRef | undefined;
  @ViewChild('qtdBase') quantidadeBase: ElementRef | undefined;

  registros:any
  
  constructor(private dadosService: ServicosGeralService) {}
  
  ngOnInit(){
    this.registros = this.dadosService.retornaDadosServidor();
  }

  adicionarRegistro(){
    const hora = this.horaBase?.nativeElement.value
    const quantidade = this.quantidadeBase?.nativeElement.value
    
    if( hora && quantidade ){
      this.registros.push({
        hora: hora,
        quantidade: quantidade,
        ident: this.dadosService.codeIdent()
      })
    }
  }

  paiExcluiRegistro(evento:any){
    console.log(evento.id)

    let indice = -1
    for(let i=0; i<this.registros.length; i++){
      const obj = this.registros[i]

      if(obj.ident == evento.id){
        indice = i
      }
    }

    if(indice > -1){
      this.registros.splice(indice,1)
    }
  }
}
