import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { BackgroundGridComponent } from './background-grid/background-grid.component';
import { AlertComponent } from './components/alert/alert.component';
import { InfoComponent } from './components/info/info.component';
import { EditComponent } from './components/edit/edit.component';
import { ErrorComponent } from './components/error/error.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';



@NgModule({
  declarations: [
    AppComponent,
    TimeLineComponent,
    BackgroundGridComponent,
    AlertComponent,
    InfoComponent,
    EditComponent,
    ErrorComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
