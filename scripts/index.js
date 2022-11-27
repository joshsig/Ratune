let array_acc=[];

if(localStorage.getItem("acc")!=null){
    array_acc=JSON.parse(localStorage.getItem("acc"));
};
array_acc.push(["admin@admin.ca", "admin", "admin", 999]);

function validateLoginInput(){
	resetDisplay();
	var g1=validateEmail();
	var g2=validatePass();
	if(g1 && g2){
		login();
	}
}
function resetDisplay(){
    document.getElementById("email_Empty").style.display="none";
    document.getElementById("email_Format_Error").style.display="none";
    document.getElementById("pass_Empty").style.display="none";
	document.getElementById("incorrect_Email_Pass").style.display="none";
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
function validatePass(){
    var tempPass=document.getElementById("password").value;

    if(tempPass.length==0){
        document.getElementById("pass_Empty").style.display="block";
        return false;
    }else{
        return true;
    }
}
function login(){
	if(validateAccount()){
		location.assign("./main.html");
	}
}

function validateAccount(){
	if(array_acc.length > 0){
		var email=document.getElementById("email_ID").value;
		var pass=document.getElementById("password").value;

		for(i in array_acc){
			if(array_acc[i][0] == email && array_acc[i][2] == pass){
                localStorage.setItem("thisAcc", JSON.stringify(array_acc[i]));
				return true;
			}
		}

		document.getElementById("incorrect_Email_Pass").style.display="block";
		return false;
	}else{
		document.getElementById("incorrect_Email_Pass").style.display="block";
		return false;
	}
}