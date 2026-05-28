import { test, expect } from '../fixtures/index';

test.describe('Profile Page E2E Tests', () => {

  test.beforeEach(async ({ authenticatedPage, profilePage }) => {
    await test.step('Navigate to profile page (authenticated)', async () => {
      await profilePage.navigate();
      await profilePage.userName.first().waitFor({ state: 'visible', timeout: 8000 });
    });
  });

  test('Verify profile page layout and stats elements', async ({ profilePage }) => {
    await test.step('Verify User Profile header card', async () => {
      await expect(profilePage.userName).toBeVisible();
      const userNameText = await profilePage.userName.innerText();
      expect(userNameText.trim().length).toBeGreaterThan(0);

      await expect(profilePage.userRating).toBeVisible();
      await expect(profilePage.userRating).toContainText(/(Rate|Рейтинг):?/i);

      await expect(profilePage.habitStats).toBeVisible();
    });

    await test.step('Verify Achievements section', async () => {
      await expect(profilePage.achievementsTitle).toBeVisible();
      await expect(profilePage.achievementsTitle).toContainText(/(Achievements|досягнення)/i);
      await expect(profilePage.achievementsCount).toBeVisible();
    });

    await test.step('Verify Friends section', async () => {
      await expect(profilePage.friendsTitle).toBeVisible();
      await expect(profilePage.friendsTitle).toContainText(/(Friends|Друзі)/i);
      await expect(profilePage.friendsCount).toBeVisible();
      await expect(profilePage.addFriendsButton).toBeVisible();
    });

    await test.step('Verify Eco Places section', async () => {
      await expect(profilePage.ecoPlacesTitle).toBeVisible();
      await expect(profilePage.ecoPlacesTitle).toContainText(/(Places|Місця)/i);
      await expect(profilePage.ecoPlacesCount).toBeVisible();
    });
  });

  test('Verify Dashboard tabs navigation and My News actions', async ({ profilePage }) => {
    await test.step('Verify tabs are present', async () => {
      await profilePage.tabs.first().waitFor({ state: 'visible', timeout: 5000 });
      const tabsCount = await profilePage.tabs.count();
      expect(tabsCount).toBeGreaterThanOrEqual(2);
    });

    await test.step('Navigate to "My news" tab', async () => {
      await profilePage.clickTab(/My news|Мої новини/i);
    });

    await test.step('Verify "Add news" button is visible', async () => {
      await expect(profilePage.addNewsButton).toBeVisible();
    });
  });

  test('Verify Right Column widgets display correctly', async ({ profilePage }) => {
    await test.step('Verify Calendar widget', async () => {
      await expect(profilePage.calendarMonth).toBeVisible();
      const currentMonthText = await profilePage.calendarMonth.innerText();
      expect(currentMonthText.trim().length).toBeGreaterThan(0);
    });

    await test.step('Verify Fact of the Day card', async () => {
      await expect(profilePage.factOfDayCard).toBeVisible();
    });

    await test.step('Verify To-Do List counter', async () => {
      await expect(profilePage.todoItemsCount).toBeVisible();
      await expect(profilePage.todoItemsCount).toContainText(/(items|елементів)/i);
    });
  });
});
