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
  chargerId:number=9;
  cost:number=100;

  constructor(public navCtrl: NavController, public navParams: NavParams,public firebase:AngularFireDatabase) {

      this.s=this.firebase.object('/'+this.chargerId).valueChanges().subscribe((data:any) =>{
        console.log(data);
          this.energy_c=data.energy_c;
          this.power_c=data.power_c;
        
      });
    
  }

  start(){
    this.charge=true;
    this.firebase.object('/'+this.chargerId).set({
      charging:this.charge,
      cost:this.cost,
      energy_c:0,
      power_c:0

    })


  }

  stop(){
    this.charge=false;
    this.firebase.object('/'+this.chargerId).set({
      charging:this.charge,
      cost:this.cost,
      energy_c:this.energy_c,
      power_c:this.power_c
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArduinoPage');
    this.firebase.object('/'+this.chargerId).set({
      charging:this.charge,
      cost:this.cost,
      energy_c:0,
      power_c:0

    })
    console.log('Charging point updated in firebase')

  }

}
