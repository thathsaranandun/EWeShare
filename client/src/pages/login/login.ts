import { SignupPage } from './../signup/signup';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataService } from '../../app/services/data.service';
import { MapPage } from '../map/map';


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
  enteredDataStatus:boolean=false;

  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dataService:DataService,
    public alertCtrl:AlertController,
   
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  loginUser(){
    if(/^[a-zA-Z0-9]+$/.test(this.username)){
      //Validate
      this.dataService.postLogIn(this.username,this.password).subscribe((data) => {
        
        if(data!= null){
              console.log(data);
              this.enteredDataStatus=true;

              //store data in the local storage
              let json = JSON.stringify(data);
              localStorage.setItem('data', json);

              //retireve data from the local storage
              var test = localStorage.getItem('data');
              let arr = JSON.parse(test);
              console.log(arr);



        }
        else
        {
              this.enteredDataStatus=false;
        }
      

        
        console.log('enteredDataStatus:'+this.enteredDataStatus)
        if(this.enteredDataStatus==true){
          this.navCtrl.push(TabsPage,{
            username:this.username


            

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
