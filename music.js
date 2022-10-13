class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }

  getName() {
    return this.title + " - " + this.singer;
  }
}

const musicList = [
  new Music(
    "Creep",
    "Radiohead",
    "radiohead.png",
    "1.mp3"
  ),
  new Music("From The Inside", "Linkin Park", "linkinPark.jpeg", "2.mp3"),
  new Music("Snuff", "Slipknot", "slipknot.jpeg", "3.mp3"),
];
