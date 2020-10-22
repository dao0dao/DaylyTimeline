import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { BackgroundGridComponent } from './background-grid/background-grid.component';
import { AlertComponent } from './components/alert/alert.component';
import { InfoComponent } from './components/info/info.component';
import { EditComponent } from './components/edit/edit.component';



@NgModule({
  declarations: [
    AppComponent,
    TimeLineComponent,
    BackgroundGridComponent,
    AlertComponent,
    InfoComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
