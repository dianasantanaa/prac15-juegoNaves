//añadimos las variables
let nave=document.querySelector('.nave');//variable de nave
let body=document.querySelector('body');//variable de la nave
let laser=document.getElementById('laser');//variable de laser
let explosion=document.getElementById('explosion');//variable de la explosion
let live=document.querySelector('i');//variable de las vidas
let times=document.getElementById('times');//tiempo
let lives=5;//vidas
let second=60;//record
//hacemos que si esta nave mata a mas naves enemigas de este mensaje
setInterval(() => {
    second--;
    times.textContent=second;
    if (second==0){
        alert('You Win!');
        location.reload();
    }
}, 1000);//rango de 1000
//funciona con solo mover el mause por la pantalla
document.addEventListener('mousemove',(e)=>{
    nave.style.left=(e.clientX-40)+'px';//estilo de la nave
});
//generar disparo
document.addEventListener('click',()=>{
    let bala=document.createElement('div');
    bala.classList.add('bala');
    bala.style.bottom=70+'px';//estilo de la bala
    bala.style.left=(nave.getBoundingClientRect().left+40)+'px';
    body.append(bala);
    laser.play();//el lacer avanza al enemigo

});
//movimiento de disparo
setInterval(()=>{
    let balas=document.querySelectorAll('.bala');
    balas.forEach(bala => {//damos estilo a la bala es decir los tamaños 
        bala.style.top=(bala.getBoundingClientRect().top-20)+'px';
        //hacemos que la bala avance
        if (bala.getBoundingClientRect().top<=0){
            bala.remove();//desaparece al encontar al enemigo
        }

        //detectar las colisiones
        let enemigos=document.querySelectorAll('.enemigo');

        enemigos.forEach(enemigo => {
            // se da la funcion si choca la bala con la nave
            if (bala.getBoundingClientRect().top<=enemigo.getBoundingClientRect().top+50){
                if (bala.getBoundingClientRect().left>=enemigo.getBoundingClientRect().left && bala.getBoundingClientRect().left<=enemigo.getBoundingClientRect().left+80){
                    enemigo.style.backgroundImage='url("img/explosion.png")';
                    explosion.play();
                   setTimeout(() => {
                       enemigo.remove();
                       explosion.stop();
                       
                   }, 100);

                }
            }
        });
    });
},100);

//generar meteoritos
let aparecer=0;
setInterval(()=>{
    aparecer++;
    if (aparecer%10==0){
        let enemigo=document.createElement('div');
        enemigo.classList.add('enemigo');
        body.append(enemigo);
        enemigo.style.left=(Math.random()*window.innerWidth-100)+'px';
    }
        let enemigos=document.querySelectorAll('.enemigo');
        enemigos.forEach(element => {
            element.style.top=(element.getBoundingClientRect().top+10)+'px';
            //cuando choca el laser coon la nave explota y se muestra la imagen
          if (element.getBoundingClientRect().top>nave.getBoundingClientRect().top){
              lives--;//vidas con el contrador
              live.textContent=lives;
              if (lives==-1){//si chocan las naves enemigas pierdes y muestra este mensaje
                  alert('Game Over');
                  location.reload();
              }//se deja de mover
              element.remove();
          }
        });
    
},100);