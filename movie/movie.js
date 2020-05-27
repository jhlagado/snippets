const https = require("https");

const baseUrl = `https://jsonmock.hackerrank.com/api/movies/search/`;

const getPage = (substr) => (page) => {
  return new Promise((resolve, reject) => {
    const url = `${baseUrl}?Title=${substr}&page=${page}`;
    const req = https.get(url, (res) => {
      res.setEncoding("utf8");
      res.on("data", (content) => {
        try {
          const json = JSON.parse(content);
          resolve(json);
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on("error", (err) => {
      reject(err);
    });
    req.end();
  });
};

const getMovieTitles = async (substr) => {
  const getPageFn = getPage(substr);
  const { total_pages } = await getPageFn(1);
  const promises = Array.from({ length: total_pages }, getPageFn);
  const pages = await Promise.all(promises);
  const movies = pages.map((page) => page.data).flat();
  const titles = movies.map((movie) => movie.Title);
  titles.sort();
  return titles;
};

const substr = process.argv.slice(2).join(" ");
if (substr) {
  console.log(`Searching for ${substr}`);
  getMovieTitles(substr).then((titles) => {
    titles.forEach((title) => console.log(title));
  });
} else {
  console.log("enter part of a title");
}
