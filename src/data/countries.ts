import allCountriesRaw from './all-countries.json';

export interface CountryItem {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  subregion: string;
  language: string;
  capital?: string;
  tableId?: string;
  voiceLang?: string;
}

export const worldCountries: CountryItem[] = allCountriesRaw as CountryItem[];
