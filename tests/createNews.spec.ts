import { test, expect } from '../fixtures/index';
import { NEWS_TAGS } from '../utils/constants';

test.describe('Create News Form Layout and Behavior (TC-01)', () => {

  test.beforeEach(async ({ createNewsPage }) => {
    await test.step('Navigate to Create News form', async () => {
      await createNewsPage.navigate();
      await createNewsPage.waitForFormReady();
    });
  });

  test('TC-01.1 Verify presence and order of all necessary fields', async ({ createNewsPage }) => {
    await test.step('Verify Title input is visible', async () => {
      await expect(createNewsPage.titleInput).toBeVisible();
    });

    await test.step('Verify all 5 Tag buttons are present and visible', async () => {
      await expect(createNewsPage.tagButtons).toHaveCount(5);
      const tagsCount = await createNewsPage.tagButtons.count();
      for (let i = 0; i < tagsCount; i++) {
        await expect(createNewsPage.tagButtons.nth(i)).toBeVisible();
      }
    });

    await test.step('Verify Image Dropzone and File Input', async () => {
      await expect(createNewsPage.imageDropzone).toBeVisible();
      await expect(createNewsPage.fileInput).toBeAttached();
    });

    await test.step('Verify Main Text rich editor', async () => {
      await expect(createNewsPage.contentEditor).toBeVisible();
    });

    await test.step('Verify pre-filled Author/Date section', async () => {
      await expect(createNewsPage.authorDateSection).toBeVisible();
    });

    await test.step('Verify Source input field with placeholder', async () => {
      await expect(createNewsPage.sourceInput).toBeVisible();
      await expect(createNewsPage.sourceInput).toHaveAttribute('placeholder', /external source|link|original|article/i);
    });

    await test.step('Verify Cancel, Preview, Publish buttons', async () => {
      await expect(createNewsPage.cancelButton).toBeVisible();
      await expect(createNewsPage.previewButton).toBeVisible();
      await expect(createNewsPage.publishButton).toBeVisible();
    });

    await test.step('Verify strict top-to-bottom layout order', async () => {
      const titleBox = await createNewsPage.titleInput.boundingBox();
      const tagBox = await createNewsPage.tagButtons.first().boundingBox();
      const imageBox = await createNewsPage.imageDropzone.boundingBox();
      const contentBox = await createNewsPage.contentEditor.boundingBox();
      const authorBox = await createNewsPage.authorDateSection.boundingBox();
      const sourceBox = await createNewsPage.sourceInput.boundingBox();
      const cancelBox = await createNewsPage.cancelButton.boundingBox();
      const previewBox = await createNewsPage.previewButton.boundingBox();
      const publishBox = await createNewsPage.publishButton.boundingBox();

      expect(titleBox).not.toBeNull();
      expect(tagBox).not.toBeNull();
      expect(imageBox).not.toBeNull();
      expect(contentBox).not.toBeNull();
      expect(authorBox).not.toBeNull();
      expect(sourceBox).not.toBeNull();
      expect(cancelBox).not.toBeNull();
      expect(previewBox).not.toBeNull();
      expect(publishBox).not.toBeNull();

      expect(titleBox!.y).toBeLessThan(imageBox!.y);
      expect(imageBox!.y).toBeLessThan(tagBox!.y);
      expect(tagBox!.y).toBeLessThan(contentBox!.y);
      expect(contentBox!.y).toBeLessThan(authorBox!.y);
      expect(authorBox!.y).toBeLessThan(sourceBox!.y);
      expect(sourceBox!.y).toBeLessThan(cancelBox!.y);

      expect(cancelBox!.x).toBeLessThan(previewBox!.x);
      expect(previewBox!.x).toBeLessThan(publishBox!.x);
    });
  });

  test('TC-01.2 Verify pre-filled and non-editable Author and Date fields', async ({ createNewsPage }) => {
    await test.step('Verify Author/Date section is visible', async () => {
      await expect(createNewsPage.authorDateSection).toBeVisible();
    });

    await test.step('Verify today\'s date is displayed', async () => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const sectionText = await createNewsPage.authorDateSection.innerText();
      expect(sectionText).toContain(formattedDate);
    });

    await test.step('Verify Author label has a non-empty name', async () => {
      const authorParagraph = createNewsPage.authorDateSection.locator('p').filter({ hasText: /Author/i });
      await expect(authorParagraph).toBeVisible();
      const authorText = await authorParagraph.innerText();
      expect(authorText.replace(/Author:/i, '').trim().length).toBeGreaterThan(0);
    });

    await test.step('Verify Author and Date are non-editable (no input/textarea)', async () => {
      const editableInputs = createNewsPage.authorDateSection.locator('input, textarea');
      expect(await editableInputs.count()).toBe(0);
    });
  });

  test('TC-01.3 Verify Tag buttons selection and appearance behavior', async ({ createNewsPage }) => {
    await test.step('Verify exactly 5 tag buttons are present', async () => {
      await expect(createNewsPage.tagButtons).toHaveCount(5);
    });

    await test.step('Verify all tag buttons are visible and enabled', async () => {
      const tagsCount = await createNewsPage.tagButtons.count();
      for (let i = 0; i < tagsCount; i++) {
        const tag = createNewsPage.tagButtons.nth(i);
        await expect(tag).toBeVisible();
        await expect(tag).toBeEnabled();
      }
    });

    await test.step('Verify tag click toggle works', async () => {
      const firstTag = createNewsPage.getTagButton(NEWS_TAGS.NEWS).locator('a');
      await expect(firstTag).not.toHaveClass(/global-tag-clicked/);
      await firstTag.click();
      await expect(firstTag).toHaveClass(/global-tag-clicked/);
      await firstTag.click();
      await expect(firstTag).not.toHaveClass(/global-tag-clicked/);
    });
  });

  test('TC-01.4 Verify Title and Main Text character counters and placeholders', async ({ createNewsPage }) => {
    await test.step('Verify Title is a textarea (auto-resizing)', async () => {
      const titleTagName = await createNewsPage.titleInput.evaluate(el => el.tagName.toLowerCase());
      expect(titleTagName).toBe('textarea');
    });

    await test.step('Verify Title counter shows 0/170 initially', async () => {
      const titleCounter = createNewsPage.page.locator('span, div, p').filter({ hasText: /0\s*\/\s*170/ }).first();
      await expect(titleCounter).toBeVisible();
    });

    await test.step('Fill Title and verify counter updates to 25/170', async () => {
      const sampleTitle = 'Automated Test News Title';
      await createNewsPage.fillTitle(sampleTitle);
      const updatedCounterPattern = new RegExp(`${sampleTitle.length}\\s*\\/\\s*170`);
      const updatedTitleCounter = createNewsPage.page.locator('span, div, p').filter({ hasText: updatedCounterPattern }).first();
      await expect(updatedTitleCounter).toBeVisible();
    });

    await test.step('Verify Main Text editor and 63 206 character limit hint', async () => {
      await expect(createNewsPage.contentEditor).toBeVisible();
      const mainTextCounter = createNewsPage.page.locator('span, div, p').filter({ hasText: /63\s*206/ }).first();
      await expect(mainTextCounter).toBeVisible();
    });

    await test.step('Verify Source placeholder text', async () => {
      await expect(createNewsPage.sourceInput).toBeVisible();
      await expect(createNewsPage.sourceInput).toHaveAttribute(
        'placeholder',
        /Please add the link of the original article|external source|link|original|article/i
      );
    });
  });
});


