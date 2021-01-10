import puppeteer from 'puppeteer';

import { IPositionScraper } from '../../interfaces/IPositionScraper';
import { ICoordinates } from '../../interfaces/ICoordinates';

export default class GeoLocationPositionScraper implements IPositionScraper {
  private baseUrl: string;
  private chromeBin: string = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';

  constructor(private locationName: string) {
    this.baseUrl = 'https://www.google.com/search?q=';
    this.locationName = locationName;
  }

  async getPosition(): Promise<ICoordinates> {
    const browser = await puppeteer.launch({
      // Point to existing Chrome install because NPM won't install Chromium
      headless: true,
      executablePath: this.chromeBin,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    const url = this.getURL();
    await page.goto(url);

    const locationUrl = await page.evaluate(() => {
      return document.querySelector("div.rhsg3.rhsl5.rhsmap4col > a").getAttribute("data-url");
    });
    const coordinates = locationUrl.replace('@', '').split('/')[4].split(',');
    await browser.close();

    return {
      latitude: coordinates[0],
      longitude: coordinates[1]
    };
  }

  getURL(): string {
    return `${this.baseUrl}${this.locationName.replace(' ', '+')}`;
  }
};