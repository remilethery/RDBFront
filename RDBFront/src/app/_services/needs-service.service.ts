import { Injectable, PipeTransform } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Need } from '../_models/need';
import { User } from '../_models/user';
import { map, tap, debounceTime, switchMap, delay } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { DecimalPipe } from '@angular/common';
import { SortColumn, SortDirection } from '../_helpers/sortable.directive'


interface SearchResult {
  needs: Need[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(needs: Need[], column: SortColumn, direction: string): Need[] {
  if (direction === '' || column === '') {
    return needs;
  } else {
    return [...needs].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(need: Need, term: string, pipe: PipeTransform) {
  return need.title.toLowerCase().includes(term.toLowerCase())
    || need.category.type.toLowerCase().includes(term)
    || need.description.toLowerCase().includes(term)
    || pipe.transform(need.votes).includes(term);
}


@Injectable({
  providedIn: 'root'
})
export class NeedsService {

  public _allneeds: Need[];
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _needs$ = new BehaviorSubject<Need[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  selectedNeed = new BehaviorSubject<Need>(null);
  currentUser: User;

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  }

  constructor(private http: HttpClient, private pipe: DecimalPipe) {

    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(1500),
      switchMap(() => this._search()),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._needs$.next(result.needs);
      this._total$.next(result.total);
    });

    this._search$.next();

  }

  get needs$() { return this._needs$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable() }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // Sort
    let needs = sort(this._allneeds, sortColumn, sortDirection);

    // Filter
    needs = needs.filter(need => matches(need, searchTerm, this.pipe));
    const total = needs.length;

    // Pagination
    needs = needs.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ needs, total });
  }

  setCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
  }

  createNeed(inputTitle: string, inputDesc: string, inputCategory: string, inputUser: User, inputAnonymous: boolean): Observable<any> {

    return this.http.post(environment.apiEndPoint + '/need/post-need', {
      "title": inputTitle,
      "description": inputDesc,
      "category": { "type": inputCategory },
      "user": { "email": inputUser.email },
      "isanonymous": inputAnonymous
    });
  }

  getAllNeeds(): Observable<any> {
    return this.http.get(environment.apiEndPoint + '/need/get-all-needs')
      .pipe(map((needs: Need[]) => {
        return needs;
      }));
  }


  deleteNeed(need: Need): Observable<any> {
    let httpParams = new HttpParams().set("id", need.id);
    let options = { params: httpParams }
    return this.http.delete(environment.apiEndPoint + '/need/delete-need', options);
  }

  voteUp(needId: string, userEmail: string): Observable<any> {
    return this.http.post(environment.apiEndPoint + '/need/vote-need', { "needid": needId, "useremail": userEmail })
      .pipe(map((need: Need) => {
        return need;
      }));
  }

  setSelectedNeed(need: Need): void {
    this.selectedNeed.next(need);
  }

}
