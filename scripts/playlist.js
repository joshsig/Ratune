const playAdd = document.querySelector('.playlist-add');
const playmodal = document.querySelector('.playlist-modal');
const savePlaylist = document.querySelector('.save-playlist');
const container = document.querySelector('.playlist-container');
const saveBtn = document.querySelector('.save-playlist');

playAdd.onclick = ()=>{
    playmodal.classList.toggle("show");
    container.classList.toggle("blur");
  }
  savePlaylist.onclick = ()=>{
    viewShare.click();
  }