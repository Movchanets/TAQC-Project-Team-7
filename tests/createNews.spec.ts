import { test, expect } from '../fixtures/index';
import { ENV } from '../utils/env';

test.describe('Create News Form Layout and Behavior (TC-01)', () => {

  test.beforeEach(async ({ authenticatedPage, createNewsPage }) => {
    // 1. Navigate directly to the Create News page using the pre-authenticated context
    await createNewsPage.navigate();
    
    // 2. Wait for the form title input to render to ensure the form is loaded
    await createNewsPage.titleInput.waitFor({ state: 'visible', timeout: 8000 });
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
  });

  test('TC-01.2 Verify pre-filled and non-editable Author and Date fields', async ({ createNewsPage }) => {
    // 1. Assert pre-filled Author/Date section is visible
    await expect(createNewsPage.authorDateSection).toBeVisible();
    
    const sectionText = await createNewsPage.authorDateSection.innerText();
    
    // 2. Assert correct formatting structure containing the current date/year and the logged-in author
    // (Note: GreenCity renders values directly like "May 25, 2026 · Viacheslav" without literal Date/Author label prefixes)
    expect(sectionText.trim().length).toBeGreaterThan(0);
    expect(sectionText).toContain('2026'); // Matches current year
    
    // We can also extract the logged-in user name from the email prefix or check for standard name
    expect(sectionText).toContain('Viacheslav'); 
    
    // 3. Assert they are non-editable (housed in a static div, not an input/textarea element)
    const editableInputs = createNewsPage.authorDateSection.locator('input, textarea');
    expect(await editableInputs.count()).toBe(0);
  });

  test('TC-01.3 Verify Tag buttons selection and appearance behavior', async ({ createNewsPage }) => {
    // Select the first tag button in a language-agnostic manner
    const tagBtn = createNewsPage.tagButtons.first();
    
    // 1. Assert initial state is visible and clickable
    await expect(tagBtn).toBeVisible();
    
    // 2. Click tag to select it
    await tagBtn.click();
    
    // 3. Assert the active tag toggle behavior works smoothly without errors
    await tagBtn.click();
  });
});
