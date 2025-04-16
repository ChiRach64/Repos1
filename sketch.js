var osc1 = []
var osc2 = []
var osc3 = []
var counter1 = 0
var counter2 = 0
var currentTime1 = 0
var currentTime2 = 0

let beat1
let beat1Env
let vars1 = [750,750,500]

let beat2
let beat2Env
let vars2 = [250,250,250,250,250,250,250,250]

let slider1, slider2, slider3;


let audioStarted = false;

function setup() {
  createCanvas(displayWidth, displayHeight)
  for (let i = 0; i <= 5; i++) {
    osc1[i] = new planeX(i);
  }

  for (let i = 0; i <=3; i++){
    osc2[i] = new planeY(i);
  }
  
  for (let i = 0; i <=3; i++){
    osc3[i] = new drone(i);
  }

  beat1 = new p5.Oscillator("sawtooth")
  beat1.amp(0)
  beat1Env = new p5.Envelope (0.01,1.5,0.1,0.1)
  beat1.start(); 
  
  beat2 = new p5.Oscillator("sine")
  beat2.amp(0)
  beat2Env = new p5.Envelope(0.02,0.75,0.1,0.1)
  beat2.start();

  slider1 = createSlider(0,220)
  slider1.position(50,50)
  
  slider2 = createSlider(0,55)
  slider2.position(200,50)
  
  tempoSlider1 = createSlider(0,300)
  tempoSlider1.position(350,50)
  
  tempoSlider2 = createSlider(0,300)
  tempoSlider2.position(500,50)
  
  fft = new p5.FFT();
  fft.setInput(beat2)



  
}

function draw() {
  
  tempo1 = tempoSlider1.value()
  tempo2 = tempoSlider2.value()
  
  background(random(0,255),random(0,255),random(0,255),16)
  
  let waveform = fft.waveform()
  noFill();
  beginShape();
  
  stroke(255)
  strokeWeight(2)
  for (let i = 0; i < waveform.length; i = i+16){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex (x,y)
  }
  endShape()

  fill("white")
  textSize(25)
  text ("TEMPO1", 350,100)
  
  fill("white")
  textSize(25)
  text ("TEMPO2", 500,100)
  
  for (let i = 0; i <= 5; i++) {
    osc1[i].update();
  }

  for (let i = 0; i <=2; i++){
    osc2[i].update();
  }
  
  if (millis() > currentTime1+vars1[counter1]-tempo2){
    currentTime1 = millis()
      counter1++
    
    beat1.freq(55);
    beat1Env.play(beat1);
    if(counter1 > 2){
      counter1 = 0
    }
  }
  
  if (millis() > currentTime2+vars2[counter2]-tempo1){
    currentTime2 = millis()
      counter2++
    
    beat2.freq(random(55,110)+slider1.value());
    beat2Env.play(beat2);
    if(counter2 > 7){
      counter2 = 0
    }
  }
 }


class planeX {
  constructor(startingFreq){
    this.startingFreq = random(55,220);
    
    this.osc1 = new p5.Oscillator("triangle")
    this.newFreq = (this.startingFreq)*2.5
    this.osc1.freq(this.newFreq)
    this.osc1.phase(random(110,440))
    this.osc1.amp(0.05)
    this.osc1.start()
  }
  
  update(){
    this.osc1.freq(mouseX + this.newFreq)
  }
}

class planeY{
  constructor(){
    this.startingFreq = random(220,880);
    
    this.osc2 = new p5.Oscillator("sawtooth")
    this.newFreq = (this.startingFreq)*2
    this.osc2.freq(this.newFreq)
    this.osc2.phase(random(440,1760))
    this.osc2.amp(0.05)
    this.osc2.start()
  }
  
  update(){
    this.osc2.freq(-mouseY + this.newFreq)
  }
}

class drone {
  constructor(startingFreq){
    this.startingFreq = random(110,440);
    
    this.osc3 = new p5.Oscillator("sine")
    this.newFreq = (this.startingFreq);
    this.osc3.freq(this.newFreq);
    this.osc3.phase(random(55,110))
    this.osc3.amp(0.05)
    this.osc3.start()
  }
}

function mousePressed() { // needed to get it to work in full screen mode
    // Start audio on user gesture
    if (!audioStarted) {
        userStartAudio();
        audioStarted = true;
    }
}