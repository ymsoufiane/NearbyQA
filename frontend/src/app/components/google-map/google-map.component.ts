import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter, Input } from '@angular/core';
import { LocationState } from 'src/app/services/location.service';
import { QuestionState } from 'src/app/services/question-state';
declare var google: any;
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent {
  @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;
  @Output() coordinatesClicked = new EventEmitter<{ lat: number, lng: number }>();

  @Input() localisation_user: boolean = false;
  map: any;
  marker: any;
  questionMarkers: Array<any> = [];
  lat =33.558139; 
  lng = -7.540519;

  constructor(private ngZone: NgZone, private locationState: LocationState, public questionService: QuestionState) { }

  ngOnInit(): void {
    try {
      this.getLocation()
    } catch (e) {
      this.locationState.setLocation({ lat: this.lat, lng: this.lng })

    }

    this.questionService.questions$.subscribe(questions => {
      // remove old markers
      this.questionMarkers.forEach((marker: any) => {
        marker.setMap(null);
      });
      this.questionMarkers = [];
      // add new markers for each question
      questions.forEach((question: any) => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(question.location[0], question.location[1]),
          map: this.map,
          title: question.title
        });
        this.questionMarkers.push(marker);
      }
      );
    });
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.mapInitializer();
    });
  }

  mapInitializer() {
    const mapOptions = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 14
    };

    this.map = new google.maps.Map(this.gmap.nativeElement,
      mapOptions);

    this.map.addListener("click", (mapsMouseEvent: any) => {

      this.lat = mapsMouseEvent.latLng.toJSON().lat;
      this.lng = mapsMouseEvent.latLng.toJSON().lng;
      this.locationState.setLocation({ lat: this.lat, lng: this.lng })

      if (this.marker) this.marker.setMap(null);
      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.lat, this.lng),
        map: this.map,
        icon: '/assets/user-map-location-svgrepo-com.svg'
      });

      this.coordinatesClicked.emit({ lat: this.lat, lng: this.lng });

    });
    // Marker position
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.lat, this.lng),
      map: this.map,
      icon: '/assets/user-map-location-svgrepo-com.svg'
    });
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log("get location")
        console.log(this.lat, this.lng)
        this.locationState.setLocation({ lat: this.lat, lng: this.lng })

        this.mapInitializer();
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

}
