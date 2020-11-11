import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { BackgroundGridComponent } from './background-grid/background-grid.component';
import { AlertComponent } from './components/alert/alert.component';
import { InfoComponent } from './components/info/info.component';
import { EditComponent } from './components/edit/edit.component';
import { ErrorComponent } from './components/error/error.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './service/auth-guard.service';
import { AddComponent } from './components/add/add.component';
import {InterceptorService} from './service/interceptor.service';
import { PlayersPageComponent } from './players-page/players-page.component';

const INCEPTOR_PROVIDERS: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent,
    TimeLineComponent,
    BackgroundGridComponent,
    AlertComponent,
    InfoComponent,
    EditComponent,
    ErrorComponent,
    LoginPageComponent,
    AddComponent,
    PlayersPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard, INCEPTOR_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
