import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries/services/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private countriesService: CountriesService){}
  ngOnInit(): void {
    if ( !localStorage.getItem('cacheParams') ) return;
    this.countriesService.cacheParams = JSON.parse(localStorage.getItem('cacheParams') || '{}');
  }
  title = 'countryApp';
}
