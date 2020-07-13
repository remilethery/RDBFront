import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  register(email: string, password: string, fullname: string): Observable<any> {
    return this.http.post(environment.apiEndPoint + '/user/post-user', {"email": email, "password": password, "fullname": fullname, "userrole": "dsi"
    });
  }

}