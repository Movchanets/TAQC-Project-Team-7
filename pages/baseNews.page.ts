import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';



export class BaseNewsPage extends BasePage {

    readonly tagsContainer: Locator;
    readonly tagItems: Locator;

    readonly newsContentContainer: Locator;

    readonly newsTitle: Locator;
    readonly newsDate: Locator;
    readonly newsAuthor: Locator;

    readonly newsMainImage: Locator;

    readonly contentText: Locator;

    constructor(page: Page) {
        super(page);

        this.tagsContainer = page.locator('.tags');
        this.tagItems = this.tagsContainer.locator('.tags-item');

        this.newsContentContainer = page.locator('.news-content');

        this.newsTitle = page.locator('.news-title');
        this.newsDate = page.locator('.news-info-date');
        this.newsAuthor = page.locator('.news-info-author');

        this.newsMainImage = page.locator('img.news-image');

        this.contentText = page.locator('.news-text-content.word-wrap');

    }

    async getTags(): Promise<string[]> {
        await this.tagItems.first().waitFor({ state: 'visible' });

        return this.tagItems.allInnerTexts(); 
    }
}