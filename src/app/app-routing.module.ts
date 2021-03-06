import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './accounts/login/login.component';
import { RegistryComponent } from './accounts/registry/registry.component';
import { AddCentextComponent } from './contexts/add-centext/add-centext.component';
import { CentextComponent } from './contexts/centext/centext.component';
import { ContextComponent } from './contexts/context/context.component';
import { SummarationTextComponent } from './contexts/summaration-text/summaration-text.component';
import { Sidebar2Component } from './partials/sidebar2/sidebar2.component';
import { DashboardComponent } from './statistics/dashboard/dashboard.component';

import { TestComponent } from './test/test.component';
import { ApiComponent } from './api/api.component';
import { ProfileComponent } from './accounts/profile/profile.component';
import { ConversationComponent } from './contexts/conversation/conversation.component';

const routes: Routes = [
  {path :'' , redirectTo: '/visiteur', pathMatch : 'full' },
  {path :'login' ,component : LoginComponent },
  {path :'visiteur' ,component : CentextComponent },
  {path :'Q_R/add/:id_context' ,component : AddCentextComponent },
  {path :'register' ,component : RegistryComponent },
  {path :'dashboard/:id_client' ,component : DashboardComponent },
  {path :'summaration/text' ,component : SummarationTextComponent },
  {path :'context' ,component : ContextComponent},
  {path :'sidebar2',component : Sidebar2Component},
  {path :'test',component : TestComponent},
  {path :'api/:id_client',component : ApiComponent},
  {path :'profile/:id_client',component : ProfileComponent},
  {path : 'conversation',component: ConversationComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
