# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login Tests >> User cannot login with invalid credentials
- Location: tests\login.spec.ts:13:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('header').getByText('Sign in').filter({ visible: true }) to be visible

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
              - search "site search" [ref=e29] [cursor=pointer]:
                - img [ref=e30]
              - menu "language switcher" [ref=e31]:
                - option "english" [ref=e32] [cursor=pointer]:
                  - generic [ref=e33]: En
                  - img [ref=e34]
              - img "sing in button" [ref=e35]
              - link "Sign up" [ref=e36] [cursor=pointer]:
                - generic [ref=e38]: Sign up
      - generic [ref=e39]:
        - generic "Tab To Main"
        - generic [ref=e40]:
          - main [ref=e42]:
            - generic [ref=e43]:
              - img [ref=e44]
              - img [ref=e45]
              - img [ref=e46]
              - generic [ref=e47]:
                - generic [ref=e49]:
                  - heading "A new way to cultivate useful habits" [level=1] [ref=e50]
                  - paragraph [ref=e51]: People in Ukraine use an average of 500 disposable bags and 70 paper cups per year. It is as easy as bringing your own eco-bag and cup to save the lives of three dolphins or one turtle and keep the oceans clean for the next generation.
                  - button "Start forming a habit!" [ref=e52] [cursor=pointer]
                - img [ref=e54]
              - generic [ref=e55]:
                - heading "There are of us and today we" [level=2] [ref=e56]
                - generic [ref=e58]:
                  - generic [ref=e60]:
                    - img [ref=e63]
                    - generic [ref=e65]:
                      - heading "Did not take 0 bags" [level=3] [ref=e66]
                      - paragraph [ref=e67]: And how many packages did you not take today?
                      - button "Start forming a habit!" [ref=e68] [cursor=pointer]
                      - generic [ref=e69]:
                        - img [ref=e70]
                        - link "you can buy eco-bags here" [ref=e71] [cursor=pointer]:
                          - /url: "#/places"
                  - generic [ref=e73]:
                    - generic [ref=e75]:
                      - heading "Did not throw away 0 cups" [level=3] [ref=e76]
                      - paragraph [ref=e77]: And how many cups did you not throw away today?
                      - button "Start forming a habit!" [ref=e78] [cursor=pointer]
                      - generic [ref=e79]:
                        - img [ref=e80]
                        - link "places that make a discount on a drink in your cup" [ref=e81] [cursor=pointer]:
                          - /url: "#/places"
                    - img [ref=e84]
              - generic [ref=e85]:
                - heading "Eco news" [level=2] [ref=e86]
                - link "link to eco-news page" [ref=e89] [cursor=pointer]:
                  - /url: "#/greenCity/news"
                  - text: Read all news
                  - img [ref=e90]
              - generic [ref=e94]:
                - img "Scan this QR-code To access the mobile version of the app" [ref=e96]
                - generic [ref=e97]:
                  - heading "Receive interesting news" [level=2] [ref=e98]
                  - paragraph [ref=e99]: Subscribe for our newsletter and always be up to date with news and updates
                  - generic [ref=e100]:
                    - textbox "Enter your email" [ref=e101]
                    - button "Subscribe!" [ref=e102] [cursor=pointer]
          - contentinfo [ref=e104]:
            - generic [ref=e105]:
              - generic [ref=e106]:
                - link "GreenCity home" [ref=e108] [cursor=pointer]:
                  - /url: "#/greenCity"
                  - img "GreenCity home" [ref=e109]
                - navigation [ref=e110]:
                  - menu [ref=e111]:
                    - listitem [ref=e112]:
                      - link "Eco news" [ref=e113] [cursor=pointer]:
                        - /url: "#/greenCity/news"
                    - listitem [ref=e114]:
                      - link "Events" [ref=e115] [cursor=pointer]:
                        - /url: "#/greenCity/events"
                    - listitem [ref=e116]:
                      - link "Places" [ref=e117] [cursor=pointer]:
                        - /url: "#/greenCity/places"
                    - listitem [ref=e118]:
                      - link "About Us" [ref=e119] [cursor=pointer]:
                        - /url: "#/greenCity/about"
                    - listitem [ref=e120]:
                      - link "My Space" [ref=e121] [cursor=pointer]:
                        - /url: "#/greenCity/profile/not_signed-in"
                    - listitem [ref=e122]:
                      - link "UBS Courier" [ref=e123] [cursor=pointer]:
                        - /url: "#/ubs"
                  - menu [ref=e124]:
                    - listitem [ref=e125]:
                      - paragraph [ref=e126]: Follow us
                    - listitem [ref=e127]:
                      - link "Twitter link" [ref=e128] [cursor=pointer]:
                        - /url: "#"
                        - img "Twitter link" [ref=e129]
                      - link "LinkedIn link" [ref=e130] [cursor=pointer]:
                        - /url: "#"
                        - img "LinkedIn link" [ref=e131]
                      - link "Facebook link" [ref=e132] [cursor=pointer]:
                        - /url: "#"
                        - img "Facebook link" [ref=e133]
                      - link "Instagram link" [ref=e134] [cursor=pointer]:
                        - /url: "#"
                        - img "Instagram link" [ref=e135]
                      - link "YouTube link" [ref=e136] [cursor=pointer]:
                        - /url: "#"
                        - img "YouTube link" [ref=e137]
              - generic [ref=e138]: © Copyright 2026. Green City.
    - button "chat" [ref=e139] [cursor=pointer]:
      - img "chat" [ref=e140]
  - generic [ref=e141]: Welcome to the search window
```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  | 
  3  | export class HomePage {
  4  |   readonly page: Page;
  5  |   readonly logo: Locator;
  6  |   readonly loginButton: Locator;
  7  | 
  8  |   constructor(page: Page) {
  9  |     this.page = page;
  10 |     this.logo = page.locator('.header_logo, a.logo, img[alt="logo"]'); 
  11 |     
  12 |     // ТУТ ВИПРАВЛЕНО: шукаємо текст "Sign in" всередині хедера, але суто ВИДИМИЙ на екрані
  13 |     this.loginButton = page.locator('header').getByText('Sign in').filter({ visible: true });
  14 |   }
  15 | 
  16 |   async navigate() {
  17 |     await this.page.goto('#/greenCity');
  18 |   }
  19 | 
  20 |   async clickLogin() {
  21 |     // Тепер чекаємо саме на видиму кнопку
> 22 |     await this.loginButton.waitFor({ state: 'visible', timeout: 5000 });
     |                            ^ TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
  23 |     await this.loginButton.click();
  24 |   }
  25 | }
```