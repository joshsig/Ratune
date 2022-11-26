

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

let profilePic = document.getElementsByClassName("pfp");
console.log(profilePic);
let arr = localStorage.getItem('pfp');
console.log(arr);
for(var i = 0; i < profilePic; i++) {
    profilePic[i].src = arr;
    console.log(profilePic[i].setAttribute('src',arr));
}