// Get access to all elements
const searchWrapper = document.querySelector('.search-input');
const inputBox = searchWrapper.querySelector('input');
const suggBox = searchWrapper.querySelector('.autocom-box');
const icon = searchWrapper.querySelector('.icon');
let search_type = document.forms[0];
let linkTag = searchWrapper.querySelector('a');
let webLink;
let txt_type = '';

// if user press any key and release
inputBox.onkeyup = (e) => {
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if (userData) {
    icon.onclick = () => {
      webLink = `https://www.google.com/search?q=${userData}`;
      linkTag.setAttribute('href', webLink);
      linkTag.click();
    };
    emptyArray = suggestions.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      // passing return data inside li tag
      return (data = `<li>${data}</li>`);
    });
    searchWrapper.classList.add('active'); //show autocomplete box
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll('li');
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute('onclick', 'select(this)');
    }
  } else {
    searchWrapper.classList.remove('active'); //hide autocomplete box
  }
};

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  icon.onclick = () => {
    for (let i = 0; i < search_type.length; i++) {
      if (search_type[i].checked) {
        txt_type = search_type[i].value;
        break;
      }
    }
    // alert(txt_type);
    webLink = `http://api.adm.tasniflagich.mf.uz/api/findProducts?search=${selectData}`;
    linkTag.setAttribute('href', webLink);
    linkTag.click();
  };
  searchWrapper.classList.remove('active');
}

function showSuggestions(list) {
  let listData;
  userValue = inputBox.value;
  if (!list.length) {
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join('');
  }
  // alert(userValue);
  // alert(listData);
  listData = boldQuery(listData, userValue);
  suggBox.innerHTML = listData;
}

const boldQuery = (str, query) => {
  const n = str.toUpperCase();
  const q = query.toUpperCase();
  const x = n.indexOf(q);
  if (!q || x === -1) {
    return str; // bail early
  }
  const l = q.length;
  return (
    str.substr(0, x) + '<b>' + str.substr(x, l) + '</b>' + str.substr(x + l)
  );
};
