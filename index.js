const fs = require("fs");
const url = "https://wallpaperscraft.com/catalog/space/1920x1080/page";
const fileName = "wallpaperUrl.js";
const pages = 85

const puppeteer = require("puppeteer");
(async () => {
  const finalUrl = [];

  for (let i = 1; i <= pages; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      url + i,
      {
        waitUntil: "networkidle2",
        timeout: 0,
      }
    );
    const result = await page.evaluate(() => {
      let url = [];
      document.querySelectorAll(".wallpapers__image").forEach((image) => {
        url.push(image.currentSrc);
      });
      return url;
    });
    result.forEach((url) => {
      url = url.replace("300", "1920");
      url = url.replace("168", "1080");
      finalUrl.push(url);
    });
    let finalUrlString = JSON.stringify(finalUrl);
    fs.writeFile(fileName, finalUrlString, () => {
      console.log("Added page - ", i);
    });
    await browser.close();
  }
})();
