import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../app/services/data.service';

/**
 * Generated class for the LocDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loc-details',
  templateUrl: 'loc-details.html',
})
export class LocDetailsPage {
  locationid:number;
  location:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataService) {
    this.locationid=navParams.get('locationid');
    console.log(this.locationid);
    this.dataService.getLocations().subscribe((data: any) => {
      console.log(data);
      this.location=data.locations[this.locationid].address
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocDetailsPage');
  }

}
