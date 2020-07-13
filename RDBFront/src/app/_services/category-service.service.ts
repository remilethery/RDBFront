import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../_models/category';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get(environment.apiEndPoint + '/category/get-all-categories')
                    .pipe(map((categories: Category[]) => {return categories;}));

  }


}
