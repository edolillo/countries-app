import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent implements OnInit {
  constructor(private countriesService: CountriesService) {}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheParams.name.countries;
    this.search = this.countriesService.cacheParams.name.term;
  }
  search: string = '';
  countries: Country[] = [];
  isLoading: boolean = false;
  searchByCountryName(searchText: string) {
    this.isLoading = true;
    this.countriesService.search(searchText, 'name').subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
