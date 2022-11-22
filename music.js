let playpause_btn = document.querySelector(".playpause-song");
let like_btn = document.querySelector(".icon-like");
let mute_btn = document.querySelector(".volume-btn");

const viewShare = document.querySelector(".share-btn");
popup = document.querySelector(".share-popup");
close = popup.querySelector(".close-share");

let isPlaying = false;
let muted = false;
let liked = false;

viewShare.onclick = ()=>{
  popup.classList.toggle("show");
}
close.onclick = ()=>{
  viewShare.click();
}


function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if(isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
  }
   
  function playTrack() {
    // Play the loaded track
   //curr_track.play();
    isPlaying = true;

    // replace icon w pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
  }
   
  function pauseTrack() {
    // Pause the loaded track
  // curr_track.pause();
    isPlaying = false;
    
    // replace icon w play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
  }

  function likeunlike() {
    if(!liked) {
      liked = !liked;
      like_btn.innerHTML = '<i class="fas fa-heart" style="color: #8714B1"></i>';
    } else {
        liked = !liked;
        like_btn.innerHTML = '<i class="fas fa-heart"></i>';
    }
  }


  function muteunmute() {
    if(muted) {
       unmute(); 
    } else {
        mute();
    }
  }

  function mute() {
     muted = true;
   mute_btn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }

  function unmute() {
    muted = false;
    mute_btn.innerHTML = '<i class="fas fa-volume-down"></i>';
  }

  function shareTab() {
    console.log("Sharing shit lfg!");
  }