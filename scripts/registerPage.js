let email, nameID, password, image, acc=[], array_acc=[];

if(localStorage.getItem("acc")!=null){
    array_acc=JSON.parse(localStorage.getItem("acc"));
};

function validateRegisterInput(){
    resetDisplay();
    var g1=validateEmail();
    var g3=validateName();
    var g4=validatePass();
    var g5=validateRePass();
    var g6=samePassword();
    if(g1 && g3 && g4 && g5 && g6){
        register();
        location.assign("./index.html");
    }
}

function resetDisplay(){
    document.getElementById("email_Empty").style.display="none";
    document.getElementById("email_Format_Error").style.display="none";
    document.getElementById("name_Empty").style.display="none";
    document.getElementById("pass_Empty").style.display="none";
    document.getElementById("repass_Empty").style.display="none";
    document.getElementById("diffPass").style.display="none";
}

function validateEmail(){
    var tempEmail=document.getElementById("email_ID").value;

    if(tempEmail.length==0){
        document.getElementById("email_Empty").style.display="block";
        return false;
    }else if(!validateEmailFormat(tempEmail)){
        document.getElementById("email_Format_Error").style.display="block";
        return false;
    }
    return true;
}
function validateEmailFormat(email){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email.match(validRegex)){
        return true;
    }else{
        return false;
    }
}
function validateName(){
    var tempName=document.getElementById("name_ID").value;

    if(tempName.length==0){
        document.getElementById("name_Empty").style.display="block";
        return false;
    }else{
        return true;
    }
}
function validatePass(){
    var tempPass=document.getElementById("password_ID").value;

    if(tempPass.length==0){
        document.getElementById("pass_Empty").style.display="block";
        return false;
    }else{
        return true;
    }
}
function validateRePass(){
    var tempRePass=document.getElementById("re_Password_ID").value;

    if(tempRePass.length==0){
        document.getElementById("repass_Empty").style.display="block";
        return false;
    }else{
        return true;
    }
}
function samePassword(){
    var tempPass=document.getElementById("password_ID").value;
    var tempRePass=document.getElementById("re_Password_ID").value;

    if(tempPass == tempRePass){
        return true;
    }else{
        document.getElementById("diffPass").style.display="block";
        return false;
    }
}

function register(){
    email=document.getElementById("email_ID").value;
    nameID=document.getElementById("name_ID").value;
    password=document.getElementById("password_ID").value;
    image=document.getElementById("image");
    console.log(image);

    acc=[email, nameID, password, image];
    array_acc.push(acc);
    localStorage.setItem("acc", JSON.stringify(array_acc));
}


function showPreview(event){
    if(event.target.files.length >0){
        var src=URL.createObjectURL(event.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.addEventListener('load', () => {
            localStorage.setItem('pfp', reader.result);
        });

        image=document.getElementById("image");
        image.src=src;
        image.style.display="block";
        document.getElementById("preview_Image").style.background="transparent";
        document.getElementById("preview_Image").style.border="none";
    }
}