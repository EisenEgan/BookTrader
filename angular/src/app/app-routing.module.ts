import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './components/home/home.component';
import { LoginComponent }   from './components/login/login.component';
import { RegisterComponent }   from './components/register/register.component';
import { BooksComponent }   from './components/books/books.component';
import { MyBooksComponent }   from './components/my-books/my-books.component';
import { SettingsComponent }   from './components/settings/settings.component';
import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'allbooks', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'mybooks', component: MyBooksComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
