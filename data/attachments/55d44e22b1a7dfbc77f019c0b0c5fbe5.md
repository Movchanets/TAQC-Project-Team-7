# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: createNews.spec.ts >> Create News Form Layout and Behavior (TC-01) >> TC-01.1 Verify all form fields are present in correct order
- Location: tests/createNews.spec.ts:13:7

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 281.1875
Received:   281.1875
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e4]:
      - link "skip to the main content" [ref=e6] [cursor=pointer]:
        - /url: .main-content
      - banner "Welcome to header" [ref=e7]:
        - generic [ref=e9]:
          - link "Image green city logo" [ref=e10] [cursor=pointer]:
            - /url: "#/greenCity"
            - link "Image green city logo" [ref=e11]
          - generic [ref=e12]:
            - navigation [ref=e13]:
              - tablist [ref=e14]:
                - listitem [ref=e15]:
                  - link "Eco news" [ref=e16] [cursor=pointer]:
                    - /url: "#/greenCity/news"
                - listitem [ref=e17]:
                  - link "Events" [ref=e18] [cursor=pointer]:
                    - /url: "#/greenCity/events"
                - listitem [ref=e19]:
                  - link "Places" [ref=e20] [cursor=pointer]:
                    - /url: "#/greenCity/places"
                - listitem [ref=e21]:
                  - link "About us" [ref=e22] [cursor=pointer]:
                    - /url: "#/greenCity/about"
                - listitem [ref=e23]:
                  - link "My space" [ref=e24] [cursor=pointer]:
                    - /url: "#/greenCity/profile"
                - listitem [ref=e25]:
                  - link "UBS courier" [ref=e26] [cursor=pointer]:
                    - /url: "#/ubs"
            - menu [ref=e28]:
              - listitem "site bookmark" [ref=e29] [cursor=pointer]:
                - img [ref=e30]
              - listitem "site notification" [ref=e31] [cursor=pointer]:
                - img [ref=e32]
              - search "site search" [ref=e33] [cursor=pointer]:
                - img [ref=e34]
              - menu "language switcher" [ref=e35]:
                - option "english" [ref=e36] [cursor=pointer]:
                  - generic [ref=e37]: En
                  - img [ref=e38]
              - menu "profile options collapsed" [ref=e39]:
                - listitem [ref=e40] [cursor=pointer]: Viacheslav
      - generic [ref=e41]:
        - generic "Tab To Main"
        - generic [ref=e42]:
          - main [ref=e46]:
            - generic [ref=e47]:
              - generic [ref=e48]:
                - heading "Create news" [level=2] [ref=e49]
                - paragraph [ref=e51]: Please provide as many details as you can - place and time of the event, the goal of gathering, etc. You can come back and update news anytime after publishing.
              - generic [ref=e53]:
                - generic [ref=e54]:
                  - generic [ref=e55]:
                    - generic [ref=e56]:
                      - heading "Title" [level=3] [ref=e57]
                      - generic [ref=e58]: 0/170
                    - textbox [ref=e60]:
                      - /placeholder: e.g. Coffee takeaway with 20% discount
                  - generic [ref=e61]:
                    - heading "Pick tags for news" [level=3] [ref=e62]
                    - paragraph [ref=e63]: Only 3 tags can be added
                    - generic [ref=e65]:
                      - button "News" [ref=e66] [cursor=pointer]:
                        - generic [ref=e68]: News
                      - button "Events" [ref=e69] [cursor=pointer]:
                        - generic [ref=e71]: Events
                      - button "Education" [ref=e72] [cursor=pointer]:
                        - generic [ref=e74]: Education
                      - button "Initiatives" [ref=e75] [cursor=pointer]:
                        - generic [ref=e77]: Initiatives
                      - button "Ads" [ref=e78] [cursor=pointer]:
                        - generic [ref=e80]: Ads
                  - generic [ref=e81]:
                    - generic [ref=e82]:
                      - heading "Source (optional)" [level=3] [ref=e83]
                      - generic [ref=e84]: Please add the link of original article/news/post. Link must start with http(s)://
                    - textbox [ref=e86]:
                      - /placeholder: Link to external source
                  - generic [ref=e87]:
                    - heading "Picture (optional)" [level=3] [ref=e88]
                    - generic [ref=e89]:
                      - generic [ref=e92]:
                        - text: Drop your image here or
                        - generic [ref=e93]: browse
                        - button "browse" [ref=e94]
                      - generic [ref=e95]:
                        - generic "Crop photo" [ref=e99]
                        - generic [ref=e112]:
                          - button "Cancel" [ref=e113] [cursor=pointer]
                          - button "Submit" [ref=e114] [cursor=pointer]
                      - paragraph [ref=e115]: Upload only PNG or JPG. File size must be less than 10MB
                - generic [ref=e116]:
                  - generic [ref=e117]:
                    - heading "Content" [level=3] [ref=e118]
                    - paragraph [ref=e119]: Must be minimum 20 and maximum 63 206 symbols
                  - generic [ref=e120]:
                    - generic [ref=e121]:
                      - generic [ref=e122]:
                        - button [ref=e123] [cursor=pointer]:
                          - img [ref=e124]
                        - button [ref=e127] [cursor=pointer]:
                          - img [ref=e128]
                        - button [ref=e130] [cursor=pointer]:
                          - img [ref=e131]
                        - button [ref=e134] [cursor=pointer]:
                          - img [ref=e135]
                      - generic [ref=e139]:
                        - button [ref=e140] [cursor=pointer]:
                          - img [ref=e141]
                        - button [ref=e146] [cursor=pointer]:
                          - img [ref=e147]
                      - generic [ref=e151]:
                        - button [ref=e152] [cursor=pointer]:
                          - img [ref=e153]
                        - button [ref=e155] [cursor=pointer]:
                          - img [ref=e156]
                      - generic [ref=e158]:
                        - button [ref=e159] [cursor=pointer]:
                          - img [ref=e160]
                        - button [ref=e164] [cursor=pointer]:
                          - img [ref=e165]
                      - generic [ref=e166]:
                        - button [ref=e167] [cursor=pointer]:
                          - img [ref=e168]
                        - button [ref=e171] [cursor=pointer]:
                          - img [ref=e172]
                      - generic [ref=e175]:
                        - button [ref=e176] [cursor=pointer]:
                          - img [ref=e177]
                        - button [ref=e179] [cursor=pointer]:
                          - img [ref=e180]
                      - button [ref=e183] [cursor=pointer]:
                        - img [ref=e184]
                      - generic [ref=e190]:
                        - button "Normal" [ref=e191] [cursor=pointer]:
                          - text: Normal
                          - img [ref=e192]
                        - text: Small Normal Large Huge
                      - generic [ref=e196]:
                        - button "Normal" [ref=e197] [cursor=pointer]:
                          - text: Normal
                          - img [ref=e198]
                        - text: Heading 1 Heading 2 Heading 3 Heading 4 Heading 5 Heading 6 Normal
                      - generic [ref=e201]:
                        - button [ref=e203] [cursor=pointer]:
                          - img [ref=e204]
                        - button [ref=e207] [cursor=pointer]:
                          - img [ref=e208]
                      - generic [ref=e258]:
                        - button "Sans Serif" [ref=e259] [cursor=pointer]:
                          - text: Sans Serif
                          - img [ref=e260]
                        - text: Sans Serif Serif Monospace
                      - button [ref=e265] [cursor=pointer]:
                        - img [ref=e266]
                      - button [ref=e268] [cursor=pointer]:
                        - img [ref=e269]
                      - generic [ref=e274]:
                        - button [ref=e275] [cursor=pointer]:
                          - img [ref=e276]
                        - button [ref=e280] [cursor=pointer]:
                          - img [ref=e281]
                        - button [ref=e285] [cursor=pointer]:
                          - img [ref=e286]
                      - button [ref=e300] [cursor=pointer]:
                        - img [ref=e301]
                    - generic [ref=e306]:
                      - generic [ref=e307]:
                        - text: e.g. Short description of news, agenda for event
                        - paragraph [ref=e308]
                      - text: "Visit URL: EditRemove"
                  - paragraph
                - generic [ref=e309]:
                  - paragraph [ref=e310]: "Date: May 29, 2026"
                  - paragraph [ref=e311]: "Author: Viacheslav"
                - generic [ref=e312]:
                  - button "Cancel" [ref=e313] [cursor=pointer]
                  - button "Preview" [ref=e314] [cursor=pointer]
                  - button "Publish" [disabled] [ref=e315]
          - contentinfo [ref=e317]:
            - generic [ref=e318]:
              - generic [ref=e319]:
                - link "GreenCity home" [ref=e321] [cursor=pointer]:
                  - /url: "#/greenCity"
                  - img "GreenCity home" [ref=e322]
                - navigation [ref=e323]:
                  - menu [ref=e324]:
                    - listitem [ref=e325]:
                      - link "Eco news" [ref=e326] [cursor=pointer]:
                        - /url: "#/greenCity/news"
                    - listitem [ref=e327]:
                      - link "Events" [ref=e328] [cursor=pointer]:
                        - /url: "#/greenCity/events"
                    - listitem [ref=e329]:
                      - link "Places" [ref=e330] [cursor=pointer]:
                        - /url: "#/greenCity/places"
                    - listitem [ref=e331]:
                      - link "About Us" [ref=e332] [cursor=pointer]:
                        - /url: "#/greenCity/about"
                    - listitem [ref=e333]:
                      - link "My Space" [ref=e334] [cursor=pointer]:
                        - /url: "#/greenCity/profile/2261"
                    - listitem [ref=e335]:
                      - link "UBS Courier" [ref=e336] [cursor=pointer]:
                        - /url: "#/ubs"
                  - menu [ref=e337]:
                    - listitem [ref=e338]:
                      - paragraph [ref=e339]: Follow us
                    - listitem [ref=e340]:
                      - link "Twitter link" [ref=e341] [cursor=pointer]:
                        - /url: "#"
                        - img "Twitter link" [ref=e342]
                      - link "LinkedIn link" [ref=e343] [cursor=pointer]:
                        - /url: "#"
                        - img "LinkedIn link" [ref=e344]
                      - link "Facebook link" [ref=e345] [cursor=pointer]:
                        - /url: "#"
                        - img "Facebook link" [ref=e346]
                      - link "Instagram link" [ref=e347] [cursor=pointer]:
                        - /url: "#"
                        - img "Instagram link" [ref=e348]
                      - link "YouTube link" [ref=e349] [cursor=pointer]:
                        - /url: "#"
                        - img "YouTube link" [ref=e350]
              - generic [ref=e351]: © Copyright 2026. Green City.
    - button "chat" [ref=e352] [cursor=pointer]:
      - img "chat" [ref=e353]
  - generic [ref=e354]: Welcome to the search window
