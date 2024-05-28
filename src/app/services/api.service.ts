import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AppConfig } from "../models/config";

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    public key: string = environment.api_key;
    public api: string = AppConfig.api;
    public newsCategories: { [key: string]: string } = AppConfig.categories;

    constructor() {};


    async getAllNews(): Promise<any[]> {
        let allNews: any[] = [];
        const categories = Object.keys(this.newsCategories);

        for (const category of categories) {
            const categoryKey = this.newsCategories[category];
            const response = await fetch(`${this.api}${categoryKey}${this.key}`);
            const data = await response.json();
            allNews = allNews.concat(data.articles);
        }

        return allNews;
    }
    
    async getNewsByCategory(category: string): Promise<any> {
        let cat = this.newsCategories[category];
        console.log("cat: ", cat);
        if (!cat) {
            throw new Error('Invalid news category');
        }
        console.log("check: ", `${this.api}${cat}${this.key}`)
        const response = await fetch(`${this.api}${cat}${this.key}`);
        return await response.json();
    }
}