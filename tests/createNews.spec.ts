import { test, expect } from '../fixtures/index';
import { NEWS_TAGS } from '../utils/constants';

test.describe('Create News Form Layout and Behavior (TC-01)', () => {

  test.beforeEach(async ({ createNewsPage }) => {
    await test.step('Navigate to Create News form', async () => {
      await createNewsPage.navigate();
      await createNewsPage.waitForFormReady();
    });
  });

  test('TC-01.1 Verify all form fields are present in correct order', async ({ createNewsPage }) => {
    const page = createNewsPage;

    await test.step('Form fields are visible', async () => {
      await expect(page.titleInput).toBeVisible();
      await expect(page.tagButtons).toHaveCount(5);
      await expect(page.imageDropzone).toBeVisible();
      await expect(page.fileInput).toBeAttached();
      await expect(page.contentEditor).toBeVisible();
      await expect(page.authorDateSection).toBeVisible();
      await expect(page.sourceInput).toBeVisible();
    });

    await test.step('Action buttons are visible', async () => {
      await expect(page.cancelButton).toBeVisible();
      await expect(page.previewButton).toBeVisible();
      await expect(page.publishButton).toBeVisible();
    });

    await test.step('Fields appear top-to-bottom: title → image → tags → content → author → source → buttons', async () => {
      const boxes = {
        title:   await page.titleInput.boundingBox(),
        image:   await page.imageDropzone.boundingBox(),
        tags:    await page.tagButtons.first().boundingBox(),
        content: await page.contentEditor.boundingBox(),
        author:  await page.authorDateSection.boundingBox(),
        source:  await page.sourceInput.boundingBox(),
        cancel:  await page.cancelButton.boundingBox(),
        preview: await page.previewButton.boundingBox(),
        publish: await page.publishButton.boundingBox(),
      };

      Object.values(boxes).forEach(box => expect(box).not.toBeNull());

      // Vertical order
      expect(boxes.title!.y).toBeLessThan(boxes.image!.y);
      expect(boxes.image!.y).toBeLessThan(boxes.tags!.y);
      expect(boxes.tags!.y).toBeLessThan(boxes.content!.y);
      expect(boxes.content!.y).toBeLessThan(boxes.author!.y);
      expect(boxes.author!.y).toBeLessThan(boxes.source!.y);
      expect(boxes.source!.y).toBeLessThan(boxes.cancel!.y);

      // Horizontal order of action buttons
      expect(boxes.cancel!.x).toBeLessThan(boxes.preview!.x);
      expect(boxes.preview!.x).toBeLessThan(boxes.publish!.x);
    });
  });

  test('TC-01.2 Author and Date are pre-filled and read-only', async ({ createNewsPage }) => {
    const section = createNewsPage.authorDateSection;

    await test.step("Today's date is displayed", async () => {
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      await expect(section).toContainText(today);
    });

    await test.step('Author name is shown', async () => {
      const authorLabel = section.locator('p').filter({ hasText: /Author/i });
      await expect(authorLabel).toBeVisible();
      const text = await authorLabel.innerText();
      expect(text.replace(/Author:/i, '').trim()).not.toBe('');
    });

    await test.step('No editable inputs inside the section', async () => {
      await expect(section.locator('input, textarea')).toHaveCount(0);
    });
  });

  test('TC-01.3 Tags can be selected and deselected', async ({ createNewsPage }) => {
    const tag = createNewsPage.getTagButton(NEWS_TAGS.NEWS).locator('a');

    await test.step('All 5 tag buttons are visible and enabled', async () => {
      await expect(createNewsPage.tagButtons).toHaveCount(5);
      for (const btn of await createNewsPage.tagButtons.all()) {
        await expect(btn).toBeVisible();
        await expect(btn).toBeEnabled();
      }
    });

    await test.step('Click toggles tag on, click again toggles off', async () => {
      await expect(tag).not.toHaveClass(/global-tag-clicked/);
      await tag.click();
      await expect(tag).toHaveClass(/global-tag-clicked/);
      await tag.click();
      await expect(tag).not.toHaveClass(/global-tag-clicked/);
    });
  });

  test('TC-01.4 Character counters and placeholders', async ({ createNewsPage }) => {
    const page = createNewsPage.page;

    await test.step('Title is an auto-resizing textarea', async () => {
      const tag = await createNewsPage.titleInput.evaluate(el => el.tagName.toLowerCase());
      expect(tag).toBe('textarea');
    });

    await test.step('Title counter starts at 0/170', async () => {
      await expect(page.locator('span, div, p').filter({ hasText: /0\s*\/\s*170/ }).first()).toBeVisible();
    });

    await test.step('Title counter updates after typing', async () => {
      const title = 'Automated Test News Title';
      await createNewsPage.fillTitle(title);
      const counter = page.locator('span, div, p').filter({ hasText: new RegExp(`${title.length}\\s*\\/\\s*170`) }).first();
      await expect(counter).toBeVisible();
    });

    await test.step('Content editor shows 63 206 character limit', async () => {
      await expect(createNewsPage.contentEditor).toBeVisible();
      await expect(page.locator('span, div, p').filter({ hasText: /63\s*206/ }).first()).toBeVisible();
    });

    await test.step('Source field has placeholder text', async () => {
      await expect(createNewsPage.sourceInput).toHaveAttribute('placeholder', /external source|link|original|article/i);
    });
  });
});


