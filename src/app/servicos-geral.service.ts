import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServicosGeralService {
  
  private registros = [
    {
      hora: "8:30",
      quantidade:"200",
      ident: "12"
    },
    {
      hora: "11:00",
      quantidade:"100",
      ident: "13"
    },
    {
      hora: "18:30",
      quantidade:"300",
      ident: "14"
    },
    {
      hora: "21:00",
      quantidade:"400",
      ident: "15"
    }
  ]

  codeIdent(){
    const data = new Date()
    const dia = String(data.getDate()).length > 1 ? data.getDate() : '0' + data.getDate() 
    const mes = String(data.getMonth()).length > 1 ? data.getMonth() : '0' + data.getMonth()

    return (
      dia+''+mes+''+data.getFullYear()+''+data.getHours()+''+
      data.getMinutes()+''+data.getSeconds()+''+data.getMilliseconds()
    )
  }

  retornaDadosServidor(){
    return this.registros
  }

}
