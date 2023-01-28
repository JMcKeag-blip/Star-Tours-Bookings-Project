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
    if (this.x > canvas.width/2+50 || this.x < -canvas.width/2-50 || this.y > canvas.height/2+50 || this.y < -canvas.height/2-50) {
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
//create 1500 stars (objects)
for (let i = 0; i < 1500; i++) stars.push(new Star());
c.fillStyle = 'rgba(0, 0, 0, 0.1)';
c.strokeStyle = 'rgb(255,255,255)' ;
c.translate(canvas.width/2, canvas.height/2);
function draw() {
  //create rectangle
  c.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
  for (let s of stars) {
    s.update();
    s.show();
  }
  //infinte call to draw
  requestAnimationFrame(draw);
}
draw();