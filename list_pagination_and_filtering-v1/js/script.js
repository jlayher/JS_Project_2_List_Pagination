/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
const studentList = document.querySelectorAll('.student-item');
const perPage = 10;





/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/

const showPage = (list, page) => {
  /*if we start our buttons with "button 1" then the first start index is 1,
  but remember that the first li element is at index 0.*/
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
//test of showPage Function
showPage(studentList, 1);
/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/


const appendPageLinks = (list) => {
  // This likely needs to be Math.ceil(list.length/perPage);
  let maxPages = Math.ceil(list.length / perPage);
  let pageDiv = document.querySelector('.page');
  let paginationDiv = document.createElement('div');
  paginationDiv.className = '.pagination';
  let ul = document.createElement('ul');
  pageDiv.appendChild(paginationDiv);
  paginationDiv.appendChild(ul);


  /* Does i need to be < or <= numOfPages, and does numOfPages need
      to be rounded up?
  */
  for(i=0; i<= maxPages; i++) {
    let li = document.createElement('li');
    ul.appendChild(li);
    let anchor = document.createElement('a');
    ul.appendChild(anchor);
    li.textContent = "" + i +"";
    anchor.textContent = "" + i + "";


    /* add evnet listener to each anchor tag, and each anchor tag should have
    their text content = the a page number.  In this case, there should be 6
    buttons
    */


  }
}

appendPageLinks(studentList);



















// Remember to delete the comments that came with this file, and replace them with your own code comments.
