# Goodreads-PopularQuotes-Scrape
Node.js script that scrapes popular quotes from goodreads.com and saves it as JSON. Cheerio and puppeteer libraries used.

JSON saved is of the form
```
[
  {
    quote: "sampleQuote",
    author: "sampleAuthor"
  }
  ...
]
```

# Usage
Clone repository
```
git clone https://github.com/deoliang/Goodreads-PopularQuotes-Scrape.git
cd Goodreads-PopularQuotes-Scrape
```
Install dependencies with 
```
npm install 
```
Run script with
```
node scrape.js
```
# Data source 
[Goodreads Popular Quotes](https://www.goodreads.com/quotes)

# Reference
[Cheerio Documentation](https://cheerio.js.org/)
 
[Google Puppeteer Documentation](https://pptr.dev/)
