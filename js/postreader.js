function initPostReader() {
  // adds on click event listener to all article posts
  // call method to render full post on dom
  document
    .querySelectorAll(".section-news__card")
    .forEach(newsSection => newsSection.addEventListener("click", readNews));
}

async function readNews(e) {
  // get the current article being clicked
  // clear dom at the snap of Thanos finger
  // prepare to render the full post
  try {
    hideNode("header");
    hideElements("main, nav-items, sidebar");
    changeToFullNavbar();
    showNodeByClassName("readpost");
    suspense("readpage footer", document.querySelector(".readpost"), true);
    window.addEventListener("scroll", changeToFullNavbar);

    // pass the event object and obtain the id of the current post
    // to fetch it from the api

    let {
      id,
      title,
      date,
      content,
      url,
      author,
      comments,
      image
    } = await extractPostContent(e.target);

    let altContent =
      "This is an example of a blog post, you could edit this to put information about yourself or your site so readers know where you are coming from. You can create as many posts as you like in order to share with your readers what is on your mind. This is an example of a blog post, you could edit this to put information about yourself or your site so readers know where you are coming from. You can create as many posts as you like in order to share with your readers what is on your mind.This is an example of a blog post, you could edit this to put information about yourself or your site so readers know where you are coming from. You can create as many posts as you like in order to share with your readers what is on your mind. This is an example of a blog post, you could edit this to put information about yourself or your site so readers know where you are coming from. You can create as many posts as you like in order to share with your readers what is on your mind.";

    content = content = altContent;

    suspense("readpage footer", document.querySelector(".readpost"), false);
    main.style.marginTop = 0;
    body.style.paddingTop = "0px";
    document.title = `${title} | NewsReader`;

    images = [
      image,
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/111167/img1.jpeg",
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/111167/img2.jpeg"
    ];

    let imgFigure = document.createElement("div");
    //             document.write(imgFigure);
    //  await setTimeout(() => console.log('waiting'), 10000)

    imgFigure = `<figure class="slide"><img src=${images[0]} alt="img">
    <figcaption>
        <div class="title ellipsis">${title}</div>
        <div class="author ellipsis">${author}</div>
    </figcaption></figure>`;

    for (let i = 1; i < images.length; i++) {
      imgFigure += `<figure class="slide"><img src=${images[i]} alt="img">
    <figcaption>
        <div class="title ellipsis">${title}</div>
        <div class="author ellipsis">${author}</div>
    </figcaption></figure>`;
    }

    let commentContainer = document.createElement("div");
    commentContainer.classList.add("entry-comments");
    commentContainer.setAttribute("id", "comments");

    let commentsBlock = `    
    <ul class="comments">
        <li class="comment">
            <a href="#" title="View this user profile" class="photo"><img src=${image} alt="User"></a>
            <div class="meta">${author} | ${date} <a class="reply-comment onclick=replyComment(this)">Reply</a><a class="delete-comment" onclick=deleteComment(this)>Delete</a><a class="edit-comment" onclick=editComment(this)>Edit</a></div>
            <div class="body">${comments[1].body}</div>
        </li>
    </ul>`;

    for (let i = 1; i < comments.length; i++) {
      commentsBlock += `
      <ul class="comments">
            <li class="comment">
                <a href="#" title="View this user profile" class="photo"><img src=${image} alt="User"></a>
                <div class="meta">${comments[i].name
                  .substring(1, 5)
                  .trim()} | ${date} <a class="reply-comment onclick=replyComment(this)">Reply</a><a class="delete-comment" onclick=deleteComment(this)>Delete</a><a class="edit-comment" onclick=editComment(this)>Edit</a></div>
                <div class="body">${comments[i].body}</div>
            </li>
        </ul>`;
    }

    const markup = `
    <div class="post-container">
        <div class="post-inner">
            <div class="content-sidebar-wrap">
                <div class="content">
                    <section>
                    <em class="fas fa-long-arrow-alt-left" onclick="window.location.href = document.referrer;" style="top: 0;transform: translate(-10px, 15px);"></em>
                        <header class="entry-header">
                            <div class="entry-title ellipsis">${title}</div>
                            <p class="entry-meta"><time class="entry-time" itemprop="datePublished"
                                    datetime="${date}">${date}</time>
                                    <span> | </span> by <span
                                    class="entry-author" itemprop="author"><a
                                        href=""
                                        class="entry-author-link" itemprop="url" rel="author">
                                        <span
                                            class="entry-author-name" itemprop="name">${author}</span></a>
                                </span> 
                                <span> | </span>
                                <span class="entry-comments-link"><a
                                        href="">${comments.length}
                                        Comments</a></span> </p>
                        </header>
                        <div class="entry-content" itemprop="text">
                            <span><div class="slider-ctr">${imgFigure}
                                <div class="slider-control">
                                    <div class="control prev disabled">
                                        <div class="icon ion-chevron-left"> << </div>
                                    </div>
                                    <div class="control next">
                                        <div class="icon ion-chevron-right"> >> </div>
                                    </div>
                                </div>
                            </div></span>

                            <span><p>${content}</p></span>
                        </div>
                        <footer class="entry-footer">
                            <p class="entry-meta"><span class="entry-categories">Source: <a
                                        href=${url}
                                        rel="category tag">${url}</a></p>
                        </footer>
                    </section>
                    <div id="respond" class="comment-respond">
                  
                        <form action="" method="post"
                            id="commentform" class="comment-form" novalidate>
                            <p class="comment-form-comment"> <textarea id="comment"
                                    name="comment" cols="45" rows="8" aria-required="true" placeholder="Add a comment"
                                    required="required"></textarea></p>
                            
                            <p class="comment-form-author"><label for="author">Name <span
                                        class="required">*</span></label> <input id="author" name="author" type="text"
                                    value="" size="30" aria-required='true' required='required' /></p>
                            
                            <p class="form-submit"><input name="submit" type="submit" id="submit" class="submit"
                                    value="Post Comment" /> <input type='hidden' name='comment_post_ID' value='20'
                                    id='comment_post_ID' />
                                <input type='hidden' name='comment_parent' id='comment_parent' value='0' />
                            </p>
                            <p style="display: none;"><input type="hidden" id="akismet_comment_nonce"
                                    name="akismet_comment_nonce" value="2b3469b3d4" /></p>
                            <p style="display: none;"><input type="hidden" id="ak_js" name="ak_js" value="130" /></p>
                        </form>
                    </div>
                    <!-- #respond -->
                    <div><h2 class="screen-reader-text">${comments.length} Comments</h2></div>
                    <div class="post-comment><ul class="comments">${commentsBlock}</ul></div>
                </div>
            </div>
        </div>
        
    </div>
    `;

    readPost.innerHTML += markup;
    slide();
  } catch (error) {
    console.log("error", error);
    // suspense("main", main, false);
  }
}
