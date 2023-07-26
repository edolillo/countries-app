import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable, catchError, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheParams, Region, TermCountry } from '../interfaces/cache-params.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheParams: CacheParams = {
    capital: { term: '', countries:[]},
    name: { term: '', countries:[]},
    region: { term: '', countries:[]}
  }
  constructor(private http: HttpClient) { }

  loadFromLocalStorage(): void {
    if ( !localStorage.getItem('cacheParams') ) return;
    this.cacheParams = JSON.parse(localStorage.getItem('cacheParams')!);
  }

  saveToLocalStorage(): void {
    localStorage.setItem('cacheParams', JSON.stringify(this.cacheParams));
  }

  search(term: string, by: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/${by}/${term}`;
    return this.http.get<Country[]>(url).pipe(
      catchError( error => {
        return of([]);
      }),
      tap( countries => {
        const  temp = {term, countries}
        this.cacheParams[by as keyof CacheParams] = {term, countries};
        this.saveToLocalStorage();
      })
    );
  }
}
