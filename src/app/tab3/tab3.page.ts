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
  public loading: boolean = false;  // Properti untuk mengelola status pemuatan
  public showLoadMoreButton: boolean = false; // Menambahkan variabel untuk menampilkan tombol "Lihat lebih banyak"
  public totalHeadlinesDisplayed: number = 8; // Menambahkan variabel untuk melacak jumlah berita yang ditampilkan

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
    this.totalHeadlinesDisplayed += 8; // Menambah jumlah berita yang ditampilkan
    this.getNewsByCategory(this.selectedCategory); // Memuat ulang berita dengan jumlah yang diperbarui
  }
}
