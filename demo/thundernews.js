$td(() => {

  const imgHeader = $td('.article-img');
  const articleImg = $td('.article-img');
  const title = $td('.title');
  const author = $td('.author');
  const description = $td('.description');
  const urlLink = $td('.url');


  const fetch = (source) => {
    const apiKey="bdac8277aae0437f96fbed63f7b07a00";
    const url=`https://newsapi.org/v1/articles?source=${source}&sortBy=latest&apiKey=${apiKey}`;

    $td.ajax({
      method: 'GET',
      url
    }).then((r) => {
      console.log(r);
      const article = r.articles[0];
      console.log(article.urlToImage);
      imgHeader.append(`<img src=${article.urlToImage}/>`);
      title.html(`${article.title}`);
      author.html(`By ${article.author}`);
      description.html(article.description);
      urlLink.html(article.url);

    });
  };

  fetch('techcrunch');
});
