import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor(private service: CountryService) {}

  searchByRegion(term: Region): void {
    this.isLoading = true;
    this.selectedRegion = term;

    this.service.searchRegion(term).subscribe(countries => {
      this.isLoading = true;
      this.countries = countries;
    });
  }

  ngOnInit(): void {
    this.selectedRegion = this.service.cacheStore.byRegion.region;
    this.countries = this.service.cacheStore.byRegion.countries;
  }
}
