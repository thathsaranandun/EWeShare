import { Component } from '@angular/core';
import { MapPage } from '../map/map';
import { PredictionPage } from '../prediction/prediction';
import { AddSitePage } from '../add-site/add-site';
import { ArduinoPage } from '../arduino/arduino';
import { UserProfilePage } from '../user-profile/user-profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = PredictionPage;
  tab3Root = AddSitePage;
  tab4Root = UserProfilePage;
  tab5Root = ArduinoPage;



  constructor() {

  }
}
