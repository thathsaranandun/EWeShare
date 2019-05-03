import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChargerReadingsPage } from './charger-readings';

@NgModule({
  declarations: [
    ChargerReadingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChargerReadingsPage),
  ],
})
export class ChargerReadingsPageModule {}
