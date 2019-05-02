import { Component } from '@angular/core';
import { NewsPage } from '../news/news';
import { Profile } from '../profile/profile';
import { MapPage } from '../map/map';
import { PredictionPage } from '../prediction/prediction';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = PredictionPage;
  tab3Root = NewsPage;
  tab4Root = Profile;



  constructor() {

  }
}
