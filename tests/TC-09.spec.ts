import { test, expect } from '../fixtures/index';
import { NEWS_TAGS } from '../utils/constants';

test.describe('TC-09 — Verify Edit News button visible to the author', () => {

  test('The "Edit news" button is displayed for the author', async ({
    ecoNewsPage,
    createNewsPage,
    newsDetailsPage,
  }) => {
    const newsTitle = `TC-09 Edit Button Test ${Date.now()}`;

    // ── Precondition: Create and publish a news post ─────────────────
    await test.step('Precondition: Create and publish a news post', async () => {
      await ecoNewsPage.navigate();
      await ecoNewsPage.waitForPageReady();
      await ecoNewsPage.clickCreateNews();
      await createNewsPage.waitForFormReady();

      await createNewsPage.fillTitle(newsTitle);
      await createNewsPage.selectTag(NEWS_TAGS.NEWS);
      await createNewsPage.fillContent('Automated test content for TC-09 verifying edit button visibility to the author.');
      await createNewsPage.clickPublish();

      await ecoNewsPage.waitForPageReady();
      await expect(ecoNewsPage.getNewsItemByTitle(newsTitle)).toBeVisible({ timeout: 10000 });
    });

    // Step 1: Login — handled by auth setup (storageState).
    // The authenticated user is the same user who created the news post.

    // ── Step 2: Navigate to the news post ────────────────────────────
    await test.step('Step 2: Navigate to the news post', async () => {
      await ecoNewsPage.clickNewsItemByTitle(newsTitle);
      await newsDetailsPage.waitForPageReady();
    });

    // ── Step 3: Check for the presence of the "Edit news" button ─────
    await test.step('Step 3: Check for the presence of the "Edit news" button', async () => {
      await expect(newsDetailsPage.editNewsButton).toBeVisible();
    });
  });
});
