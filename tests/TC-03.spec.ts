import { test, expect } from '../fixtures/index';
import { NEWS_TAGS } from '../utils/constants';

test.describe('TC-03 — Publish and Tag Limits', () => {
  test('TC-03.1 Publish news with 1 tag and verify', async ({
    ecoNewsPage,
    createNewsPage,
  }) => {
    await test.step('Open Create News from Eco News page', async () => {
      await ecoNewsPage.navigate();
      await ecoNewsPage.waitForPageReady();
      await ecoNewsPage.clickCreateNews();
      await createNewsPage.waitForFormReady();
    });

    await test.step('Select "News" tag', async () => {
      await createNewsPage.selectTag(NEWS_TAGS.NEWS);
      await expect(
        createNewsPage.getTagButton(NEWS_TAGS.NEWS).locator('a'),
      ).toHaveClass(/global-tag-clicked/);
    });

    await test.step('Fill required fields and publish', async () => {
      await createNewsPage.fillTitle('Test');
      await createNewsPage.fillContent('Test content with 20 chars');
      await createNewsPage.clickPublish();
    });

    await test.step('Published news appears with "News" tag', async () => {
      await ecoNewsPage.waitForPageReady();
      await expect(ecoNewsPage.getNewsItemByTitle('Test')).toBeVisible({
        timeout: 10000,
      });
      await expect(ecoNewsPage.getTagsForNewsItem('Test')).toHaveText(/News/i);
    });
  });

  test('TC-03.2 Publish news with 3 tags and verify', async ({
    ecoNewsPage,
    createNewsPage,
  }) => {
    await test.step('Open Create News from Eco News page', async () => {
      await ecoNewsPage.navigate();
      await ecoNewsPage.waitForPageReady();
      await ecoNewsPage.clickCreateNews();
      await createNewsPage.waitForFormReady();
    });

    await test.step('Select News, Events, Education tags', async () => {
      for (const tag of [
        NEWS_TAGS.NEWS,
        NEWS_TAGS.EVENTS,
        NEWS_TAGS.EDUCATION,
      ]) {
        await createNewsPage.selectTag(tag);
        await expect(createNewsPage.getTagButton(tag).locator('a')).toHaveClass(
          /global-tag-clicked/,
        );
      }
    });

    await test.step('Fill required fields and publish', async () => {
      await createNewsPage.fillTitle('Test');
      await createNewsPage.fillContent('Test content with 20 chars');
      await createNewsPage.clickPublish();
    });

    await test.step('Published news appears with all 3 tags', async () => {
      await ecoNewsPage.waitForPageReady();
      await expect(ecoNewsPage.getNewsItemByTitle('Test')).toBeVisible({
        timeout: 10000,
      });
      await expect(ecoNewsPage.getTagsForNewsItem('Test')).toHaveText(
        /News.*Events.*Education/i,
      );
    });
  });

  test('TC-03.3 Fourth tag cannot be selected', async ({ createNewsPage }) => {
    await test.step('Navigate to Create News form', async () => {
      await createNewsPage.navigate();
      await createNewsPage.waitForFormReady();
    });

    await test.step('Select 3 tags then attempt a 4th', async () => {
      for (const tag of [
        NEWS_TAGS.NEWS,
        NEWS_TAGS.EVENTS,
        NEWS_TAGS.EDUCATION,
      ]) {
        await createNewsPage.selectTag(tag);
        await expect(createNewsPage.getTagButton(tag).locator('a')).toHaveClass(
          /global-tag-clicked/,
        );
      }

      await createNewsPage.selectTag(NEWS_TAGS.INITIATIVES);
      await expect(
        createNewsPage.getTagButton(NEWS_TAGS.INITIATIVES).locator('a'),
      ).not.toHaveClass(/global-tag-clicked/);
    });
  });
});
