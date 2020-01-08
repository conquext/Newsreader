function addNew() {
  // render page for new post

  // hides all content on main
  // starting with the header
  hideNode("header");
  hideElements("main, nav-items, sidebar");

  // change to full navbar
  changeToFullNavbar();

  // display container with form to add new post
  showNodeByClassName("newpost");
  window.addEventListener("scroll", changeToFullNavbar);
}

newPostForm.addEventListener("submit", handleNewPost);

function handleNewPost(e) {
  e.preventDefault();
  const title = e.target.postTitle.value;
  const desc = e.target.postDescription.value;
  const avatar = e.target.postImg.value;
  const url = e.target.postURL.value;
  const dd = e.target.postDay.value.trim();
  const mm = e.target.postMonth.value.trim();
  const yy = e.target.postYear.value.trim();
  const author = e.target.postAuthor.value;

  const date = formatDate(dd, mm, yy);

  addNewPost({ title, author, url, avatar });
}

function formatDate(dd, mm, yy) {
  dd = dd.toString();
  mm = mm.toString();
  yy = yy.toString();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  if (mm in monthNames) {
    mm = monthNames.findIndex(mm);
  }

  return new Date(
    `${yy}-${dd.padStart(2, 0)}-${mm.padStart(2, 0)}`
  ).toDateString();
}

function addNewPost({ title, author, url, avatar }) {
  console.log("sending to api");
  try {
    fetch(`${api}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, url, avatar })
    }).then(res => console.log(res));
    return "New Post added";
  } catch (error) {
    console.error("Error:", error);
  }

  window.location.href = document.referrer;
}
