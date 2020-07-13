import { Component, OnInit } from '@angular/core';
import { Need } from 'src/app/_models/need';
import { NeedsService } from 'src/app/_services/needs-service.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/_models/category';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/_services/category-service.service';
import { MyNeedsService } from 'src/app/_services/my-needs-service.service';

@Component({
  selector: 'app-modify-need',
  templateUrl: './modify-need.component.html',
  styleUrls: ['./modify-need.component.css']
})
export class ModifyNeedComponent implements OnInit {

  selectedNeed: Need;
  categories: Category[];
  deleteNeedChecked: boolean;
  needForm: FormGroup;
  deleteForm: FormGroup;
  submittedForm = false;
  submittedDelete = false;
  
  constructor(private needService: MyNeedsService, private categoryService: CategoryService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.subscribeToSelectedNeed();
    this.getCategories();

    this.needForm = this.formBuilder.group({
      inputTitle: ['', Validators.required],
      inputDesc: ['', Validators.required],
      inputCategory: new FormControl()
    });

    this.deleteForm = this.formBuilder.group({
      deleteNeed: [false, Validators.requiredTrue]
    })


  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(categories => this.categories = categories); 
  }

  subscribeToSelectedNeed() {
    this.needService.selectedNeed.subscribe(need => this.selectedNeed = need);
  }

  modifyNeed(formValue: any) {

    this.submittedForm = true;

    let modifiedNeed = this.selectedNeed;
    modifiedNeed.title = formValue.inputTitle;
    modifiedNeed.description = formValue.inputDesc,
    modifiedNeed.category.type = (formValue.inputCategory)? formValue.inputCategory: this.selectedNeed.category.type;

    this.needService.modifyNeed(
      modifiedNeed).subscribe(need => 
     this.navigateToMyNeeds());
   }

   get f() {
		return this.needForm.controls;
  }
  
  get g() {
    return this.deleteForm.controls;
  }

   deleteNeed() {

    this.submittedDelete = true;

    if (this.deleteForm.invalid) {
      return;
    }

    this.needService.deleteNeed(this.selectedNeed).subscribe();
    this.navigateToMyNeeds();
   }

   navigateToMyNeeds(){
     this.router.navigateByUrl('my-needs');
   }

}
