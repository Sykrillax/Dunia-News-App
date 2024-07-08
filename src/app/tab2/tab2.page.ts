import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Article } from '../news-api-response';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  topic: string = '';
  newsData: Article[] = [];
  loading: boolean = false;

  constructor(private apiService: ApiService) {}

  search() {
    this.loading = true;
    this.apiService.getNews(this.topic).subscribe(
      (data) => {
        this.newsData = data.articles; 
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching news:', error);
        this.loading = false;
      }
    );
  }

  toggleFavorite(article: Article) {
    let favorites = JSON.parse(localStorage.getItem('favoriteArticles') || '[]');
    if (favorites.some((fav: Article) => fav.title === article.title)) {
      favorites = favorites.filter((fav: Article) => fav.title !== article.title);
    } else {
      favorites.push(article);
    }
    localStorage.setItem('favoriteArticles', JSON.stringify(favorites));
  }

  isFavorite(article: Article): boolean {
    const favorites = JSON.parse(localStorage.getItem('favoriteArticles') || '[]');
    return favorites.some((fav: Article) => fav.title === article.title);
  }
}
