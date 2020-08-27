const state = {
  article: [],
  loading: false,
  error: "",
  loadArticle(article) {
    this.article = article;
  },
  setArticle(key, value) {
    this.article[st] = [...this[article], article];
  },
  async getArticleById(id) {
    return this.article.filter((article) => {
      article.id === id;
    });
  },
  getArticle() {
    return this.article;
  },
  setLoading(bool) {
    this.loading = bool;
  },
  getLoading() {
    return this.loading;
  },
  setError(msg) {
    this.error = msg;
  },
  getError() {
    return this.error;
  },
};

// article has {id, images, comments, author, url, avatar, title}

const getComments = async () => {
  let response;
  let res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
  res = await res.json();
  if (res && res.length >= 1) {
    response = res;
  } else throw error;
  state.loadArticle(response);
  state.setLoading(false);
  return response;
};

const getArticles = async () => {
  state.setLoading(true);
  let response;
  let res = await fetch(`${api}`);
  res = await res.json();
  if (res && res.length >= 1) {
    response = res;
  }
  state.loadArticle(response);
  state.setLoading(false);
  return response;
};

const getArticleById = async (id, source) => {
  if (source === "local") {
    let artcle;
    const articles = state.article;
    artcle = articles.filter(
      (article) => parseInt(article.id) === parseInt(id)
    );
    if (artcle.length >= 1) {
      // [title, date, content, url, author, comments];
      const {
        title,
        createdAt: date,
        content = "",
        author = "anonymous",
        url,
        avatar: image,
      } = artcle[0];
      return { title, date, content, author, url, image, comments };
    } else return null;
  } else {
    let response, comments;
    let res = await fetch(`${api}/${id}`);
    res = await res.json();

    if (res) {
      let commentsFound = await getComments();
      comments = commentsFound.filter(
        (comm) => parseInt(comm.postId) === parseInt(id)
      );

      response = res;
      const {
        title,
        createdAt: date,
        content = "",
        author = "anonymous",
        url,
        avatar: image,
      } = res;
      return { title, date, content, author, url, image, comments };
    }
    return response;
  }
};

const populateArticles = async () => {
  try {
    await suspense(["main", "footer", "sidebar"], main, true);

    let articlesFound = await getArticles();
    let commentsFound = await getComments();
    suspense(["main", "footer", "sidebar"], main, false);

    if (articlesFound && articlesFound.length > 0) {
      let markup;
      const articleHolder = [];

      for (let i = 0; i < articlesFound.length; i++) {
        let comments;
        articleHolder[i] = document.createElement("section");
        articleHolder[i].classList.add("section-news");
        comments = commentsFound.filter(
          (comm) => parseInt(comm.postId) === parseInt(articlesFound[i].id)
        );
        articlesFound[i].author = articlesFound[i].author || "anonymous";
        articlesFound[i].comments = articlesFound[i].comments || comments;

        markup = `<div class="section-news__card item">
          <div class="icon">
            <a href=${articlesFound[i].url}><img src=${
          articlesFound[i].avatar
        } alt="img" /> </a>
          </div>   
          <div class="item-in">
            <h4>${articlesFound[i].title}</h4>
            <div class="seperator"></div>
            <div class="section-info"><span>#${
              articlesFound[i].id
            }</span> <span>${
          articlesFound[i].author
        }</span> <span>|</span> <span>${
          articlesFound[i].comments ? articlesFound[i].comments.length : 0
        } comments</span> <span>|</span> <span>${
          articlesFound[i].createdAt
        }</span></div>
            <p>
            </p>
          </div>
        </div>`;
        articleHolder[i].innerHTML = markup;
      }

      articleHolder.forEach((aHolding) =>
        document.querySelector(".main").append(aHolding)
      );
    } else {
      const noListing = document.createElement("section");
      const markup = `<div class="center-tab">
                        <p>
                            There are no articles to display. <br>
                            <button class="post-button" onclick="addNew()"
                                style="width:auto;">Click here to create one</button>.
                        </p>
                    </div>`;
      noListing.innerHTML = markup;

      document.querySelector(".main").append(noListing);
    }
  } catch (error) {
    console.log("error", error);
    await suspense(["main", "footer", "sidebar"], main, false);

    const noListing = document.createElement("section");
    noListing.classList.add("section-news");
    noListing.classList.add("error");

    const markup = `<div class="center-tab">
                        <p>
                            Oops! We have a problem<br>
                            <p class="error-catch">${error
                              .toString()
                              .replace("TypeError: ", "")}</p>
                                                        <li class="icon fa fa-sync" id="cuatro" onclick="location.reload()"></li>

                        </p>
                    </div>`;
    noListing.innerHTML = markup;

    document.querySelector(".main").append(noListing);
  }
};

window.onload = async () => {
  await populateArticles();
  await pageSplit.bind(document.querySelectorAll(".section-news"), perPage)();
  initPostReader();
  adjustNav();
};
