const puppeteer = require('puppeteer');

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ss = async(query,pilihann,namaFile) => {
    const browser = await puppeteer.launch({ cacheEnabled: false, useChrome: true, killProcessOnBrowserClose: true, throwErrorOnTosBlock: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disable-offline-load-stale-cache',
            '--disk-cache-size=0'
        ]
    });
    const page = await browser.newPage();
    await page.goto(query, { waitUntil: 'networkidle0' });
    await page.evaluate(() => { window.scrollBy(0, window.innerHeight); })
    await timeout(5000);    //Waktu menunggu 5 detik
    await page._client.send('Network.getAllCookies');
    if(pilihann === 'ya'){ await page.pdf({ path: `${namaFile}.pdf`, displayHeaderFooter: true, headerTemplate: '', footerTemplate: '',printBackground: true, format: 'A4', }) }else{ await page.screenshot({path: `${namaFile}.png`, fullPage: pilihann }) }
    await browser.close();
}
exports.ss = ss