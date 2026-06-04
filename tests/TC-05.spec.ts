import { test, expect } from '../fixtures/index';
import { NEWS_TAGS } from '../utils/constants';


test.describe('TC-05 - Verify the validation of the Main Text field', () => {

    test.beforeEach(async ({ ecoNewsPage, createNewsPage }) => {
        await test.step('Navigate to GreenCity News and click "Create News"', async () => {
            await ecoNewsPage.navigate();
            await ecoNewsPage.waitForPageReady();
            await ecoNewsPage.clickCreateNews();
            await createNewsPage.waitForFormReady();
        });
    });

    test('TC-05.01: The "Main Text" field requires a minimum of 20 characters', async ({ ecoNewsPage, createNewsPage }) => {

        await test.step('Step 2: Fill in the Title, select a tag, and enter less than 20 characters in the "Main Text" field', async () => {
            await createNewsPage.fillTitle('Test News with Short Content');
            await createNewsPage.selectTag(NEWS_TAGS.NEWS);
            await createNewsPage.fillContent('Too short');
        });

        await test.step('Step 3: Attempt to publish the news and verify that an error message is displayed indicating that the "Main Text" must be at least 20 characters long', async () => {
            const errorMessage = await createNewsPage.getValidationErrors();
            expect(errorMessage).toContain('Must be a minimum of 20 and a maximum of 63,206 symbols.');

            expect(await createNewsPage.isPublishDisabled()).toBeTruthy();
        });
    });

    test('TC-05.02: The "Main Text" field allows a maximum of 63,206 characters', async ({ ecoNewsPage, createNewsPage }) => {

        const longContent = 'A '.repeat(32000).substring(0, 63207);

        await test.step('Step 2: Fill in the Title, select a tag, and enter 63,206 characters in the "Main Text" field', async () => {
            await createNewsPage.fillTitle('Test News with Long Content');
            await createNewsPage.selectTag(NEWS_TAGS.NEWS);
            await createNewsPage.fillContent(longContent);
        });

        await test.step('Step 3: Verify no error message appears', async () => {
            
            const actualText = await createNewsPage.contentEditor.textContent();
            expect(actualText?.length).toBe(63206);

            const errorMessage = await createNewsPage.getValidationErrors();
            expect(errorMessage).toHaveLength(0);

            expect(await createNewsPage.isPublishEnabled()).toBeTruthy();
        });
    });

    test('TC-05.03: Publish the news with valid content', async ({ ecoNewsPage, createNewsPage }) => {
        const validContent = 'This is a valid news content with more than 20 characters.';

        await test.step('Step 2: Fill in the Title, select a tag, and enter valid content in the "Main Text" field', async () => {
            await createNewsPage.fillTitle('Test News with Valid Content');
            await createNewsPage.selectTag(NEWS_TAGS.NEWS);
            await createNewsPage.fillContent(validContent);
        });

        await test.step('Step 3: Click the "Publish" button', async () => {
            await createNewsPage.clickPublish();
        });

        await test.step('Step 4: Verify that the news is published successfully and appears on the news feed', async () => {
            await ecoNewsPage.waitForPageReady();
            
            await expect(ecoNewsPage.getNewsItemByTitle('Test News with Valid Content')).toBeVisible({ timeout: 10000 });
            await expect(ecoNewsPage.getNewsItemByTitle('Test News with Valid Content')).toContainText(validContent);

            await expect(ecoNewsPage.getTagsForNewsItem('Test News with Valid Content')).toHaveText(/News/i);
            await expect(ecoNewsPage.getTagsForNewsItem('Test News with Valid Content')).not.toHaveText(/Events/i);
        });
    });
});
