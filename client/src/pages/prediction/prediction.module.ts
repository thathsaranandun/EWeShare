import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PredictionPage } from './prediction';

@NgModule({
  declarations: [
    PredictionPage,
  ],
  imports: [
    IonicPageModule.forChild(PredictionPage),
  ],
})
export class PredictionPageModule {}
