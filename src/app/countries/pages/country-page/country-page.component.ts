import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit {
  constructor(
    private activatesRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}
  country: Country | '' = '';
  translations: string[] = [];
  ngOnInit(): void {
    this.activatesRoute.params
      .pipe(switchMap(({ id }) => this.countriesService.search(id, 'alpha')))
      .subscribe((countries) => {
        if (countries.length === 0) return this.router.navigateByUrl('');
        this.country = countries[0];
        this.translations = Object.keys(this.country.translations);
        return;
      });
  }
}
