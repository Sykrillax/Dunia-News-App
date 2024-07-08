import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NewsApiResponse, Article } from '../news-api-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterViewInit {
  articles: Article[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTopHeadlines();
  }

  ngAfterViewInit() {
    new Swiper('.swiper-container', {
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });
  }

  loadTopHeadlines() {
    this.apiService.getTopHeadlines().subscribe((response: NewsApiResponse) => {
      this.articles = response.articles;
    });
  }
}
