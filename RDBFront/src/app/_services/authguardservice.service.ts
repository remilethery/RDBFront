import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Authguardservice {

  isAuthenticated = new BehaviorSubject(null);
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) { 
	  this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
	  this.currentUser = this.currentUserSubject.asObservable();
	  this.setIsAuthenticated(false);
  }

  public get currentUserValue(): User{
	  return this.currentUserSubject.value;
  }

	login(email: string, password: string) {
		return this.http
			.post<any>(environment.apiEndPoint + '/authenticate/authenticate', { "email": email, "password": password })
			.pipe(map(user => {
				if (user){
					localStorage.setItem('currentUser', JSON.stringify(user.result));
					this.setIsAuthenticated(true);
					this.setCurrentUser(user);
				}
				return user;	
      }));
  }

  // Set connected user
	setCurrentUser(user: User): void {
		this.currentUserSubject.next(user);
	}

	// User isAuthenticate
	setIsAuthenticated(value: Boolean) {
		this.isAuthenticated.next(value);
	}

	// Remove token from localstorage
	logout(): void {
		localStorage.removeItem('user');
		this.setIsAuthenticated(false);
		this.currentUserSubject.next(null);
		this.navigateToLogin();
	}

	//Navigate to login
	navigateToLogin() {
		this.router.navigateByUrl('login');
	}

}
