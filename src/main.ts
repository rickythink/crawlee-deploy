import { Actor } from 'apify';
import { PlaywrightCrawler, ProxyConfiguration, Dataset } from 'crawlee';

import { router } from './routes.js';

const startUrls = ['https://trends.google.com'];

const proxyConfiguration = await Actor.createProxyConfiguration({
    groups: ['RESIDENTIAL'],
    countryCode: 'US',
});
const proxyUrl = await proxyConfiguration?.newUrl();

await Actor.main(async () => {
    const crawler = new PlaywrightCrawler({
        proxyConfiguration: new ProxyConfiguration({ proxyUrls: [proxyUrl ?? ''] }),
        requestHandler: router,
        headless: false
    });

    await crawler.run(startUrls);
});


