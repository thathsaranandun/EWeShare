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
  energy_c:any=0;
  power_c:number=0;
  charge:boolean=false;
  chargerId:number=1;

  constructor(public navCtrl: NavController, public navParams: NavParams,public firebase:AngularFireDatabase) {
      this.s=this.firebase.object('/'+this.chargerId).valueChanges().subscribe((data:any) =>{
        console.log(data);
        this.energy_c=data.energy_c;
      });
      this.s=this.firebase.object('/'+this.chargerId).valueChanges().subscribe((data:any) =>{
        console.log(data);
        this.power_c=data.power_c;
    });
    
  }

  start(){
    this.charge=true
    this.firebase.object('/'+this.chargerId).set({
      charging:this.charge,
      chargerId:this.chargerId,
      energy_c:0,
      power_c:0

    })


  }

  stop(){
    this.charge=false
    this.firebase.object('/'+this.chargerId).set({
      charging:this.charge,
      chargerId:this.chargerId
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArduinoPage');
  }

}
