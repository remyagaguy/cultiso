const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'C:/Users/PC/.gemini/antigravity/brain/8d915ae2-1b72-464e-a101-6e4ca89da5de/scratch/screenshot.png', fullPage: true });
  await browser.close();
})();
