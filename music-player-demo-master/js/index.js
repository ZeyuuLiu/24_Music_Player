// 保存音乐列表信息
var musicList = [];
// 声明变量，保存当前播放的是哪一首歌曲
var currentIndex = 0;

// 1. 加载音乐列表信息
$.ajax({
  type: "GET",
  url: "../music.json",
  dataType: "json",
  success: function (data) {
    musicList = data;
    render(musicList[currentIndex]);
    renderMusicList(musicList);
    renderLikeList(musicList);
  },
});

// 给播放按钮绑定点击事件
$("#playBtn").on("click", function () {
  if ($("audio").get(0).paused) {
    // 暂停状态，应该播放
    // 修改播放按钮的图标状态
    $(this).removeClass("fa-play").addClass("fa-pause");
    // 让音乐信息卡片显示出来
    $(".player-info").animate(
      {
        top: "-100%",
        opacity: 1,
      },
      "slow"
    );

    // 让封面旋转起来
    $(".cover").css({
      "animation-play-state": "running",
    });

    // 让音乐播放起来
    $("audio").get(0).play();
  } else {
    // 播放状态，应该暂停
    $(this).removeClass("fa-pause").addClass("fa-play");
    // 让音乐信息卡片消失
    $(".player-info").animate(
      {
        top: "0%",
        opacity: 0,
      },
      "slow"
    );

    // 让封面旋转暂停
    $(".cover").css({
      "animation-play-state": "paused",
    });

    // 让音乐暂停
    $("audio").get(0).pause();
  }

  // 重新渲染列表数据
  renderMusicList(musicList);
  renderLikeList(musicList);
});

// 给喜欢按钮绑定点击事件
$("#likeBtn").on("click",function(){
  if(musicList[currentIndex].like=="#b3b0b0")musicList[currentIndex].like="red";
  else musicList[currentIndex].like="#b3b0b0";
  $(".fa-unlike").css({ color: musicList[currentIndex].like });
  renderLikeList(musicList);
})

// 给上一首按钮绑定点击事件
$("#prevBtn").on("click", function () {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = musicList.length - 1;
  }

  // 重新渲染歌曲信息
  render(musicList[currentIndex]);
  // 让音乐播放
  $("#playBtn").trigger("click");
});

// 给下一首按钮绑定点击事件
$("#nextBtn").on("click", function () {
  if (currentIndex < musicList.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  // 重新渲染歌曲信息
  render(musicList[currentIndex]);
  // 让音乐播放
  $("#playBtn").trigger("click");
});


// 给音乐列表绑定点击事件
$("#openModal").on("click", function () {
  $(".modal").show();
  $(".modal").css(
    "left","0"
  );
});
// 给清空喜欢列表绑定点击事件
$(".clear-like").on("click",function(){
  clear(musicList);
})


$(".modal-close").on("click", function () {
  $(".modal").css("left", "100%"); // 将 modal 平移到屏幕右侧
  setTimeout(function () {
    $(".modal").hide(); // 隐藏 modal
  }, 500); // 延迟隐藏，等待过渡效果完成
});

// 监听audio标签的 timeupdate 事件
$("audio").on("timeupdate", function () {
  // 获取音乐当前到的时间，单位：秒
  var currentTime = $("audio").get(0).currentTime || 0;
  // 获取音乐的总时长，单位：秒
  var duration = $("audio").get(0).duration || 0;
  // 设置当前播放时间
  $(".current-time").text(formatTime(currentTime));
  // 设置进度条
  var value = (currentTime / duration) * 100;
  $(".music_progress_line").css({
    width: value + "%",
  });
});

// 监听音乐播放完毕的事件
$("audio").on("ended", function () {
  $("#playBtn").removeClass("fa-pause").addClass("fa-play");
  // 让封面旋转暂停
  $(".cover").css({
    "animation-play-state": "paused",
  });
});

// 通过事件委托给音乐列表的播放按钮绑定点击事件
$(".music-list").on("click", ".play-circle", function () {
  if ($(this).hasClass("fa-play-circle")) {
    var index = $(this).attr("data-index");
    currentIndex = index;
    render(musicList[currentIndex]);
    $("#playBtn").trigger("click");
  } else {
    $("#playBtn").trigger("click");
  }
});

// 通过事件委托给喜欢列表的播放按钮绑定点击事件
$(".like-list").on("click", ".play-circle", function () {
  if ($(this).hasClass("fa-play-circle")) {
    var index = $(this).attr("data-index");
    currentIndex = index;
    render(musicList[currentIndex]);
    $("#playBtn").trigger("click");
  } else {
    $("#playBtn").trigger("click");
  }
});

// 格式化时间
function formatTime(time) {
  // 329 -> 05:29
  var min = parseInt(time / 60);
  var sec = parseInt(time % 60);
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  return `${min}:${sec}`;
}

// 根据信息，设置页面对应标签中的内容
function render(data) {
  $(".name").text(data.name);
  $(".singer-album").text(`${data.singer} - ${data.album}`);
  $(".time").text(data.time);
  $(".cover img").attr("src", data.cover);
  $("audio").attr("src", data.audio_url);
  $(".fa-unlike").css({ color: data.like });
}

// 根据音乐列表数据，创建li
function renderMusicList(list) {
  $(".music-list").empty();

  $.each(list, function (index, item) {
    var $li = $(`
      <li class="${index == currentIndex ? "playing" : ""}">
        <span>${index + 1}. ${item.name} - ${item.singer}</span>
        <span data-index="${index}" class="fa ${
      index == currentIndex && !$("audio").get(0).paused
        ? "fa-pause-circle"
        : "fa-play-circle"
    } play-circle"></span>
      </li>
    `);
    $(".music-list").append($li);
  });
}
// 根据喜欢的音乐，创建li
function renderLikeList(list){
  $(".like-list").empty();

  var empty=true;
  $.each(list, function (index, item) {
    if(list[index].like == "red"){
      empty=false;
      var $li = $(`
      <li class="${index == currentIndex ? "playing" : "notplaying"}">
      <span>${item.name} - ${item.singer}</span>
      <span data-index="${index}" class="fa ${
        index == currentIndex && !$("audio").get(0).paused
        ? "fa-pause-circle"
        : "fa-play-circle"
      } play-circle"></span>
      </li>
      `);
      $(".like-list").append($li);
    }
  });
  if(empty){
    var $li = $(`
      <li class="list-empty">
      喜欢列表为空，添加喜欢的音乐
      </li>
      `);
      $(".like-list").append($li);
  }
}

// 清空喜欢列表
function clear(list){
  $.each(list, function (index, item) {
    list[index].like = "#b3b0b0";
  })
  $(".fa-unlike").css({ color: "#b3b0b0" });
  renderLikeList(list);
}

//新添加的函数
function myFunction() {
  // 声明变量
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');
 
  // 循环遍历所有列表项，并隐藏那些与搜索查询不匹配的项
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("span")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}