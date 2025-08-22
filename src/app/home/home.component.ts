import { Component } from '@angular/core';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe.pipe';
import { CommonModule } from '@angular/common';
import { ShareButtons } from 'ngx-sharebuttons/buttons';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  imports: [TimeAgoPipe, CommonModule, ShareButtons, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './mobile-home.component.scss']
})
export class HomeComponent {
  language: string = 'en';  // en ou pt
  mobileMenu = false;
  currentPostShare = '';

  posts = [
    {
      titleEn: 'A little about everything so far',
      titlePt: 'Um pouco sobre tudo até agora',
      post: 'a-little-about-everything-so-far',
      postDate: '2025-03-18'
    }
  ];

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

  openInstagram() {
    window.open('https://www.instagram.com/project.greengoblin', '_blank');
  }

  openPost(post: string) {
    this.router.navigate(['/post'], { queryParams: { language: this.language, post } });
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

  sharePost(post: string) {
    const modal = document.getElementById('modalShare');
    if (modal) {
      modal.style.display = 'flex'; // Redefine o estilo display
      modal.classList.add('show');
      modal.classList.remove('hide');
      this.currentPostShare = post;
    }
  }

  closeModal(): void {
    const modal = document.getElementById('modalShare');
    if (modal) {
      modal.classList.add('hide');
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 500); // Tempo da animação de fade-out
    }
  }
}