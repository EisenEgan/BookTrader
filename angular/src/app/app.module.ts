import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { BooksComponent } from './components/books/books.component';
import { MyBooksComponent } from './components/my-books/my-books.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RequestsComponent } from './components/requests/requests.component';
import { AuthService } from './services/auth.service'
import { BookService } from './services/book.service'
import { AppRoutingModule } from './app-routing.module'
import { AuthGuard } from './guards/auth.guard'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    BooksComponent,
    MyBooksComponent,
    NavbarComponent,
    LoginComponent,
    SettingsComponent,
    RequestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService, BookService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
