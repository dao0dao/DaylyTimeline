import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { BackgroundGridComponent } from './background-grid/background-grid.component';
import { AlertComponent } from './components/alert/alert.component';
import { InfoComponent } from './components/info/info.component';
import { EditComponent } from './components/edit/edit.component';
import { ErrorComponent } from './components/error/error.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './service/auth-guard.service';
import { AddComponent } from './components/add/add.component';
import { InterceptorService } from './service/interceptor.service';
import { PlayersPageComponent } from './players-page/players-page.component';
import { TelephonePipePipe } from './pipes/telephone-pipe.pipe';
import { HomePageComponent } from './home-page/home-page.component';
import { SchdulePageVersion2Component } from './schdule-page-version2/schdule-page-versio2.component'
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { ErrorPageComponent } from './error-page/error-page.component';


const INCEPTOR_PROVIDERS: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent,
    SchedulePageComponent,
    BackgroundGridComponent,
    AlertComponent,
    InfoComponent,
    EditComponent,
    ErrorComponent,
    LoginPageComponent,
    AddComponent,
    PlayersPageComponent,
    TelephonePipePipe,
    HomePageComponent,
    SchdulePageVersion2Component,
    SearchPipePipe,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [AuthGuard, INCEPTOR_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
