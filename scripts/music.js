let playpause_btn = document.querySelector(".playpause-song");
let like_btn = document.querySelector(".icon-like");
let mute_btn = document.querySelector(".volume-btn");

const viewShare = document.querySelector(".share-btn");
popup = document.querySelector(".share-popup");
close = popup.querySelector(".close-share");

let track_art = document.querySelector(".image-container");
let track_name = document.querySelector(".title");
let track_artist = document.querySelector(".artist");

let next_btn = document.querySelector(".next-btn");
let prev_btn = document.querySelector(".prev-btn");
let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider")
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let isPlaying = false;
let muted = false;
let liked = false;
let startVolume=50/100;

let track_index = 0;
let updateTimer;

let curr_track = document.createElement('audio');

curr_track.volume = startVolume;
let prev_vol = curr_track.volume;
volume_slider.value=curr_track.volume*100;

let track_list = [
  {
    name: "Thinkin Bout You",
    artist: "Frank Ocean",
    image: "https://upload.wikimedia.org/wikipedia/en/2/28/Channel_ORANGE.jpg",
    song: "./songs/ThinkinBoutYou.mp3"
  },
  {
    name: "Salad Days",
    artist: "Mac Demarco",
    image: "https://upload.wikimedia.org/wikipedia/en/8/81/MacDeMarcoSaladDays.png",
    song: "./songs/SaladDays.mp3"
  },
  {
    name: "Dark Red",
    artist: "Steve Lacy",
    image: "https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/Screen_Shot_2017-02-20_at_12.25.56_PM_u0wced/steve-lacy-dark-red-single-steve-lacys-demo-the-internet.jpg",
    song: "./songs/DarkRed.mp3"
  }
]

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
    curr_track.play();
    isPlaying = true;

    // replace icon w pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
  }
   
  function pauseTrack() {
    // Pause the loaded track
  // curr_track.pause();
    curr_track.pause();  
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
    prev_vol = curr_track.volume;
    curr_track.volume = 0;
    volume_slider.value=0;
    mute_btn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }

  function unmute() {
    muted = false;
    curr_track.volume = prev_vol;
    volume_slider.value=curr_track.volume*100;
    mute_btn.innerHTML = '<i class="fas fa-volume-down"></i>';
  }

  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    track = track_index%3;
    curr_track.src = track_list[track].song;
    curr_track.load();
    track_art.innerHTML = `<img
    src="${track_list[track].image}"
    alt="cover"/>`;
    track_name.textContent = track_list[track].name;
    track_artist.textContent = track_list[track].artist;
  
    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
}

loadTrack(track_index);

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value/100;
  prev_vol=curr_track.volume;
  unmute();
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function saveProgress(){
  var array_music=[isPlaying, muted, liked, volume_slider.value, track_index, (curr_track.currentTime*100)];
  localStorage.setItem("array_music", JSON.stringify(array_music));
}

if(localStorage.getItem("array_music")!=null){
  var array_music=JSON.parse(localStorage.getItem("array_music"));
  loadProgress(array_music);
}

function loadProgress(state){
  numTrack=state[4];
  isPlaying=!state[0];
  if(numTrack!=0){
    for(var i=0; i<numTrack; i++){
      nextTrack();
    }

    if(isPlaying){
      isPlaying=!isPlaying;
      playpauseTrack();
    }

  }else{
    playpauseTrack();
  }
  muted=!state[1];
  liked=!state[2];
  curr_track.volume=state[3] / 100;
  volume_slider.value=state[3];
  prev_vol=curr_track.volume;
  if(!muted){
    muteunmute();
  }else{
    muted=!muted;
  }
  likeunlike();
  curr_track.currentTime=state[5]/100;
}