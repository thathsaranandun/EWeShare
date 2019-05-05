import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, LoadingController } from 'ionic-angular';
import { DataService } from '../../app/services/data.service';
import { PredmapPage } from '../predmap/predmap';

/**
 * Generated class for the PredictionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prediction',
  templateUrl: 'prediction.html',
})
export class PredictionPage {

  time:number = null;
  kwh:number = null;
  chargerType:number=null;
  loader:any;



  constructor(public navCtrl: NavController,public dataService:DataService,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {

  }

  prediction(){
    
    //Display the loader
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 100000
    });
    loader.present();

    this.dataService.postPrediction(this.time,this.kwh,this.chargerType).subscribe((data:any) => {
      loader.dismissAll();//dismiss the loader when results arrived
      console.log(data);
      if(data.valid){
        alert("Prediction Was Successful");
        console.log("1)"+data.location.lat);
        this.navCtrl.push(PredmapPage,{
          lat:data.location.lat,
          lon:data.location.lon,
          locdetails:data.locdetails
        });
      }
      else{
        this.showAlert(data)

      }
    });
  
   
  }

  showAlert(validation:any) {
    const alert = this.alertCtrl.create({
      title: 'Input Invalid',
      subTitle:'<p>'+ validation.errorMsg+'</p>',
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 100000
    });
    loader.present();
    return loader;
  }


}
