import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostDashboardPage } from './host-dashboard';

@NgModule({
  declarations: [
    HostDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(HostDashboardPage),
  ],
})
export class HostDashboardPageModule {}
