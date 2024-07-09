import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NewsApiResponse, Article } from '../news-api-response';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import { NavController } from '@ionic/angular';

Swiper.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterViewInit {
  articles: Article[] = [];
  topArticles: Article[] = [];
  relatedArticles: Article[] = [];

  constructor(private apiService: ApiService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadTopHeadlines();
  }

  ngAfterViewInit() {
    new Swiper('.swiper-container', {
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false
      },
      loop: true
    });
  }

  loadTopHeadlines() {
    this.apiService.getTopHeadlines().subscribe((response: NewsApiResponse) => {
      this.articles = response.articles.filter(article => article.urlToImage);
      this.topArticles = this.articles.slice(0, 10);
      this.relatedArticles = this.articles.slice(10); 
    });
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }

  navigateToTopHeadlines() {
    this.navCtrl.navigateForward('/tabs/tab3');
  }

  toggleFavorite(article: Article) {
    // Implementasi logika untuk menambahkan/menghapus artikel dari favorit
  }

  isFavorite(article: Article): boolean {
    // Implementasi logika untuk memeriksa apakah artikel adalah favorit
    return false;
  }
}
