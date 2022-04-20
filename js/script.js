const pixels = document.querySelectorAll(`.console div`);
const turn = document.querySelector(`.turn`);
const left = document.querySelector(`.left`);
const right = document.querySelector(`.right`);
const down = document.querySelector(`.down`);
const score = document.querySelector(`.score`);
const lines = document.querySelector(`.lines`);
const live = document.querySelector(`.live`);
const level = document.querySelector(`.level`);
const play = document.querySelector(`.play`);
const reset = document.querySelectorAll(`.reset`);
const end = document.querySelector(`.gameOver`);
let j,
i,
t,
s = 300;
let objLineNum = {
   line: 0
}
let objScore = {
   score: 0
}
let objLive = {
   live: 3
}

class game {
   constructor(i, j, s=315, t = 0) {
      this.i = i;
      this.j = j;
      this.t = t;
      this.s = s;
      this.limit = [450];
      this.lastObj = {};
      this.count = 0;
      this.level = 0;
   }
   posI(i) {
      return [
         [i,
            i + 15,
            i + 30,
            i + 45],
         [i + 16,
            i + 15,
            i + 14,
            i + 13]
      ];
   }
   posL(i) {
      return [
         [i,
            i + 15,
            i + 30,
            i + 29],
         [i + 16,
            i + 15,
            i + 14,
            i - 1],
         [i + 30,
            i + 15,
            i,
            i + 1],
         [i + 14,
            i + 15,
            i + 16,
            i + 31]
      ];
   }
   posL2(i) {
      return [
         [i,
            i + 15,
            i + 30,
            i + 31],
         [i + 16,
            i + 15,
            i + 14,
            i + 29],
         [i + 30,
            i + 15,
            i,
            i - 1],
         [i + 14,
            i + 15,
            i + 16,
            i + 1]
      ];
   }
   posO(i) {
      return [[i,
         i + 1,
         i + 15,
         i + 16]];
   }
   posT(i) {
      return [
         [i,
            i + 14,
            i + 15,
            i + 16],
         [i + 14,
            i + 30,
            i + 15,
            i],
         [i + 30,
            i + 16,
            i + 15,
            i + 14],
         [i + 16,
            i,
            i + 15,
            i + 30]
      ];
   }
   posZ(i) {
      return [
         [i,
            i + 1,
            i + 16,
            i + 17],
         [i + 30,
            i + 15,
            i + 16,
            i + 1]
      ];
   }
   posZ2(i) {
      return [
         [i,
            i + 1,
            i + 14,
            i + 15],
         [i + 15,
            i,
            i + 31,
            i + 16]
      ];
   }

