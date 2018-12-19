document.addEventListener('DOMContentLoaded', (event) => {
    rage();
});

const rage = () => {
    window.addEventListener('click', function(event){
        if(event.target.id =="modal"){
            modalToggle();
        }
    })
}
function modalToggle(){
    const modal = document.getElementById('modal');
    modal.classList.toggle('show-modal');
}