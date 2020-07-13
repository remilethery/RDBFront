import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/_services/users.service';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/_helpers/must-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  registerForm: FormGroup;

  constructor(private userService: UsersService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullname: ['', [Validators.required,
                     Validators.minLength(5)]],
      email: ['', [Validators.required,
                   Validators.email]],
      password: ['', [Validators.required,
                      Validators.minLength(8),
                      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      passwordVerification: ['', Validators.required],
    }, {
      validators: MustMatch('password', 'passwordVerification')
    })
  }

  register(formValue: any) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.register(formValue.email, formValue.password, formValue.fullname)
      .subscribe(data => {this.navigateToLogin();}
      );
  }

  get f() {
    return this.registerForm.controls;
  }

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }

  onEmpty() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
