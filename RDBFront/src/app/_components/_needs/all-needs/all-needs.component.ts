import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Need } from 'src/app/_models/need';
import { NeedsService } from 'src/app/_services/needs-service.service';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { NgbdSortableHeader, SortEvent } from '../../../_helpers/sortable.directive';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-all-needs',
  templateUrl: './all-needs.component.html',
  styleUrls: ['./all-needs.component.css'],
  providers: [NeedsService, DecimalPipe]
})
export class AllNeedsComponent implements OnInit {

  allNeeds: Observable<Need[]>;
  totalNeeds: Observable<number>;
  selectedNeed: Need;
  acceptedVote: boolean;
  currentUser: User;
  hasVoted = false;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public needService: NeedsService) { 

  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllNeeds();
    this.allNeeds = this.needService.needs$;
    this.totalNeeds = this.needService.total$;
  }
  getAllNeeds() {
    this.needService.getAllNeeds().subscribe(needs => this.needService._allneeds = needs);
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

  voteUp(need: Need) {
    this.selectedNeed = need;
    
    this.needService.voteUp(this.selectedNeed.id, this.currentUser.email).subscribe(need => {
      this.selectedNeed = need;
    });

  }

}