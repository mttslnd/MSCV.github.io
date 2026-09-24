(function () {
  var stage = document.querySelector(".media-stage");
  var heroVideo = stage ? stage.querySelector("video") : null;
  if (stage && heroVideo) {
    var reveal = function () {
      if (heroVideo.videoWidth > 0) stage.classList.add("is-playing");
    };
    var hide = function () {
      stage.classList.remove("is-playing");
    };
    heroVideo.addEventListener("loadeddata", reveal);
    heroVideo.addEventListener("playing", reveal);
    heroVideo.addEventListener("error", hide);
    if (heroVideo.readyState >= 2) reveal();
  }

  var player = document.getElementById("player");
  var frame = document.querySelector(".player-frame");
  var video = document.getElementById("player-video");
  var code = document.getElementById("player-code");
  var title = document.getElementById("player-title");
  var kind = document.getElementById("player-kind");

  function openPlayer(button) {
    code.textContent = button.getAttribute("data-code") || "";
    title.textContent = button.getAttribute("data-title") || "";
    kind.textContent = button.getAttribute("data-kind") || "";
    video.poster = button.getAttribute("data-poster") || "";
    video.src = button.getAttribute("data-src") || "";
    player.hidden = false;
    document.body.style.overflow = "hidden";
    var play = video.play();
    if (play && typeof play.catch === "function") play.catch(function () {});
    document.querySelector(".player-close").focus();
  }

  function closePlayer() {
    if (player.hidden) return;
    video.pause();
    video.removeAttribute("src");
    video.load();
    player.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".reel-tile").forEach(function (button) {
    button.addEventListener("click", function () {
      openPlayer(button);
    });
  });

  document.querySelector(".player-close").addEventListener("click", closePlayer);
  player.addEventListener("click", closePlayer);
  frame.addEventListener("click", function (event) {
    event.stopPropagation();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closePlayer();
  });
})();
