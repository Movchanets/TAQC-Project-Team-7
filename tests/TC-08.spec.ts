    import { test, expect } from '../fixtures/index';
    import { NEWS_TAGS } from '../utils/constants';


    test.describe('TC-08 - User can preview news content on Preview page', () => {

        test('Verify that the Preview page displays the entered news content correctly and a "Back to editing" link is available', async ({ ecoNewsPage, createNewsPage, newsPreviewPage, page }) => {
            
            const expectedTitle = 'Test News Title ' + Date.now();
            const expectedContent = 'This is the main text of the news article for preview testing.';

            await test.step('Navigate to GreenCity News and click "Create News"', async () => {
                await ecoNewsPage.navigate();
                await ecoNewsPage.waitForPageReady();
                await ecoNewsPage.clickCreateNews();
                await createNewsPage.waitForFormReady();
            });

            await test.step('Fill in Title, Main Text, select tags, and click "Preview"', async () => {

                await createNewsPage.fillTitle(expectedTitle);
                await createNewsPage.fillContent(expectedContent);
                await createNewsPage.selectTag(NEWS_TAGS.NEWS);
                await createNewsPage.selectTag(NEWS_TAGS.EVENTS);
                await createNewsPage.clickPreview();
            });

            await test.step('Verify that the Title, Main Text, and selected tags are displayed correctly on the Preview page', async () => {
                await expect(newsPreviewPage.newsTitle).toBeVisible();
                await expect(newsPreviewPage.newsTitle).toHaveText(expectedTitle);
                
                await expect(newsPreviewPage.contentText).toBeVisible();
                await expect(newsPreviewPage.contentText).toHaveText(expectedContent);
                
                const tags: string[] = await newsPreviewPage.getTags(); 
                const tagsText = tags.join(' '); 

                expect(tagsText).toMatch(NEWS_TAGS.NEWS);
                expect(tagsText).toMatch(NEWS_TAGS.EVENTS);
            });

            await test.step('Verify that the preview displays the current date', async () => {

                const expectedDate = new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });

                await expect(newsPreviewPage.newsDate).toBeVisible();
                await expect(newsPreviewPage.newsDate).toContainText(expectedDate);
            });

            await test.step('Verify that the author name is displayed correctly on the Preview page', async () => {
                const rawName = await page.evaluate(() => window.localStorage.getItem('name'));

                if (!rawName) {
                    throw new Error('User name not found in Local Storage. Is the user logged in?');
                }
                const expectedAuthorName = rawName.replace(/(^"|"$)/g, '');

                await expect(newsPreviewPage.newsAuthor).toContainText(expectedAuthorName);
            });

            await test.step('Verify that a "Back to editing" link is available on the Preview page', async () => {
                
                await expect(newsPreviewPage.backToEditingLink).toBeVisible();
                await expect(newsPreviewPage.backToEditingLink).toHaveText('Back to editing');
            });

            await test.step('Verify that clicking "Back to editing" returns the user to the Create News form with previously entered data intact', async () => {
                
                await newsPreviewPage.goBackToEditing();

                await expect(createNewsPage.titleInput).toBeVisible();
                await expect(createNewsPage.titleInput).toHaveValue(expectedTitle);

                await expect(createNewsPage.contentEditor).toBeVisible();
                await expect(createNewsPage.contentEditor).toHaveText(expectedContent);
            });
        });


    });