import { Component, OnInit } from '@angular/core';
import { Article } from '../news-api-response';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  favoriteArticles: Article[] = [];

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const favorites = localStorage.getItem('favoriteArticles');
    if (favorites) {
      this.favoriteArticles = JSON.parse(favorites);
    }
  }

  setPlaceholder(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/placeholder.png';
  }

  removeFavorite(article: Article) {
    this.favoriteArticles = this.favoriteArticles.filter(fav => fav.title !== article.title);
    localStorage.setItem('favoriteArticles', JSON.stringify(this.favoriteArticles));
  }
}
