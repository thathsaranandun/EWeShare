import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Intro } from './intro';

@NgModule({
  declarations: [
    Intro,
  ],
  imports: [
    IonicPageModule.forChild(Intro),
  ],
})
export class IntroPageModule {}
