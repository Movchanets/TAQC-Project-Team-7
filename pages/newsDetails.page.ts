import { Page, Locator } from '@playwright/test';
import { BaseNewsPage } from './baseNews.page';



export class NewsDetailsPage extends BaseNewsPage {

    readonly backToNewsLink: Locator;

    readonly deleteNewsButton: Locator;
    readonly editNewsButton: Locator;


    constructor(page: Page) {
        super(page);

        this.backToNewsLink = page.getByRole('link', { name: 'Back to News' });

        this.deleteNewsButton = page.getByRole('button', { name: 'Delete' });
        this.editNewsButton = page.getByRole('button', { name: 'Edit news' });
    }

    async goBackToNews() {
        await this.backToNewsLink.click();
        await this.page.waitForURL('**/news');
    }

    async editNews() {
        await this.editNewsButton.click();
        await this.page.waitForURL(/\/news\/create-news\?id=\d+/);
    }
}