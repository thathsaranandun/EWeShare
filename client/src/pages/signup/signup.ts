import { Login } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  userFname:string='';
  userLname:string='';
  userEmail:string='';
  userName:string='';
  userAddress:string='';
  userPassword:string='';



  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


 /*    onSubmit(){
        this.dataService.addUser(this.user).subscribe(user => {
            console.log(user);
            this.users.unshift(user);
        });
    } */

  signup(){
      /* this.dataService.getUser(this.username).subscribe((data:any) =>{
        this.dbuser=data.dbuser;
      }); */
      this.dataService.postSignUp(this.userFname,this.userLname,this.userName,this.userEmail,this.userAddress,this.userPassword).subscribe((data:any) => {
      })
      this.userFname='';
      this.userLname='';
      this.userEmail='';
      this.userName='';
      this.userAddress='';
      this.userPassword='';
      alert("User Registered Successfully.")
      
  }

}
