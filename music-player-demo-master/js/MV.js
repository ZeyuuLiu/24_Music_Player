document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("bgVideo");
    const videoSource = document.getElementById("videoSource");
    const playPauseButton = document.getElementById("playBtn");
    const prevButton = document.getElementById("prevBtn");
    const nextButton = document.getElementById("nextBtn");
    const blurButton = document.getElementById("blurBtn");
    const musicListElement = document.querySelector('.music-list');
    const likeListElement = document.querySelector('.like-list');
    const warp = document.getElementById("warp");


    const videos = [
      "./MV/打上花火.mp4",
      "./MV/前前前世.mp4",
      "./MV/言叶之庭.mp4",
      "./MV/Bad Apple.mp4",
      "./MV/Colors.mp4",
      "./MV/LOSER.mp4",
      "./MV/One Last Kiss.mp4",
      "./MV/YOKU.mp4",
      "./MV/グランドエスケープ.mp4",
      "./MV/罪恶王冠.mp4",
      "./MV/Infected.mp4",
      "./MV/Unbecoming.mp4", 
      "./MV/Monster.mp4",
      "./MV/Telescope.mp4", 
      "./MV/The Everlasting Guilty Crown.mp4",
      "./MV/不问天.mp4",
      "./MV/时光盲盒.mp4",
      "./MV/Glimmer.mp4",
      "./MV/午夜の待ち合わせ.mp4",
      "./MV/狂乱 Hey Kids!!!.mp4"
      ];
    
    let currentVideoIndex = 0;

    //初始化，加载所有歌曲
    function loadVideo(index) {
      video.pause();
      videoSource.src = videos[index];
      video.load();
    }

    //播放歌曲
    function playVideo() {
      video.play();
    }

    //暂停歌曲
    function pauseVideo() {
      video.pause();
    }

    //下一首歌
    function nextVideo() {
      currentVideoIndex = (currentVideoIndex + 1) % videos.length;
      loadVideo(currentVideoIndex);
      playVideo();
    }

    //上一首歌
    function prevVideo() {
      currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
      loadVideo(currentVideoIndex);
      playVideo();
    }

    //开始与暂停，同一个按钮，由paused来判断
    playPauseButton.addEventListener("click", function() {
      if (video.paused) {
        playVideo();
      } else {
        pauseVideo();
      }
    });

    //背景虚化与还原函数
    function toggleBlur() {
      if (video.style.filter === "none") {

          video.style.filter = "blur(50px)";
          video.style.justifyContent = "center";

          warp.style.left = "40%";
          warp.style.top = "50%";
          warp.style.transition = "all 1s";

      } else {
          video.style.filter = "none";
          video.style.transition = "all 1s";

          warp.style.left = "5%";
          warp.style.top = "90%";
          warp.style.transition = "all 1s";
      }
    }

    //链接侧边连里面的点击按钮
    musicListElement.addEventListener('click', (event) => {
      
      if (event.target.classList.contains('play-circle')) {
        var index = event.target.getAttribute('data-index');
        if(currentVideoIndex==index){
          pauseVideo();
        }else{
          currentVideoIndex = index;
          loadVideo(currentVideoIndex);
          playVideo();
        }
        
      }
    });

    //链接喜欢列表里面的点击按钮
    likeListElement.addEventListener('click', (event) => {
      
      if (event.target.classList.contains('play-circle')) {
        var index = event.target.getAttribute('data-index');
        if(currentVideoIndex==index){
          pauseVideo();
        }else{
          currentVideoIndex = index;
          loadVideo(currentVideoIndex);
          playVideo();
        }
        
      }
    });


    //链接按钮与事件
    nextButton.addEventListener("click", nextVideo);
    prevButton.addEventListener("click", prevVideo);
    blurButton.addEventListener("click", toggleBlur);

    video.addEventListener("ended", nextVideo);

    //初始状态：暂停
    loadVideo(currentVideoIndex);
    pauseVideo();
  });



