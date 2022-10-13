class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }

  getName() {
    // return this.title + " - " + this.singer;
    return this.title;
  }
}

const musicList = [
  new Music("Creep", "Radiohead", "radiohead.png", "1.mp3"),
  new Music("From The Inside", "Linkin Park", "linkinPark.jpeg", "2.mp3"),
  new Music("Snuff", "Slipknot", "slipknot.jpeg", "3.mp3"),
  new Music("Dərzi", "Qaraqan", "Qaraqan_Dərzi.jpeg", "4.mp3"),
  new Music("Başdayıq", "Amir x Elpoep x R'Flexx", "5.png", "5.mp3"),
  new Music("Pəncərə", "Elpoep x Zegi x Centuri10", "6.png", "6.mp3"),
  new Music("Yox,Yox", "Zegi ft. R'Flexx", "7.png", "7.mp3"),
  new Music("Ağ işıq", "Amir", "8.jpeg", "8.mp3"),
];
