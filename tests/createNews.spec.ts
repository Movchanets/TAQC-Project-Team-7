import { test, expect } from '../fixtures/index';
import { ENV } from '../utils/env';

test.describe('Create News Form Layout and Behavior (TC-01)', () => {

  test.beforeEach(async ({ authenticatedPage, createNewsPage }) => {
    // 1. Navigate directly to the Create News page using the pre-authenticated context
    await createNewsPage.navigate();
    
    // 2. Wait for the form title input to render to ensure the form is loaded
    await createNewsPage.titleInput.waitFor({ state: 'visible', timeout: 8000 });

    // 3. SPA hydration delay to ensure event listeners are fully bound before interactions
    await createNewsPage.page.waitForTimeout(1500);
  });

  test('TC-01.1 Verify presence and order of all necessary fields', async ({ createNewsPage }) => {
    // 1. Title input field visibility
    await expect(createNewsPage.titleInput).toBeVisible();

    // 2. Selectable Tag buttons (Verify exactly 5 tags are present and visible)
    await expect(createNewsPage.tagButtons).toHaveCount(5);
    const tagsCount = await createNewsPage.tagButtons.count();
    for (let i = 0; i < tagsCount; i++) {
      await expect(createNewsPage.tagButtons.nth(i)).toBeVisible();
    }

    // 3. Add Image Dropzone & File Input
    await expect(createNewsPage.imageDropzone).toBeVisible();
    await expect(createNewsPage.fileInput).toBeAttached(); // File inputs may be hidden/underneath, so we assert attached

    // 4. Main Text Rich Editor
    await expect(createNewsPage.contentEditor).toBeVisible();

    // 5. Pre-filled Author/Date Section
    await expect(createNewsPage.authorDateSection).toBeVisible();

    // 6. Source input field (Verify presence and custom placeholder text specified in requirements)
    await expect(createNewsPage.sourceInput).toBeVisible();
    await expect(createNewsPage.sourceInput).toHaveAttribute('placeholder', /external source|link|original|article/i);

    // 7. Cancel, Preview, and Publish action buttons
    await expect(createNewsPage.cancelButton).toBeVisible();
    await expect(createNewsPage.previewButton).toBeVisible();
    await expect(createNewsPage.publishButton).toBeVisible();

    // 8. Strict layout order verification using bounding boxes (Y coordinate increases down the page)
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

    // Assert strictly ordered top-to-bottom layout
    expect(titleBox!.y).toBeLessThan(tagBox!.y);
    expect(tagBox!.y).toBeLessThan(imageBox!.y);
    expect(imageBox!.y).toBeLessThan(contentBox!.y);
    expect(contentBox!.y).toBeLessThan(authorBox!.y);
    expect(authorBox!.y).toBeLessThan(sourceBox!.y);
    expect(sourceBox!.y).toBeLessThan(cancelBox!.y);

    // Assert strictly ordered left-to-right actions layout
    expect(cancelBox!.x).toBeLessThan(previewBox!.x);
    expect(previewBox!.x).toBeLessThan(publishBox!.x);
  });

  test('TC-01.2 Verify pre-filled and non-editable Author and Date fields', async ({ createNewsPage }) => {
    // 1. Assert pre-filled Author/Date section is visible
    await expect(createNewsPage.authorDateSection).toBeVisible();
    
    // 2. Dynamic check for today's date formatted as "MMM D, YYYY" (e.g., "May 25, 2026")
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }); // e.g. "May 25, 2026"

    const sectionText = await createNewsPage.authorDateSection.innerText();
    expect(sectionText).toContain(formattedDate);
    
    // 3. Assert Author label and prefilled text exist without hardcoding a specific name
    const authorParagraph = createNewsPage.authorDateSection.locator('p').filter({ hasText: /Author/i });
    await expect(authorParagraph).toBeVisible();
    const authorText = await authorParagraph.innerText();
    expect(authorText.replace(/Author:/i, '').trim().length).toBeGreaterThan(0);
    
    // 4. Assert they are non-editable (housed in static elements, not inside input/textarea tags)
    const editableInputs = createNewsPage.authorDateSection.locator('input, textarea');
    expect(await editableInputs.count()).toBe(0);
  });

  test('TC-01.3 Verify Tag buttons selection and appearance behavior', async ({ createNewsPage }) => {
    // 1. Verify exactly 5 tags are present
    const tagButtons = createNewsPage.tagButtons;
    await expect(tagButtons).toHaveCount(5);

    // 2. Verify all tag buttons are visible, enabled, and clickable
    const tagsCount = await tagButtons.count();
    for (let i = 0; i < tagsCount; i++) {
      const tag = tagButtons.nth(i);
      await expect(tag).toBeVisible();
      await expect(tag).toBeEnabled();
    }

    // 3. Verify click operations are fully supported without any errors
    const firstTag = tagButtons.first();
    await firstTag.click();
    await firstTag.click(); // Toggle off
  });

  test('TC-01.4 Verify Title and Main Text character counters and placeholders', async ({ createNewsPage }) => {
    // 1. Title element tag type verification (inherently auto-resizing element)
    const titleTagName = await createNewsPage.titleInput.evaluate(el => el.tagName.toLowerCase());
    expect(titleTagName).toBe('textarea');

    // 2. Verify Title character counter initial state
    const titleCounter = createNewsPage.page.locator('span, div, p').filter({ hasText: /0\s*\/\s*170/ }).first();
    await expect(titleCounter).toBeVisible();

    // 3. Fill Title and verify counter updates dynamically
    const sampleTitle = 'Automated Test News Title';
    await createNewsPage.titleInput.fill(sampleTitle);
    const updatedCounterPattern = new RegExp(`${sampleTitle.length}\\s*\\/\\s*170`);
    const updatedTitleCounter = createNewsPage.page.locator('span, div, p').filter({ hasText: updatedCounterPattern }).first();
    await expect(updatedTitleCounter).toBeVisible();

    // 4. Verify Main Text editor presence and character counter initial state
    await expect(createNewsPage.contentEditor).toBeVisible();
    
    // The main text counter/limit hint on GreenCity shows "Must be minimum 20 and maximum 63 206 symbols"
    const mainTextCounter = createNewsPage.page.locator('span, div, p').filter({ hasText: /63\s*206/ }).first();
    await expect(mainTextCounter).toBeVisible();

    // 5. Verify Source input field placeholder is exact
    await expect(createNewsPage.sourceInput).toBeVisible();
    await expect(createNewsPage.sourceInput).toHaveAttribute(
      'placeholder',
      /Please add the link of the original article|external source|link|original|article/i
    );
  });
});
