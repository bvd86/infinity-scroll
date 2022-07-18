const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photoArray = [];

// Unsplash API
const count = 10;
const apiKey = 'hry7lEFjfPvqg6IfjS_RKv-isc0GUjqQ55PxRlb4EMU'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper Function
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create Element for Links & Photos
const displayPhotos = () => {
  photoArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('title', photo.alt_description);
    // img.setAttribute('alt', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_decription,
      title: photo.alt_decription,
    })
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

// On Load
getPhotos();
