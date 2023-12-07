import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAutenticado: boolean = false;
  
  mostraMenuEmitter = new EventEmitter<boolean>();

  user:any;
  error:any;

  constructor(private router: Router, public auth: AngularFireAuth) { }

  async emailSignin(email: string, password: string){
    var auxAutenticado = false;
    try {
      const credential = await this.auth.
      signInWithEmailAndPassword(
        email,
        password
      ); 

      auxAutenticado = true;
      this.user = credential.user;

    } catch (error) {
      auxAutenticado = false;
      this.error = error;
      return this.error;

    } finally {
      if(!auxAutenticado){
        this.user = "";
      }else{
        this.router.navigate(['/']);
        this.error = "";
      }

      this.usuarioAutenticado = auxAutenticado;
      this.mostraMenuEmitter.emit(auxAutenticado);
    }
  }

  async signOut(){
    await this.auth.signOut();
    this.user = null;
    this.usuarioAutenticado = false;
  }
 
  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }
}
