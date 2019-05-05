import { Login } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataService } from '../../app/services/data.service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  userFname:string=null;
  userLname:string=null;
  userEmail:string=null;
  userName:string=null;
  userAddress:string=null;
  userPassword:string=null;



  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,public dataService:DataService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

/**
 * User Signup Method
 */
  signup(){
      this.dataService.postSignUp(this.userFname,this.userLname,this.userName,this.userEmail,this.userAddress,this.userPassword).subscribe((data:any) => {
       if(data.valid){
        this.userFname=null;
        this.userLname=null;
        this.userEmail=null;
        this.userName=null;
        this.userAddress=null;
        this.userPassword=null;
        this.showAlert(data.msg);
        this.navCtrl.push(Login);
        }
        else{
        this.userFname=null;
        this.userLname=null;
        this.userEmail=null;
        this.userName=null;
        this.userAddress=null;
        this.userPassword=null;
          this.showAlert(data.msg)
        }
      })
      
      
  }

  showAlert(validation:any) {
    const alert = this.alertCtrl.create({
      title: 'Registration Message',
      subTitle:'<p>'+ validation+'</p>',
      buttons: ['OK']
    });
    alert.present();
  }

}
