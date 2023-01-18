// Mouse Circle
const mouseCircle = document.querySelector('.mouse-circle')
const mouseDot = document.querySelector('.mouse-dot')

let mouseCircleBool = true

// Mouse Circle
const mouseCircleFn = (x, y) => {
  mouseCircleBool &&
    (mouseCircle.style.cssText = `top:${y}px;left:${x}px; opacity:1`)

  mouseDot.style.cssText = `top:${y}px;left:${x}px; opacity: 1`
}
// End of Mouse Circle

// Animated Circles
const circles = document.querySelectorAll('.circle')
const mainImg = document.querySelector('.main-circle img')

let mX = 0
let mY = 0
const z = 100

const animateCircles = (e, x, y) => {
  if (x < mX) {
    circles.forEach((circle) => (circle.style.left = `100px`))
    mainImg.style.left = `${z}px`
  } else if (x > mX) {
    circles.forEach((circle) => (circle.style.left = `-100px`))
    mainImg.style.left = `-${z}px`
  }

  if (y < mY) {
    circles.forEach((circle) => (circle.style.top = `100px`))
    mainImg.style.top = `${z}px`
  } else if (y > mY) {
    circles.forEach((circle) => (circle.style.top = `-100px`))
    mainImg.style.top = `-${z}px`
  }

  // Stores the last position of the mouse
  mX = e.clientX
  mY = e.clientY
}
// End of Animated Circles

let hoveredElementPosition = []

const stickyElement = (x, y, hoveredElement) => {
  // Condition to check if mouse is hovering over an element that contains the classlist sticky
  if (hoveredElement.classList.contains('sticky')) {
    // if hoveredElementPosition array is less than 1 update the array with the position of element that has sticky and is being hovered over
    hoveredElementPosition.length < 1 &&
      (hoveredElementPosition = [
        hoveredElement.offsetTop,
        hoveredElement.offsetLeft,
      ])

    hoveredElement.style.cssText = `top:${y}px; left:${x}px`
    // If hovered element is +- left or right beyond 140 px it will move back to its default position
    if (
      hoveredElement.offsetTop <= hoveredElementPosition[0] - 100 ||
      hoveredElement.offsetTop >= hoveredElementPosition[0] + 100 ||
      hoveredElement.offsetleft <= hoveredElementPosition[1] - 100 ||
      hoveredElement.offsetleft >= hoveredElementPosition[1] + 100
    ) {
      hoveredElement.style.cssText = ''
      hoveredElementPosition = []
    }

    hoveredElement.onmouseleave = () => {
      hoveredElement.style.cssText = ''
      hoveredElementPosition = []
    }
  }
}

document.body.addEventListener('mousemove', (e) => {
  // CSS left property
  let x = e.clientX
  // CSS top Property
  let y = e.clientY

  mouseCircleFn(x, y)
  animateCircles(e, x, y)

  // store element tag mouse is currently hovering/point at on the page
  const hoveredElement = document.elementFromPoint(x, y)

  stickyElement(x, y, hoveredElement)

  mouseCircleTransform(hoveredElement)
})

// Mouse Circle Transform
const mouseCircleTransform = (hoveredElement) => {
  // if mouse hovers over element with pointer-enter
  if (hoveredElement.classList.contains('pointer-enter')) {
    hoveredElement.onmousemove = () => {
      mouseCircleBool = false
      // Styles to be applied when hovering over project
      mouseCircle.style.cssText = `
      width: ${hoveredElement.getBoundingClientRect().width}px; 
      height: ${hoveredElement.getBoundingClientRect().height}px; 
      top: ${hoveredElement.getBoundingClientRect().top}px;
      left: ${hoveredElement.getBoundingClientRect().left}px;
      opacity: 1;
      transform: translate(0,0);
      animation: none;
      border-radius: ${
        getComputedStyle(hoveredElement).borderBottomLeftRadius
      }; 
      transition: width .5s, height .5s, top .5s, left 0.5s, transform 0.5s, border-radius 0.5s`
    }

    //if mouse leaves project being hovered over it will default back to circle
    hoveredElement.onmouseleave = () => {
      mouseCircleBool = true
    }

    // if focused on a project when scrolling up or down, revert to project or to another project if cursor is pointing to it
    document.onscroll = () => {
      if (!mouseCircleBool) {
        mouseCircle.style.top = `${
          hoveredElement.getBoundingClientRect().top
        }px`
      }
    }
  }
}
// End of Mouse Circle Transform

