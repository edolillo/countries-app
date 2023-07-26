import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/cache-params.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent implements OnInit {
  isLoading: boolean = false;
  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion?: string;
  countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.selectedRegion = this.countriesService.cacheParams.region.term;
    this.countries = this.countriesService.cacheParams.region.countries;
  }

  searchByRegion(region: string) {
    this.selectedRegion = region;
    this.isLoading = true;
    this.countriesService.search(region, 'region').subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
