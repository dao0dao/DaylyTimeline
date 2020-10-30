import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { TimeLineComponent } from './time-line/time-line.component';

const routes : Routes =[
{path: '', component: LoginPageComponent},
{path: 'dayly_schedule', component: TimeLineComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)    
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