// If cursor leaves the page the circle and dot will dissappear
document.body.addEventListener('mouseleave', () => {
  mouseCircle.style.opacity = '0'
  mouseDot.style.opacity = '0'
})

// Main Button
// Store in nodelist
const mainBtns = document.querySelectorAll('.main-btn')

// loop through nodelist using foreach
mainBtns.forEach((btn) => {
  let ripple
  btn.addEventListener('mouseenter', (e) => {
    const left = e.clientX - e.target.getBoundingClientRect().left
    const top = e.clientY - e.target.getBoundingClientRect().top

    // Create a new HTML element
    ripple = document.createElement('div')
    // Add the ripple element to the HTML document
    ripple.classList.add('ripple')
    // Style the ripple element
    ripple.style.left = `${left}px`
    ripple.style.top = `${top}px`

    //add the element as the first child of the parent element
    btn.prepend(ripple)
  })

  // Remove the ripple effect from
  btn.addEventListener('mouseleave', () => {
    btn.removeChild(ripple)
  })
})
// End of Main Button

// Progress Bar
// Store the section tags
const sections = document.querySelectorAll('section')
const progressBar = document.querySelector('.progress-bar')
const halfCircles = document.querySelectorAll('.half-circle')
const halfCircleTop = document.querySelector('.half-circle-top')
const progressBarCircle = document.querySelector('.progress-bar-circle')

let scrolledPortion = 0
let scrollBool = false
let imageWrapper = false

const progressBarFN = (bigImageWrapper) => {
  imageWrapper = bigImageWrapper
  let pageHeight = 0
  const pageViewportHeight = window.innerHeight

  if (!imageWrapper) {
    pageHeight = document.documentElement.scrollHeight
    scrolledPortion = window.pageYOffset
  } else {
    pageHeight = imageWrapper.firstElementChild.scrollHeight
    scrolledPortion = imageWrapper.scrollTop
  }

  const scrolledPortionDegree =
    (scrolledPortion / (pageHeight - pageViewportHeight)) * 360

  halfCircles.forEach((element) => {
    element.style.transform = `rotate(${scrolledPortionDegree}deg)`

    if (scrolledPortionDegree >= 180) {
      halfCircles[0].style.transform = `rotate(180deg)`
      halfCircleTop.style.opacity = `0`
    } else {
      halfCircleTop.style.opacity = `1`
    }
  })

  // If this variable is true then we have reached to the bottom of the page
  scrollBool = scrolledPortion + pageViewportHeight === pageHeight
  // Arrow Rotation
  // Update transition property in CSS .progress-bar-circle with "transition: transform 0.5s";
  scrollBool
    ? (progressBarCircle.style.transform = 'rotate(180deg)')
    : (progressBarCircle.style.transform = 'rotate(0)')
}

// Progress bar click
progressBar.addEventListener('click', (e) => {
  e.preventDefault()

  if (!imageWrapper) {
    // Convert node list sections into an array, map through each section and store its positions on the page into an array
    const sectionPositions = Array.from(sections).map(
      (section) => scrolledPortion + section.getBoundingClientRect().top
    )

    const position = sectionPositions.find((sectionPosition) => {
      return sectionPosition > scrolledPortion
    })

    // if scrollbool is true then bottom of page is reached so scroll to the top
    // else scroll to the next section down the page
    scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position)
    // End of progress bar click
  } else {
    scrollBool
      ? imageWrapper.scrollTo(0, 0)
      : imageWrapper.scrollTo(0, imageWrapper.scrollHeight)
  }
})
// End of Progress Bar

progressBarFN()

// Navigation
const menuIcon = document.querySelector('.menu-icon')
const navBar = document.querySelector('.navbar')

const scrollFn = () => {
  menuIcon.classList.add('show-menu-icon')
  navBar.classList.add('hide-navbar')

  // if page is scrolled to the top edge
  if (window.scrollY === 0) {
    menuIcon.classList.remove('show-menu-icon')
    navBar.classList.remove('hide-navbar')
  }

  progressBarFN()
}

//When scrolling on page nav items will be be hidden and menu icon will display
document.addEventListener('scroll', scrollFn)

