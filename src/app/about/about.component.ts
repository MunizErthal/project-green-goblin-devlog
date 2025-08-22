import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', './mobile-about.component.scss']
})
export class AboutComponent {


  language: string = 'en';  // en ou pt
  mobileMenu = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private languageService: LanguageService) {
    this.subscribeToLanguageChanges();
    this.verificarMobile();
    this.loadLanguage();
  }

  subscribeToLanguageChanges() {
    this.languageService.language$.subscribe(lang => {
      this.language = lang;
    });
  }

  verificarMobile() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.mobileMenu = true;
    }
  }

  loadLanguage() {
    this.route.queryParams.subscribe(params => {
      var languageParam = params['language'];
      if (languageParam)
        this.language = languageParam;
    });
  }

  changeLanguage() {
    this.language = this.language === 'en' ? 'pt' : 'en';
    this.languageService.setLanguage(this.language);
  }
  
  toContact() {
    this.router.navigate(['/contact'], { queryParams: { language: this.language } });
  }

  toAbout() {
    this.router.navigate(['/about'], { queryParams: { language: this.language } });
  }

  toHelp() {
    this.router.navigate(['/help'], { queryParams: { language: this.language } });
  }
  
  back() {
    this.router.navigate(['/'], { queryParams: { language: this.language } });
  }
}
