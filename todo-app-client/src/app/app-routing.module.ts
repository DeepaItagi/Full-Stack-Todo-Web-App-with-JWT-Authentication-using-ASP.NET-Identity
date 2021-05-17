import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { AuthGuard } from './_guard/auth.guard';


const routes: Routes = [
  {
    path:'',
    component:TodoCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'login',
    component:LoginComponent
 },
 {
    path: '**', 
    component: NotFoundComponent,
    pathMatch: 'full'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
