import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { AuthGuard } from './service/auth-guard.service'
import { PlayersPageComponent } from './players-page/players-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'daily_schedule', component: TimeLineComponent, canActivate: [AuthGuard] },
  { path: 'players', component: PlayersPageComponent, canActivate: [AuthGuard] },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
