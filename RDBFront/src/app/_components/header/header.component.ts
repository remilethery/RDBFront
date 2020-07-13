import { Component, OnInit } from '@angular/core';
import { Authguardservice } from 'src/app/_services/authguardservice.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/_services/users.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor(private authService: Authguardservice, 
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):'';
  }

  navigateToDefault(): void {
    this.router.navigateByUrl('my-needs');
  }

  navigateToHome(): void {
    this.router.navigateByUrl('home');
  }

  navigateToMyneeds(): void {
    this.router.navigateByUrl('my-needs');
  }

  navigateToAllNeeds(): void {
    this.router.navigateByUrl('all-needs');
  }

  navigateToCreateNeed(): void {
    this.router.navigateByUrl('create-need');
  }

  navigateToSearchNeeds(): void {
    this.router.navigateByUrl('search-needs');
  }


  logout(): void {
    this.authService.logout();
  }

}
