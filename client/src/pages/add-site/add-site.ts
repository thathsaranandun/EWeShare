import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../app/services/data.service';


/**
 * Generated class for the AddSitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-site',
  templateUrl: 'add-site.html',
})
export class AddSitePage {

  address:string='';
  latitude:string='';
  longitude:string='';
  userId:number=1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSitePage');
  }

  addsite(){
    this.dataService.postAddSite(this.address,this.latitude,this.longitude,this.userId).subscribe((data:any) => {
    })
    this.address='';
    this.latitude='';
    this.longitude='';
    alert("Site added successfully.")
    
}

}
