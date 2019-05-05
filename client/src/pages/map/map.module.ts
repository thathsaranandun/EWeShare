import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { BackButtonTabsModule } from 'ion-back-button-tabs';

@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    BackButtonTabsModule
  ],
})
export class MapPageModule {}
