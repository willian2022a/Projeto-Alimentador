import { Usuario } from './usuario';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private usuario: Usuario = new Usuario();
  
  constructor(public auth: AuthService){
  }

  getUsuario() {
    return this.usuario;
  }

  fazerLogin(){
    this.auth.emailSignin(this.usuario.nome, this.usuario.senha)
  }

  logout(){
    return this.auth.signOut()
  }

}
