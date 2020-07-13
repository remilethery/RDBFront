import { Component, OnInit } from '@angular/core';
import { Need } from 'src/app/_models/need';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NeedsService } from 'src/app/_services/needs-service.service';
import { Category } from 'src/app/_models/category';
import { CategoryService } from 'src/app/_services/category-service.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-create-need',
  templateUrl: './create-need.component.html',
  styleUrls: ['./create-need.component.css']
})
export class CreateNeedComponent implements OnInit {

  newNeed: Need;
  categories: Category[];
  currentUser: User;
  needForm: FormGroup;
  submitted = false;

  constructor(private needsService: NeedsService, 
              private categoryService: CategoryService, 
              private router: Router, 
              private formBuilder: FormBuilder) 
  { }

  ngOnInit(): void {
    this.getCategories();
    this.getCurrentUser();

    this.needForm = this.formBuilder.group({
      inputTitle: new FormControl('', [Validators.required, Validators.minLength(6)]),
      inputDesc: new FormControl('', [Validators.required, Validators.minLength(20)]),
      inputCategory: new FormControl('', Validators.required),
      inputAnonymous: new FormControl(false)
    })

  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):'';
  }

  createNeed(formValue: any) {

    this.submitted = true;

    if (this.needForm.invalid) {
      return;
    }

   this.needsService.createNeed(
     formValue.inputTitle,
     formValue.inputDesc,
     formValue.inputCategory,
     this.currentUser,
     formValue.inputAnonymous
   )
   .subscribe(need => 
    this.navigateToMyNeeds());
   ;
  }

  get f() {
		return this.needForm.controls;
	}

  getCategories(){
    this.categoryService.getAllCategories().subscribe(categories => this.categories = categories); 
  }


  navigateToMyNeeds(){
    this.router.navigateByUrl('my-needs');
  }

}
