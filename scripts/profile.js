let array_acc=JSON.parse(localStorage.getItem("thisAcc"));
let name=array_acc[0];
let pic=array_acc[3];
let profileX = document.getElementById('image');
if(true){
    profileX.src="./imgs/dp.png";
}else{
    profilePic.setAttribute('src',pic); 
}