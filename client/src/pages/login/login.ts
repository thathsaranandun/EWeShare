import { SignupPage } from './../signup/signup';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataService } from '../../app/services/data.service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  nextPage =TabsPage;
  signPage=SignupPage;
  username:string='';
  password:string='';
  enteredDataStatus:string='false';
  userID:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataService,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  loginUser(){
    if(/^[a-zA-Z0-9]+$/.test(this.username)){
      //Validate
      this.dataService.postLogIn(this.username,this.password).subscribe((data:any) => {
        console.log(data);
        this.enteredDataStatus=data.valid;
        this.userID=data.userid;
        localStorage.setItem('userid', data.userid);
        console.log('User ID:'+this.userID)
        console.log('enteredDataStatus:'+this.enteredDataStatus)
        if(this.enteredDataStatus=='true'){
          this.navCtrl.push(TabsPage,{
            userID:this.userID
          });
  
        }else{
          this.alert('Error','Invalid Login details. Please enter again.');
          this.username='';
          this.password='';
          console.log('cant load chat page');
        }

      })

      
       

    }else{
      this.alert('Error','Invalid Login details. Please enter again.');
    }
 
 
  
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
