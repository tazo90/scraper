import puppeteer from 'puppeteer';

const CHROME_BIN = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
const GOOGLE_SEARCH_URL = 'https://www.google.com/search?q=';

export class GeolocationCrawler {
  private baseURL: string = GOOGLE_SEARCH_URL;
  private locationName: string;

  constructor(locationName: string) {
    this.locationName = locationName;
  }

  prepare_url() {
    return `${this.baseURL}${this.locationName.replace(' ', '+')}`;
  }

  get_coordinates() {
    (async() => {
      const browser = await puppeteer.launch({
        // Point to existing Chrome install because NPM won't install Chromium
        executablePath: CHROME_BIN
      });

      const page = await browser.newPage();
      const url = this.prepare_url();
      await page.goto(url);

      const mapUrl = await page.evaluate(() => {
        return document.querySelector("div.rhsg3.rhsl5.rhsmap4col > a").getAttribute("data-url");
      });

      const coordinates = mapUrl.replace('@', '').split('/')[4].split(',');

      await browser.close();

      return coordinates;
    })();
  }
}