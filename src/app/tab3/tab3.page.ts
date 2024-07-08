import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Article, Source } from '../news-api-response';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public headlines: Article[] = [];
  public sources: Source[] = [];
  public categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  public selectedCategory: string = 'business';
  public loading: boolean = false;
  public showLoadMoreButton: boolean = false;
  public totalHeadlinesDisplayed: number = 8;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getHeadlines();
  }

  getHeadlines() {
    this.loading = true;
    this.apiService.getTopHeadlines().subscribe((result) => {
      this.headlines = result.articles.slice(0, this.totalHeadlinesDisplayed);
      this.showLoadMoreButton = result.articles.length > this.totalHeadlinesDisplayed;
      this.loading = false;
    });
  }

  getNewsByCategory(category: string) {
    this.loading = true;
    this.apiService.getNewsByCategory(category).subscribe((result) => {
      this.headlines = result.articles.slice(0, this.totalHeadlinesDisplayed);
      this.showLoadMoreButton = result.articles.length > this.totalHeadlinesDisplayed;
      this.loading = false;
    });
  }

  onSegmentChanged(event: any) {
    const category: string = event.detail.value;
    this.getNewsByCategory(category);
  }

  loadMoreHeadlines() {
    this.totalHeadlinesDisplayed += 8;
    this.getNewsByCategory(this.selectedCategory);
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
