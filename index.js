// Global Variables
const formInput = document.getElementById('input-text-field')
const planetInfo = document.getElementById('planet-cards')
const form = document.getElementById('search-form')

// Page initial Fetch for loading Planet Cards
initialPlanetsFetch()

// Global Event listeners
form.addEventListener('submit', (e) => planetsSearch(e))

// CREATION FUNCTION
// Creates all the planet cards based off of information from the initial fetch request
function displayPlanets(planets){
    // Planets Name
    const h2 = document.createElement('h2')
    h2.innerText = planets.name

     // Planets Climate
     const p = document.createElement('p')
     p.innerText = 'Climate: ' + planets.climate
 
     // Population Size
     const p2 = document.createElement('p')
     p2.innerText = 'Population: ' + planets.population
 
     // Planets Terrain Type
     const p3 = document.createElement('p')
     p3.innerText = 'Terrain: ' + planets.terrain

     // Planets Surface Water (need good beaches for vacation)
    const h4 = document.createElement('h4')
    h4.innerText = 'Planets Surface bodies of water: ' + planets.surface_water

    // Button Span
    const btnSpan2 = document.createElement('span')
    btnSpan2.classList = `${planets.name} buttons`

    // Creates Add Button & Event Listeners
    const btn2 = document.createElement('button')
    btn2.innerText = 'Add Planets'
    btn2.classList = 'add-btn'
    btn2.addEventListener('click', (e) => addCopyOfPlanetsToSelection(e))
    btn2.addEventListener('mouseover', (e) => changeColor(e))
    btn2.addEventListener('mouseleave', (e) => changeColorBack(e))
    btnSpan2.append(btn2)

    // Div Creation
    const div = document.createElement('div')
    div.id = `${planets.name}`

    // Image => Only if there is an image provided by the API
    if(planets.image){
        const img = document.createElement('img')
        img.src = `http://swapi.dev${planets.image}`
        div.append(img)
    }

    div.append(h2, h4, p, p2, p3, btnSpan2)
    planetsCards.appendChild(div)
}
// END OF CREATION FUNCTION

// Functions
// Deletes Planets from the Selected Planets area
function deletePlanets(e){
    const selected = e.target.parentNode.parentNode
    selected.remove()
}

// Adds a copy of the selected palnets to the Selected Planets Area
// Also adds the Event Listeners for the Remove Monster button
function addCopyOfPlanetsToSelection(thisPlanets){
    const newLocation = document.getElementById('planets-field')
    const planetsClone = thisPlanets.target.parentNode.parentNode.cloneNode(true)

    // Adding Class, Removing id, Removing Add Button
    planetsClone.classList.add('selected-planets')
    planetsClone.removeAttribute('id')
    planetsClone.querySelector('span').children[0].remove()

    // Creates new span for moving button with CSS
    const btnSpan = planetsClone.querySelector('span')
    const btn = document.createElement('button')

    // Creates Remove Button & Event Listeners
    btn.innerText = 'Remove Planets'
    btn.className = 'remove-btn'
    btn.addEventListener('click', (e) => deletePlanets(e))
    btn.addEventListener('mouseover', (e) => changeColor(e))
    btn.addEventListener('mouseleave', (e) => changeColorBack(e))

    // Appending
    btnSpan.append(btn)
    planetsClone.append(btnSpan)
    newLocation.appendChild(planetsClone)
}


// Planets Search Function, Allows for Name search, Search by letter, And Clears to show all Planet Cards
    function planetsSearch(e){
        e.preventDefault()
        const planetsHeader = document.getElementById('planets-cards').querySelectorAll('div')
        planetsHeader.forEach(planets => {
            const input = formInput.value.toUpperCase()
            if(input === ''){
                planets.hidden = false
            }
            if(input.length === 1){
                input !== planets.id.charAt(0) ? planets.hidden = true: planets.hidden = false
            }
            if(input.length > 1){
                input !== planets.id.toUpperCase() ? planets.hidden = true : planets.hidden = false
            }
        })
    }

// Fetch Functions For getting all the API Information for the planets
function initialPlanetsFetch(){
    return fetch('https://swapi.dev/api/planets/')
    .then(resp => resp.json())
    .then(data => {
        const planetsArray = data.results
        planetsArray.forEach(planets => {
            singlePlanetsFetch(planets.url)
        })
    })
    .catch(err => console.log(err))
}

function singlePlanetsFetch(URL){
    return fetch(URL)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
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
