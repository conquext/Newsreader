function hideElements(elementsToHide) {
  // hides dom nodes,
  // receives strings of classnames separated by comma as argument
  const elements = elementsToHide.split(",").map(item => item.trim());
  elements.forEach(
    el => (document.querySelector(`.${el}`).style.display = "none")
  );
}

function showNodeByClassName(elementsToShow) {
  // change display of dom node to block,
  // receives an strings of classnames separated by comma as argument
  const elements = elementsToShow.split(",").map(item => item.trim());
  elements.forEach(el => {
    const dom = document.querySelector(`.${el}`);
    dom ? (dom.style.display = "block") : "";
  });
}

function changeToFullNavbar() {
  // change navbar to full spread and fixed on top
  navBar.classList.add("navFixed");
  navBar.classList.add("nav_animate");
  logo.style = "transition:0; left: 5px; text-align: center; width: 100%";
  document.querySelector("main").style = "margin-top: 50px";
}

function hideNode(elementsToHide) {
  // hide node
  // receives a node element as argument
  const elements = elementsToHide.split(",").map(item => item.trim());
  elements.forEach(
    el => (document.querySelector(`${el}`).style.display = "none")
  );
}

function removeNodes(elementsToRemove) {
  // removes node
  // receives a node element as argument
  const elements = elementsToRemove.split(",").map(item => item.trim());
  elements.forEach(el => {
    const dom = document.querySelector(`.${el}`);
    dom && dom.parentNode && dom.parentNode.removeChild(dom);
  });
}

function hideNodeByClassName(elementsToHide) {
  // hide node
  // receives a string of classnames separated by comma as argument
  const elements = elementsToHide.split(",").map(item => item.trim());
  elements.forEach(el => {
    const dom = document.querySelector(`.${el}`);
    dom ? (dom.style.display = "none") : "";
  });
}

async function suspense(parent, domPos, loading) {
  // displays a refresh loader while page is rendering
  // receives parent node to hide
  // and dom position to inject the loader as argument
  parent = parent.toString();

  // if state is loading
  //   let loading = await state.getLoading();
  if (loading) {
    // hide parent node and inject loader
    hideNodeByClassName(`${parent}`);
    const loadingMarkup = `<div class="load-contenti">
                              <div class="load">
                                <p class="load-text"></p>
                                <div class="loading">Loading&#8230;</div>                               
                                </div>
                              </div>
                            </div>
                          `;
    const injectBody = document.createElement("div");
    injectBody.innerHTML = loadingMarkup;
    domPos.append(injectBody);
  } else {
    removeNodes("load-contenti");
    showNodeByClassName(`${parent}`);
  }
}

function adjustNav() {
  // add margin top to main element at home page
  main.style = "margin-top: 100px";
  // adjusts absolute positioning for sidebar menu
  // when scrolling close to the footer
  if (window.pageYOffset > hdrHeight + navHeight) {
    navBar.classList.add("navScrolled");
    navBar.classList.add("nav_animate");
    logo.style = "transition:.8s; left: 5px";
  } else {
    navBar.classList.remove("navScrolled");
    navBar.classList.remove("nav_animate");
    logo.style = "transition: 0s; left: -250px";
  }
  if (window.pageYOffset >= docHeight - footerHeight) {
    sidebarMenu.style = "top: 10rem; transition: all .5s fade-out";
  } else {
    sidebarMenu.style.top = null;
  }
  if (window.pageYOffset === 0) {
    if (footer.getBoundingClientRect().top < 563) {
      footer.style = `bottom: 0`;
      sidebarMenu.style = "top: 25rem; transition: all .5s fade-out";
    } else {
      footer.style.bottom = null;
    }
  }
}

async function extractPostContent(section) {
  // transverse the dom to get the id of the clicked post
  // and fetch it's data from the api

  let id;
  let imgUrl = [];
  let currentNode = section;

  // get the root container of the clicked element
  while (!currentNode.parentNode.classList.contains("section-news__card")) {
    currentNode = currentNode.parentNode;
  }

  const root = currentNode.parentNode;

  // extract it's id
  id = root
    .querySelector(".section-info")
    .firstChild.textContent.trim()
    .replace("#", "");

  const {
    title,
    date,
    content,
    url,
    author,
    comments,
    image
  } = await getArticleById(id);

  return {
    id,
    title,
    date,
    content,
    url,
    author,
    comments,
    image
  };
}

function editComment(clickedComment) {
  console.log("edit comment", clickedComment);
  let currentNode = clickedComment,
    oldComment,
    editBox;

  // get the root container of the clicked element
  while (!currentNode.parentNode.classList.contains("comment")) {
    currentNode = currentNode.parentNode;
  }

  const root = currentNode.parentNode;
  const targetDom = root.querySelector(".body");

  oldComment = targetDom.firstChild.textContent.trim().replace("#", "");
  root.style.display = "none";

  editBox = `<div id="respond" class="comment-update">
                        <form action="" method="post"
                            id="commentupdateform" class="comment-form" novalidate>
                            <p class="comment-update-form"> <textarea id="comment"
                                    name="comment" cols="45" rows="8" aria-required="true" placeholder="Add a comment"
                                    required="required">${oldComment}</textarea></p>
                                                        
                            <p class="form-submit"><input name="cancel" type="cancel" id="cancel" class="submit cancel"
                                    value="Cancel" onclick=updateComment(this, root) /><input name="submit" type="submit" id="submit" class="submit update"
                                    value="Update Comment" onclick=updateComment(this, root) />
                            </p>
                        </form>
                    </div>
`;
  document.append;
  root.parentNode.insertAdjacentHTML("beforeend", editBox);
}

function deleteComment(e) {
  console.log("delete comment", e);
}

function replyComment(clickedComment) {
  console.log("reply comment", clickedComment);
}

function updateComment(currentCommentNode, root) {
  e.preventDefault();
  // we would have actually updated the comment in real life
  root.style.display = "block";
}

var onDomChange = (function() {
  var MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;

  return function(obj, callback) {
    if (!obj || !obj.nodeType === 1) return; // validation

    if (MutationObserver) {
      // define a new observer
      var obs = new MutationObserver(function(mutations, observer) {
        callback(mutations);
      });
      // have the observer observe foo for changes in children
      obs.observe(obj, { childList: true, subtree: true });
    } else if (window.addEventListener) {
      obj.addEventListener("DOMNodeInserted", callback, false);
      obj.addEventListener("DOMNodeRemoved", callback, false);
    }
  };
})();
