import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingSub: Subject<boolean> = new Subject<boolean>();
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() { }

  setLoading(loading: boolean, url: string): void {
    if(!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function')
    }

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