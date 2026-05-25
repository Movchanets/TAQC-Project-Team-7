import { Locator, Page } from '@playwright/test';
import { BaseNewsPage } from './baseNews.page';


export class NewsPreviewPage extends BaseNewsPage {
    readonly backToEditingLink: Locator;
    readonly publishButton: Locator;
    

    constructor(page: Page) {
        super(page);

        this.backToEditingLink = page.getByRole('link', { name: 'Back to editing' });

        this.publishButton = page.getByRole('button', { name: 'Publish' });
    }

    async goBackToEditing() {
        await this.backToEditingLink.click();
        await this.page.waitForURL('**/news/create-news');
    }

    async publishNews() {
        await this.publishButton.click();
        await this.page.waitForURL('**/news');
    }
}