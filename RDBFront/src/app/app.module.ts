import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { HeaderComponent } from './_components/header/header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { LoginComponent } from './_components/_users/login/login.component';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Authguardservice } from './_services/authguardservice.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateNeedComponent } from './_components/_needs/create-need/create-need.component';
import { NeedsService } from './_services/needs-service.service';
import { MyNeedsService } from './_services/my-needs-service.service';
import { RegisterComponent } from './_components/_users/register/register.component';
import { MyNeedsComponent } from './_components/_needs/my-needs/my-needs.component';
import { AllNeedsComponent } from './_components/_needs/all-needs/all-needs.component';
import { ModifyNeedComponent } from './_components/_needs/modify-need/modify-need.component';
import { CategoryService } from './_services/category-service.service';
import { UsersService } from './_services/users.service';
import { BasicAuthInterceptor } from './_helpers/auth-interceptor';
import { NgbdSortableHeader } from './_helpers/sortable.directive';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CreateNeedComponent,
    RegisterComponent,
    MyNeedsComponent,
    AllNeedsComponent,
    ModifyNeedComponent,
    NgbdSortableHeader
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule
  ],  
  providers: [
    Authguardservice,
    NeedsService,
    MyNeedsService,
    CategoryService,
    UsersService,
    DecimalPipe,
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
