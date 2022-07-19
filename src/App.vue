<template>
  <div id="app" class="mea-easy-launch-app">
    <router-view/>
  </div>
</template>
<style>
body {
  margin: 0;
}
.mea-easy-launch-app {
  vertical-align: top;
  min-height: 30px;
  height: 100%;
  width: 100%;
  position: relative;
}
.mea-easy-launch-container {
  display: inline-block;
  height: 100vw;
  width: 100vw;
  padding: 10px;
}
.mea-data {
  padding: 3px 0;
}
.mea-input-name {
  width: 55px;
  text-align: right;
  margin-right: 10px;
  display: inline-block;
}
.mea-easy-launch-app .mea-copy-text {
  cursor: pointer;
  color: #FF8C00;
  font-style: italic;
}
.mea-copy-text {
  padding-left: 5px;
}
.mea-easy-launch-app .mea-overlay-style .vld-icon  {
  width: 6%;
  height: auto;
}
.mea-easy-launch-appn .mea-overlay-style svg {
  fill: dodgerblue;
  width: 100%;
  height: 100%;
}

.mea-easy-launch-app .vld-overlay {
  top: 50px;
  bottom: auto;
}

.mea-easy-launch-app .vld-overlay .vld-background {
  background: none;
}

.mea-easy-launch-app .swedbank {
  font-size: 17px;
  background-color: #fdf6ee;
}

.mea-easy-launch-app .swedbank .mea-input-value {
  color: #fb4f00;
}

.mea-easy-launch-app .uldibank {
  background-image: url('../src/assets/up.png');
  background-size: 336px auto;
  background-position-y: -71px;
  background-position-x: 70px;
}

.mea-easy-launch-app .uldibank .mea-input-value {
  color: blue;
}

.mea-easy-launch-app .uldibank .mea-input-name {
  color: #fb4f00;
}

</style>
