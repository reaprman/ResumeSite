let slideIdx = 1;
let slides = document.getElementsByClassName('item');
let dots = document.getElementsByClassName('dot');
let firstRun = true;
let prevFocusedElement;
let firstFocus;
const modal = document.getElementById('modal');

AOS.init();
document.addEventListener('DOMContentLoaded', (event) => {
    rage();
    modalTrap(); 
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
    
    if(modal.classList.contains('show-modal')){
        //modal.classList.toggle('show-modal');
        // fix it here
        modalToggle(this.id);
    }
})

const rage = () => {

    window.addEventListener('click', function(event){
        if(event.target.id =="modal"){
            modalToggle(this.id);
        }
    })
}
const modalTrap = () => {
    let focusableElementString = 'a[href], button:not([disabled])';
    let focusableElement = modal.querySelectorAll(focusableElementString);
    focusableElement = Array.prototype.slice.call(focusableElement);
    firstFocus = focusableElement[0];
    let lastFocus = focusableElement[focusableElement.length - 1];
    modal.addEventListener('keydown', trapTapKey);

    function trapTapKey(event){
        if(event.keyCode == 9){
            if(event.shiftKey){
                if(document.activeElement == firstFocus){
                    event.preventDefault();
                    lastFocus.focus();
                }
            } else {
                if(document.activeElement == lastFocus){
                    event.preventDefault();
                    firstFocus.focus();
                }
            }
        }
        if(event.keyCode == 39){
            modalArrows(1);
        }
        if(event.keyCode == 37){
            modalArrows(-1);
        }
        if(event.keyCode == 27){
            modalToggle(this.id);
        }
    }
}

function modalToggle(imgPath){
    prevFocusedElement = document.activeElement;
    slides[slideIdx-1].classList.add('active');
    dots[slideIdx-1].classList.add('dot-active');
    if(!modal.classList.contains('show-modal')){
       fillModalImg(imgPath); 
    }
    let icon = document.querySelector(".mobile-nav-icon i");
    let nav = document.getElementsByClassName("main-nav")[0];
    if(icon.classList.contains('ion-md-close') && firstRun == true){
        nav.style.display = "none";
        icon.classList.toggle("ion-md-menu");
        icon.classList.toggle("ion-md-close");
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
    if(!modal.classList.contains('show-modal')){
        prevFocusedElement.focus();
    }else{
        firstFocus.focus();
    }
}

function fillModalImg(imgPath){
    let imgArr = imgPath.split(".");
    let imgArr2 = imgArr[2].split("/");
    let imgName = imgArr2[3].slice(0, -1);
    let img1 = `app/img/${imgName}1.${imgArr[3]}`;
    let img2 = `app/img/${imgName}2.${imgArr[3]}`;
    let img3 = `app/img/${imgName}3.${imgArr[3]}`;

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
