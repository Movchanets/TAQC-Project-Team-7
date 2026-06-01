import { test, expect } from '../fixtures/index';
import { NEWS_TAGS } from '../utils/constants';

test.describe('TC-01 — Create News Form Layout and Behavior', () => {
  test.beforeEach(async ({ ecoNewsPage, createNewsPage }) => {
    await test.step('Navigate to GreenCity News and click "Create News"', async () => {
      await ecoNewsPage.navigate();
      await ecoNewsPage.waitForPageReady();
      await ecoNewsPage.clickCreateNews();
      await createNewsPage.waitForFormReady();
    });
  });

  test('TC-01.1 Verify all form fields are present in correct order', async ({
    createNewsPage,
  }) => {
    const page = createNewsPage;

    await test.step('Title field is visible (auto-resizing textarea)', async () => {
      await expect(page.titleInput).toBeVisible();
      const tag = await page.titleInput.evaluate((el) =>
        el.tagName.toLowerCase(),
      );
      expect(tag).toBe('textarea');
    });

    await test.step('Tag buttons — 5 tags: News, Events, Education, Initiatives, Ads', async () => {
      await expect(page.tagButtons).toHaveCount(5);
      const expectedTags = [
        NEWS_TAGS.NEWS,
        NEWS_TAGS.EVENTS,
        NEWS_TAGS.EDUCATION,
        NEWS_TAGS.INITIATIVES,
        NEWS_TAGS.ADS,
      ];
      for (const tagPattern of expectedTags) {
        await expect(page.getTagButton(tagPattern)).toBeVisible();
      }
    });

    await test.step('Add Image — dropzone and file input are present', async () => {
      await expect(page.imageDropzone).toBeVisible();
      await expect(page.fileInput).toBeAttached();
    });

    await test.step('Main Text editor is visible', async () => {
      await expect(page.contentEditor).toBeVisible();
    });

    await test.step('Author and Date section is visible', async () => {
      await expect(page.authorDateSection).toBeVisible();
    });

    await test.step('Source field is visible', async () => {
      await expect(page.sourceInput).toBeVisible();
    });

    await test.step('Buttons Cancel, Preview, Publish are visible', async () => {
      await expect(page.cancelButton).toBeVisible();
      await expect(page.previewButton).toBeVisible();
      await expect(page.publishButton).toBeVisible();
    });

    await test.step('Fields appear top-to-bottom: title → tags → image → content → author/date → source → buttons', async () => {
      const boxes = {
        title: await page.titleInput.boundingBox(),
        tags: await page.tagButtons.first().boundingBox(),
        image: await page.imageDropzone.boundingBox(),
        content: await page.contentEditor.boundingBox(),
        author: await page.authorDateSection.boundingBox(),
        source: await page.sourceInput.boundingBox(),
        cancel: await page.cancelButton.boundingBox(),
        preview: await page.previewButton.boundingBox(),
        publish: await page.publishButton.boundingBox(),
      };

      Object.values(boxes).forEach((box) => expect(box).not.toBeNull());

      // Vertical order per TC-01: Title → Tags → Add Image → Main Text → Author → Date → Source
      expect(boxes.title!.y).toBeLessThanOrEqual(boxes.tags!.y);
      expect(boxes.tags!.y).toBeLessThanOrEqual(boxes.image!.y);
      expect(boxes.image!.y).toBeLessThanOrEqual(boxes.content!.y);
      expect(boxes.content!.y).toBeLessThanOrEqual(boxes.author!.y);
      expect(boxes.author!.y).toBeLessThanOrEqual(boxes.source!.y);
      expect(boxes.source!.y).toBeLessThanOrEqual(boxes.cancel!.y);

      // Horizontal order of action buttons
      expect(boxes.cancel!.x).toBeLessThan(boxes.preview!.x);
      expect(boxes.preview!.x).toBeLessThan(boxes.publish!.x);
    });
  });

  test('TC-01.2 Author and Date are pre-filled and read-only', async ({
    createNewsPage,
  }) => {
    const section = createNewsPage.authorDateSection;

    await test.step('Date is pre-filled with today\'s date', async () => {
      const today = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      await expect(section).toContainText(today);
    });

    await test.step('Author is pre-filled with user name', async () => {
      const authorLabel = section.locator('p').filter({ hasText: /Author/i });
      await expect(authorLabel).toBeVisible();
      const text = await authorLabel.innerText();
      expect(text.replace(/Author:/i, '').trim()).not.toBe('');
    });

    await test.step('Author and Date are non-editable (no inputs)', async () => {
      await expect(section.locator('input, textarea')).toHaveCount(0);
    });
  });

  test('TC-01.3 Tags can be selected and deselected', async ({
    createNewsPage,
  }) => {
    const tag = createNewsPage.getTagButton(NEWS_TAGS.NEWS).locator('a');

    await test.step('All 5 tag buttons are visible and enabled', async () => {
      await expect(createNewsPage.tagButtons).toHaveCount(5);
      for (const btn of await createNewsPage.tagButtons.all()) {
        await expect(btn).toBeVisible();
        await expect(btn).toBeEnabled();
      }
    });

    await test.step('Selected tag changes appearance (global-tag-clicked class)', async () => {
      await expect(tag).not.toHaveClass(/global-tag-clicked/);
      await tag.click();
      await expect(tag).toHaveClass(/global-tag-clicked/);
      await tag.click();
      await expect(tag).not.toHaveClass(/global-tag-clicked/);
    });
  });

  test('TC-01.4 Character counters and placeholders', async ({
    createNewsPage,
  }) => {
    const page = createNewsPage.page;

    await test.step('Title counter starts at 0/170', async () => {
      await expect(
        page
          .locator('span, div, p')
          .filter({ hasText: /0\s*\/\s*170/ })
          .first(),
      ).toBeVisible();
    });

    await test.step('Title counter updates after typing', async () => {
      const title = 'Automated Test News Title';
      await createNewsPage.fillTitle(title);
      const counter = page
        .locator('span, div, p')
        .filter({ hasText: new RegExp(`${title.length}\\s*\\/\\s*170`) })
        .first();
      await expect(counter).toBeVisible();
    });

    await test.step('Main Text counter shows 63 206', async () => {
      await expect(
        page
          .locator('span, div, p')
          .filter({ hasText: /63\s*206/ })
          .first(),
      ).toBeVisible();
    });

    await test.step('Source field has placeholder text', async () => {
      await expect(createNewsPage.sourceInput).toHaveAttribute(
        'placeholder',
        /external source|link/i,
      );
    });
  });
});
