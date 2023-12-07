import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Meu Aplicativo Angular';

  mostrarMenu: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  ngOnInit(){
    this.authService.mostraMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }
}
