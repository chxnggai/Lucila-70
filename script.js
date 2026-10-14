// Countdown to October 23, 2026, 4:30 PM Philippine Standard Time (UTC+8)
(function () {
  // 16:30 +08:00 == 08:30Z
  var TARGET = new Date("2026-10-23T16:30:00+08:00").getTime();

  var daysEl = document.getElementById("cd-days");
  var hoursEl = document.getElementById("cd-hours");
  var minsEl = document.getElementById("cd-mins");
  var secsEl = document.getElementById("cd-secs");
  var wrapEl = document.getElementById("countdown");
  var doneEl = document.getElementById("countdown-done");

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    var now = Date.now();
    var diff = TARGET - now;

    if (diff <= 0) {
      if (wrapEl) wrapEl.style.display = "none";
      if (doneEl) doneEl.hidden = false;
      return;
    }

    var totalSecs = Math.floor(diff / 1000);
    var d = Math.floor(totalSecs / 86400);
    var h = Math.floor((totalSecs % 86400) / 3600);
    var m = Math.floor((totalSecs % 3600) / 60);
    var s = totalSecs % 60;

    // Days may exceed 2 digits — still pad to at least 2, fixed width via tabular-nums
    daysEl.textContent = d < 100 ? pad(d) : String(d);
    hoursEl.textContent = pad(h);
    minsEl.textContent = pad(m);
    secsEl.textContent = pad(s);
  }

  tick();
  setInterval(tick, 1000);
})();

// Vintage background music toggle (floating jukebox button)
(function () {
  var audio = document.getElementById("bg-music");
  var btn = document.getElementById("music-toggle");
  if (!audio || !btn) return;

  var label = btn.querySelector(".music-text");

  function setUI(playing) {
    btn.classList.toggle("playing", playing);
    btn.setAttribute("aria-pressed", playing ? "true" : "false");
    btn.setAttribute("aria-label", playing ? "Pause vintage party music" : "Play vintage party music");
    if (label) label.textContent = playing ? "Pause music" : "Play music";
  }

  function noFile() {
    if (label) label.textContent = "Add music file";
    btn.setAttribute("aria-label", "Music file not found — check Assets/atlasaudio-disco-party-617561.mp3");
    setTimeout(function () {
      if (!btn.classList.contains("playing") && label) label.textContent = "Play music";
    }, 2500);
  }

  btn.addEventListener("click", function () {
    if (audio.paused) {
      var p = audio.play();
      if (p && typeof p.then === "function") {
        p.then(function () { setUI(true); }).catch(function () { noFile(); });
      } else {
        setUI(true);
      }
    } else {
      audio.pause();
      setUI(false);
    }
  });

  audio.addEventListener("play", function () { setUI(true); });
  audio.addEventListener("pause", function () { setUI(false); });
  audio.addEventListener("error", function () { noFile(); });
})();
