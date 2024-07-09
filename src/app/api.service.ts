import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsApiResponse, SourceApiResponse } from './news-api-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiKey: string = '5f63d2577eb84670bd0a0becc87738b8';
  public apiUrl: string = 'https://newsapi.org/v2'; 

  constructor(public http: HttpClient) { }

  getNews(topic: string): Observable<NewsApiResponse> {
    const url = `${this.apiUrl}/everything`;
    const params = new HttpParams().set('q', topic).set('sortBy', 'publishedAt').set('apiKey', this.apiKey);
    return this.http.get<NewsApiResponse>(url, { params });
  }

  getTopHeadlines(): Observable<NewsApiResponse> {
    const url = `${this.apiUrl}/top-headlines`;
    const params = new HttpParams().set('country', 'us').set('apiKey', this.apiKey);
    return this.http.get<NewsApiResponse>(url, { params });
  }

  getNewsByCategory(category: string): Observable<NewsApiResponse> {
    const url = `${this.apiUrl}/top-headlines`;
    const params = new HttpParams().set('category', category).set('apiKey', this.apiKey);
    return this.http.get<NewsApiResponse>(url, { params });
  }

  getEverything(query: string): Observable<NewsApiResponse> {
    const url = `${this.apiUrl}/everything`;
    const params = new HttpParams()
      .set('q', query)
      .set('sortBy', 'publishedAt')
      .set('apiKey', this.apiKey);
  
    return this.http.get<NewsApiResponse>(url, { params });
  }
  

  getSources(): Observable<SourceApiResponse> {
    const url = `${this.apiUrl}/sources`;
    const params = new HttpParams().set('apiKey', this.apiKey);
    return this.http.get<SourceApiResponse>(url, { params });
  }
}
