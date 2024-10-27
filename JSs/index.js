
  function updateMarginTop() {
      const header = document.querySelector('header');
      const wlcContainer = document.querySelector('.wlc');
      const wlcmContainer = document.querySelector('.feeds');
      const frtContainer = document.querySelector('.front');

      const extraPixels = 20;
      if (header && wlcContainer) {
          const headerHeight = header.getBoundingClientRect().height;
          
          wlcContainer.style.marginTop = `${headerHeight + extraPixels}px`;
          wlcmContainer.style.marginTop = `${headerHeight + extraPixels}px`;
        //   frtContainer.style.marginTop = `${headerHeight + extraPixels}px`;

      }
      
  }

  window.addEventListener('load', updateMarginTop);

  window.addEventListener('resize', updateMarginTop);







  const imageContainer = document.querySelector('.image-container');
  const imagesFolder = 'Alumni/'; // Path to the images folder
  const totalImages = 16; // Total number of images in the folder
  const imagesToShow = 9; // Number of random images to display
  const imageElements = [];
  
  function loadRandomImages() {
    const usedIndices = new Set(); // To keep track of images already used
  
    // Clear previous images if necessary
    imageContainer.innerHTML = '';
  
    while (usedIndices.size < imagesToShow) {
      const randomIndex = Math.floor(Math.random() * totalImages) + 1;
  
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
  
        const imgElement = document.createElement('img');
        const imagePath = `${imagesFolder}img${randomIndex}.jpg`; // e.g., images/img1.jpg
  
        // Set the image source and class for styling
        imgElement.src = imagePath;
        imgElement.classList.add('random-image'); // Add the CSS class to style
        imageElements.push(imgElement); // Store the image element in an array
        imageContainer.appendChild(imgElement); // Append the image to the container
      }
    }
  
    showRandomImages(); // Start the animation process
  }
  
  let imageSize, spacing;
  
  // Function to update sizes dynamically based on container size
  function updateSizes() {
    imageSize = imageContainer.offsetWidth * 0.12;  // 12% of the container width
    spacing = imageSize + 20; // Minimum spacing between images
  }
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function generateRandomPosition(imagePositions) {
    let randomX, randomY;
    let overlapping;
  
    // Keep generating random positions until no overlap is found
    do {
      overlapping = false;
      randomX = getRandomInt(0, imageContainer.offsetWidth - imageSize);
      randomY = getRandomInt(0, imageContainer.offsetHeight - imageSize);
  
      // Check if the new random position overlaps with any existing image positions
      for (let pos of imagePositions) {
        const distance = Math.sqrt(Math.pow(pos.x - randomX, 2) + Math.pow(pos.y - randomY, 2));
        if (distance < spacing) {
          overlapping = true;
          break;
        }
      }
    } while (overlapping);
  
    return { x: randomX, y: randomY };
  }
  
  function showRandomImages() {
    updateSizes();  // Update image and spacing sizes based on container size
  
    // Hide all images initially
    imageElements.forEach(img => {
      img.classList.remove('show');
      img.classList.add('hide');
    });
  
    // Randomly select 2-3 images to show
    const numImagesToShow = getRandomInt(6, 8);
    const imagesToShow = [];
    const imagePositions = []; // Track positions of shown images
  
    while (imagesToShow.length < numImagesToShow) {
      const randomIndex = getRandomInt(0, imageElements.length - 1);
      if (!imagesToShow.includes(imageElements[randomIndex])) {
        imagesToShow.push(imageElements[randomIndex]);
      }
    }
  
    // Show the selected images in random positions
    imagesToShow.forEach(img => {
      const position = generateRandomPosition(imagePositions);
      imagePositions.push(position); // Store the position to avoid future overlap
  
      img.style.left = `${position.x}px`;
      img.style.top = `${position.y}px`;
  
      img.classList.remove('hide');
      img.classList.add('show');
    });
  
    // After 1.5-2 seconds, hide them again and repeat the process
    setTimeout(showRandomImages, getRandomInt(1500, 2000));
  }
  
  // Adjust sizes on window resize
  window.onresize = updateSizes;
  
  // Start loading the random images and animation after the page loads
  window.onload = () => {
    loadRandomImages();  // Load images first
    updateSizes();
  };