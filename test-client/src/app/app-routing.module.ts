import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: '', children: []},
  {path: 'protected', component: ProtectedComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
