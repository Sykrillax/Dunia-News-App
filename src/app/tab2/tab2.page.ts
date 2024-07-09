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
  trendingTopics: string[] = [];
  loading: boolean = false;

  constructor(private apiService: ApiService) {
    this.getTrendingTopics();
  }

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

  getTrendingTopics() {
    this.apiService.getTopHeadlines().subscribe(
      (data) => {
        const topics = new Set<string>();
        data.articles.forEach(article => {
          const topic = article.title.split(' ').slice(0, 3).join(' ');
          topics.add(topic);
        });
        this.trendingTopics = Array.from(topics).slice(0, 6);
      },
      (error) => {
        console.error('Error fetching trending topics:', error);
      }
    );
  }

  setTopic(topic: string) {
    this.topic = topic;
    this.search();
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
