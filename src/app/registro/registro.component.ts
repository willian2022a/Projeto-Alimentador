

import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { ServicosGeralService } from '../servicos-geral.service';
import { ServicosFirestoreService } from '../servicos-firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  @ViewChild('horaBase') horaBase: ElementRef | undefined;
  @ViewChild('qtdBase') quantidadeBase: ElementRef | undefined;

  mostrarModalSucesso: boolean = false;
  mostrarModalErro: boolean = false;

  quantidadeAtualReservatorio:string = "0"
  registros: any[] = [];
  registrosTeste: any;

  constructor(
    private dadosService: ServicosGeralService,
    private firestoreService: ServicosFirestoreService) {
  }

  ngOnInit() {
    this.firestoreService.getRegistros().subscribe((data) => {
      this.ordenarRegistros(data[0]);
    });
    
    this.firestoreService.getQuantidadeReservatorio().subscribe((quantidadeReservatorio) => {
      if (quantidadeReservatorio !== undefined) {
        this.quantidadeAtualReservatorio = String(quantidadeReservatorio.quantidadeReservatorio)
      } 
    });

     this.firestoreService.mostrarModalSucesso$.subscribe((value) => {
      this.mostrarModalSucesso = value;
    });

    this.firestoreService.mostrarModalErro$.subscribe((value) => {
      this.mostrarModalErro = value;
    });
    
  }

  converterStringParaData(horaString: string) {
    const [hora, minuto] = horaString.split(':');
    const data = new Date();
    data.setHours(parseInt(hora, 10), parseInt(minuto, 10), 0, 0);
    return data;
  };

  atualizarRegistro(evento: { ident: string, hora: string, quantidade: string }) {
    const index = this.registros.findIndex(registro => registro.ident === evento.ident);

    if (index !== -1) {
      this.registros[index]['hora'] = evento.hora;
      this.registros[index]['quantidade'] = String(evento.quantidade);
    }
  }

  ordenarRegistros(cargaDados:any) {
    var arrObjs = Object.values(cargaDados);
    if (arrObjs.length) {
      for (var j = 0; j < arrObjs.length; j++) {
        var obj1:any = arrObjs[j];
        var auxobj:any = arrObjs[j];

        var indice = -1;
        for (var i = j; i < arrObjs.length; i++) {
          var obj2:any = arrObjs[i];

          var dataAux = this.converterStringParaData(auxobj["hora"]);
          var dataHora2 = this.converterStringParaData(obj2["hora"]);

          if (dataHora2 < dataAux) {
            auxobj = obj2;
            indice = i;
          }
        }

        if (indice > -1) {
          arrObjs[j] = auxobj;
          arrObjs[indice] = obj1;
        }
      }
    }

    var novoArrRegs = []
    for(var k=0; k<arrObjs.length; k++){
      var obj3:any = arrObjs[k];
      var indiceaux = String(k+1);
      novoArrRegs.push({ "ident": indiceaux ,"hora": obj3.hora, "quantidade": obj3.quantidade })
    }

    this.registros = novoArrRegs
  }

  atualizarDocumento() {
    var objEnviado:any = {}
    for(var i=0; i<this.registros.length; i++){
      var obj = this.registros[i];
      objEnviado[obj.ident] = { "hora": obj.hora, "quantidade": obj.quantidade }
    }
    this.firestoreService.updateDocument(objEnviado)
  }

  adicionarRegistro() {
    const hora = this.horaBase?.nativeElement.value
    const quantidade = this.quantidadeBase?.nativeElement.value

    if (hora && quantidade) {
      this.registros.push({
        hora: hora,
        quantidade: quantidade,
        ident: this.registros.length + 1
      })
    }
  }

  paiExcluiRegistro(evento: any) {
    let idBuscado = evento.closest('.componenteRegistroFilho').id
    let indice = -1
    for (let i = 0; i < this.registros.length; i++) {
      const obj = this.registros[i]
      if (obj.ident == idBuscado) {
        indice = i
      }
    }

    if (indice > -1) {
      this.registros.splice(indice, 1)
    }
  }
}
