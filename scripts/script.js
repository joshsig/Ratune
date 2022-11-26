

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

let profilePic = document.getElementById('pfp');
let arr = localStorage.getItem('pfp');

profilePic.setAttribute('src',arr); 