// Close the menu icon if clicked on
menuIcon.addEventListener('click', () => {
  menuIcon.classList.remove('show-menu-icon')
  navBar.classList.remove('hide-navbar')
})
// End of Navigation

// About me Text
const aboutMeText = document.querySelector('.about-me-text')
const aboutMeTextContent = `I am an aspiring Developer using HTML, CSS & Javascript`

// Create text dynamically and insert a span within the aboutMeText p container
// Convert aboutMeTextContent into an array and loop through each element using foreach
Array.from(aboutMeTextContent).forEach((char) => {
  // Create a span element
  const span = document.createElement('span')
  // insert each character from array into the span
  span.textContent = char
  // append each span to the aboutMeText container
  aboutMeText.appendChild(span)

  span.addEventListener('mouseenter', (e) => {
    e.target.style.animation = 'aboutMeTextAnimation 10s infinite'
  })
})
// End of About Me Text

// Projects
const container = document.querySelector('.container')
const projects = document.querySelectorAll('.project')
const projectHideButton = document.querySelector('.project-hide-btn')

// Start of projects.forEach
projects.forEach((project, index) => {
  project.addEventListener('mouseenter', () => {
    // Access the image element
    // subtract the height of the project from the height of the image
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px`
  })

  // on mouse leave the image will scroll bag to the top
  project.addEventListener('mouseleave', () => {
    project.firstElementChild.style.top = '2rem'
  })

  // Big Project Image
  project.addEventListener('click', () => {
    // create div elemement
    const bigImageWrapper = document.createElement('div')
    // assing a classname to div element
    bigImageWrapper.className = 'project-image-wrapper'
    // attach the image to the container using appendchild
    container.appendChild(bigImageWrapper)

    // create img elemement
    const bigImage = document.createElement('img')
    // assign a classname to div element
    bigImage.className = 'project-image'
    // store the path of the project image that is clicked on
    // split the image path where the is a dot and store in an array using split
    // store the first element using [0]
    const imagePath = project.firstElementChild
      .getAttribute('src')
      .split('.')[0]
    console.log(imagePath)
    // Set attributes on bigImage
    bigImage.setAttribute('src', `${imagePath}-big.jpg`)
    // attach the image to the bigImageWrapper div using appendchild
    bigImageWrapper.appendChild(bigImage)

    // hide the scroll on the page when an image is clicked on
    document.body.style.overflowY = 'hidden'

    document.removeEventListener('scroll', scrollFn)

    // When clickin on a project remove the outline of the mousecircle on the project fromn view
    mouseCircle.style.opacity = 0

    progressBarFN(bigImageWrapper)

    // When scrolling on project image, rotate the red line on the scroll icon
    // in CSS .project-image, add block property for the arrow to flip when scrolled to the bottom
    bigImageWrapper.onscroll = () => {
      progressBarFN(bigImageWrapper)
    }

    // add the change class to projectHideButton
    projectHideButton.classList.add('change')

    //remove the project hide button and the bigimage wrapper when close is clicked
    projectHideButton.onclick = () => {
      projectHideButton.classList.remove('change')
      bigImageWrapper.remove()
      document.body.style.overflowY = 'scroll'

      document.addEventListener('scroll', scrollFn)

      progressBarFN()
    }
  })

  // hide the last 4 projects
  // Dynmacally assign new css properties to any div with the project class if it is's index is greater than 6
  index >= 6 && (project.style.cssText = 'display: none; opacity:0')
})
// End of projects.forEach

// Projects Button
const section3 = document.querySelector('.section-3')
const projectsBtn = document.querySelector('.projects-btn')
const projectsBtnText = document.querySelector('.projects-btn span')
let showHideBool = true

const showProjects = (projects, index) => {
  setTimeout(() => {
    projects.style.display = 'flex'
    // scroll to the bottom of the page when show more button is clicked
    section3.scrollIntoView({ block: 'end' })
  }, 600)

  setTimeout(() => {
    projects.style.opacity = '1'
  }, index * 200)
}

const hideProjects = (projects, index) => {
  setTimeout(() => {
    projects.style.display = 'none'
    section3.scrollIntoView({ block: 'end' })
  }, 1200)

  setTimeout(() => {
    projects.style.opacity = '0'
  }, index * 100)
}

projectsBtn.addEventListener('click', (e) => {
  e.preventDefault()

  // toggle the arrow on the show more button to point downwards when clicked and showing more projects
  projectsBtn.firstElementChild.nextElementSibling.classList.toggle('change')

  showHideBool
    ? (projectsBtnText.textContent = 'Show Less')
    : (projectsBtnText.textContent = 'Show More')

  // loop through projects
  projects.forEach((project, index) => {
    // if index is greater than 6
    // Shortcircuiting &&
    // Ternary operator to execute functions
    index >= 6 &&
      (showHideBool
        ? showProjects(project, index)
        : hideProjects(project, index))
  })
  // set showHideBool = False
  showHideBool = !showHideBool
})
// End of Projects Button

// End of Big Project Image
// End Projects

// Section 4
document.querySelectorAll('.service-btn').forEach((service) => {
  service.addEventListener('click', (e) => {
    e.preventDefault()

    const serviceText = service.nextElementSibling
    serviceText.classList.toggle('change')

    // Move the UI text to the right of the page when clicked
    // service.firstElementChild = span element within service-btn
    const rightPosition = serviceText.classList.contains('change')
      ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})`
      : 0

    // Move the span element to the rightposition on the page
    service.firstElementChild.style.right = rightPosition
  })
})
// End of Section 4

