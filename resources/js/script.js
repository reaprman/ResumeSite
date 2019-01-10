document.addEventListener('DOMContentLoaded', (event) => {
    rage();
});

const rage = () => {

    window.addEventListener('click', function(event){
        if(event.target.id =="modal"){
            modalToggle(this.id);
        }
    })
}
function modalToggle(imgPath){
    
    const modal = document.getElementById('modal');
    if(!modal.classList.contains('show-modal')){
       fillModalImg(imgPath); 
    }
     
    modal.classList.toggle('show-modal');
}

function fillModalImg(imgPath){
    let imgArr = imgPath.split(".");
    let imgName = imgArr[0].slice(0,-1);
    let img1 = `${imgName}1.${imgArr[1]}`;
    let img2 = `${imgName}2.${imgArr[1]}`;
    let img3 = `${imgName}3.${imgArr[1]}`;

    const imgModal1 = document.getElementById('mPic1');
    const imgModal2 = document.getElementById('mPic2');
    const imgModal3 = document.getElementById('mPic3');

    imgModal1.src = img1;
    imgModal2.src = img2;
    imgModal3.src = img3;

}