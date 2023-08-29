import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Location {
    lat: number;
    lng: number;
}

@Injectable({
    providedIn: 'root'
})


export class LocationState {
    private locationSubject = new BehaviorSubject<Location>({} as Location);
    public location$: Observable<any> = this.locationSubject.asObservable();

    setLocation(location: Location): void {
        this.locationSubject.next(location);
        
    }

    getLocation(): Location {
        return this.locationSubject.getValue();
    }
}