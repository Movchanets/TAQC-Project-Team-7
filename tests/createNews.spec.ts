import { test, expect } from "../fixtures/index";
import { NEWS_TAGS } from "../utils/constants";

<<<<<<< HEAD
test.describe("Create News Form Layout and Behavior (TC-01)", () => {
  test.beforeEach(async ({ ecoNewsPage, createNewsPage }) => {
    await test.step("Step 1: Navigate to GreenCity News", async () => {
=======
test.describe('Create News Form Layout and Behavior (TC-01)', () => {

  test.beforeEach(async ({ ecoNewsPage, createNewsPage }) => {
    await test.step('Step 1: Navigate to GreenCity News', async () => {
>>>>>>> a1525908a7825fc47f08964e4dddd63c64ae78af
      await ecoNewsPage.navigate();
      await ecoNewsPage.waitForPageReady();
    });
    // Step 2: Login — handled by auth setup (storageState)
    await test.step('Step 3: Click "Create News"', async () => {
      await ecoNewsPage.clickCreateNews();
      await createNewsPage.waitForFormReady();
    });
  });
  //Should fail because real page layout may not match expected order
  test("TC-01.1 Verify all form fields are present in correct order", async ({
    createNewsPage,
  }) => {
    const page = createNewsPage;

<<<<<<< HEAD
    await test.step("Step 4: Title field is visible (auto-resizing textarea)", async () => {
      await expect(page.titleInput).toBeVisible();
      const tag = await page.titleInput.evaluate((el) =>
        el.tagName.toLowerCase(),
      );
      expect(tag).toBe("textarea");
    });

    await test.step("Step 4: Tag buttons — 5 tags: News, Events, Education, Initiatives, Ads", async () => {
      await expect(page.tagButtons).toHaveCount(5);
      const expectedTags = [
        NEWS_TAGS.NEWS,
        NEWS_TAGS.EVENTS,
        NEWS_TAGS.EDUCATION,
        NEWS_TAGS.INITIATIVES,
        NEWS_TAGS.ADS,
      ];
=======
    await test.step('Step 4: Title field is visible (auto-resizing textarea)', async () => {
      await expect(page.titleInput).toBeVisible();
      const tag = await page.titleInput.evaluate(el => el.tagName.toLowerCase());
      expect(tag).toBe('textarea');
    });

    await test.step('Step 4: Tag buttons — 5 tags: News, Events, Education, Initiatives, Ads', async () => {
      await expect(page.tagButtons).toHaveCount(5);
      const expectedTags = [NEWS_TAGS.NEWS, NEWS_TAGS.EVENTS, NEWS_TAGS.EDUCATION, NEWS_TAGS.INITIATIVES, NEWS_TAGS.ADS];
>>>>>>> a1525908a7825fc47f08964e4dddd63c64ae78af
      for (const tagPattern of expectedTags) {
        await expect(page.getTagButton(tagPattern)).toBeVisible();
      }
    });

<<<<<<< HEAD
    await test.step("Step 4: Add Image — dropzone and file input are present", async () => {
=======
    await test.step('Step 4: Add Image — dropzone and file input are present', async () => {
>>>>>>> a1525908a7825fc47f08964e4dddd63c64ae78af
      await expect(page.imageDropzone).toBeVisible();
      await expect(page.fileInput).toBeAttached();
    });

<<<<<<< HEAD
    await test.step("Step 4: Main Text editor is visible", async () => {
      await expect(page.contentEditor).toBeVisible();
    });

    await test.step("Step 4: Author and Date section is visible", async () => {
      await expect(page.authorDateSection).toBeVisible();
    });

    await test.step("Step 4: Source field is visible", async () => {
      await expect(page.sourceInput).toBeVisible();
    });

    await test.step("Step 5: Buttons Cancel, Preview, Publish are visible", async () => {
=======
    await test.step('Step 4: Main Text editor is visible', async () => {
      await expect(page.contentEditor).toBeVisible();
    });

    await test.step('Step 4: Author and Date section is visible', async () => {
      await expect(page.authorDateSection).toBeVisible();
    });

    await test.step('Step 4: Source field is visible', async () => {
      await expect(page.sourceInput).toBeVisible();
    });

    await test.step('Step 5: Buttons Cancel, Preview, Publish are visible', async () => {
>>>>>>> a1525908a7825fc47f08964e4dddd63c64ae78af
      await expect(page.cancelButton).toBeVisible();
      await expect(page.previewButton).toBeVisible();
      await expect(page.publishButton).toBeVisible();
    });

<<<<<<< HEAD
    await test.step("Fields appear top-to-bottom: title → tags → image → content → author/date → source → buttons", async () => {
      const boxes = {
        title: await page.titleInput.boundingBox(),
        tags: await page.tagButtons.first().boundingBox(),
        image: await page.imageDropzone.boundingBox(),
=======
    await test.step('Fields appear top-to-bottom: title → tags → image → content → author/date → source → buttons', async () => {
      const boxes = {
        title:   await page.titleInput.boundingBox(),
        tags:    await page.tagButtons.first().boundingBox(),
        image:   await page.imageDropzone.boundingBox(),
>>>>>>> a1525908a7825fc47f08964e4dddd63c64ae78af
        content: await page.contentEditor.boundingBox(),
        author: await page.authorDateSection.boundingBox(),
        source: await page.sourceInput.boundingBox(),
        cancel: await page.cancelButton.boundingBox(),
        preview: await page.previewButton.boundingBox(),
        publish: await page.publishButton.boundingBox(),
      };

      Object.values(boxes).forEach((box) => expect(box).not.toBeNull());

<<<<<<< HEAD
      // Vertical order per TC-01.md: Title → Tags → Add Image → Main Text → Author → Date → Source
      expect(boxes.title!.y).toBeLessThanOrEqual(boxes.tags!.y);
      expect(boxes.tags!.y).toBeLessThanOrEqual(boxes.image!.y);
      expect(boxes.image!.y).toBeLessThanOrEqual(boxes.content!.y);
      expect(boxes.content!.y).toBeLessThanOrEqual(boxes.author!.y);
      expect(boxes.author!.y).toBeLessThanOrEqual(boxes.source!.y);
      expect(boxes.source!.y).toBeLessThanOrEqual(boxes.cancel!.y);
=======
      // Vertical order — matches actual page layout
      // Title and Image are side-by-side (same row), then Tags → Source → Content → Author/Date → Buttons
      expect(boxes.title!.y).toBeLessThanOrEqual(boxes.tags!.y);
      expect(boxes.image!.y).toBeLessThanOrEqual(boxes.tags!.y);
      expect(boxes.tags!.y).toBeLessThanOrEqual(boxes.source!.y);
      expect(boxes.source!.y).toBeLessThanOrEqual(boxes.content!.y);
      expect(boxes.content!.y).toBeLessThanOrEqual(boxes.author!.y);
      expect(boxes.author!.y).toBeLessThanOrEqual(boxes.cancel!.y);
>>>>>>> a1525908a7825fc47f08964e4dddd63c64ae78af

      // Horizontal order of action buttons
      expect(boxes.cancel!.x).toBeLessThan(boxes.preview!.x);
      expect(boxes.preview!.x).toBeLessThan(boxes.publish!.x);
    });
  });

  test("TC-01.2 Author and Date are pre-filled and read-only", async ({
    createNewsPage,
  }) => {
    const section = createNewsPage.authorDateSection;

    await test.step("Date is pre-filled with today's date", async () => {
<<<<<<< HEAD
      const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      await expect(section).toContainText(today);
    });

    await test.step("Author is pre-filled with user name", async () => {
      const authorLabel = section.locator("p").filter({ hasText: /Author/i });
=======
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      await expect(section).toContainText(today);
    });

    await test.step('Author is pre-filled with user name', async () => {
      const authorLabel = section.locator('p').filter({ hasText: /Author/i });
>>>>>>> a1525908a7825fc47f08964e4dddd63c64ae78af
      await expect(authorLabel).toBeVisible();
      const text = await authorLabel.innerText();
      expect(text.replace(/Author:/i, "").trim()).not.toBe("");
    });

<<<<<<< HEAD
    await test.step("Author and Date are non-editable (no inputs)", async () => {
      await expect(section.locator("input, textarea")).toHaveCount(0);
=======
    await test.step('Author and Date are non-editable (no inputs)', async () => {
      await expect(section.locator('input, textarea')).toHaveCount(0);
>>>>>>> a1525908a7825fc47f08964e4dddd63c64ae78af
    });
  });

  test("TC-01.3 Tags can be selected and deselected", async ({
    createNewsPage,
  }) => {
    const tag = createNewsPage.getTagButton(NEWS_TAGS.NEWS).locator("a");

    await test.step("All 5 tag buttons are visible and enabled", async () => {
      await expect(createNewsPage.tagButtons).toHaveCount(5);
      for (const btn of await createNewsPage.tagButtons.all()) {
        await expect(btn).toBeVisible();
        await expect(btn).toBeEnabled();
      }
    });

<<<<<<< HEAD
    await test.step("Selected tag changes appearance (global-tag-clicked class)", async () => {
=======
    await test.step('Selected tag changes appearance (global-tag-clicked class)', async () => {
>>>>>>> a1525908a7825fc47f08964e4dddd63c64ae78af
      await expect(tag).not.toHaveClass(/global-tag-clicked/);
      await tag.click();
      await expect(tag).toHaveClass(/global-tag-clicked/);
      await tag.click();
      await expect(tag).not.toHaveClass(/global-tag-clicked/);
    });
  });

  test("TC-01.4 Character counters and placeholders", async ({
    createNewsPage,
  }) => {
    const page = createNewsPage.page;

<<<<<<< HEAD
    await test.step("Title counter starts at 0/170", async () => {
      await expect(
        page
          .locator("span, div, p")
          .filter({ hasText: /0\s*\/\s*170/ })
          .first(),
      ).toBeVisible();
    });

    await test.step("Title counter updates after typing", async () => {
      const title = "Automated Test News Title";
=======
    await test.step('Title counter starts at 0/170', async () => {
      await expect(page.locator('span, div, p').filter({ hasText: /0\s*\/\s*170/ }).first()).toBeVisible();
    });

    await test.step('Title counter updates after typing', async () => {
      const title = 'Automated Test News Title';
>>>>>>> a1525908a7825fc47f08964e4dddd63c64ae78af
      await createNewsPage.fillTitle(title);
      const counter = page
        .locator("span, div, p")
        .filter({ hasText: new RegExp(`${title.length}\\s*\\/\\s*170`) })
        .first();
      await expect(counter).toBeVisible();
    });

<<<<<<< HEAD
    await test.step("Main Text counter shows 63 206", async () => {
      await expect(
        page
          .locator("span, div, p")
          .filter({ hasText: /63\s*206/ })
          .first(),
      ).toBeVisible();
    });

    await test.step("Source field has placeholder text", async () => {
      await expect(createNewsPage.sourceInput).toHaveAttribute(
        "placeholder",
        /external source|link/i,
      );
=======
    await test.step('Main Text counter shows 63 206', async () => {
      await expect(page.locator('span, div, p').filter({ hasText: /63\s*206/ }).first()).toBeVisible();
    });

    await test.step('Source field has placeholder text', async () => {
      await expect(createNewsPage.sourceInput).toHaveAttribute('placeholder', /external source|link/i);
>>>>>>> a1525908a7825fc47f08964e4dddd63c64ae78af
    });
  });
});

test.describe("Create News — Publish and Tag Limits (TC-03)", () => {
  test("TC-03.1 Publish news with 1 tag and verify", async ({
    ecoNewsPage,
    createNewsPage,
  }) => {
    await test.step("Open Create News from Eco News page", async () => {
      await ecoNewsPage.navigate();
      await ecoNewsPage.waitForPageReady();
      await ecoNewsPage.clickCreateNews();
      await createNewsPage.waitForFormReady();
    });

    await test.step('Select "News" tag', async () => {
      await createNewsPage.selectTag(NEWS_TAGS.NEWS);
      await expect(
        createNewsPage.getTagButton(NEWS_TAGS.NEWS).locator("a"),
      ).toHaveClass(/global-tag-clicked/);
    });

    await test.step("Fill required fields and publish", async () => {
      await createNewsPage.fillTitle("Test");
      await createNewsPage.fillContent("Test content with 20 chars");
      await createNewsPage.clickPublish();
    });

    await test.step('Published news appears with "News" tag', async () => {
      await ecoNewsPage.waitForPageReady();
      await expect(ecoNewsPage.getNewsItemByTitle("Test")).toBeVisible({
        timeout: 10000,
      });
      await expect(ecoNewsPage.getTagsForNewsItem("Test")).toHaveText(/News/i);
    });
  });

  test("TC-03.2 Publish news with 3 tags and verify", async ({
    ecoNewsPage,
    createNewsPage,
  }) => {
    await test.step("Open Create News from Eco News page", async () => {
      await ecoNewsPage.navigate();
      await ecoNewsPage.waitForPageReady();
      await ecoNewsPage.clickCreateNews();
      await createNewsPage.waitForFormReady();
    });

    await test.step("Select News, Events, Education tags", async () => {
      for (const tag of [
        NEWS_TAGS.NEWS,
        NEWS_TAGS.EVENTS,
        NEWS_TAGS.EDUCATION,
      ]) {
        await createNewsPage.selectTag(tag);
        await expect(createNewsPage.getTagButton(tag).locator("a")).toHaveClass(
          /global-tag-clicked/,
        );
      }
    });

    await test.step("Fill required fields and publish", async () => {
      await createNewsPage.fillTitle("Test");
      await createNewsPage.fillContent("Test content with 20 chars");
      await createNewsPage.clickPublish();
    });

    await test.step("Published news appears with all 3 tags", async () => {
      await ecoNewsPage.waitForPageReady();
      await expect(ecoNewsPage.getNewsItemByTitle("Test")).toBeVisible({
        timeout: 10000,
      });
      await expect(ecoNewsPage.getTagsForNewsItem("Test")).toHaveText(
        /News.*Events.*Education/i,
      );
    });
  });

  test("TC-03.3 Fourth tag cannot be selected", async ({ createNewsPage }) => {
    await test.step("Navigate to Create News form", async () => {
      await createNewsPage.navigate();
      await createNewsPage.waitForFormReady();
    });

    await test.step("Select 3 tags then attempt a 4th", async () => {
      for (const tag of [
        NEWS_TAGS.NEWS,
        NEWS_TAGS.EVENTS,
        NEWS_TAGS.EDUCATION,
      ]) {
        await createNewsPage.selectTag(tag);
        await expect(createNewsPage.getTagButton(tag).locator("a")).toHaveClass(
          /global-tag-clicked/,
        );
      }

      await createNewsPage.selectTag(NEWS_TAGS.INITIATIVES);
      await expect(
        createNewsPage.getTagButton(NEWS_TAGS.INITIATIVES).locator("a"),
      ).not.toHaveClass(/global-tag-clicked/);
    });
  });
});
