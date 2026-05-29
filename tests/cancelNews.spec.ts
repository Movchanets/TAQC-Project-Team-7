import { test, expect } from '../fixtures/index';
import { MESSAGES } from '../utils/constants';

test.describe('Create News — Cancel Confirmation Modal (TC-07)', () => {

  test.beforeEach(async ({ ecoNewsPage, createNewsPage }) => {
    await test.step('Step 1: Navigate to GreenCity News and click "Create News"', async () => {
      await ecoNewsPage.navigate();
      await ecoNewsPage.waitForPageReady();
      await ecoNewsPage.clickCreateNews();
      await createNewsPage.waitForFormReady();
    });
  });

  test('TC-07.1 Cancel → "Yes, cancel" closes form and redirects to news page', async ({ createNewsPage, page }) => {
    const title = 'Test';
    const content = 'Test content with 20 chars';

    await test.step('Step 2: Fill Title and Main Text, then click Cancel', async () => {
      await createNewsPage.fillTitle(title);
      await createNewsPage.fillContent(content);
      await createNewsPage.clickCancel();
    });

    await test.step('Step 3: Verify confirmation modal appears with correct message', async () => {
      await expect(createNewsPage.cancelModal).toBeVisible();
      await expect(createNewsPage.cancelModal).toContainText(MESSAGES.CANCEL_MODAL_TITLE);
      await createNewsPage.confirmCancel();
    });

    await test.step('Step 4: Verify form closes and user is redirected to news page', async () => {
      await page.waitForURL('**/news');
      await expect(page).toHaveURL(/news/);
      await expect(createNewsPage.titleInput).not.toBeVisible();
    });
  });

  test('TC-07.2 "Continue editing" dismisses modal and keeps form open with existing data', async ({ createNewsPage }) => {
    const title = 'Test';
    const content = 'Test content with 20 chars';

    await test.step('Step 2: Fill Title and Main Text, then click Cancel', async () => {
      await createNewsPage.fillTitle(title);
      await createNewsPage.fillContent(content);
      await createNewsPage.clickCancel();
    });

    await test.step('Step 3: Verify confirmation modal appears, click "Continue editing"', async () => {
      await expect(createNewsPage.cancelModal).toBeVisible();
      await expect(createNewsPage.cancelModal).toContainText(MESSAGES.CANCEL_MODAL_TITLE);
      await createNewsPage.continueEditing();
    });

    await test.step('Step 5: Verify modal closes and form remains open with data intact', async () => {
      await expect(createNewsPage.cancelModal).not.toBeVisible();
      await expect(createNewsPage.titleInput).toBeVisible();
      await expect(createNewsPage.titleInput).toHaveValue(title);
      await expect(createNewsPage.contentEditor).toBeVisible();
      await expect(createNewsPage.contentEditor).toHaveText(content);
    });
  });
});
