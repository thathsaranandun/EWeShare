import { ParallaxHeaderDirective } from './../directives/parallax-header/parallax-header';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';



//import { AngularFireModule } from '@angular/fire';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';



import { MusicPage } from '../pages/music/music';
import { NewsPage } from '../pages/news/news';
import { VideoPage } from '../pages/video/video';
import { Intro } from '../pages/intro/intro';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MapPage } from '../pages/map/map';
import { Profile } from '../pages/profile/profile';
import { VimeoVideo } from '../pages/videos/vimeo';
import {  YoutubeVideo } from '../pages/videos/youtube';
import {  MusicPop } from '../pages/music/music-popOver/popover';


//service imports
import { DataService } from './services/data.service';


import { LocDetailsPage } from '../pages/loc-details/loc-details';
import {AddSitePage} from '../pages/add-site/add-site'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PredictionPage } from '../pages/prediction/prediction';
import { PredmapPage } from '../pages/predmap/predmap';
import { ArduinoPage } from '../pages/arduino/arduino';
import { EditPage } from '../pages/edit/edit';

var config = {
  apiKey: "AIzaSyCsgwAjMM-de8JzvYAwGUXQ3tjXxPp-FPw",
  authDomain: "ewe-share-36d42.firebaseapp.com",
  databaseURL: "https://ewe-share-36d42.firebaseio.com",
  projectId: "ewe-share-36d42",
  storageBucket: "ewe-share-36d42.appspot.com",
  messagingSenderId: "361996738222"
};

@NgModule({
  declarations: [
    MyApp,
    MusicPage,
    NewsPage,
    VideoPage,
    TabsPage,
    Login,
    VimeoVideo,
    YoutubeVideo,
    MusicPop,
    ParallaxHeaderDirective,
    Profile,
    MapPage,
    AddSitePage,
    EditPage,
    Intro,
    SignupPage,
    LocDetailsPage,
    PredictionPage,
    ArduinoPage,
    PredmapPage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MusicPage,
    NewsPage,
    VideoPage,
    TabsPage,
    EditPage,
    Login,
    YoutubeVideo,
    VimeoVideo,
    MusicPop,
    Profile,
    AddSitePage,
    MapPage,
    Intro,
    SignupPage,
    LocDetailsPage,
    PredictionPage,
    ArduinoPage,
    PredmapPage

  ],
  providers: [
    StatusBar,
    DataService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
