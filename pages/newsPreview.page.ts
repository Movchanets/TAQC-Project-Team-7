import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';



export class PreviewNewsPage extends BasePage {
    readonly backToEditingLink: Locator;
    readonly publishButton: Locator;

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

        this.backToEditingLink = page.getByRole('link', { name: 'Back to editing' });
        this.publishButton = page.getByRole('button', { name: 'Publish' });

        this.tagsContainer = page.locator('.tags');
        this.tagItems = this.tagsContainer.locator('span, button, a');

        this.newsContentContainer = page.locator('.news-content');

        this.newsTitle = page.locator('.news-title');
        this.newsDate = page.locator('.news-info-date');
        this.newsAuthor = page.locator('.news-info-author');

        this.newsMainImage = page.locator('img.news-image');

        this.contentText = page.locator('.news-text-content.word-wrap');

    }

    async goBackToEditing() {
        await this.backToEditingLink.click();
        await this.page.waitForURL('**/news/create-news');
    }

    async publishNews() {
        await this.publishButton.click();
        await this.page.waitForURL('**/news');
    }

    async getTags(): Promise<string[]> {
        return await this.tagItems.allInnerTexts();
    }
}