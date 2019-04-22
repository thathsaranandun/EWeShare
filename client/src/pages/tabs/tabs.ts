import { Component } from '@angular/core';

import { MusicPage } from '../music/music';
import { NewsPage } from '../news/news';
import { VideoPage } from '../video/video';
import { Profile } from '../profile/profile';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = MusicPage;
  tab3Root = NewsPage;
  tab4Root = Profile;



  constructor() {

  }
}
