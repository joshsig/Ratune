const playAdd = document.querySelector('.playlist-add');
const playmodal = document.querySelector('.playlist-modal');
const savePlaylist = document.querySelector('.save-playlist');
const container = document.querySelector('.playlist-container');
const closePl = document.querySelector('.close-button-pl');
const plOverlay = document.querySelector('.playlist-overlay');

playAdd.onclick = ()=>{
    playmodal.classList.toggle("show");
    container.classList.toggle("blur");
  }

savePlaylist.onclick = ()=>{
    playAdd.click();
}
  
closePl.onclick = ()=> {
  playAdd.click();
}

plOverlay.onclick = () => {
confirm("Playlist View Not yet Implemented!")
}