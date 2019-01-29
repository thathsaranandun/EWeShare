import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';

@NgModule({
  declarations: [
    Login,
  ],
  imports: [
    IonicPageModule.forChild(Login),
  ],
})
export class LoginModule {}
