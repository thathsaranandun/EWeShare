import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocDetailsPage } from './loc-details';

@NgModule({
  declarations: [
    LocDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(LocDetailsPage),
  ],
})
export class LocDetailsPageModule {}
