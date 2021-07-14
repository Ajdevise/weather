import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingSub: Subject<boolean> = new Subject<boolean>();
  loadingMap: Map<string, boolean> = new Map<string, boolean>();
  blacklist: Array<string> = [
    'https://www.metaweather.com/api/location/search/?query='
  ];

  constructor() { }

  setLoading(loading: boolean, url: string): void {
    if(!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function')
    }

    if(!this.isURLBlacklisted(url)) {
      if(loading === true) {
        this.loadingMap.set(url, loading);
        this.loadingSub.next(true);
      } else if(loading === false && this.loadingMap.has(url)) {
        this.loadingMap.delete(url);
      }
  
      if(this.loadingMap.size === 0) {
        this.loadingSub.next(false);
      }
    }
  }

  isURLBlacklisted(URL: string) {
    for(let i = 0; i < this.blacklist.length; i++) {
      if(URL.includes(this.blacklist[i])) {
        return true;
      }
    }

    return false;
  }
}