   shapeArr() {
      return [
         this.posI,
         this.posL,
         this.posL2,
         this.posO,
         this.posT,
         this.posZ,
         this.posZ2
      ];
   }
   turn() {
      if (this.t < this.lastObj.Arr.length - 1) {
         let x = this.shapeArr()[this.j](this.i)[this.t+1]
         for (let y of x) {
            if (y%15 == 14||y%15==13) {
               for (let z of x) {
                  if (z%15 == 0||z%15==1) {
                     return
                  }
               }
            }
            if(y>449){
               return
            }
         }
         for (let y of this.limit) {
               for (let z of x) {
                  if (z == y) {
                     return
                  }
               }
         }
         this.t++;
      } else {
         for(let x of this.shapeArr()[this.j](this.i)[0]){
            if(x>449){
               return
            }
            if (x%15 == 14) {
               for (let z of this.shapeArr()[this.j](this.i)[0]) {
                  if (z%15==0) {
                     return
                  }
               }
            }
            for (let y of this.limit) {
                  if (x == y) {
                     return
                  }
            }
         }
         this.t = 0;
      }
   }
   right() {
      let y = this.i+1
      let b = true
      for (let x of this.shapeArr()[this.j](this.i)[this.t]) {
         if (x%15 == 14) {
            return
         }
      }
      for (let x of this.limit) {
         for (let z of this.shapeArr()[this.j](this.i+1)[this.t]) {
            if (x == z) {
               b = false
            }
         }
      }
      this.go(b, y)
   }
   go(a, c) {
      if (a) {
         this.i = c
      }
   }
   left() {
      let y = this.i-1
      let b = true
      for (let x of this.shapeArr()[this.j](this.i)[this.t]) {
         if (x%15 == 0) {
            return
         }
      }

      for (let x of this.limit) {
         for (let z of this.shapeArr()[this.j](y)[this.t]) {
            if (x == z) {
               b = false
            }
         }
      }
      this.go(b, y)
   }
   down() {
      if (this.i > 350) return
      let y = this.i+15
      let b = true
      for (let x of this.limit) {
         for (let z of this.shapeArr()[this.j](this.i+15)[this.t]) {
            if (x == z) {
               b = false
            }
         }
      }
      this.go(b, y)
   }
   createBlock([a, b, c, d]) {
      pixels[a].classList.add(`green`, `active`);
      pixels[b].classList.add(`green`, `active`);
      pixels[c].classList.add(`green`, `active`);
      pixels[d].classList.add(`green`, `active`);
   }
   createGameEndBlock([a, b, c, d]) {
      pixels[a].classList.add(`red`);
      pixels[b].classList.add(`red`);
      pixels[c].classList.add(`red`);
      pixels[d].classList.add(`red`);
   }
   blockMaker() {
      if(this.i<15){
         for(let x of this.shapeArr()[this.j](this.i)[this.t]){
            if(pixels[x].classList.contains(`green`)){
               clearInterval(this.playInterval)
               this.createGameEndBlock(this.shapeArr()[this.j](this.i)[this.t])
               end.style.display=`block`
               return;
            }
         }
      }
      this.createBlock(
         this.shapeArr()[this.j](this.i)[this.t],
         (this.lastObj.A = this.shapeArr()[this.j](this.i)[this.t]),
         (this.lastObj.Arr = this.shapeArr()[this.j](this.i))
      );
      this.i += 15;
      this.lastObj.I = this.i;
   }
   checkLimits() {
      for (let x of this.shapeArr()[this.j](this.i)[this.t]) {
         for (let y of this.limit) {
            if (x >= 450 || x == y) {
               clearInterval(this.playInterval);
               document.querySelectorAll(`.active`).forEach((e) => {
                  e.classList.remove(`active`);
               });
               let x = this.lastObj.A[this.lastObj.A.length-1]
               if (x != this.limit[this.limit.length-1]) {
                  this.lastObj.A.forEach((e) => this.limit.push(e));
               }
               this.checkScore()
               this.blockContinuity();
               return x >= 450 || x == y
            }
         }
      }
   }
   checkScore() {
      let arr = this.lastObj.A.sort()
      for (let u of arr) {
         let  x = Math.floor(u/15);
         for (let i = 0, count = 0; i < 15; i++) {
            if (pixels[x*15+i].classList.contains(`green`)) {
               count++
            }
            if (count == 15) {
               objLineNum.line += 1
               lines.innerHTML = `Lines:${objLineNum.line}`
               objScore.score += 10
               score.innerHTML = `Score: ${objScore.score}`
               for (let i = 0, count = 0; i < 15; i++) {
                  this.limit = this.limit.filter((n)=> n != x*15+i)
                  pixels[x*15+i].classList.remove(`green`)
               }
               while (--x) {
                  for (let i = 0; i < 15; i++) {
                     if (pixels[x*15+i].classList.contains(`green`)) {
                        this.limit = this.limit.filter((n)=> n != x*15+i)
                        pixels[(x+1)*15+i].classList.add(`green`)
                        this.limit.push([x+1]*15+i)
                        pixels[x*15+i].classList.remove(`green`)
                     }
                  }
               }
            }
         }
      }
   }
   blockContinuity() {
      this.j = Math.floor(Math.random() * this.shapeArr().length);
      this.i = Math.floor(Math.random() * 12 + 1)
      this.t = 0
      if(this.s>50){
         this.s-=3
         this.count++
         if(this.count==10){
            this.count = 0
            this.level++
            level.innerHTML = `Level:${this.level}`
         }
      }
      this.playInterval = setInterval(() => {
         this.checkLimits();
         if (!this.checkLimits) {
            return
         }
         document.querySelectorAll(`.active`).forEach((e) => {
            e.classList.remove(`green`, `active`);
         });
         this.blockMaker();
      },
         this.s);
   }
   reset(){
      for(let x of this.limit){
         clearInterval(this.playInterval)
         if(x==450) continue
         pixels[x].classList.remove(`green`)
      }
      for(let x of this.shapeArr()[this.j](this.i)[this.t]){
         pixels[x].classList.remove(`red`)
      }
      for(let x of this.shapeArr()[this.j](this.i-15)[this.t]){
         if(this.i-15>0){
            pixels[x].classList.remove(`green`)
         }
      }
      play.addEventListener(`click`, start)
      this.i = 0
      this.t = 0
      this.s = 315
      this.limit = [450]
      end.style.display=`none`
      objLineNum.line = 0
      lines.innerHTML = `Lines:${objLineNum.line}`
      objScore.score = 0
      score.innerHTML = `Score: ${objScore.score}`
      this.level = 0
      level.innerHTML =`Level:${this.level}`
   }
}
function start() {
   gameObj.blockContinuity()
   play.removeEventListener(`click`,
      start)
}

let gameObj = new game(i, j, t, s);
play.addEventListener(`click`, start);
turn.addEventListener(`click`, () => {
   gameObj.turn();
});
left.addEventListener(`click`, ()=> {
   gameObj.left()
})
right.addEventListener(`click`, ()=> {
   gameObj.right()
})
down.addEventListener(`click`, ()=> {
   gameObj.down()
})
window.addEventListener(`keydown`, (event)=>{
   switch(event.keyCode){
      case 65: gameObj.left()
      break;
      case 68: gameObj.right()
      break;
      case 83: gameObj.down()
      break;
      case 87: gameObj.turn()
      break;
      default: return
   }  
})
reset.forEach(e=>e.addEventListener(`click`, ()=>{
   gameObj.reset()
}))