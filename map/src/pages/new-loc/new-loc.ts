import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewLocPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-loc',
  templateUrl: 'new-loc.html',
})
export class NewLocPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initNewLoc();
  }

  initNewLoc(){
    var hostlat = 1;
    var hostlng = 1;
    var marker=[];
    let newMark:boolean=true;
    var loc = "notset";
    //adding a new mark
    if(newMark){
      //send the hostlat and hostlng to map page and create a new map location in map page.
    newMark=false;
    }
  }
}