// Section 5
// Form
const formHeading = document.querySelector('.form-heading')
const formInputs = document.querySelectorAll('.contact-form-input')

// add transition: opacity 0.3s; to .form-heading in CSS for fade effect
formInputs.forEach((input) => {
  input.addEventListener('focus', () => {
    formHeading.style.opacity = '0'
    setTimeout(() => {
      formHeading.textContent = `Your ${input.placeholder}`
      formHeading.style.opacity = '1'
    }, 300)
  })

  input.addEventListener('blur', () => {
    formHeading.style.opacity = '0'
    setTimeout(() => {
      formHeading.textContent = `Contact Details & Query`
      formHeading.style.opacity = '1'
    }, 300)
  })
})
// End of Form

// SlideShow
const slideshow = document.querySelector('.slideshow')

setInterval(() => {
  const firstIcon = slideshow.firstElementChild

  firstIcon.classList.add('faded-out')

  // Select the third Icon
  const thirdIcon = slideshow.children[3]

  thirdIcon.classList.add('light')
  thirdIcon.previousElementSibling.classList.remove('light')

  setTimeout(() => {
    slideshow.removeChild(firstIcon)

    slideshow.appendChild(firstIcon)

    setTimeout(() => {
      firstIcon.classList.remove('faded-out')
    }, 500)
  }, 500)
}, 3000)

// End of SlideShow

// Form Validation
const form = document.querySelector('.contact-form')
const username = document.getElementById('name')
const email = document.getElementById('email')
const subject = document.getElementById('subject')
const message = document.getElementById('message')
const errorMessages = document.querySelectorAll('.message')

// display error message function
const error = (input, message) => {
  // use nextElementSibling as it is a sibling of the input element and the parent is the form
  input.nextElementSibling.classList.add('error')
  input.nextElementSibling.textContent = message
}

// Remove error message if details submitted correctly
const success = (input) => {
  input.nextElementSibling.classList.remove('error')
}

// Function to check if input fields are empty or not?
const checkRequiredFields = (inputArray) => {
  // Loop through the inputarray using higher order function for each
  inputArray.forEach((element) => {
    // Check if element is empty but also use trim to remove any whitespace entered by user
    if (element.value.trim() === '') {
      // Call error message function, pass in two arguments
      error(element, `${element.id} is required`)
    }
  })
}

// Check length of input fields
const checkLength = (input, min) => {
  if (input.value.trim().length < min) {
    error(input, `${input.id} must be at least ${min} characters`)
  } else {
    success(input)
  }
}

// check email validation function
const checkEmail = (input) => {
  // regexpression to validate email
  const regExpression =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (regExpression.test(input.value.trim())) {
    success(input)
  } else {
    error(input, `${input.id} is not valid`)
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  checkLength(username, 2)
  checkLength(subject, 2)
  checkLength(message, 10)
  checkEmail(email)
  checkRequiredFields([username, email, subject, message])
})

// End of Form Validation
// End of Section 5
