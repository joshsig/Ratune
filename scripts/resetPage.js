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
function validateResetInput(){
    resetDisplay();
    var g1=validateEmail();
    if(g1){
        confirm("Email have been sent.\nPlease check your email for setting new password.");
    }
}
function resetDisplay(){
    document.getElementById("email_Empty").style.display="none";
    document.getElementById("email_Format_Error").style.display="none";
}