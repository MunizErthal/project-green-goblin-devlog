import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ShareButtons } from 'ngx-sharebuttons/buttons';

@Component({
  selector: 'app-post',
  imports: [ShareButtons, CommonModule, TranslatePipe],
  templateUrl: './post.component.html',
  styleUrls: ['mobile-post.component.scss', './post.component.scss', './post-mobile.scss', './post-web.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent {
  language: string = 'en';  // en ou pt
  postHtml: string = '';
  postName: string = '';
  mobileMenu = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private languageService: LanguageService) {
    this.verificarMobile();
    this.loadHTMLAndLanguage();
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

  loadHTMLAndLanguage() {
    this.route.queryParams.subscribe(params => {
      const postName = params['post'];
      const languageParam = params['language'];
      
      if (languageParam) {
        this.language = languageParam;
      }

      if (postName) {
        this.postName = postName;
        this.loadHTML(postName);
      }
    });
  }

  loadHTML(postName: string) {
    var mobile = this.mobileMenu ? 'mobile' : 'web';
    fetch(`posts/${mobile}/${this.language}/${postName}.html`)
      .then(response => response.text())
      .then(html => this.postHtml = html)
      .catch(error => console.error('Erro ao carregar o post:', error));
  }

  changeLanguage() {
    this.language = this.language === 'en' ? 'pt' : 'en';
    this.loadHTML(this.postName);
    this.languageService.setLanguage(this.language);
  }

  back() {
    this.router.navigate(['/'], { queryParams: { language: this.language } });
  }

  sharePost() {
    const modal = document.getElementById('modalShare');
    if (modal) {
      modal.style.display = 'flex'; // Redefine o estilo display
      modal.classList.add('show');
      modal.classList.remove('hide');
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
