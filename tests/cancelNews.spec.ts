import { test, expect } from '../fixtures/index';
import { MESSAGES } from '../utils/constants';

test.describe('Create News — Cancel Confirmation Modal (TC-07)', () => {

  test.beforeEach(async ({ ecoNewsPage, createNewsPage }) => {
    await test.step('Navigate to Create News form via Eco News page', async () => {
      await ecoNewsPage.navigate();
      await ecoNewsPage.waitForPageReady();
      await ecoNewsPage.clickCreateNews();
      await createNewsPage.waitForFormReady();
    });
  });

  test('TC-07.1 Cancel button triggers confirmation modal; "Yes, cancel" closes form and redirects to news page', async ({ createNewsPage, page }) => {
    const title = 'Test';
    const content = 'Test content with 20 chars';

    await test.step('Fill form fields', async () => {
      await createNewsPage.fillTitle(title);
      await createNewsPage.fillContent(content);
    });

    await test.step('Click Cancel button', async () => {
      await createNewsPage.clickCancel();
    });

    await test.step('Verify confirmation modal appears with correct message', async () => {
      await expect(createNewsPage.cancelModal).toBeVisible();
      await expect(createNewsPage.cancelModal).toContainText(MESSAGES.CANCEL_MODAL_TITLE);
    });

    await test.step('Click "Yes, cancel"', async () => {
      await createNewsPage.confirmCancel();
    });

    await test.step('Verify form closes and user is redirected to news page', async () => {
      await page.waitForURL('**/news');
      await expect(page).toHaveURL(/news/);
      await expect(createNewsPage.titleInput).not.toBeVisible();
    });
  });

  test('TC-07.2 "Continue editing" dismisses modal and keeps form open with existing data', async ({ createNewsPage }) => {
    const title = 'Test';
    const content = 'Test content with 20 chars';

    await test.step('Fill form fields', async () => {
      await createNewsPage.fillTitle(title);
      await createNewsPage.fillContent(content);
    });

    await test.step('Click Cancel button', async () => {
      await createNewsPage.clickCancel();
    });

    await test.step('Verify confirmation modal appears', async () => {
      await expect(createNewsPage.cancelModal).toBeVisible();
      await expect(createNewsPage.cancelModal).toContainText(MESSAGES.CANCEL_MODAL_TITLE);
    });

    await test.step('Click "Continue editing"', async () => {
      await createNewsPage.continueEditing();
    });

    await test.step('Verify modal closes', async () => {
      await expect(createNewsPage.cancelModal).not.toBeVisible();
    });

    await test.step('Verify form remains open with previously entered data intact', async () => {
      await expect(createNewsPage.titleInput).toBeVisible();
      await expect(createNewsPage.titleInput).toHaveValue(title);
      await expect(createNewsPage.contentEditor).toBeVisible();
      await expect(createNewsPage.contentEditor).toHaveText(content);
    });
  });
});
