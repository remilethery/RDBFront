import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/_users/login/login.component';
import { AuthentificationGuard } from './_guards/authentification.guard';
import { CreateNeedComponent } from './_components/_needs/create-need/create-need.component';
import { RegisterComponent } from './_components/_users/register/register.component';
import { MyNeedsComponent } from './_components/_needs/my-needs/my-needs.component';
import { AllNeedsComponent } from './_components/_needs/all-needs/all-needs.component';
import { ModifyNeedComponent } from './_components/_needs/modify-need/modify-need.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'create-need', component: CreateNeedComponent, canActivate: [AuthentificationGuard]},
  {path: 'my-needs',  component: MyNeedsComponent, canActivate: [AuthentificationGuard]},
  {path: 'all-needs', component: AllNeedsComponent, canActivate: [AuthentificationGuard]},
  {path: 'modify-need', component: ModifyNeedComponent, canActivate: [AuthentificationGuard]},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
