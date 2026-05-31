import { test, expect } from '../fixtures/index';
import { TIMEOUTS } from '../utils/constants';

test.describe('Profile Page', () => {

  test.beforeEach(async ({ profilePage }) => {
    await test.step('Navigate to profile page', async () => {
      await profilePage.navigate();
      await profilePage.userName.first().waitFor({ state: 'visible', timeout: TIMEOUTS.LONG });
    });
  });

  test('Profile layout shows user info, achievements, friends, and places', async ({ profilePage }) => {
    await test.step('User profile card with name and rating', async () => {
      await expect(profilePage.userName).toBeVisible();
      const name = await profilePage.userName.innerText();
      expect(name.trim()).not.toBe('');

      await expect(profilePage.userRating).toBeVisible();
      await expect(profilePage.userRating).toContainText(/(Rate|Рейтинг):?/i);
      await expect(profilePage.habitStats).toBeVisible();
    });

    await test.step('Achievements section', async () => {
      await expect(profilePage.achievementsTitle).toContainText(/(Achievements|досягнення)/i);
      await expect(profilePage.achievementsCount).toBeVisible();
    });

    await test.step('Friends section', async () => {
      await expect(profilePage.friendsTitle).toContainText(/(Friends|Друзі)/i);
      await expect(profilePage.friendsCount).toBeVisible();
      await expect(profilePage.addFriendsButton).toBeVisible();
    });

    await test.step('Eco Places section', async () => {
      await expect(profilePage.ecoPlacesTitle).toContainText(/(Places|Місця)/i);
      await expect(profilePage.ecoPlacesCount).toBeVisible();
    });
  });

  test('Dashboard tabs navigate to My News with Add button', async ({ profilePage }) => {
    await test.step('Tabs are present', async () => {
      await profilePage.tabs.first().waitFor({ state: 'visible', timeout: 5000 });
      expect(await profilePage.tabs.count()).toBeGreaterThanOrEqual(2);
    });

    await test.step('Navigate to My News tab', async () => {
      await profilePage.clickTab(/My news|Мої новини/i);
    });

    await test.step('Add news button is visible', async () => {
      await expect(profilePage.addNewsButton).toBeVisible();
    });
  });

  test('Right column widgets display correctly', async ({ profilePage }) => {
    await test.step('Calendar widget shows current month', async () => {
      await expect(profilePage.calendarMonth).toBeVisible();
      const month = await profilePage.calendarMonth.innerText();
      expect(month.trim()).not.toBe('');
    });

    await test.step('Fact of the Day card', async () => {
      await expect(profilePage.factOfDayCard).toBeVisible();
    });

    await test.step('To-Do List counter', async () => {
      await expect(profilePage.todoItemsCount).toBeVisible();
      await expect(profilePage.todoItemsCount).toContainText(/(items|елементів)/i);
    });
  });
});
