const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photoArray = [];
let ready = false
let imagesLoaded = 0;
let totalImages= 0;

// Unsplash API
const count = 30;
const apiKey = 'hry7lEFjfPvqg6IfjS_RKv-isc0GUjqQ55PxRlb4EMU'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if image were loaded
const imageLoaded = () => {
  imagesLoaded ++;
  if(imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create Element for Links & Photos
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photoArray.length
  photoArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_decription,
      title: photo.alt_decription,
    });
    // Event Listener, check when loading
    img.addEventListener('load', imageLoaded())
    // Put <img> inside <a> and in container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check scroll for bottom of the page
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotos()
  }
})

// On Load
getPhotos();
