import { Component } from '@angular/core';
import { Authguardservice } from './_services/authguardservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rent a Car : Recueil des besoins';
  isAuthenticated: boolean;

  constructor(private authguardservice: Authguardservice){
  }

  ngOnInit() {
    this.subscribeToIsAuthenticate();
  }

  subscribeToIsAuthenticate(){
    this.authguardservice.isAuthenticated.subscribe(status => this.isAuthenticated = status);
  }

}
