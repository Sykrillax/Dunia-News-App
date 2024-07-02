import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  topic: string = '';
  newsData: any[] = [];
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
}
