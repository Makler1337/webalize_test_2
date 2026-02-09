import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000/en')

    await expect(page).toHaveTitle(/Webalize/)

    const heading = page.locator('h1').first()

    await expect(heading).toHaveText('Webalize')
  })
})
