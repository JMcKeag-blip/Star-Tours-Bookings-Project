// Global Variables
const formInput = document.getElementById('input-text-field')
const planetInfo = document.getElementById('planet-cards')
const form = document.getElementById('search-form')

// Page initial Fetch for loading Planet Cards
initialPlanetFetch()

// Global Event listeners
form.addEventListener('submit', (e) => planetSearch(e))

// CREATION FUNCTION ------------------------------------------------------------------------------
// Creates all the monster cards based off of information from the initial fetch request
function displayPlanets(planet){
    // Monster Name
    const h2 = document.createElement('h2')
    h2.innerText = planet.name
}
// Planet Search Function, Allows for Name search, Search by letter, And Clears to show all Planet Cards
    function planetSearch(e){
        e.preventDefault()
        const planetHeader = document.getElementById('planet-cards').querySelectorAll('div')
        planetHeader.forEach(planet => {
            const input = formInput.value.toUpperCase()
            if(input === ''){
                planet.hidden = false
            }
            if(input.length === 1){
                input !== planet.id.charAt(0) ? planet.hidden = true: planet.hidden = false
            }
            if(input.length > 1){
                input !== planet.id.toUpperCase() ? planet.hidden = true : planet.hidden = false
            }
        })
    }

// Fetch Functions For getting all the API Information for the planets
function initialPlanetFetch(){
    return fetch('https://swapi.dev/api/planets')
    .then(resp => resp.json())
    .then(data => {
        const planetArray = data.results
        planetArray.forEach(planet => {
            singlePlanetFetch(`${planet.url}`)
        })
    })
    .catch(err => console.log(err))
}

function singlePlanetFetch(URL){
    return fetch(`http swapi.dev/api/${URL}`)
    .then(resp => resp.json())
    .then(data => {
       displayPlanets(data)
    })
    .catch(err => console.log(err))
}

//animated background code
    const canvas = document.getElementById('starField');
    const c = canvas.getContext('2d');
    canvas.width = window.innerWidth; //screen width
    canvas.height = window.innerHeight; //screen height

    class Star {
    constructor() {
        //initializing
        this.x = Math.random()*canvas.width-canvas.width/2;  //random x
        this.y = Math.random()*canvas.height-canvas.height/2; //random y
        this.px, this.py;
        this.z = Math.random()*4; //random z    
    }
    
    update() {
        //stores previous x, y and z and generates new coordinates    
        this.px = this.x;
        this.py = this.y;
        this.z += speed;
        this.x += this.x*(speed*.03)*this.z;
        this.y += this.y*(speed*.03)*this.z;
        if (this.x > canvas.width/2+50 || this.x < -canvas.width/2-50 || 
        this.y > canvas.height/2+50 || this.y < -canvas.height/2-50) {
        this.x = Math.random()*canvas.width-canvas.width/2;
        this.y = Math.random()*canvas.height-canvas.height/2;
        this.px = this.x;
        this.py = this.y;
        this.z = 0;
        }
    }
    
    //draws line from x,y to px,py
    show() {    
        c.lineWidth = this.z;
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.px, this.py);
        c.stroke();
    }
    }
    let speed = 0.04;
    let stars = [];
    //create 250 stars (objects)
    for (let i = 0; i < 250; i++) stars.push(new Star());
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.strokeStyle = 'rgb(255,255,255)' ;
    c.translate(canvas.width/2, canvas.height/2);
    function draw() {
    //create rectangle
    c.fillRect(-canvas.width/2, -canvas.height/2, 
    canvas.width, canvas.height);
    for (let s of stars) {
        s.update();
        s.show();
    }
    //infinte call to draw
    requestAnimationFrame(draw);
    }
    draw();
