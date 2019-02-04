import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewLocPage } from './new-loc';

@NgModule({
  declarations: [
    NewLocPage,
  ],
  imports: [
    IonicPageModule.forChild(NewLocPage),
  ],
})
export class NewLocPageModule {}
