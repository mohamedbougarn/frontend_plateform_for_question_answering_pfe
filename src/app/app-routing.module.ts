import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCentextComponent } from './add-centext/add-centext.component';
import { CentextComponent } from './centext/centext.component';
import { ContextComponent } from './context/context.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { SummarationTextComponent } from './summaration-text/summaration-text.component';
import { Sidebar2Component } from './sidebar2/sidebar2.component';

const routes: Routes = [
  {path :'' , redirectTo: '/login', pathMatch : 'full' },
  {path :'login' ,component : LoginComponent },
 // {path :'context' ,component : CentextComponent },
  {path :'Q_R/add/:id_context' ,component : AddCentextComponent },
  {path :'register' ,component : RegistryComponent },
  {path :'dashboard/:id_client' ,component : DashboardComponent },
  {path :'summaration/text' ,component : SummarationTextComponent },
  {path :'context' ,component : ContextComponent },
  {path :'sidebar2',component : Sidebar2Component}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
