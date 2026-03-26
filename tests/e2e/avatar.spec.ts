import { test, expect } from '@playwright/test'

test.describe('Header Avatar', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the home page where the Header is rendered
    await page.goto('/')
  })

  test('should display the Lucide user icon when no profile image is provided', async ({ page }) => {
    // Check if the header exists
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Verify the user name and role are present in the header
    await expect(header).toContainText('Imran Personal')
    await expect(header).toContainText('Admin')

    // Find the avatar container
    const avatar = header.locator('span.rounded-full')
    await expect(avatar).toBeVisible()

    // Verify that the Lucide user icon is rendered as a fallback
    // The subagent confirmed the classes: lucide, lucide-user, lucide-user-icon
    const userIcon = avatar.locator('svg.lucide-user')
    await expect(userIcon).toBeVisible()
    
    // Additional check for the icon's dimensions if needed, 
    // but toBeVisible is usually sufficient for Lucide icons in Shadcn
  })

  test('should have accessible labels for the avatar', async ({ page }) => {
    // The AvatarImage has alt="User profile"
    const avatarImage = page.locator('header img[alt="User profile"]')
    // In our implementation, the image is hidden because src is empty, but the tag exists
    await expect(avatarImage).toBeAttached()
  })
})
