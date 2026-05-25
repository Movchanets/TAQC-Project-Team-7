import { test, expect } from '../fixtures/index';

test.describe('Profile Page E2E Tests', () => {

  test.beforeEach(async ({ authenticatedPage, profilePage }) => {
    // 1. Ensure we navigate to the profile page (authenticatedPage fixture handles login automatically)
    await profilePage.navigate();
    // 2. Wait for the profile header userName to be visible, ensuring the page has rendered
    await profilePage.userName.first().waitFor({ state: 'visible', timeout: 8000 });
  });

  test('Verify profile page layout and stats elements', async ({ profilePage }) => {
    // 1. Verify User Profile header card details
    await expect(profilePage.userName).toBeVisible();
    const userNameText = await profilePage.userName.innerText();
    expect(userNameText.trim().length).toBeGreaterThan(0);

    await expect(profilePage.userRating).toBeVisible();
    await expect(profilePage.userRating).toContainText(/(Rate|Рейтинг):?/i);

    await expect(profilePage.habitStats).toBeVisible();

    // 2. Verify sub-sections in left column
    await expect(profilePage.achievementsTitle).toBeVisible();
    await expect(profilePage.achievementsTitle).toContainText(/(Achievements|досягнення)/i);
    await expect(profilePage.achievementsCount).toBeVisible();

    await expect(profilePage.friendsTitle).toBeVisible();
    await expect(profilePage.friendsTitle).toContainText(/(Friends|Друзі)/i);
    await expect(profilePage.friendsCount).toBeVisible();
    await expect(profilePage.addFriendsButton).toBeVisible();

    await expect(profilePage.ecoPlacesTitle).toBeVisible();
    await expect(profilePage.ecoPlacesTitle).toContainText(/(Places|Місця)/i);
    await expect(profilePage.ecoPlacesCount).toBeVisible();
  });

  test(' Verify Dashboard tabs navigation and My News actions', async ({ profilePage }) => {
    // 1. Wait for tabs to render
    await profilePage.tabs.first().waitFor({ state: 'visible', timeout: 5000 });

    // 2. Verify tabs are present
    const tabsCount = await profilePage.tabs.count();
    expect(tabsCount).toBeGreaterThanOrEqual(2);

    // 3. Navigate to "My news" tab (handles both English and Ukrainian UI matches dynamically)
    await profilePage.clickTab(/My news|Мої новини/i);

    // 4. Verify that the "Add news" button appears when the News tab is active
    await expect(profilePage.addNewsButton).toBeVisible();
  });

  test(' Verify Right Column widgets display correctly', async ({ profilePage }) => {
    // 1. Verify Calendar Month header display
    await expect(profilePage.calendarMonth).toBeVisible();
    const currentMonthText = await profilePage.calendarMonth.innerText();
    expect(currentMonthText.trim().length).toBeGreaterThan(0);

    // 2. Verify Fact of the Day card is loaded and readable
    await expect(profilePage.factOfDayCard).toBeVisible();

    // 3. Verify To-Do List items counter matches expected layout
    await expect(profilePage.todoItemsCount).toBeVisible();
    await expect(profilePage.todoItemsCount).toContainText(/(items|елементів)/i);
  });
});
