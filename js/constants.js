const app = document.querySelectorAll(".section-news");
const main = document.querySelector("main");
const navBar = document.querySelector("#topNav");
const logo = document.querySelector("#logo");
const navHeight = navBar.getBoundingClientRect().height;
const hdr = document.querySelector("header");
const hdrHeight = hdr.clientHeight;
const sidebarMenu = document.querySelector("#menu");
const sdrHeight = sidebarMenu.clientHeight;
const footer = document.querySelector(".footer");
const body = document.querySelector("body");
const newsCard = document.querySelectorAll(".section-news__card");
const readPost = document.querySelector(".readpost");
const newPostForm = document.querySelector(".newpost-form");
const perPage = 10;

const api = "https://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article";
