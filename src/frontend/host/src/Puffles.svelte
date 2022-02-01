<script>
  import greenPuffle from "./static/Green_Puffle.png";
  import redPuffle from "./static/Red_Puffle.png";
  import yellowPuffle from "./static/Yellow_Puffle.png";

  const movePupils = (event) => {
    const pupils = document.querySelectorAll(".eye");
    pupils.forEach((pupil) => {
      const x = pupil.getBoundingClientRect().left + pupil.clientWidth / 2;
      const y = pupil.getBoundingClientRect().top + pupil.clientHeight / 2;
      const radian = Math.atan2(event.pageX - x, event.pageY - y);
      const rot = radian * (180 / Math.PI) * -1 + 0;
      pupil.style.transform = "rotate(" + rot + "deg)";
    });
  };

  document.querySelector("body").addEventListener("mousemove", movePupils);
</script>

<div class="puffle green">
  <div class="eye left">
    <div class="pupil" />
  </div>
  <div class="eye right">
    <div class="pupil" />
  </div>
  <img src={greenPuffle} class="puffle-itself" alt="Green Puffle" />
</div>
<div class="puffle yellow">
  <div class="eye left">
    <div class="pupil" />
  </div>
  <div class="eye right">
    <div class="pupil" />
  </div>
  <img src={yellowPuffle} class="puffle-itself" alt="Yellow Puffle" />
</div>
<div class="puffle red">
  <div class="eye left">
    <div class="pupil" />
  </div>
  <div class="eye right">
    <div class="pupil" />
  </div>
  <img src={redPuffle} class="puffle-itself" alt="Red Puffle" />
</div>

<style>
  .puffle {
    position: relative;
  }

  .eye {
    display: flex;
    position: absolute;
    width: 30px;
    height: 30px;
  }

  .green .eye.left {
    left: 38px;
    top: 46px;
  }

  .green .eye.right {
    left: 74px;
    top: 46px;
  }

  .yellow .eye.left {
    left: 31px;
    top: 55px;
  }

  .yellow .eye.right {
    left: 66px;
    top: 55px;
  }

  .red .eye.left {
    left: 48px;
    top: 38px;
  }

  .red .eye.right {
    left: 78px;
    top: 38px;
  }

  .pupil {
    border-radius: 50%;
    background: #312b2b;
    width: 13px;
    height: 13px;
    top: 14px;
    left: 8px;
    position: relative;
  }

  .puffle-itself {
    width: 150px;
  }
</style>