test.describe('Create News — Publish and Tag Limits (TC-03)', () => {

    test('TC-03.1 Publish news with 1 tag and verify', async ({ ecoNewsPage, createNewsPage, page }) => {
        await test.step('1. Navigate to Eco News and click Create News', async () => {
            await ecoNewsPage.navigate();
            await ecoNewsPage.waitForPageReady();
            await ecoNewsPage.clickCreateNews();
            await createNewsPage.waitForFormReady();
        });

        await test.step('2. Select tag "News"', async () => {
            await createNewsPage.selectTag(NEWS_TAGS.NEWS);
            await expect(createNewsPage.getTagButton(NEWS_TAGS.NEWS).locator('a')).toHaveClass(/global-tag-clicked/);
        });

        await test.step('3. Fill title "Test" and content', async () => {
            await createNewsPage.fillTitle('Test');
            await createNewsPage.fillContent('Test content with 20 chars');
        });

        await test.step('4. Click Publish', async () => {
            await createNewsPage.clickPublish();
            await page.waitForURL(/\/#\/(greenCity\/news|ubs)/);
        });

        await test.step('5. Verify published news has "News" tag', async () => {
            await ecoNewsPage.navigate();
            await ecoNewsPage.waitForPageReady();
            const newsCard = ecoNewsPage.getNewsItemByTitle('Test');
            await expect(newsCard).toBeVisible({ timeout: 10000 });
            const newsTags = ecoNewsPage.getTagsForNewsItem('Test');
            await expect(newsTags).toHaveText(/News/i);
        });
    });

    test('TC-03.2 Publish news with 3 tags and verify', async ({ ecoNewsPage, createNewsPage, page }) => {
        await test.step('1. Navigate to Eco News and click Create News', async () => {
            await ecoNewsPage.navigate();
            await ecoNewsPage.waitForPageReady();
            await ecoNewsPage.clickCreateNews();
            await createNewsPage.waitForFormReady();
        });

        await test.step('2. Select 3 tags: News, Events, Education', async () => {
            await createNewsPage.selectTag(NEWS_TAGS.NEWS);
            await expect(createNewsPage.getTagButton(NEWS_TAGS.NEWS).locator('a')).toHaveClass(/global-tag-clicked/);

            await createNewsPage.selectTag(NEWS_TAGS.EVENTS);
            await expect(createNewsPage.getTagButton(NEWS_TAGS.EVENTS).locator('a')).toHaveClass(/global-tag-clicked/);

            await createNewsPage.selectTag(NEWS_TAGS.EDUCATION);
            await expect(createNewsPage.getTagButton(NEWS_TAGS.EDUCATION).locator('a')).toHaveClass(/global-tag-clicked/);
        });

        await test.step('3. Fill title "Test" and content', async () => {
            await createNewsPage.fillTitle('Test');
            await createNewsPage.fillContent('Test content with 20 chars');
        });

        await test.step('4. Click Publish', async () => {
            await createNewsPage.clickPublish();
            await page.waitForURL(/\/#\/(greenCity\/news|ubs)/);
        });

        await test.step('5. Verify published news has all 3 tags', async () => {
            await ecoNewsPage.navigate();
            await ecoNewsPage.waitForPageReady();
            const newsCard = ecoNewsPage.getNewsItemByTitle('Test');
            await expect(newsCard).toBeVisible({ timeout: 10000 });
            const newsTags = ecoNewsPage.getTagsForNewsItem('Test');
            await expect(newsTags).toHaveText(/News.*Events.*Education/i);
        });
    });

    test('TC-03.3 Block 4th tag selection', async ({ createNewsPage }) => {
        await test.step('Navigate to Create News form', async () => {
            await createNewsPage.navigate();
            await createNewsPage.waitForFormReady();
        });

        await test.step('Select 3 tags then attempt 4th', async () => {
            await createNewsPage.selectTag(NEWS_TAGS.NEWS);
            await createNewsPage.selectTag(NEWS_TAGS.EVENTS);
            await createNewsPage.selectTag(NEWS_TAGS.EDUCATION);

            await expect(createNewsPage.getTagButton(NEWS_TAGS.NEWS).locator('a')).toHaveClass(/global-tag-clicked/);
            await expect(createNewsPage.getTagButton(NEWS_TAGS.EVENTS).locator('a')).toHaveClass(/global-tag-clicked/);
            await expect(createNewsPage.getTagButton(NEWS_TAGS.EDUCATION).locator('a')).toHaveClass(/global-tag-clicked/);

            await createNewsPage.selectTag(NEWS_TAGS.INITIATIVES);
        });

        await test.step('Verify 4th tag is blocked', async () => {
            await expect(createNewsPage.getTagButton(NEWS_TAGS.INITIATIVES).locator('a')).not.toHaveClass(/global-tag-clicked/);
        });
    });
});
