import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Need } from 'src/app/_models/need';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { CategoryService } from 'src/app/_services/category-service.service';
import { Category } from 'src/app/_models/category';
import { NgbdSortableHeader, SortEvent } from '../../../_helpers/sortable.directive';
import { Observable } from 'rxjs';
import { MyNeedsService } from 'src/app/_services/my-needs-service.service';

@Component({
  selector: 'app-my-needs',
  templateUrl: './my-needs.component.html',
  styleUrls: ['./my-needs.component.css']
})
export class MyNeedsComponent implements OnInit {

  myNeeds: Observable<Need[]>;
  myTotalNeeds: Observable<number>;
  currentUser: User;
  categories: Category[];
  selectedNeed: Need;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public needService: MyNeedsService,
              private router: Router,
              private categoryService: CategoryService) { 

              }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getMyNeeds();
    this.myNeeds = this.needService.needs$;
    this.myTotalNeeds = this.needService.total$
    
  }
  getMyNeeds() {
    this.needService.getMyNeeds(this.currentUser).subscribe(
      (needs) => {
        this.needService._myneeds = needs;
      },
      error => console.log(error)
      );
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.needService.sortColumn = column;
    this.needService.sortDirection = direction;
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):'';
  }

  navigateToModifyNeed(need: Need): void {
    this.selectedNeed = need;
    this.needService.setSelectedNeed(this.selectedNeed);
    this.router.navigateByUrl('modify-need');
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(categories => this.categories = categories); 
  }

}
