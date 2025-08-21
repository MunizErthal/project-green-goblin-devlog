import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HelpusComponent } from './helpus/helpus.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, 
      data: {
        title: 'Project GreenGoblin',
        description:'!',
        ogUrl: 'projectgreengoblin.com.br',
        ogTitle: 'Project GreenGoblin',
        ogDescription: '!',
        ogImage: 'your og image'
      }
    },
    {path: 'post', component: PostComponent, 
      data: {
        title: 'Project GreenGoblin',
        description:'!',
        ogUrl: 'projectgreengoblin.com.br',
        ogTitle: 'Project GreenGoblin',
        ogDescription: '!',
        ogImage: 'your og image'
      }
    },
    {path: 'contact', component: ContactComponent, 
      data: {
        title: 'Project GreenGoblin',
        description:'!',
        ogUrl: 'projectgreengoblin.com.br',
        ogTitle: 'Project GreenGoblin',
        ogDescription: '!',
        ogImage: 'your og image'
      }
    },
    {path: 'about', component: AboutComponent, 
      data: {
        title: 'Project GreenGoblin',
        description:'!',
        ogUrl: 'projectgreengoblin.com.br',
        ogTitle: 'Project GreenGoblin',
        ogDescription: '!',
        ogImage: 'your og image'
      }
    },
    {path: 'help', component: HelpusComponent, 
      data: {
        title: 'Project GreenGoblin',
        description:'!',
        ogUrl: 'projectgreengoblin.com.br',
        ogTitle: 'Project GreenGoblin',
        ogDescription: '!',
        ogImage: 'your og image'
      }
    }];
