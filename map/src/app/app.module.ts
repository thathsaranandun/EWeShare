import { ParallaxHeaderDirective } from './../directives/parallax-header/parallax-header';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { MusicPage } from '../pages/music/music';
import { NewsPage } from '../pages/news/news';
import { VideoPage } from '../pages/video/video';
import { Intro } from '../pages/intro/intro';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { Profile } from '../pages/profile/profile';
import { VimeoVideo } from '../pages/videos/vimeo';
import {  YoutubeVideo } from '../pages/videos/youtube';
import {  MusicPop } from '../pages/music/music-popOver/popover';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    Intro
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MusicPage,
    NewsPage,
    VideoPage,
    TabsPage,
    Login,
    YoutubeVideo,
    VimeoVideo,
    MusicPop,
    Profile,
    MapPage,
    Intro

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
