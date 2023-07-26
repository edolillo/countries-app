import { Component, Input, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent implements OnInit {
  countries: Country[] = [];
  isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  search: string = '';

  ngOnInit(): void {
    this.countries = this.countriesService.cacheParams.capital.countries;
    this.search = this.countriesService.cacheParams.capital.term;
  }

  searchByCapital(searchText: string) {
    this.isLoading = true;
    this.countriesService
      .search(searchText, 'capital')
      .subscribe((countries) => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
