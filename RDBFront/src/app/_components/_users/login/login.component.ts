import { Component, OnInit } from '@angular/core';
import { Authguardservice } from 'src/app/_services/authguardservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


	submitted = false;
	loginForm: FormGroup;

	constructor(private authguardservice: Authguardservice, private router: Router, private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: new FormControl('', [Validators.email, Validators.required]),
			password: new FormControl('', Validators.required)
		})
	}

	// Login
	login(formValue: any) {

		this.submitted = true;

		if (this.loginForm.invalid) {
			return;
		}

		this.authguardservice.login(formValue.email, formValue.password).subscribe(user => {
			this.authguardservice.setIsAuthenticated(true);
			this.navigateToMyNeeds();
		});
	}

	get f() {
		return this.loginForm.controls;
	}

	//Navigate to Needs List
	navigateToMyNeeds() {
		this.router.navigateByUrl('my-needs');
	}

	//Navigate to Register
	navigateToRegister() {
		this.router.navigateByUrl('register');
	}

}
