import { Locator } from '@playwright/test';

/**
 * BaseComponent
 *
 * Abstract foundation for all reusable UI Component classes.
 * Components are scoped to a `root` locator — no page reference needed.
 */
export abstract class BaseComponent {
  abstract readonly root: Locator;

  /** Wait for the component's root element to be visible. */
  async waitForReady(): Promise<void> {
    await this.root.waitFor({ state: 'visible', timeout: 5000 });
  }

  /** Check if the component is currently visible. */
  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }
}
