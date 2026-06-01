import { test, expect } from '../fixtures/index';
import { FORM_LIMITS, NEWS_TAGS } from '../utils/constants';

/** 171-character string used to test the title max-length validation. */
const OVER_LIMIT_TITLE = 'A'.repeat(FORM_LIMITS.TITLE_MAX_LENGTH + 1);

test.describe('TC-02 — Title field validation and Publish button state', () => {
  test.beforeEach(async ({ ecoNewsPage, createNewsPage }) => {
    // ── Precondition: User is logged in (handled by auth setup / storageState).
    await test.step('Navigate to GreenCity News and click "Create News"', async () => {
      await ecoNewsPage.navigate();
      await ecoNewsPage.waitForPageReady();
      await ecoNewsPage.clickCreateNews();
      await createNewsPage.waitForFormReady();
    });
  });

  test('Verify Title validation, character counter, and Publish button behavior', async ({
    createNewsPage,
  }) => {
    const page = createNewsPage;

    // ── Step 2: Leave the Title field empty ──────────────────────────────
    await test.step('Step 2: Leave the Title field empty and blur to trigger validation', async () => {
      // Title is already empty on a fresh form. Blur to trigger Angular's touched state.
      await page.blurTitle();
    });

    // ── Step 3: Verify the Title field border is highlighted in red ──────
    await test.step('Step 3: Verify that the Title field border is highlighted in red', async () => {
      await expect(page.titleInput).toHaveClass(/ng-invalid/);
      await expect(page.titleInput).toHaveClass(/ng-touched/);
      await page.assertTitleBorderIsRed();
    });

    // ── Step 4: Verify the Publish button is disabled ────────────────────
    await test.step('Step 4: Verify that the Publish button is disabled', async () => {
      await expect(page.publishButton).toBeDisabled();
    });

    // ── Step 5: Verify the character counter shows "0/170" ──────────────
    await test.step('Step 5: Check that the character counter shows "0/170"', async () => {
      await page.assertTitleCounterText('0/170');
    });

    // ── Step 6: Enter 171 characters into the Title field ────────────────
    await test.step('Step 6: Enter a 171-character string into the Title field', async () => {
      await page.fillTitle(OVER_LIMIT_TITLE);
    });

    // ── Step 7: Verify truncation and red counter when exceeding limit ───
    await test.step('Step 7: Verify text is truncated to 170 characters and counter is highlighted in red', async () => {
      // Verify the input is truncated to 170 characters
      // KNOWN BUG: текст поля Title не скорочується до 170 — якщо тест тут падає, то все ок
      const actualValue = await page.getTitleValue();
      expect(actualValue).toHaveLength(FORM_LIMITS.TITLE_MAX_LENGTH);

      // Counter shows 170/170 and is highlighted in red via "warning" class
      await page.assertTitleCounterText(`${FORM_LIMITS.TITLE_MAX_LENGTH}/${FORM_LIMITS.TITLE_MAX_LENGTH}`);
      await page.assertTitleCounterHasWarning();

      // Verify the counter text color is red (rgb(235, 24, 13) per Angular warning style)
      const counterColor = await page.getTitleCounterCSS('color');
      expect(counterColor).toMatch(/rgb\(235,\s*24,\s*13\)/);
    });

    // ── Step 8: Enter a valid title ("Test News" — 9 characters) ─────────
    await test.step('Step 8: Enter a valid title "Test News"', async () => {
      await page.fillTitle('Test News');
    });

    // ── Step 9: Verify counter "9/170" and border is not red ─────────────
    await test.step('Step 9: Verify counter displays "9/170" and border is not red', async () => {
      await page.assertTitleCounterText('9/170');
      await page.assertTitleCounterHasNoWarning();
      await page.assertTitleBorderIsNotRed();
    });

    // ── Step 10: Verify Publish button still disabled (Main Text empty) ──
    await test.step('Step 10: Verify Publish button is still disabled because Main Text is empty', async () => {
      await expect(page.publishButton).toBeDisabled();
    });

    // ── Step 11: Select a tag ────────────────────────────────────────────
    await test.step('Step 11: Select the "Новини" (News) tag', async () => {
      await page.selectTag(NEWS_TAGS.NEWS);
    });

    // ── Step 12: Enter valid text into the Main Text field ───────────────
    await test.step('Step 12: Enter valid text into the Main Text field', async () => {
      await page.fillContent('This is a valid test content for the news article body.');
    });

    // ── Step 13: Verify Publish button becomes enabled ───────────────────
    await test.step('Step 13: Verify Publish button is enabled after Title, Main Text, and tag are filled', async () => {
      await expect(page.publishButton).toBeEnabled();
    });
  });
});
