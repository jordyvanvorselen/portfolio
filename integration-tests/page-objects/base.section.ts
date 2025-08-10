import { Locator, Page } from '@playwright/test'

export abstract class BaseSection {
  abstract readonly section: Locator

  constructor(public readonly page: Page) {}
}
