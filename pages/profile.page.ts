import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { ENV } from '../utils/env';

/**
 * ProfilePage
 *
 * Page Object Model representing the user's profile area (`#/greenCity/profile`).
 * Encapsulates the user card, stat trackers, achievements, friends, eco places,
 * dashboard tabs, calendar, and task lists.
 */
export class ProfilePage extends BasePage {
  readonly header: HeaderComponent;

  // Left Column Elements (User Card & stats)
  readonly userName: Locator;
  readonly userRating: Locator;
  readonly editIcon: Locator;
  readonly habitStats: Locator;
  
  // Left Column Sections (Achievements, Friends, Eco Places)
  readonly achievementsTitle: Locator;
  readonly achievementsCount: Locator;
  readonly friendsTitle: Locator;
  readonly friendsCount: Locator;
  readonly addFriendsButton: Locator;
  readonly ecoPlacesTitle: Locator;
  readonly ecoPlacesCount: Locator;

  // Middle Column Elements (Tabs Dashboard)
  readonly tabs: Locator;
  readonly addNewsButton: Locator;

  // Right Column Elements (Sidebar widgets)
  readonly calendarMonth: Locator;
  readonly factOfDayCard: Locator;
  readonly todoItemsCount: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);

    // Left Column Locators
    this.userName = page.locator('app-profile-header p.name, app-profile-header .name');
    this.userRating = page.locator('app-profile-header .rate');
    this.editIcon = page.locator('app-profile-header .edit-icon');
    this.habitStats = page.locator('app-profile-header .profile-progress');

    // Left Column Section-specific elements
    this.achievementsTitle = page.locator('app-users-achievements .title-achievements');
    this.achievementsCount = page.locator('app-users-achievements .achieved-quantity');
    this.friendsTitle = page.locator('app-users-friends .text-title');
    this.friendsCount = page.locator('app-users-friends .text-number');
    this.addFriendsButton = page.locator('app-users-friends .add-friends');
    this.ecoPlacesTitle = page.locator('app-eco-places .title');
    this.ecoPlacesCount = page.locator('app-eco-places .favourites-quantity');

    // Middle Column Tab group elements
    this.tabs = page.locator('div[role="tab"]');
    this.addNewsButton = page.locator('#create-button-news');

    // Right Column Elements
    this.calendarMonth = page.locator('app-calendar .month-year');
    this.factOfDayCard = page.locator('app-profile-cards .card').first();
    this.todoItemsCount = page.locator('app-to-do-list .items-count:visible');
  }

  /**
   * Navigate directly to the profile page
   */
  async navigate() {
    const url = new URL(ENV.BASE_URL);
    const targetRoute = `${url.hash || '#/greenCity'}/profile`;
    await this.page.goto(targetRoute);
  }

  /**
   * Click a dashboard tab by its visible label (e.g. 'My habits', 'My news', 'My Events')
   * @param tabName Name of the tab to click
   */
  async clickTab(tabName: string) {
    const tab = this.tabs.filter({ hasText: tabName });
    await tab.waitFor({ state: 'visible', timeout: 5000 });
    await tab.click();
  }

  /**
   * Click the "Add news" button (active inside the "My news" tab)
   */
  async clickAddNews() {
    await this.addNewsButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.addNewsButton.click();
  }

  /**
   * Click the "Edit profile" pencil button
   */
  async clickEditProfile() {
    await this.editIcon.waitFor({ state: 'visible', timeout: 5000 });
    await this.editIcon.click();
  }
}
