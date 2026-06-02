# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC-02.spec.ts >> TC-02 — Title field validation and Publish button state >> Verify Title validation, character counter, and Publish button behavior
- Location: tests/TC-02.spec.ts:18:7

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 170
Received length: 171
Received string: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
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
                      - generic [ref=e58]: 171/170
                    - textbox [active] [ref=e60]:
                      - /placeholder: e.g. Coffee takeaway with 20% discount
                      - text: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
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
                  - paragraph [ref=e310]: "Date: Jun 2, 2026"
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
  2   | import { FORM_LIMITS, NEWS_TAGS } from '../utils/constants';
  3   | 
  4   | /** 171-character string used to test the title max-length validation. */
  5   | const OVER_LIMIT_TITLE = 'A'.repeat(FORM_LIMITS.TITLE_MAX_LENGTH + 1);
  6   | 
  7   | test.describe('TC-02 — Title field validation and Publish button state', () => {
  8   |   test.beforeEach(async ({ ecoNewsPage, createNewsPage }) => {
  9   |     // ── Precondition: User is logged in (handled by auth setup / storageState).
  10  |     await test.step('Navigate to GreenCity News and click "Create News"', async () => {
  11  |       await ecoNewsPage.navigate();
  12  |       await ecoNewsPage.waitForPageReady();
  13  |       await ecoNewsPage.clickCreateNews();
  14  |       await createNewsPage.waitForFormReady();
  15  |     });
  16  |   });
  17  | 
  18  |   test('Verify Title validation, character counter, and Publish button behavior', async ({
  19  |     createNewsPage,
  20  |   }) => {
  21  |     const page = createNewsPage;
  22  | 
  23  |     // ── Step 2: Leave the Title field empty ──────────────────────────────
  24  |     await test.step('Step 2: Leave the Title field empty and blur to trigger validation', async () => {
  25  |       // Title is already empty on a fresh form. Blur to trigger Angular's touched state.
  26  |       await page.blurTitle();
  27  |     });
  28  | 
  29  |     // ── Step 3: Verify the Title field border is highlighted in red ──────
  30  |     await test.step('Step 3: Verify that the Title field border is highlighted in red', async () => {
  31  |       await expect(page.titleInput).toHaveClass(/ng-invalid/);
  32  |       await expect(page.titleInput).toHaveClass(/ng-touched/);
  33  |       await page.assertTitleBorderIsRed();
  34  |     });
  35  | 
  36  |     // ── Step 4: Verify the Publish button is disabled ────────────────────
  37  |     await test.step('Step 4: Verify that the Publish button is disabled', async () => {
  38  |       await expect(page.publishButton).toBeDisabled();
  39  |     });
  40  | 
  41  |     // ── Step 5: Verify the character counter shows "0/170" ──────────────
  42  |     await test.step('Step 5: Check that the character counter shows "0/170"', async () => {
  43  |       await page.assertTitleCounterText('0/170');
  44  |     });
  45  | 
  46  |     // ── Step 6: Enter 171 characters into the Title field ────────────────
  47  |     await test.step('Step 6: Enter a 171-character string into the Title field', async () => {
  48  |       await page.fillTitle(OVER_LIMIT_TITLE);
  49  |     });
  50  | 
  51  |     // ── Step 7: Verify truncation and red counter when exceeding limit ───
  52  |     await test.step('Step 7: Verify text is truncated to 170 characters and counter is highlighted in red', async () => {
  53  |       // Verify the input is truncated to 170 characters
  54  |       // KNOWN BUG: текст поля Title не скорочується до 170 — якщо тест тут падає, то все ок
  55  |       const actualValue = await page.getTitleValue();
> 56  |       expect(actualValue).toHaveLength(FORM_LIMITS.TITLE_MAX_LENGTH);
      |                           ^ Error: expect(received).toHaveLength(expected)
  57  | 
  58  |       // Counter shows 170/170 and is highlighted in red via "warning" class
  59  |       await page.assertTitleCounterText(`${FORM_LIMITS.TITLE_MAX_LENGTH}/${FORM_LIMITS.TITLE_MAX_LENGTH}`);
  60  |       await page.assertTitleCounterHasWarning();
  61  | 
  62  |       // Verify the counter text color is red (rgb(235, 24, 13) per Angular warning style)
  63  |       const counterColor = await page.getTitleCounterCSS('color');
  64  |       expect(counterColor).toMatch(/rgb\(235,\s*24,\s*13\)/);
  65  |     });
  66  | 
  67  |     // ── Step 8: Enter a valid title ("Test News" — 9 characters) ─────────
  68  |     await test.step('Step 8: Enter a valid title "Test News"', async () => {
  69  |       await page.fillTitle('Test News');
  70  |     });
  71  | 
  72  |     // ── Step 9: Verify counter "9/170" and border is not red ─────────────
  73  |     await test.step('Step 9: Verify counter displays "9/170" and border is not red', async () => {
  74  |       await page.assertTitleCounterText('9/170');
  75  |       await page.assertTitleCounterHasNoWarning();
  76  |       await page.assertTitleBorderIsNotRed();
  77  |     });
  78  | 
  79  |     // ── Step 10: Verify Publish button still disabled (Main Text empty) ──
  80  |     await test.step('Step 10: Verify Publish button is still disabled because Main Text is empty', async () => {
  81  |       await expect(page.publishButton).toBeDisabled();
  82  |     });
  83  | 
  84  |     // ── Step 11: Select a tag ────────────────────────────────────────────
  85  |     await test.step('Step 11: Select the "Новини" (News) tag', async () => {
  86  |       await page.selectTag(NEWS_TAGS.NEWS);
  87  |     });
  88  | 
  89  |     // ── Step 12: Enter valid text into the Main Text field ───────────────
  90  |     await test.step('Step 12: Enter valid text into the Main Text field', async () => {
  91  |       await page.fillContent('This is a valid test content for the news article body.');
  92  |     });
  93  | 
  94  |     // ── Step 13: Verify Publish button becomes enabled ───────────────────
  95  |     await test.step('Step 13: Verify Publish button is enabled after Title, Main Text, and tag are filled', async () => {
  96  |       await expect(page.publishButton).toBeEnabled();
  97  |     });
  98  |   });
  99  | });
  100 | 
```