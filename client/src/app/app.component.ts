import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { Intro } from '../pages/intro/intro';

import { MusicPage } from '../pages/music/music';
import { NewsPage } from '../pages/news/news';
import { VideoPage } from '../pages/video/video';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MapPage } from '../pages/map/map';
import { Profile } from '../pages/profile/profile';
import { VimeoVideo } from '../pages/videos/vimeo';
import {  YoutubeVideo } from '../pages/videos/youtube';
import {  MusicPop } from '../pages/music/music-popOver/popover';
import { DataService } from './services/data.service';
import { LocDetailsPage } from '../pages/loc-details/loc-details';
import {AddSitePage} from '../pages/add-site/add-site'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
