import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public articles: Article[] = [];
  public currentPage: number = 1;
  public articlesPerPage: number = 10;
  public totalArticles: number = 0;
  
  constructor(private apiService: ApiService, private router: Router, private alert: AlertService, private userService: UserService) { }

  ngOnInit(): void {
    this.registerGuest();
    this.getNews();
  }

  registerGuest() {
    this.userService.generateRandomGuest();
    localStorage.removeItem('isLoggedIn');
  }

  async getNews() {
    try {
      const data = await this.apiService.getNewsByCategory('popularity');
      this.articles = data.articles;
      this.totalArticles = this.articles.length;
    } catch (error:any) {
      console.error('Error fetching news:', error);
      this.alert.error(error.message);
    }
  }

  get paginatedArticles(): Article[] {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    return this.articles.slice(startIndex, endIndex);
  }

  nextPage() {
    this.redirectToLogin();
  }

  prevPage() {
    this.redirectToLogin();
  }

  goToPage(page: number) {
    this.redirectToLogin();
  }

  redirectToLogin() {
    this.router.navigate(['/login'])
  }

  totalPages(): number {
    return Math.ceil(this.totalArticles / this.articlesPerPage);
  }

  get pagesArray(): number[] {
    return Array(this.totalPages()).fill(0).map((x, i) => i + 1);
  }

}
