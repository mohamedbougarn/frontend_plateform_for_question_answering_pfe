import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

//import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContextService } from './services/context.service';

import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './services/client.service';
//import { ModalModule } from 'ngx-bootstrap/modal';

import { NgbModule, NgbButtonsModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
//import { NgApexchartsModule } from "ng-apexcharts";

import {FileUploadModule} from 'ng2-file-upload';
import { TestComponent } from './test/test.component';//for uplaoding file 
import { Sidebar2Component } from './partials/sidebar2/sidebar2.component';
import { ContextComponent } from './contexts/context/context.component';
import { SummarationTextComponent } from './contexts/summaration-text/summaration-text.component';
import { DashboardComponent } from './statistics/dashboard/dashboard.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { RegistryComponent } from './accounts/registry/registry.component';
import { LoginComponent } from './accounts/login/login.component';
import { HeaderComponent } from './partials/header/header.component';
import { AddCentextComponent } from './contexts/add-centext/add-centext.component';
import { CentextComponent } from './contexts/centext/centext.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ApiComponent } from './api/api.component';
import { ProfileComponent } from './accounts/profile/profile.component';
import { ConversationComponent } from './contexts/conversation/conversation.component';


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
    Sidebar2Component,
    TestComponent,
    ApiComponent,
    ProfileComponent,
    ConversationComponent
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
    FileUploadModule,
    NgxPaginationModule
  ],
  providers: [ContextService,ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
