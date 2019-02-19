import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Geolocation,GeolocationOptions,Geoposition } from '@ionic-native/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';





@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  curentLocLat;
  currentLocLng;
  options : GeolocationOptions;
  currentPos : Geoposition;

  constructor(private geolocation: Geolocation) {
    

  }

  getUserPosition(){
    this.options = {
        enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;      
        console.log(pos);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });
}

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {

    this.getUserPosition();


    let locations=[];
    
    let coord = new google.maps.LatLng(this.currentPos.coords.latitude,this.currentPos.coords.longitude);
    let mapopts : google.maps.MapOptions = {
      center: coord,
      zoom:18,
      mapTypeId:google.maps.MapTypeId.ROADMAP

    }

    this.map=new google.maps.Map(this.mapElement.nativeElement,mapopts)

    let marker : google.maps.Marker = new google.maps.Marker({
      map:this.map,
      position:coord,
      icon:'../assets/img/map_marker_icon_3 - Copy.png'

    })

    var markerWindow = new google.maps.InfoWindow({
      content:'<h4>Charging Station 1</h4><br><p>Port Type:J1770<br>Availability: Available<br>Open Time:24/7</p>'
    })

    marker.addListener('click',function(){
      markerWindow.open(this.map,marker)

    })

    let marker2 : google.maps.Marker = new google.maps.Marker({
      map:this.map,
      position:{lat:6.9432,lng:79.8786},
      icon:'../assets/img/map_marker_icon_1 - Copy.png'

    })

    var markerWindow2 = new google.maps.InfoWindow({
      content:'<h4>Charging station 2</h4><br><p>Port Type:J1770<br>Availability: Occupied<br>Open Time:24/7</p>'
    })

    marker2.addListener('click',function(){
      markerWindow2.open(this.map,marker2)

    })

    let marker3 : google.maps.Marker = new google.maps.Marker({
      map:this.map,
      position:{lat:6.9395,lng:79.8781},
      icon:'../assets/img/map_marker_icon_2 - Copy.png'

    })

    var markerWindow3 = new google.maps.InfoWindow({
      content:'<h4>Charging station 3</h4><br><p>Port Type:J1770<br>Availability: Closed<br>Open Time:24/7</p>'
    })

    marker3.addListener('click',function(){
      markerWindow3.open(this.map,marker3)

    })

    /*
    
    
    */

  }


}