test.describe('Create News — Publish and Tag Limits (TC-03)', () => {

  test('TC-03.1 Publish news with 1 tag and verify', async ({ ecoNewsPage, createNewsPage }) => {
    await test.step('Open Create News from Eco News page', async () => {
      await ecoNewsPage.navigate();
      await ecoNewsPage.waitForPageReady();
      await ecoNewsPage.clickCreateNews();
      await createNewsPage.waitForFormReady();
    });

    await test.step('Select "News" tag', async () => {
      await createNewsPage.selectTag(NEWS_TAGS.NEWS);
      await expect(createNewsPage.getTagButton(NEWS_TAGS.NEWS).locator('a')).toHaveClass(/global-tag-clicked/);
    });

    await test.step('Fill required fields and publish', async () => {
      await createNewsPage.fillTitle('Test');
      await createNewsPage.fillContent('Test content with 20 chars');
      await createNewsPage.clickPublish();
    });

    await test.step('Published news appears with "News" tag', async () => {
      await ecoNewsPage.waitForPageReady();
      await expect(ecoNewsPage.getNewsItemByTitle('Test')).toBeVisible({ timeout: 10000 });
      await expect(ecoNewsPage.getTagsForNewsItem('Test')).toHaveText(/News/i);
    });
  });

  test('TC-03.2 Publish news with 3 tags and verify', async ({ ecoNewsPage, createNewsPage }) => {
    await test.step('Open Create News from Eco News page', async () => {
      await ecoNewsPage.navigate();
      await ecoNewsPage.waitForPageReady();
      await ecoNewsPage.clickCreateNews();
      await createNewsPage.waitForFormReady();
    });

    await test.step('Select News, Events, Education tags', async () => {
      for (const tag of [NEWS_TAGS.NEWS, NEWS_TAGS.EVENTS, NEWS_TAGS.EDUCATION]) {
        await createNewsPage.selectTag(tag);
        await expect(createNewsPage.getTagButton(tag).locator('a')).toHaveClass(/global-tag-clicked/);
      }
    });

    await test.step('Fill required fields and publish', async () => {
      await createNewsPage.fillTitle('Test');
      await createNewsPage.fillContent('Test content with 20 chars');
      await createNewsPage.clickPublish();
    });

    await test.step('Published news appears with all 3 tags', async () => {
      await ecoNewsPage.waitForPageReady();
      await expect(ecoNewsPage.getNewsItemByTitle('Test')).toBeVisible({ timeout: 10000 });
      await expect(ecoNewsPage.getTagsForNewsItem('Test')).toHaveText(/News.*Events.*Education/i);
    });
  });

  test('TC-03.3 Fourth tag cannot be selected', async ({ createNewsPage }) => {
    await test.step('Navigate to Create News form', async () => {
      await createNewsPage.navigate();
      await createNewsPage.waitForFormReady();
    });

    await test.step('Select 3 tags then attempt a 4th', async () => {
      for (const tag of [NEWS_TAGS.NEWS, NEWS_TAGS.EVENTS, NEWS_TAGS.EDUCATION]) {
        await createNewsPage.selectTag(tag);
        await expect(createNewsPage.getTagButton(tag).locator('a')).toHaveClass(/global-tag-clicked/);
      }

      await createNewsPage.selectTag(NEWS_TAGS.INITIATIVES);
      await expect(createNewsPage.getTagButton(NEWS_TAGS.INITIATIVES).locator('a')).not.toHaveClass(/global-tag-clicked/);
    });
  });
});
