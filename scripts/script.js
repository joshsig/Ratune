function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#pl-cover')
                .attr('src', e.target.result)
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function setting(){
    confirm("We are sorry.\nThis feature is under maintenance.\nIf you have any issues, you are welcome to contact us by sending email to -> sigurd35@myumanitoba.ca <-\nThank you so much.");
}

function openFilterMenu(){
    document.getElementById("fil_Content").style.visibility="visible";
    document.getElementById("fil_Content").style.opacity="1";
}

function closeFilterMenu(){
    document.getElementById("fil_Content").style.opacity="0";
    document.getElementById("fil_Content").style.visibility="hidden";
}

function startFil(){
    confirm("This feature is implementing.")
}

function logout(){
    localStorage.removeItem("array_music");
    location.assign("./index.html");
}

let array_acc=JSON.parse(localStorage.getItem("thisAcc"));
let name=array_acc[0];
let pic=array_acc[3];
let profilePic = document.getElementById('pfp');

if(pic==999){
    profilePic.src="./imgs/boy.png";
    console.log(profilePic.src);
}else{
    profilePic.setAttribute('src',pic); 
}

function nye() {
    console.log("Not Yet Implemented!");
}

