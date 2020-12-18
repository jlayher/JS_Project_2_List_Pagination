/*  John Layher's List Pagination and Filtering Project (Full Stack JS Project 2)
I am attempting to earn the Exceeds Expectations Grade for this project,
and I would like my submission to be rejected if I do not meet the qualifications
for the Exceeds Expectations Grade.
*/
// Global Variables Created
const studentList = document.querySelectorAll('.student-item');
const perPage = 10;
// Global Variables For Exceeds Expectations Created
const headerDiv = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');

/* The Function showPage displays a page of up to 10 students, using the arguments
"list" and a page number as the 2nd argument.*/
const showPage = (list, page) => {
  const startIndex = (page * perPage) - perPage;
  const endIndex = page * perPage;
  for (let i = 0; i < list.length; i++) {
    let li = list[i];
    if(i >= startIndex && i < endIndex) {
      li.style.display = '';
  } else {
      li.style.display = 'none';
    }
  }
}

/* The Fucntion appendPageLinks creates a div(pagination), and a ul element
that holds up to 10 list items (student-items) per page, and creates anchor
elements for the number of pages needed to access the list items in sets of 10.
*/
const appendPageLinks = (list) => {
  /*check to see if pagination links already exist, and if so,
  remove them, before the function creates a new set of pagination links*/
  let oldDiv = document.querySelector('.pagination');
  if (oldDiv !== null) {
    oldDiv.remove();
  }
  /*this code selects, creates, adds classes for styling, and appends the elements
  needed for adding our pagination links*/
  let maxPages = Math.ceil(list.length / perPage);
  let pageDiv = document.querySelector('.page');
  let paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination';
  pageDiv.appendChild(paginationDiv);
  let ul = document.createElement('ul');
  paginationDiv.appendChild(ul);
  /*This loop creates and appends the links that will function as our "page number"
    when we call showPage*/
  for(let i=0; i< maxPages; i++) {
    let li = document.createElement('li');
    ul.appendChild(li);
    let a = document.createElement('a');
    a.textContent = i+1;
    a.href= "#";
    li.appendChild(a);
    /* The first anchor is set to active, letting the user know the
    current page of the student list is being displayed.*/
    let firstAnchor = document.querySelector('a');
    firstAnchor.className = "active";
    /* A click event listener is added to the anchor tags.  When a link is clicked
    the function showPage is called using the student list and the link's text
    content as arguments.*/
    a.addEventListener('click', (event) => {
      showPage(list, event.target.textContent);
      let anchorList = document.querySelectorAll('a');
      /*This loop iterates through the list of anchor tags, and removes the
      active class from the tags, so that they are not highlighted.*/
      for (let k = 0; k<anchorList.length; k++){
        anchorList[k].classList.remove('active');
      }
      /* the link representing the currently displayed page is selected, and
      the active class is applied*/
      event.target.className = 'active';
    });
  }
}

/* The createSearch function creates the search bar, and adds some styles to them.*/
const createSearch = () => {
  headerDiv.appendChild(searchDiv);
  searchDiv.className = "student-search";
  searchDiv.appendChild(searchInput);
  searchInput.placeholder = "Search for students...";
  searchDiv.appendChild(searchButton);
  searchButton.textContent = "Search For Student!";
}

/* The function searchStudents takes the user's search input, and adds any mathcing
results to a new array, to be used as an argument later.*/
const searchStudents = (input, list) => {
  let searchList = [];
  //this removes the "No Results" message from the page if it already exists
  const noResults1 = document.querySelector('.no-results');
  if (document.contains(noResults1)){
    noResults1.remove();
  }
  /*This code loops through the student list items, and adds items that match
  the searchInput value to the searchList array.*/
  for (let i = 0; i < list.length; i++) {
    list[i].style.display = 'none';
    if(list[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())){
      searchList.push(list[i]);
    }
  }
    /*This code generates and displays a "No Results" message, when the search
    doesn't return any matches*/
    if (searchList.length === 0) {
      let noResults = document.createElement('li');
      noResults.className = "no-results";
      searchDiv.appendChild(noResults);
      noResults.textContent = "No Results";
    }
    //calling functions
  showPage(searchList, 1);
  appendPageLinks(searchList);
};

// Add keyup event listener for searchInput, and run searchStudents
searchInput.addEventListener('keyup', (event) => {
  let input = searchInput.value;
  searchStudents(input, studentList);
});

// Add Click event Listener for Search Button, and run searchStudents
searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  let input = searchInput.value;
  searchStudents(input, studentList);
});

// Calling all Functions
showPage(studentList, 1);
appendPageLinks(studentList);
createSearch();
