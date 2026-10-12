const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function captureScreenshots() {
  const screenshotsDir = path.join(__dirname, 'assets', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const baseUrl = 'https://karan-dikole.github.io/Chronos-Ultra-Advanced-Multi-Timer-Event-Countdown-Productivity-Suite/';
  console.log(`Navigating to ${baseUrl}...`);
  await page.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 30000 });

  // 1. Dashboard screenshot
  console.log('Capturing Dashboard screenshot...');
  await page.waitForSelector('.glass-card', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, 'dashboard.png'), fullPage: false });

  // 2. Events screenshot
  console.log('Capturing Events screenshot...');
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('Events'));
    if (link) link.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, 'events.png'), fullPage: false });

  // 3. Pomodoro screenshot
  console.log('Capturing Pomodoro screenshot...');
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('Pomodoro'));
    if (link) link.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, 'pomodoro.png'), fullPage: false });

  // 4. World Clock screenshot
  console.log('Capturing World Clock screenshot...');
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('World Clock'));
    if (link) link.click();
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(screenshotsDir, 'world_clock.png'), fullPage: false });

  // 5. Analytics screenshot
  console.log('Capturing Analytics screenshot...');
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('Analytics'));
    if (link) link.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, 'analytics.png'), fullPage: false });

  // 6. Project Info screenshot
  console.log('Capturing Project Info screenshot...');
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('Project Info'));
    if (link) link.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, 'project_info.png'), fullPage: false });

  await browser.close();
  console.log('All screenshots captured successfully!');
}

captureScreenshots().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
