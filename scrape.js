const puppeteer = require('puppeteer');
const loginURL = 'https://www.goodreads.com/';
const quotesURL = 'https://www.goodreads.com/quotes?page=';
const $ = require('cheerio');
const fs = require('fs');

const nextPageSelector = '.next_page'
const usernameSelector = '#userSignInFormEmail'
const passwordSelector = '#user_password'
const submitSelector = 'input.gr-button'

//enter credentials used for simple sign on, not twitter,facebook, amazon, google
const CREDS = {
    username: "", 
    password: ""
}
const Quotes = [
  /*
    {
        quote:
        author:
    }
  */
]

puppeteer.launch({headless:false}).then(async browser => {
    const page = await browser.newPage();
    //login to avoid popups
    await page.goto(loginURL);
    await page.type(usernameSelector,CREDS.username)
    await page.type(passwordSelector,CREDS.password)
    await Promise.all([
        await page.click(submitSelector),
        await page.waitForNavigation()
    ])
    let currentPage = 1; //page to start scraping from
    await page.goto(quotesURL+currentPage) 
    let endingPage = 3; //page to scrape up to inclusive, last page is 100
    
    while(currentPage<=endingPage){
        html = await page.content()
        await $('.quoteText',html).each(function(i, elem) {
            let quoteAuthorPair = ($(this).text().split('―'))
            let authorTitlePair = quoteAuthorPair[1].trim().split(',')
            let authorToPush = (authorTitlePair.length!=1)?authorTitlePair[0]:quoteAuthorPair[1].trim()
           
            Quotes.push({
                quote: quoteAuthorPair[0].trim().replace(/[“”]/g,""),
                author: authorToPush
            })
        
        })
        if(currentPage!=endingPage){
            await page.click(nextPageSelector)
            await page.waitForSelector(nextPageSelector)
        }
         currentPage++;
    }
        
    await fs.writeFile('Quotes.json', JSON.stringify(Quotes), function(err){
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
    await browser.close();
  });

  
