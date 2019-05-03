import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ArduinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-arduino',
  templateUrl: 'arduino.html',
})
export class ArduinoPage {

  s;
  energy_c:any;
  power_c:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public firebase:AngularFireDatabase) {
    this.s=this.firebase.object('energy_c').valueChanges().subscribe(data =>{
      console.log(data);
      this.energy_c=data;
    });
    this.s=this.firebase.object('power_c').valueChanges().subscribe(data =>{
      console.log(data);
      this.power_c=data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArduinoPage');
  }

}
