<template>
  <div id="app" class="mea-easy-launch-app">
    <router-view/>
  </div>
</template>
<style>
.mea-easy-launch-app {
  padding: 5px;
  min-height: 30px;
  height: 100%;
  width: 100%;
  position: relative;
}
.mea-easy-launch-container {
  display: inline-block;
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
</style>
