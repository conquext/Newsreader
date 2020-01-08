let container = document.querySelector(".main"),
  paginate = {
    startPos(pageNumber, perPage) {
      // returns content position in the item List to render in the DOM
      return pageNumber * perPage;
    },

    getPage(items, startPos, perPage) {
      // returns page content from startPos to max content perPage
      let page = [];
      items = Array.from(items).slice(startPos, items.length);
      // loop and push remaining items until max per page
      for (let i = 0; i < perPage; i++) {
        items[i] && page.push(items[i]);
      }
      return page;
    },

    totalPages(items, perPage) {
      // determine total number of pages
      return Math.ceil(items.length / perPage);
    },

    createButtons(totalPages, currentPage) {
      // create buttons to manipulate current page

      // create a div wrapper for navigation button
      let pagination = document.createElement("div");
      pagination.className = "pagination";

      // add a "first" button
      let pageBtn = `<span class="pagination-button">&laquo;</span>`;

      // add pages inbetween
      for (let i = 1; i <= totalPages; i++) {
        // truncate list when too large
        if (totalPages > 5 && currentPage !== i) {
          // if on first two pages
          if (currentPage === 1 || currentPage === 2) {
            // show first 5 pages
            if (i > 5) continue;
            // if on last two pages
          } else if (
            currentPage === totalPages ||
            currentPage === totalPages - 1
          ) {
            // show last 5 pages
            if (i < totalPages - 4) continue;
            // otherwise show 5 pages w/ current in middle
          } else {
            if (i < currentPage - 2 || i > currentPage + 2) {
              continue;
            }
          }
        }

        // markup for page button
        // add active class for current page
        if (i == currentPage) {
          pageBtn += `<span class="pagination-button active page-num">${i}</span>`;
        } else
          pageBtn += `<span class="pagination-button page-num">${i}</span>`;
      }

      // add a "last" button
      pageBtn += `<span class="pagination-button">&raquo;</span>`;

      // append "buttons to container"
      pagination = `<div class="pagination">${pageBtn}</div>`;
      return pagination;
    },

    createPage(items, currentPage, perPage) {
      // get start position and select items for page
      let startPos = this.startPos(currentPage - 1, perPage),
        page = this.getPage(items, startPos, perPage);

      // get all childnodes of parent container and remove them
      let children = Array.from(container.childNodes);
      children.forEach(child => container.removeChild(child));

      // attach current page to parent container
      page.forEach(pageEl => {
        // prevent empty items that return as Window
        if (this.window === undefined) {
          container.append(pageEl);
        }
      });

      // prep pagination buttons and add to page
      let totalPages = this.totalPages(items, perPage),
        pageButtons = this.createButtons(totalPages, currentPage);

      initPostReader();
      // append page button to container
      container.innerHTML += pageButtons;
      // attach event listener for newly added buttons
      runButtonListener(items);
    }
  };

// splits the display content by specified node counts
// perPage is an integer that specifies how many content per page
const pageSplit = function(perPage, start) {
  if (!start) start = 1;
  // default perPage to 4
  if (!perPage || isNaN(perPage)) {
    perPage = 4;
  }

  // don't split if fewer items than perPage
  if (this.length <= perPage) {
    return true;
  }
  // paginate the items starting at page 1
  paginate.createPage(this, start, perPage);
  initPostReader();
};

// run page split on page load
pageSplit.bind(app, perPage)();

// handles click events on the button
function runButtonListener(items) {
  // let app = document.querySelectorAll(".section-news");
  document.querySelectorAll(".pagination-button").forEach((elem, e) => {
    elem.addEventListener("click", function(e) {
      // get current page from active button
      let currentPage = parseInt(
          document.querySelector(".pagination-button.active").innerText,
          10
        ),
        newPage = currentPage,
        totalPages = paginate.totalPages(items, perPage),
        target = e.target;

      // get numbered page
      newPage = parseInt(target.innerText, 10);

      if (target.innerText == "«") newPage = 1;
      if (target.innerText == "»") newPage = totalPages;

      // return if on current page
      if (newPage === currentPage) {
        return;
      }
      // ensure newPage is in available range
      if (newPage > 0 && newPage <= totalPages) {
        pageSplit.bind(items, perPage, newPage)();
      }
    });
  });
}
