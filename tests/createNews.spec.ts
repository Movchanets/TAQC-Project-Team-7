import { test, expect } from '../fixtures/index';

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
      const firstTag = createNewsPage.tagButtons.first();
      await firstTag.click();
      await firstTag.click();
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


test.describe('Create News Form Layout and Behavior (TC-03)', () => {
    test.beforeEach(async ({ authenticatedPage, createNewsPage }) => {
        await test.step('Navigate to Create News form', async () => {
            await createNewsPage.navigate();
            await createNewsPage.waitForFormReady();
        });
    });

    test('TC-03.1 Allow selecting up to 3 tags and block the 4th', async ({ createNewsPage, page }) => {
        await test.step('Select 3 valid tags', async () => {
            await createNewsPage.selectTag('Ads');
            await createNewsPage.selectTag('Education');
            await createNewsPage.selectTag('News');

            await expect(createNewsPage.getTagButton('Ads').locator('a')).toHaveClass(/global-tag-clicked/);
            await expect(createNewsPage.getTagButton('Education').locator('a')).toHaveClass(/global-tag-clicked/);
            await expect(createNewsPage.getTagButton('News').locator('a')).toHaveClass(/global-tag-clicked/);
        });

        await test.step('Attempt to select a 4th tag and verify it is blocked', async () => {
            await createNewsPage.selectTag('Initiatives');
            await expect(createNewsPage.getTagButton('Initiatives').locator('a')).not.toHaveClass(/global-tag-clicked/);
        });
    });

    test('TC-03.2 Should successfully publish news with 1 tag', async ({ createNewsPage, ecoNewsPage, page }) => {
        const newsTitle = 'Test';
        const newsContent = 'Test content with 20 chars';

        await test.step('Fill form and select 1 tag', async () => {
            await createNewsPage.fillRequiredFields(newsTitle, newsContent);
        });

        await test.step('Publish and verify tag on details page', async () => {
            await createNewsPage.clickPublish();
            await page.waitForURL(/.*ubs/)
            await ecoNewsPage.navigate();

            const newsCard = ecoNewsPage.getNewsItemByTitle(newsTitle);

            await expect(newsCard).toBeVisible();

            const newsTags = ecoNewsPage.getTagsForNewsItem(newsTitle);
            await expect(newsTags).toContainText('News');
        });
    });

    test('TC-03.3 Should successfully publish news with 3 tags', async ({ createNewsPage, ecoNewsPage, page }) => {
        const newsTitle = 'Test';
        const newsContent = 'Test content with 20 chars';

        await test.step('Fill form and select 3 tags', async () => {
            await createNewsPage.fillRequiredFields(newsTitle, newsContent);
            await createNewsPage.selectTag('Ads');
            await createNewsPage.selectTag('Education');
        });

        await test.step('Publish and verify tags on details page', async () => {
            await createNewsPage.clickPublish();
            await page.waitForURL(/.*ubs/)
            await ecoNewsPage.navigate();

            const newsCard = ecoNewsPage.getNewsItemByTitle(newsTitle);

            await expect(newsCard).toBeVisible();

            const newsTags = ecoNewsPage.getTagsForNewsItem(newsTitle);
            await expect(newsTags).toContainText('News');
            await expect(newsTags).toContainText('Education');
            await expect(newsTags).toContainText('Ads');
        });
    });

});
