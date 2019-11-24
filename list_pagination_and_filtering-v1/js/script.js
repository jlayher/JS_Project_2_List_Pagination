
// Global Variables Created
const studentList = document.querySelectorAll('.student-item');
const perPage = 10;
// Global Variables For Exceeds Expectations Created
const headerDiv = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');


/* The Function showPage creates a list of students, using the arguments
list (representing the student list items contained in the gloabl variable
above) and a page number as the 2nd argument.  This creates a "page" of up to 10
student list items. */
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
that stores up to 10 list items (student-items) per page, and creates anchor
elements for the number of pages needed to access the list items in sets of 10.
*/
const appendPageLinks = (list) => {

  //do I need Math.ceil?
  let maxPages = Math.ceil(list.length / perPage);
  let pageDiv = document.querySelector('.page');
  let paginationDiv = document.createElement('div');
  paginationDiv.className = '.pagination';
  pageDiv.appendChild(paginationDiv);
  let ul = document.createElement('ul');
  paginationDiv.appendChild(ul);
  //attempt to remove/prevent duplicate pagination appendPageLinks when searching
  const paginationDivRemove = document.querySelector('.pagination');
  if (document.contains(paginationDivRemove)){
    paginationDivRemove.remove();
  }
  /*This loop creates and appends the links that will function as our "page number"
    when we call showPage later in this function*/
  for(i=0; i< maxPages; i++) {
    let li = document.createElement('li');
    ul.appendChild(li);
    let a = document.createElement('a');
    li.appendChild(a);
    a.textContent = i+1;
    a.href= "#";
    let firstAnchor = document.querySelector('a');
    firstAnchor.className = ".active";
    let anchorList = document.querySelectorAll('a');
    for (let j = 0; j < anchorList.length; j++) {
      a.addEventListener('click', (event) => {
        showPage(list, event.target.textContent);
        for (let k = 0; k <= anchorList.length; k++) {
          //attempt at solving anchorList being undefined
          let anchorList2 = document.querySelectorAll('a');
          anchorList2[k].className = 'none';
        }
      event.target.className = '.active';
      });
    }
  }
}

// create search component

const createSearch = () => {
  headerDiv.appendChild(searchDiv);
  searchDiv.className = "student-search";
  searchDiv.appendChild(searchInput);
  searchInput.placeholder = "Search for students...";
  searchDiv.appendChild(searchButton);
  searchButton.textContent = "Search For Student!";
}

// create search array and run the search.  Call showPage and appendPageLinks
const searchStudents = (input, list) => {
  let searchList = [];
  //attempt to remove repeating li and anchor tags
  //Removes the "No Results" message when performing search
  const noResults1 = document.querySelector('.no-results');
  if (document.contains(noResults1)){
    noResults1.remove();
  }
  //should i be < or <= ?
  for (let i = 0; i < list.length; i++) {
    // may not be needed, but preemptively removing the display of all list items before searching
    list[i].style.display = 'none';
    if(list[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())){
      searchList.push(list[i]);
    }
  }
    if (searchList.length === 0) {
      /*do I need to create a new li, or attach this to the page div, or
      the student h2?*/
      let noResults = document.createElement('li');
      noResults.className = "no-results";
      searchDiv.appendChild(noResults);
      noResults.textContent = "No Results";
    }
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
createSearch();
showPage(studentList, 1);
appendPageLinks(studentList);



















// Remember to delete the comments that came with this file, and replace them with your own code comments.
