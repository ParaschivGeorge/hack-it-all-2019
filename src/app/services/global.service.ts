import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private activeRequests = 0;

  constructor() {
  }

  public isLoading(): boolean {
    return this.activeRequests > 0;
  }

  public increaseActiveRequests(): void {
    this.activeRequests++;
  }

  public deceaseActiveRequests(): void {
    this.activeRequests = Math.max(this.activeRequests - 1, 0);
  }
}
