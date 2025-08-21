import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

import home from '../assets/translations/home.json';
import about from '../assets/translations/about.json';
import helpus from '../assets/translations/helpus.json';
import contact from '../assets/translations/contact.json';

const translationsFiles: any = {
  home: home,
  about: about,
  helpus: helpus,
  contact: contact
};

@Pipe({ name: 'translate', pure: false })
export class TranslatePipe implements PipeTransform {
  constructor(private languageService: LanguageService) {}

  transform(key: string, file: string): string {
    const translations = translationsFiles[file] || {};
    const lang = this.languageService.getLanguage();
    return translations[lang][key] || key;
  }
}