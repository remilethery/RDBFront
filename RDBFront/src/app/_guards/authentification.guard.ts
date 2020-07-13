import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Authguardservice } from '../_services/authguardservice.service';
import { isNull } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {
	constructor(private router: Router, private authguardservice: Authguardservice) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const isLoggedIn = !isNull(localStorage.getItem('currentUser'));
		if (isLoggedIn) {
			return true;
		}

		this.router.navigateByUrl('home');
		return false;
	}
}
