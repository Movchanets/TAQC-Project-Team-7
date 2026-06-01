import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { ENV } from '../utils/env';
import { ROUTES, TIMEOUTS } from '../utils/constants';

/**
 * ProfilePage
 *
 * Page Object for the user profile area (`#/greenCity/profile`).
 */
export class ProfilePage extends BasePage {
  readonly header: HeaderComponent;

  // Left Column (User Card & stats)
  readonly userName: Locator;
  readonly userRating: Locator;
  readonly editIcon: Locator;
  readonly habitStats: Locator;

  // Left Column Sections
  readonly achievementsTitle: Locator;
  readonly achievementsCount: Locator;
  readonly friendsTitle: Locator;
  readonly friendsCount: Locator;
  readonly addFriendsButton: Locator;
  readonly ecoPlacesTitle: Locator;
  readonly ecoPlacesCount: Locator;

  // Middle Column (Dashboard Tabs)
  readonly tabs: Locator;
  readonly addNewsButton: Locator;

  // Right Column (Sidebar widgets)
  readonly calendarMonth: Locator;
  readonly factOfDayCard: Locator;
  readonly todoItemsCount: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);

    // Left Column
    this.userName = page.locator('app-profile-header p.name, app-profile-header .name');
    this.userRating = page.locator('app-profile-header .rate');
    this.editIcon = page.locator('app-profile-header .edit-icon');
    this.habitStats = page.locator('app-profile-header .profile-progress');

    // Left Column Sections
    this.achievementsTitle = page.locator('app-users-achievements .title-achievements');
    this.achievementsCount = page.locator('app-users-achievements .achieved-quantity');
    this.friendsTitle = page.locator('app-users-friends .text-title');
    this.friendsCount = page.locator('app-users-friends .text-number');
    this.addFriendsButton = page.locator('app-users-friends .add-friends');
    this.ecoPlacesTitle = page.locator('app-eco-places .title');
    this.ecoPlacesCount = page.locator('app-eco-places .favourites-quantity');

    // Middle Column
    this.tabs = page.locator('div[role="tab"]');
    this.addNewsButton = page.locator('#create-button-news');

    // Right Column
    this.calendarMonth = page.locator('app-calendar .month-year');
    this.factOfDayCard = page.locator('app-profile-cards .card').first();
    this.todoItemsCount = page.locator('app-to-do-list .items-count:visible');
  }

  /** Navigate directly to the profile page. */
  async navigate(): Promise<void> {
    const url = new URL(ENV.BASE_URL);
    const targetRoute = `${url.hash || ROUTES.HOME}/profile`;
    await this.page.goto(targetRoute);
  }

  /** Wait for the profile page to be fully rendered. */
  async waitForPageReady(): Promise<void> {
    await this.waitForVisible(this.userName.first(), TIMEOUTS.LONG);
    await this.page.waitForTimeout(300);
  }

  /** Click a dashboard tab by its visible label (regex supported). */
  async clickTab(tabName: string | RegExp): Promise<void> {
    await this.step(`Click tab: ${tabName}`, async () => {
      const tab = this.tabs.filter({ hasText: tabName });
      await this.waitForVisible(tab, TIMEOUTS.MEDIUM);
      await tab.click();
    });
  }

  /** Click the "Add news" button (visible inside "My news" tab). */
  async clickAddNews(): Promise<void> {
    await this.step('Click "Add news"', async () => {
      await this.waitForVisible(this.addNewsButton, TIMEOUTS.MEDIUM);
      await this.addNewsButton.click();
    });
  }

  /** Click the "Edit profile" pencil button. */
  async clickEditProfile(): Promise<void> {
    await this.step('Click "Edit profile"', async () => {
      await this.waitForVisible(this.editIcon, TIMEOUTS.MEDIUM);
      await this.editIcon.click();
    });
  }
}
