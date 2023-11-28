import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private service: CountryService) {}

  searchByCountry(term: string): void {
    this.isLoading = true;

    this.service.searchCountry(term).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.initialValue = this.service.cacheStore.byCountry.term;
    this.countries = this.service.cacheStore.byCountry.countries;
  }
}
