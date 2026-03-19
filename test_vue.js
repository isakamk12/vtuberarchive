const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('file:///C:/Users/rpgmi/Documents/GitHub/vtuberarchive/index.html', { waitUntil: 'networkidle0' });
    
    const bannerVisible = await page.evaluate(() => {
        const banner = document.querySelector('.mobile-mode-banner');
        return banner ? window.getComputedStyle(banner).display !== 'none' : false;
    });
    
    console.log('Banner Visible on index.html:', bannerVisible);
    
    await browser.close();
})();
