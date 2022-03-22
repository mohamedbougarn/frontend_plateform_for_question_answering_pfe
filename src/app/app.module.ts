import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CentextComponent } from './centext/centext.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AddCentextComponent } from './add-centext/add-centext.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummarationTextComponent } from './summaration-text/summaration-text.component';
//import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContextService } from './services/context.service';

import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './services/client.service';
import { ContextComponent } from './context/context.component';
//import { ModalModule } from 'ngx-bootstrap/modal';

import { NgbModule, NgbButtonsModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Sidebar2Component } from './sidebar2/sidebar2.component';
//import { NgApexchartsModule } from "ng-apexcharts";

import {FileUploadModule} from 'ng2-file-upload';//for uplaoding file 



@NgModule({
  declarations: [
    AppComponent,
    CentextComponent,
    AddCentextComponent,
    HeaderComponent,
    LoginComponent,
    RegistryComponent,
    SidebarComponent,
    DashboardComponent,
    SummarationTextComponent,
    ContextComponent,
    Sidebar2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    //HttpClient,
    BrowserAnimationsModule,
    HttpClientModule,
    //NgApexchartsModule
    //ModalModule.forRoot() ,
    NgbModule, NgbButtonsModule, NgbTooltipModule, NgbTypeaheadModule,
    ModalModule.forRoot(),
    FileUploadModule
  ],
  providers: [ContextService,ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
