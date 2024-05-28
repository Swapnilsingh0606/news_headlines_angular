import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public articles: Article[] = [];
  public currentPage: number = 1;
  public articlesPerPage: number = 10;
  public totalArticles: number = 0;
  public userCounts: number = 0;
  public guestCount: number = 0;
  
  constructor(private apiService: ApiService, private alert: AlertService, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchAllNews();
    this.getUserCounts();
    this.getGuestCounts();
  }

  getUserCounts() {
    try {
      const count = this.userService.getUsers();
      this.userCounts = count.length;
    } catch (error) {
      this.alert.error('Internal error occur');
      console.error('Failed fetch users:', error);
    }
  }

  getGuestCounts() {
    try {
      const count = this.userService.getGuests();
      this.guestCount = count.length;
    } catch (error) {
      this.alert.error('Internal error occur');
      console.error('Failed fetch guest users:', error);
    }
  }

  async fetchAllNews() {
    this.articles = [];
    try {
      const allNews = await this.apiService.getAllNews();
      this.articles = allNews
      this.totalArticles = this.articles.length;
    } catch (error) {
      this.alert.error('Error fetching news');
      console.error('Error fetching all news:', error);
    }
  }

  async fetchNews(category: string) {
    this.articles = [];
    try {
      const data = await this.apiService.getNewsByCategory(category);
      this.articles = data.articles;
      this.totalArticles = this.articles.length;
    } catch (error) {
      console.error('Error fetching news:', error);
      this.alert.error('Something went wrong, please try later');
    }
  }

  get paginatedArticles(): Article[] {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    return this.articles.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  totalPages(): number {
    return Math.ceil(this.totalArticles / this.articlesPerPage);
  }

  get pagesArray(): number[] {
    return Array(this.totalPages()).fill(0).map((x, i) => i + 1);
  }

}
