import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSitePage } from './add-site';

@NgModule({
  declarations: [
    AddSitePage,
  ],
  imports: [
    IonicPageModule.forChild(AddSitePage),
  ],
})
export class AddSitePageModule {}
