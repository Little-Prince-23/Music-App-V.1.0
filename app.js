const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector(".title");
const singer = document.querySelector(".singer");
const play = document.querySelector("#play");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});

//Contents display
function displayMusic(music) {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});

//Prev button
prev.addEventListener("click", () => {
  prevMusic();
});

function prevMusic() {
  player.prev();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
}

//Next button
next.addEventListener("click", () => {
  nextMusic();
});

function nextMusic() {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
}

//Pause button
function pauseMusic() {
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
}

//Play button
function playMusic() {
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
}

//Time calculator
function calculateTime(totalSeconds) {
  const minute = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const refreshedMinute = minute < 10 ? `0${minute}` : `${minute}`;
  const refreshedSecond = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const result = `${refreshedMinute} : ${refreshedSecond}`;
  return result;
}

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});

//Progress bar
progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

//Volume control
let muteState = "muted";

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    muteState = "unmuted";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    muteState = "muted";
    volume.classList = "fa-solid fa-volume-high";
  }
});

volume.addEventListener("click", () => {
  if (muteState === "muted") {
    audio.muted = true;
    muteState = "unmuted";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    muteState = "muted";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

//Music list
const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
        <li li-index='${i}' onClick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
              <span>${list[i].getName()}</span>
              <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
              <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
        </li>
        `;

    ul.insertAdjacentHTML("beforeend", liTag);
    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);
    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};

const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
};

//Active Music
const isPlayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }

    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};

//Replay or Next music
audio.addEventListener("ended", () => {
  nextMusic();
});


//Light & Dark mode