```

# Test source

```ts
  1   | import { test, expect } from '../fixtures/index';
  2   | import { NEWS_TAGS } from '../utils/constants';
  3   | 
  4   | test.describe('Create News Form Layout and Behavior (TC-01)', () => {
  5   | 
  6   |   test.beforeEach(async ({ createNewsPage }) => {
  7   |     await test.step('Navigate to Create News form', async () => {
  8   |       await createNewsPage.navigate();
  9   |       await createNewsPage.waitForFormReady();
  10  |     });
  11  |   });
  12  | 
  13  |   test('TC-01.1 Verify all form fields are present in correct order', async ({ createNewsPage }) => {
  14  |     const page = createNewsPage;
  15  | 
  16  |     await test.step('Form fields are visible', async () => {
  17  |       await expect(page.titleInput).toBeVisible();
  18  |       await expect(page.tagButtons).toHaveCount(5);
  19  |       await expect(page.imageDropzone).toBeVisible();
  20  |       await expect(page.fileInput).toBeAttached();
  21  |       await expect(page.contentEditor).toBeVisible();
  22  |       await expect(page.authorDateSection).toBeVisible();
  23  |       await expect(page.sourceInput).toBeVisible();
  24  |     });
  25  | 
  26  |     await test.step('Action buttons are visible', async () => {
  27  |       await expect(page.cancelButton).toBeVisible();
  28  |       await expect(page.previewButton).toBeVisible();
  29  |       await expect(page.publishButton).toBeVisible();
  30  |     });
  31  | 
  32  |     await test.step('Fields appear top-to-bottom: title → image → tags → content → author → source → buttons', async () => {
  33  |       const boxes = {
  34  |         title:   await page.titleInput.boundingBox(),
  35  |         image:   await page.imageDropzone.boundingBox(),
  36  |         tags:    await page.tagButtons.first().boundingBox(),
  37  |         content: await page.contentEditor.boundingBox(),
  38  |         author:  await page.authorDateSection.boundingBox(),
  39  |         source:  await page.sourceInput.boundingBox(),
  40  |         cancel:  await page.cancelButton.boundingBox(),
  41  |         preview: await page.previewButton.boundingBox(),
  42  |         publish: await page.publishButton.boundingBox(),
  43  |       };
  44  | 
  45  |       Object.values(boxes).forEach(box => expect(box).not.toBeNull());
  46  | 
  47  |       // Vertical order
> 48  |       expect(boxes.title!.y).toBeLessThan(boxes.image!.y);
      |                              ^ Error: expect(received).toBeLessThan(expected)
  49  |       expect(boxes.image!.y).toBeLessThan(boxes.tags!.y);
  50  |       expect(boxes.tags!.y).toBeLessThan(boxes.content!.y);
  51  |       expect(boxes.content!.y).toBeLessThan(boxes.author!.y);
  52  |       expect(boxes.author!.y).toBeLessThan(boxes.source!.y);
  53  |       expect(boxes.source!.y).toBeLessThan(boxes.cancel!.y);
  54  | 
  55  |       // Horizontal order of action buttons
  56  |       expect(boxes.cancel!.x).toBeLessThan(boxes.preview!.x);
  57  |       expect(boxes.preview!.x).toBeLessThan(boxes.publish!.x);
  58  |     });
  59  |   });
  60  | 
  61  |   test('TC-01.2 Author and Date are pre-filled and read-only', async ({ createNewsPage }) => {
  62  |     const section = createNewsPage.authorDateSection;
  63  | 
  64  |     await test.step('Today\'s date is displayed', async () => {
  65  |       const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  66  |       await expect(section).toContainText(today);
  67  |     });
  68  | 
  69  |     await test.step('Author name is shown', async () => {
  70  |       const authorLabel = section.locator('p').filter({ hasText: /Author/i });
  71  |       await expect(authorLabel).toBeVisible();
  72  |       const text = await authorLabel.innerText();
  73  |       expect(text.replace(/Author:/i, '').trim()).not.toBe('');
  74  |     });
  75  | 
  76  |     await test.step('No editable inputs inside the section', async () => {
  77  |       await expect(section.locator('input, textarea')).toHaveCount(0);
  78  |     });
  79  |   });
  80  | 
  81  |   test('TC-01.3 Tags can be selected and deselected', async ({ createNewsPage }) => {
  82  |     const tag = createNewsPage.getTagButton(NEWS_TAGS.NEWS).locator('a');
  83  | 
  84  |     await test.step('All 5 tag buttons are visible and enabled', async () => {
  85  |       await expect(createNewsPage.tagButtons).toHaveCount(5);
  86  |       for (const btn of await createNewsPage.tagButtons.all()) {
  87  |         await expect(btn).toBeVisible();
  88  |         await expect(btn).toBeEnabled();
  89  |       }
  90  |     });
  91  | 
  92  |     await test.step('Click toggles tag on, click again toggles off', async () => {
  93  |       await expect(tag).not.toHaveClass(/global-tag-clicked/);
  94  |       await tag.click();
  95  |       await expect(tag).toHaveClass(/global-tag-clicked/);
  96  |       await tag.click();
  97  |       await expect(tag).not.toHaveClass(/global-tag-clicked/);
  98  |     });
  99  |   });
  100 | 
  101 |   test('TC-01.4 Character counters and placeholders', async ({ createNewsPage }) => {
  102 |     const page = createNewsPage.page;
  103 | 
  104 |     await test.step('Title is an auto-resizing textarea', async () => {
  105 |       const tag = await createNewsPage.titleInput.evaluate(el => el.tagName.toLowerCase());
  106 |       expect(tag).toBe('textarea');
  107 |     });
  108 | 
  109 |     await test.step('Title counter starts at 0/170', async () => {
  110 |       await expect(page.locator('span, div, p').filter({ hasText: /0\s*\/\s*170/ }).first()).toBeVisible();
  111 |     });
  112 | 
  113 |     await test.step('Title counter updates after typing', async () => {
  114 |       const title = 'Automated Test News Title';
  115 |       await createNewsPage.fillTitle(title);
  116 |       const counter = page.locator('span, div, p').filter({ hasText: new RegExp(`${title.length}\\s*\\/\\s*170`) }).first();
  117 |       await expect(counter).toBeVisible();
  118 |     });
  119 | 
  120 |     await test.step('Content editor shows 63 206 character limit', async () => {
  121 |       await expect(createNewsPage.contentEditor).toBeVisible();
  122 |       await expect(page.locator('span, div, p').filter({ hasText: /63\s*206/ }).first()).toBeVisible();
  123 |     });
  124 | 
  125 |     await test.step('Source field has placeholder text', async () => {
  126 |       await expect(createNewsPage.sourceInput).toHaveAttribute('placeholder', /external source|link|original|article/i);
  127 |     });
  128 |   });
  129 | });
  130 | 
  131 | 
  132 | test.describe('Create News — Publish and Tag Limits (TC-03)', () => {
  133 | 
  134 |   test('TC-03.1 Publish news with 1 tag and verify', async ({ ecoNewsPage, createNewsPage, page }) => {
  135 |     await test.step('Open Create News from Eco News page', async () => {
  136 |       await ecoNewsPage.navigate();
  137 |       await ecoNewsPage.waitForPageReady();
  138 |       await ecoNewsPage.clickCreateNews();
  139 |       await createNewsPage.waitForFormReady();
  140 |     });
  141 | 
  142 |     await test.step('Select "News" tag', async () => {
  143 |       await createNewsPage.selectTag(NEWS_TAGS.NEWS);
  144 |       await expect(createNewsPage.getTagButton(NEWS_TAGS.NEWS).locator('a')).toHaveClass(/global-tag-clicked/);
  145 |     });
  146 | 
  147 |     await test.step('Fill required fields and publish', async () => {
  148 |       await createNewsPage.fillTitle('Test');
```