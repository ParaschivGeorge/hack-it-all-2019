import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onBCRNavigate(): void {
    window.open('https://www.bcr.ro/ro/cariere', '_blank');
  }

  onDBNavigate(): void {
    window.open('http://www.db.com/careers', '_blank');
  }

  onJaneStreetNavigate(): void {
    window.open('https://www.janestreet.com/join-jane-street', '_blank');
  }

  onIqadsNavigate(): void {
    window.open('https://www.iqads.ro/', '_blank');
  }

  onStiriNavigate(): void {
    window.open('https://www.stiri.ong/', '_blank');
  }

  onBursaNavigate(): void {
    window.open('http://www.bursa.ro', '_blank');
  }

  onAGERPRESNavigate(): void {
    window.open('http://www.agerpres.ro/', '_blank');
  }
}
