import { Component } from '@angular/core';

import { MusicPage } from '../music/music';
import { NewsPage } from '../news/news';
import { VideoPage } from '../video/video';
import { Profile } from '../profile/profile';
import { MapPage } from '../map/map';
import { PredictionPage } from '../prediction/prediction';
import { AddSitePage } from '../add-site/add-site';
import { ArduinoPage } from '../arduino/arduino';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = PredictionPage;
  tab3Root = AddSitePage;
  tab4Root = Profile;
  tab5Root = ArduinoPage;



  constructor() {

  }
}
