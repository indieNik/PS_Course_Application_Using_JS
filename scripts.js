let courses;
const baseURL = "https://ps-courses-js.netlify.app/.netlify/functions/server";

fetch(baseURL + "/courses").then((res) => res.json()).then(res => {
  courses = res;
  updateContent();
})

function updateContent() {
  const coursesEl = document.querySelector('#courses');
  for (const course of courses) {
    let ratingsEl = '';
    Array.from(Array(course.rating).keys()).forEach(r => ratingsEl += '<i class="fas fa-star"></i>');
    let domString = `
        <div class="card-image">
            <img src="${course.imageUrl}" alt="Unsplash Random Image">
        </div>
        <div class="card-heading">
            ${course.title}
            <span class="ratings">
                ${ratingsEl}
            </span>
        </div>
        <div class="card-price">
            ₹ ${course.price}
        </div>
        <div class="card-actions">
            <button class="btn btn-blue">
                ${course.likes} 
                <i class="fas fa-thumbs-up"></i>
            </button>
            <button class="action">
                <button onclick="deleteCourse('${course.id}')" class="btn btn-red">
                    <i class="fas fa-trash"></i>
                </button>
            </button>
      </div>
    `;
    let cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.innerHTML = domString;
    coursesEl.appendChild(cardEl);
  }
}

function deleteCourse(courseID) {
    console.log('courseID: ', courseID);
    const courseToBeDeleted = courses.find(el => el.id === courseID);
    const confirmIfDelete = confirm(`Are you sure you want to delete course - ${courseToBeDeleted.title}`);
    if (confirmIfDelete) {
        console.log('Deleting: ', courseToBeDeleted.title);
        fetch(baseURL + "/deleteCourse/" + courseToBeDeleted.id, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        }).then((res) => res.json()).then(res => {
            console.log('Course successfully deleted. Updated list of courses: ', res);
            window.location.href = "/";
        })
    } else {
        console.log('Nothing deleted');
    }
}