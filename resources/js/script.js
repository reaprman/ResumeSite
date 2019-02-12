let slideIdx = 1;
let slides = document.getElementsByClassName('item');
let dots = document.getElementsByClassName('dot');
let firstRun = true;

AOS.init();
document.addEventListener('DOMContentLoaded', (event) => {
    rage();
});
document.getElementsByClassName("mobile-nav-icon")[0].addEventListener("click", () =>{
    let nav = document.getElementsByClassName("main-nav")[0];
    if(nav.style.display == "none" || nav.style.display == ""){
        nav.style.display = "inline-block";
    }else{
        nav.style.display = "none";
    }
    
    let icon = document.querySelector(".mobile-nav-icon i");
    if(icon.classList.contains("ion-md-menu")){
        icon.classList.toggle("ion-md-menu");
        icon.classList.toggle("ion-md-close");
    }else{
        icon.classList.toggle("ion-md-menu");
        icon.classList.toggle("ion-md-close");
    }
})

const rage = () => {

    window.addEventListener('click', function(event){
        if(event.target.id =="modal"){
            modalToggle(this.id);
        }
    })
}
function modalToggle(imgPath){
    slides[slideIdx-1].classList.add('active');
    dots[slideIdx-1].classList.add('dot-active');
    const modal = document.getElementById('modal');
    if(!modal.classList.contains('show-modal')){
       fillModalImg(imgPath); 
    }
     
    modal.classList.toggle('show-modal');
    if(!firstRun){
        slides[slideIdx-1].classList.remove('active');
        dots[slideIdx-1].classList.remove('dot-active');
        slideIdx = 1;
        firstRun = true;
        return;
    }
    firstRun = false;
}

function fillModalImg(imgPath){
    //let imgArr = imgPath.split(".");
    let imgName = imgPath.slice(0,-1);
    let img1 = `${imgName}1`; //`${imgName}1.${imgArr[3]}`
    let img2 = `${imgName}2`; 
    let img3 = `${imgName}3`;

    const imgModal1 = document.getElementById('mPic1');
    const imgModal2 = document.getElementById('mPic2');
    const imgModal3 = document.getElementById('mPic3');

    imgModal1.src = img1;
    imgModal2.src = img2;
    imgModal3.src = img3;

}

function modalArrows(direction) {
    displayModal(slideIdx += direction);
}

function modalSelect(selection){
    slideIdx = selection;
    displayModal(selection);
}

function displayModal(idx){

    if(idx > slides.length){
        slideIdx = 1;
    }
    if(idx == 0){ slideIdx = slides.length;}
    for (i = 0; i < slides.length; i++){
        if(slides[i].classList.contains('active')){
            slides[i].classList.remove('active');
            slides[slideIdx-1].classList.add('active');
            dots[i].classList.remove('dot-active');
            dots[slideIdx-1].classList.add('dot-active');
            return;
        }
    }
}
