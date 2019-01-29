import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  

  constructor() {

  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    
    let coord = new google.maps.LatLng(6.9407,79.8796);
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
      content:'<h4>Osaka Charging Station</h4><br><p>Port Type:J1770<br>Availability: Available<br>Open Time:24/7</p>'
    })

    marker.addListener('click',function(){
      markerWindow.open(this.map,marker)

    })

    let marker2 : google.maps.Marker = new google.maps.Marker({
      map:this.map,
      position:{lat:6.9432,lng:79.8786},
      icon:'../assets/img/map_marker_icon_1 - Copy.png'

    })
  }


}