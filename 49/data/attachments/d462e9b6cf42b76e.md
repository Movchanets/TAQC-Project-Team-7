# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC-08.spec.ts >> TC-08 - User can preview news content on Preview page >> Verify that the Preview page displays the entered news content correctly and a "Back to editing" link is available
- Location: tests/TC-08.spec.ts:7:13

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('textarea[formcontrolname="title"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('textarea[formcontrolname="title"]')

```

```yaml
- link "skip to the main content":
  - /url: .main-content
- banner "Welcome to header":
  - link "Image green city logo":
    - /url: "#/greenCity"
    - link "Image green city logo"
  - navigation:
    - tablist:
      - listitem:
        - link "Eco news":
          - /url: "#/greenCity/news"
      - listitem:
        - link "Events":
          - /url: "#/greenCity/events"
      - listitem:
        - link "Places":
          - /url: "#/greenCity/places"
      - listitem:
        - link "About us":
          - /url: "#/greenCity/about"
      - listitem:
        - link "My space":
          - /url: "#/greenCity/profile"
      - listitem:
        - link "UBS courier":
          - /url: "#/ubs"
  - menu:
    - listitem "site bookmark"
    - listitem "site notification"
    - search "site search"
    - menu "language switcher":
      - option "english"
    - menu "profile options collapsed":
      - listitem: Viacheslav
- main:
  - heading "Create news" [level=2]
  - paragraph: Please provide as many details as you can - place and time of the event, the goal of gathering, etc. You can come back and update news anytime after publishing.
- contentinfo:
  - link "GreenCity home":
    - /url: "#/greenCity"
    - img "GreenCity home"
  - navigation:
    - menu:
      - listitem:
        - link "Eco news":
          - /url: "#/greenCity/news"
      - listitem:
        - link "Events":
          - /url: "#/greenCity/events"
      - listitem:
        - link "Places":
          - /url: "#/greenCity/places"
      - listitem:
        - link "About Us":
          - /url: "#/greenCity/about"
      - listitem:
        - link "My Space":
          - /url: "#/greenCity/profile/2261"
      - listitem:
        - link "UBS Courier":
          - /url: "#/ubs"
    - menu:
      - listitem:
        - paragraph: Follow us
      - listitem:
        - link "Twitter link":
          - /url: "#"
          - img "Twitter link"
        - link "LinkedIn link":
          - /url: "#"
          - img "LinkedIn link"
        - link "Facebook link":
          - /url: "#"
          - img "Facebook link"
        - link "Instagram link":
          - /url: "#"
          - img "Instagram link"
        - link "YouTube link":
          - /url: "#"
          - img "YouTube link"
  - text: © Copyright 2026. Green City.
- button "chat":
  - img "chat"
- text: Welcome to the search window
```

# Test source

```ts
  1  |     import { test, expect } from '../fixtures/index';
  2  |     import { NEWS_TAGS } from '../utils/constants';
  3  | 
  4  | 
  5  |     test.describe('TC-08 - User can preview news content on Preview page', () => {
  6  | 
  7  |         test('Verify that the Preview page displays the entered news content correctly and a "Back to editing" link is available', async ({ ecoNewsPage, createNewsPage, newsPreviewPage, page }) => {
  8  |             
  9  |             const expectedTitle = 'Test News Title ' + Date.now();
  10 |             const expectedContent = 'This is the main text of the news article for preview testing.';
  11 | 
  12 |             await test.step('Navigate to GreenCity News and click "Create News"', async () => {
  13 |                 await ecoNewsPage.navigate();
  14 |                 await ecoNewsPage.waitForPageReady();
  15 |                 await ecoNewsPage.clickCreateNews();
  16 |                 await createNewsPage.waitForFormReady();
  17 |             });
  18 | 
  19 |             await test.step('Fill in Title, Main Text, select tags, and click "Preview"', async () => {
  20 | 
  21 |                 await createNewsPage.fillTitle(expectedTitle);
  22 |                 await createNewsPage.fillContent(expectedContent);
  23 |                 await createNewsPage.selectTag(NEWS_TAGS.NEWS);
  24 |                 await createNewsPage.selectTag(NEWS_TAGS.EVENTS);
  25 |                 await createNewsPage.clickPreview();
  26 |             });
  27 | 
  28 |             await test.step('Verify that the Title, Main Text, and selected tags are displayed correctly on the Preview page', async () => {
  29 |                 await expect(newsPreviewPage.newsTitle).toBeVisible();
  30 |                 await expect(newsPreviewPage.newsTitle).toHaveText(expectedTitle);
  31 |                 
  32 |                 await expect(newsPreviewPage.contentText).toBeVisible();
  33 |                 await expect(newsPreviewPage.contentText).toHaveText(expectedContent);
  34 |                 
  35 |                 const tags: string[] = await newsPreviewPage.getTags(); 
  36 |                 const tagsText = tags.join(' '); 
  37 | 
  38 |                 expect(tagsText).toMatch(NEWS_TAGS.NEWS);
  39 |                 expect(tagsText).toMatch(NEWS_TAGS.EVENTS);
  40 |             });
  41 | 
  42 |             await test.step('Verify that the preview displays the current date', async () => {
  43 | 
  44 |                 const expectedDate = new Date().toLocaleDateString('en-US', {
  45 |                     month: 'short',
  46 |                     day: 'numeric',
  47 |                     year: 'numeric'
  48 |                 });
  49 | 
  50 |                 await expect(newsPreviewPage.newsDate).toBeVisible();
  51 |                 await expect(newsPreviewPage.newsDate).toContainText(expectedDate);
  52 |             });
  53 | 
  54 |             await test.step('Verify that the author name is displayed correctly on the Preview page', async () => {
  55 |                 const rawName = await page.evaluate(() => window.localStorage.getItem('name'));
  56 | 
  57 |                 if (!rawName) {
  58 |                     throw new Error('User name not found in Local Storage. Is the user logged in?');
  59 |                 }
  60 |                 const expectedAuthorName = rawName.replace(/(^"|"$)/g, '');
  61 | 
  62 |                 await expect(newsPreviewPage.newsAuthor).toContainText(expectedAuthorName);
  63 |             });
  64 | 
  65 |             await test.step('Verify that a "Back to editing" link is available on the Preview page', async () => {
  66 |                 
  67 |                 await expect(newsPreviewPage.backToEditingLink).toBeVisible();
  68 |                 await expect(newsPreviewPage.backToEditingLink).toHaveText('Back to editing');
  69 |             });
  70 | 
  71 |             await test.step('Verify that clicking "Back to editing" returns the user to the Create News form with previously entered data intact', async () => {
  72 |                 
  73 |                 await newsPreviewPage.goBackToEditing();
  74 | 
> 75 |                 await expect(createNewsPage.titleInput).toBeVisible();
     |                                                         ^ Error: expect(locator).toBeVisible() failed
  76 |                 await expect(createNewsPage.titleInput).toHaveValue(expectedTitle);
  77 | 
  78 |                 await expect(createNewsPage.contentEditor).toBeVisible();
  79 |                 await expect(createNewsPage.contentEditor).toHaveText(expectedContent);
  80 |             });
  81 |         });
  82 | 
  83 | 
  84 |     });
```