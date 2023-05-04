
function initialLoad(){

const formInput = document.getElementById('input-text-field')
const planetInfo = document.getElementById('planet-info')
const form = document.getElementById('search-form')


initialPlanetsFetch()


form.addEventListener('submit',planetsSearch)


function displayPlanets(planets){
    
    const h2 = document.createElement('h2')
    h2.innerText = planets.name

     
     const p = document.createElement('h4')
     p.innerText = 'Climate: ' + planets.climate
 
     
     const p2 = document.createElement('h4')
     p2.innerText = 'Population: ' + planets.population
 
     
     const p3 = document.createElement('h4')
     p3.innerText = 'Terrain: ' + planets.terrain

     
    const h4 = document.createElement('h4')
    h4.innerText = 'Surface Water Percentage: ' + planets.surface_water

   
    const addBtnSpan = document.createElement('span')
    addBtnSpan.classList = `${planets.name} buttons`

    
    const addBtn = document.createElement('button')
    addBtn.innerText = 'Add Planets'
    addBtn.classList = 'add-btn'
    addBtn.addEventListener('click', (e) => addCopyOfPlanetsToSelection(e), {once:true})
    addBtn.addEventListener('mouseover', (e) => changeColor(e))
    addBtn.addEventListener('mouseleave', (e) => changeColorBack(e))
    addBtnSpan.append(addBtn)
    
   

    
    const div = document.createElement('div')
    div.id = `${planets.name}`

    div.append(h2, h4, p, p2, p3, addBtnSpan)
    planetInfo.appendChild(div)
}


function deletePlanets(e){
    const selected = e.target.parentNode.parentNode
    selected.remove()
}


function addCopyOfPlanetsToSelection(thisPlanets){
    const newLocation = document.getElementById('Itinerary')
    const planetsClone = thisPlanets.target.parentNode.parentNode.cloneNode(true)

    
    planetsClone.classList.add('selected-planets')
    planetsClone.removeAttribute('id')
    planetsClone.querySelector('span').children[0].remove()

    
    const removeBtnSpan = planetsClone.querySelector('span')
    const removeBtn = document.createElement('button')

    
    removeBtn.innerText = 'Remove Planets'
    removeBtn.className = 'remove-btn'
    removeBtn.addEventListener('click', (e) => deletePlanets(e))
    removeBtn.addEventListener('mouseover', (e) => changeColor(e))
    removeBtn.addEventListener('mouseleave', (e) => changeColorBack(e))

    
    removeBtnSpan.append(removeBtn)
    planetsClone.append(removeBtnSpan)
    newLocation.appendChild(planetsClone)
}


function changeColor(btn){
    if(btn.target.className === 'remove-btn'){
        btn.target.classList.toggle('red-btn-mouse-over')
    }
    if(btn.target.className === 'add-btn'){
        btn.target.classList.toggle('black-btn-mouse-over')
    }
}
function changeColorBack(btn){
    if(btn.target.className === 'remove-btn red-btn-mouse-over'){
        btn.target.classList.toggle('red-btn-mouse-over')
    }
    if(btn.target.className === 'add-btn black-btn-mouse-over'){
        btn.target.classList.toggle('black-btn-mouse-over')
    }
}


    function planetsSearch(e){
        e.preventDefault()
        const planetsHeader = document.getElementById('planet-info').querySelectorAll('div')
        planetsHeader.forEach(planet => {
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


function initialPlanetsFetch(){
     fetch('https://swapi.dev/api/planets/')
    .then(resp => resp.json())
    .then(data => {
        const planetsArray = data.results
        planetsArray.forEach(planet => {
            singlePlanetsFetch(planet.url)
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
}

document.addEventListener("DOMContentLoaded",initialLoad)

//animated background code
    const canvas = document.getElementById('starField');
    const c = canvas.getContext('2d');
    canvas.width = window.innerWidth; //screen width
    canvas.height = window.innerHeight; //screen height

    class Star {
    constructor() {
        
        this.x = Math.random()*canvas.width-canvas.width/2;  
        this.y = Math.random()*canvas.height-canvas.height/2; 
        this.px, this.py;
        this.z = Math.random()*4;     
    }
    
    update() {
           
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
    
    for (let i = 0; i < 250; i++) stars.push(new Star());
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.strokeStyle = 'rgb(255,255,255)' ;
    c.translate(canvas.width/2, canvas.height/2);
    function draw() {
    
    c.fillRect(-canvas.width/2, -canvas.height/2, 
    canvas.width, canvas.height);
    for (let s of stars) {
        s.update();
        s.show();
    }
    
    requestAnimationFrame(draw);
    }
    draw();

