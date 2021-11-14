let getUserInput = "dog";
let containerDivID = document.getElementById("container");
containerDivID.innerHTML = "am";
let createTextBox = document.createElement("INPUT");
createTextBox.setAttribute("type", "text");
createTextBox.setAttribute("id", "searchText");
containerDivID.appendChild(createTextBox);
// let key = document.getElementById("searchText").value;
let key = "";
// console.log(key.length);

let search = document.getElementById("myBtn");
let keySearch = document.getElementById("searchText");

search.addEventListener("click", () => {
    key = document.getElementById("searchText").value;
    console.log(`Searching word by Click event- ${key}`);
  fetchData(key);
});
keySearch.addEventListener("keyup", () => {
//   console.log(keySearch.length);
  key = document.getElementById("searchText").value;
  if (key.length > 2) {
    console.log(`Searching word by keyup event- ${key}`);
    fetchData(key);
  }
});


// fetchData(getUserInput);

async function fetchData(key) {
  if (document.getElementById("imgDiv")) {
    console.log(`Div available - Deleting ${true}`);
    var elem = document.getElementById("imgDiv");
    elem.remove();
  } else {
    console.log(`Div unavailable - creating ${true}`);
  }

  key = document.getElementById("searchText").value;
//   console.log(`Searching word - ${key}`);
  try {
    console.log(`Currently fetching link is - https://api.jikan.moe/v3/search/anime?q=${key}`);
    let apiFetch = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${key}`
    );
    console.log(`Fetch Status - ${apiFetch.status} | Fetch message - ${apiFetch.error} | Fetch Type ${apiFetch.type}`);
    let getData = await apiFetch.json();
    // console.log(getData);
    // console.log(getData["results"]);
    //   let getImgLink = dataManupulation(getData["results"]);
    dataManupulation(getData["results"]);
    console.log("Load completed");
  } catch (err) {
    consle.log(err);
  }
  //   console.log(getImgLink);
}

function dataManupulation(getObj) {
  // console.log(getObj);
  let a = [];

  let createNewDiv = document.createElement("div");
  createNewDiv.setAttribute("id", "imgDiv");
  for (records in getObj) {
    let geteachRec = getObj[records];
    // a =+ (geteachRec["image_url"]);
    a.push(geteachRec["image_url"]);
    let getImgLink = geteachRec["image_url"];

    let createNewimgTag = document.createElement("img");

    createNewimgTag.setAttribute("src", getImgLink);
    createNewDiv.appendChild(createNewimgTag);
    // console.log(createNewDiv);
  }
  //   console.log(createNewDiv);
  containerDivID.append(createNewDiv);
  //   console.log(containerDivID);
  //   return a;
}
