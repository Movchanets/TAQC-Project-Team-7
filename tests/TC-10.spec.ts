import { test, expect } from '../fixtures/index';
import { NEWS_TAGS } from '../utils/constants';

test.describe('TC-10 - Verify that the author can edit their own news', () => {

    test('The author can edit their own news post', async ({ ecoNewsPage, createNewsPage, newsDetailsPage, page }) => {

        const newsTitle = `TC-10 Edit News Test ${Date.now()}`;
        const updatedTitle = newsTitle + ' - Updated';
        const updatedContent = 'This is the updated content for TC-10 to verify that the author can edit their own news post.';

        let originalCreationDate: string | null = null; 

        await test.step('Precondition: Create and publish a news post', async () => {
            await ecoNewsPage.navigate();
            await ecoNewsPage.waitForPageReady();
            await ecoNewsPage.clickCreateNews();
            await createNewsPage.waitForFormReady();

            await createNewsPage.fillTitle(newsTitle);
            await createNewsPage.selectTag(NEWS_TAGS.NEWS);
            await createNewsPage.fillContent('Automated test content for TC-10 verifying that the author can edit their own news.');
            await createNewsPage.clickPublish();
        });

        await test.step('Step 2: Verify that the news post is created and capture creation date', async () => {
            await ecoNewsPage.waitForPageReady();

            const newsItem = ecoNewsPage.getNewsItemByTitle(newsTitle);
            await expect(newsItem).toBeVisible({ timeout: 15000 });


            originalCreationDate = await ecoNewsPage.getNewsDateByTitle(newsTitle);
            expect(originalCreationDate).toBeTruthy(); 
        });

        await test.step('Step 3: Navigate to the news details page', async () => {
            await ecoNewsPage.clickNewsItemByTitle(newsTitle);
            await newsDetailsPage.waitForPageReady();
        });

        await test.step('Step 4: Click the "Edit news" button', async () => {
            await newsDetailsPage.editNewsButton.click();
            await createNewsPage.waitForFormReady();
        });

        await test.step('Step 5: Edit the news content and save changes', async () => {
            await createNewsPage.fillContent(updatedContent);
            await createNewsPage.fillTitle(updatedTitle);
            await createNewsPage.deselectTag(NEWS_TAGS.NEWS);
            await createNewsPage.selectTag(NEWS_TAGS.EVENTS);
            await createNewsPage.clickPublish();
        });

        await test.step('Step 6: Verify updated content, tags, title, and unchanged date', async () => {
            await ecoNewsPage.waitForPageReady();

            // Workaround: GreenCity UI state is not reactive after editing. Forced reload to bypass frontend bug.
            await page.reload();
            await ecoNewsPage.waitForPageReady();

            const updatedNewsItem = ecoNewsPage.getNewsItemByTitle(updatedTitle);
            await expect(updatedNewsItem).toBeVisible({ timeout: 15000 });
            await expect(updatedNewsItem).toContainText(updatedContent);
            await expect(ecoNewsPage.getTagsForNewsItem(updatedTitle)).toContainText(NEWS_TAGS.EVENTS);
            await expect(ecoNewsPage.getTagsForNewsItem(updatedTitle)).not.toContainText(NEWS_TAGS.NEWS);

            const updatedCreationDate = await ecoNewsPage.getNewsDateByTitle(updatedTitle);
            expect(updatedCreationDate).toBe(originalCreationDate);
        });
    });
});