import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Article, Source } from '../news-api-response';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public headlines: Article[] = [];
  public filteredHeadlines: Article[] = [];
  public sources: Source[] = [];
  public categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  public selectedCategory: string = '';
  public loading: boolean = false;
  public showLoadMoreButton: boolean = false;
  public totalHeadlinesDisplayed: number = 8;

  constructor(private apiService: ApiService, private alertController: AlertController) {}

  ngOnInit() {
    this.getHeadlines();
  }

  getHeadlines() {
    this.loading = true;
    this.apiService.getTopHeadlines().subscribe((result) => {
      this.headlines = result.articles;
      this.filteredHeadlines = this.headlines.slice(0, this.totalHeadlinesDisplayed);
      this.showLoadMoreButton = this.headlines.length > this.totalHeadlinesDisplayed;
      this.loading = false;
    });
  }

  getNewsByCategory(category: string) {
    this.loading = true;
    this.apiService.getNewsByCategory(category).subscribe((result) => {
      this.headlines = result.articles;
      this.filteredHeadlines = this.headlines.slice(0, this.totalHeadlinesDisplayed);
      this.showLoadMoreButton = this.headlines.length > this.totalHeadlinesDisplayed;
      this.loading = false;
    });
  }

  loadMoreHeadlines() {
    this.totalHeadlinesDisplayed += 8;
    this.filteredHeadlines = this.headlines.slice(0, this.totalHeadlinesDisplayed);
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

  async presentCategoryPicker() {
    const alert = await this.alertController.create({
      header: 'Select Category',
      inputs: this.categories.map(category => ({
        type: 'radio',
        label: category.charAt(0).toUpperCase() + category.slice(1),
        value: category,
        checked: category === this.selectedCategory
      })),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (category: string) => {
            this.selectedCategory = category;
            this.getNewsByCategory(category);
          }
        }
      ]
    });

    await alert.present();
  }
}
