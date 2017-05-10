$td(() => {
  const tech = $td('.tech');
  const sports = $td('.sports');
  const news = $td('.newsweek');
  const imgHeader = $td('.article-img');

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
      const article = r.articles[0];
      imgHeader.append(`<img src=${article.urlToImage}>`);
      title.html(`${article.title}`);
      author.html(`${article.author}`);
      description.html(article.description + ` <a href=${article.url}>full article</a>`);

    });

    switch(source) {
      case 'techcrunch':
        tech.addClass("current");
        sports.removeClass("current");
        news.removeClass('current');
        break;
      case 'fox-sports':
        sports.addClass('current');
        tech.removeClass('current');
        news.removeClass('current');
        break;
      case 'newsweek':
        news.addClass('current');
        tech.removeClass('current');
        sports.removeClass('current');
        break;
      default:
        break;

    }
  };

  const clear = () => {
    title.empty();
    author.empty();
    description.empty();
    imgHeader.empty();

  };

  tech.on('click',  () => {
    
    clear();
    fetch('techcrunch');
  });
  sports.on('click', () => {
    clear();
    fetch('fox-sports');
  });
  news.on('click', () => {
    clear();
    fetch('newsweek');
  });

  fetch('techcrunch');
});
