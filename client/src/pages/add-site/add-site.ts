import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  verify:string='';

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataService, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSitePage');
  }

  addsite(){
    var test = localStorage.getItem('userid');
    let arr = JSON.parse(test);
    console.log(arr);
    this.userId=arr;
    console.log(this.userId);
    this.dataService.postAddSite(this.address,this.latitude,this.longitude,this.userId).subscribe((data:any) => {
      this.verify=data.done
      console.log(data.done)
      this.alert("Done",this.verify)
    })
    this.address='';
    this.latitude='';
    this.longitude='';
    this.verify='';
    
    
}
alert(title:string,message:string){
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: message,
    buttons: ['OK']
  });
  alert.present();
}

}
