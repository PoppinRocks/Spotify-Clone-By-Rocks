var video = document.getElementById("myVideo");
window.addEventListener("load", function() {
    video.play();
    console.log("video is playing");
});


// console.log('spotify clone js');
// variables 
let audioElement = new Audio('songs/0.mp3');
let marsterPlay = document.getElementById('masterPlay');
let pauseplayBtn = document.getElementById('pauseplayBtn');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songProgress = document.getElementById('songProgress');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let smallPlays = Array.from(document.getElementsByClassName('smallPlay'));
let smallPauses = Array.from(document.getElementsByClassName('smallPause'));
let container = document.querySelector('container');
var currentPlayingIndex = null;
gif.style.opacity = 0;

let songs = [
    { songName: "AURORA-Runaway", filePath: "songs/1.mp3", coverPath: "assets/covers/1.png" },
    { songName: "Beach House-Space", filePath: "songs/2.mp3", coverPath: "assets/covers/2.jpg" },
    { songName: "Coldplay-Hymn For The Weekend", filePath: "songs/3.mp3", coverPath: "assets/covers/3.jpg" },
    { songName: "Coolio-Gangsta's Paradise", filePath: "songs/4.mp3", coverPath: "assets/covers/4.jpg" },
    { songName: "Future-Mask Off", filePath: "songs/5.mp3", coverPath: "assets/covers/5.jpg" },
    { songName: "Imagine Dragons-Bones", filePath: "songs/6.mp3", coverPath: "assets/covers/6.jpg" },
    { songName: "INDILA-Ainsi Bas La Vida", filePath: "songs/7.mp3", coverPath: "assets/covers/7.jpg" },
    { songName: "Indila-Tourner Dans Le Vide", filePath: "songs/8.mp3", coverPath: "assets/covers/8.jpg" },
    { songName: "Lil Nas X, Katy Perry - Industry Baby", filePath: "songs/9.mp3", coverPath: "assets/covers/9.jpg" },
    { songName: "Lindsey-Carol of the Bells", filePath: "songs/10.mp3", coverPath: "assets/covers/10.jpg" },
    { songName: "Plain Jane", filePath: "songs/11.mp3", coverPath: "assets/covers/11.jpg" },
    { songName: "TWISTED - WORTH NOTHING", filePath: "songs/12.mp3", coverPath: "assets/covers/12.jpg" },
    { songName: "You and Me - Xcho", filePath: "songs/13.mp3", coverPath: "assets/covers/13.png" },
    { songName: "Close Eyes(Slowed + Reverb)", filePath: "songs/14.mp3", coverPath: "assets/covers/14.jpg"},
]

songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.querySelector(".songName").innerHTML = songs[i].songName;

})


// Listen to Events 
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    
    // update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    songProgress.value = progress;
    // if(songProgress.value == 100){
    //     audioElement.currentTime = 0;
    //     audioElement.pause();
    //     gif.style.opacity = 0;
    //     pauseplayBtn.style.display = 'none';
    //     marsterPlay.style.display = 'block';
    // }  
})

// handle play click
marsterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0 ) {
        audioElement.play();
        marsterPlay.style.display = 'none';
        pauseplayBtn.style.display = 'block';
        gif.style.opacity = 1;
        
    }
})

// handle pause click
pauseplayBtn.addEventListener('click', () => {
    if (!audioElement.paused) {
        audioElement.pause();
        pauseplayBtn.style.display = 'none';
        marsterPlay.style.display = 'block';
        gif.style.opacity = 0;
    }
})

// progressbar change event
songProgress.addEventListener('change', () => {
    audioElement.currentTime = songProgress.value * audioElement.duration / 100;

})

// card play/pause click
smallPauses.forEach((smallPause) => {
    smallPause.style.display = 'none';

});


// Add click event listener to all smallPlay buttons
smallPlays.forEach((smallPlay, i) => {
    smallPlay.addEventListener('click', (e) => {
        if (currentPlayingIndex !== null && currentPlayingIndex !== i) {
            smallPauses[currentPlayingIndex].style.display = 'none';
            smallPlays[currentPlayingIndex].style.display = 'block';
        }
        // console.log(e.target);
        
        currentPlayingIndex = i;
        smallPlays[i].style.display = 'none';
        smallPauses[i].style.display = 'block';
        // console.log(currentPlayingIndex);
        audioElement.src = `songs/${currentPlayingIndex}.mp3`;
        masterSongName.innerHTML = songs[currentPlayingIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        marsterPlay.style.display = 'none';
        pauseplayBtn.style.display = 'block';
        
    });
    
});

// Add click event listener to all smallPause buttons
smallPauses.forEach((smallPause, i) => {
    smallPause.addEventListener('click', (e) => {
        if (!audioElement.paused) {
            audioElement.pause();
            pauseplayBtn.style.display = 'none';
            marsterPlay.style.display = 'block';
            gif.style.opacity = 0;
            smallPauses[i].style.display = 'none';
            smallPlays[i].style.display = 'block';
        }

        console.log(e.target);
        currentPlayingIndex = null;
        smallPauses[i].style.display = 'none';
        smallPlays[i].style.display = 'block';
        audioElement.pause();
        gif.style.opacity = 0;
        pauseplayBtn.style.display = 'none';
        marsterPlay.style.display = 'block';
    });
});






//   Next btn 
document.getElementById('next').addEventListener('click', () => {
    if (currentPlayingIndex >= 11) {
        currentPlayingIndex = 0;
    }
    else {
        currentPlayingIndex += 1;
    }
    audioElement.src = `songs/${currentPlayingIndex}.mp3`;
    masterSongName.innerHTML = songs[currentPlayingIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    marsterPlay.style.display = 'none';
    pauseplayBtn.style.display = 'block';
})

//   previous btn 
document.getElementById('prev').addEventListener('click', () => {
    if (currentPlayingIndex <= 0) {
        currentPlayingIndex = 11;
    }
    else {
        currentPlayingIndex -= 1;
    }
    audioElement.src = `songs/${currentPlayingIndex}.mp3`;
    masterSongName.innerHTML = songs[currentPlayingIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    marsterPlay.style.display = 'none';
    pauseplayBtn.style.display = 'block';
})

// this function check if song end then change the song
audioElement.addEventListener("ended", function() {
    // Change the source of the audio element to the next song
    currentPlayingIndex += 1;
    audioElement.src = `songs/${currentPlayingIndex}.mp3`;
    masterSongName.innerHTML = songs[currentPlayingIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    marsterPlay.style.display = 'none';
    pauseplayBtn.style.display = 'block';
});

// resposiv navbar 
const mobile_nav = document.querySelector(".mobile-navbar-btn");
const headerElem = document.querySelector(".header");

mobile_nav.addEventListener('click', () => {
  headerElem.classList.toggle("active");
})
