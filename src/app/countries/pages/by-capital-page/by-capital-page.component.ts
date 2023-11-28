import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private service: CountryService ) {}

  searchByCapital(term: string) {
    this.isLoading = true;

    this.service.searchCapital(term).subscribe(countries => {
      this.isLoading = false;
      this.countries = countries;
    });
  }

  ngOnInit(): void {
    this.initialValue = this.service.cacheStore.byCapital.term;
    this.countries = this.service.cacheStore.byCapital.countries;
  }
}
