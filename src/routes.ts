import {  createPlaywrightRouter } from 'crawlee';

export const router = createPlaywrightRouter();

const list = [
    // 'https://trends.google.com/trends/explore?date=today%201-m&geo=US&q=headset&hl=zh-CN',
    // 'https://trends.google.com/trends/explore?date=now%207-d&geo=US&q=headset&hl=zh-CN',
    // 'https://trends.google.com/trends/explore?date=today%203-m&geo=US&q=headset&hl=zh-CN',
    'https://trends.google.com/trends/explore?geo=US&q=headset&hl=zh-CN'
]

router.addDefaultHandler(async ({ page, enqueueLinks, log }) => {
    log.info(`enqueueing URL:`, page.url);
    await enqueueLinks({
        urls: list,
        label: 'DETAIL', // <= note the different label
    })
});

router.addHandler('DETAIL', async ({ request, page, log }) => {
    log.info(`Extracting data: ${request.url}`)
    page.on('response', async response => {
        const url = response.url();
        if (url.startsWith('https://trends.google.com/trends/api/')) {
            // const body = await response.text();
            console.log('response', { status: response.status(), url: response.url() });
        }
    });

    await page.waitForTimeout(30000)
});