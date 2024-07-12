/////////////////// CALENDAR
document.addEventListener('DOMContentLoaded', function() {
    const daysList = document.querySelector('.days');
    
    // Array to hold event information for each day
    const events = [
        { day: 10, title: '@6pm indoors: Commander night', description: 'Wednesdays @6pm indoors: Commander night ($10 for the whole night + a raffle- we have been raffling packs and  secret lair cards!)' },
        { day: 17, title: '@6pm indoors: Commander night', description: 'Wednesdays @6pm indoors: Commander night ($10 for the whole night + a raffle- we have been raffling packs and  secret lair cards!)' },
        { day: 24, title: '@6pm indoors: Commander night', description: 'Wednesdays @6pm indoors: Commander night ($10 for the whole night + a raffle- we have been raffling packs and  secret lair cards!)' },
        { day: 31, title: '@6pm indoors: Commander night', description: 'Wednesdays @6pm indoors: Commander night ($10 for the whole night + a raffle- we have been raffling packs and  secret lair cards!)' },
        { day: 2, title: 'Event Title for Jan 2', description: 'Event details for Jan 2 go here...' },
        // Add more events as needed
    ];
    
   // Calculate July 2024 start day (July 1st is Monday)
   const startDay = 1; // Monday (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
    
   // Generate days dynamically for July 2024 (31 days)
   const daysInMonth = 31;
   
   for (let i = 1; i <= daysInMonth; i++) {
       const dayItem = document.createElement('li');
       dayItem.textContent = i;
       
       // Calculate day of the week for current day
       const dayOfWeek = (startDay + (i - 1)) % 7; // Modulo 7 to wrap around the week
       
       dayItem.classList.add('day-' + dayOfWeek); // Add class to style based on day of the week
       
       // Check if the current day has an event
       const event = events.find(event => event.day === i);
       if (event) {
           dayItem.classList.add('has-event'); // Apply a class for styling
       }
       
       // Add click event listener to show event details
       dayItem.addEventListener('click', function() {
           if (event) {
               openEventPopup(event.title, event.description);
           } else {
               openEventPopup('No Event', 'There are no events scheduled for this day.');
           }
       });
       
       daysList.appendChild(dayItem);
   }
   
   // Function to open event pop-up
   function openEventPopup(eventTitle, eventDescription) {
       const eventPopup = document.querySelector('.event-popup');
       const eventPopupContent = document.querySelector('.event-popup-content');
       eventPopup.style.display = 'block';
       eventPopupContent.querySelector('h2').textContent = eventTitle;
       eventPopupContent.querySelector('p').textContent = eventDescription;
       
       // Close event pop-up when close button or outside is clicked
       const closeBtn = document.querySelector('.close');
       closeBtn.addEventListener('click', function() {
           eventPopup.style.display = 'none';
       });
       
       window.addEventListener('click', function(event) {
           if (event.target === eventPopup) {
               eventPopup.style.display = 'none';
           }
       });
   }
});

  














//////////////////////////// TABBED MENU

function showContent(tabNumber) {
    // Hide all content divs
    var contents = document.querySelectorAll('.content');
    contents.forEach(function(content) {
      content.style.display = 'none';
    });
  
    // Remove 'active' class from all tabs
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) {
      tab.classList.remove('active');
    });
  
    // Show the selected content and mark the corresponding tab as active
    document.getElementById('content-' + tabNumber).style.display = 'block';
    tabs[tabNumber - 1].classList.add('active');

    // Initialize or cleanup Three.js based on tab activation
    if (tabs[tabNumber - 1].classList.contains('active')) {
        initThreeJs(tabNumber);
    } else {
        cleanupThreeJs(tabNumber);
    }
  }

  // Initial setup, e.g., activate the first tab by default
document.addEventListener('DOMContentLoaded', function() {
    showContent(1); // Activate the first tab by default
});




















/////////////// 3D TATER TOTS

let camera, scene, renderer, cube;

function init() {
	// Init scene
	scene = new THREE.Scene();

	// Init camera (PerspectiveCamera)
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	// Init renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });

	// Set size (whole window)
	renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setClearColor(0xDDFDFF); // Set background color here (white in this case)

	// Render to canvas element
	document.body.appendChild(renderer.domElement);

	// Init BoxGeometry object (rectangular cuboid)
	const geometry = new THREE.BoxGeometry(2, 2, 3); // This is the depth, width, and the height

	// Create material with color
	// const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

	// Add texture - 
	const texture = new THREE.TextureLoader().load('Tater_Tots_Seasoning.jpg');

	// Create material with texture
	const material = new THREE.MeshBasicMaterial({ map: texture });

	// Create mesh with geo and material
	cube = new THREE.Mesh(geometry, material);
	// Add to scene
	scene.add(cube);

	// Position camera
	camera.position.z = 5;
}

// Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);

	// Rotate cube (Change values to change speed)
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
}

function onWindowResize() {
	// Camera frustum aspect ratio
	camera.aspect = window.innerWidth / window.innerHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
