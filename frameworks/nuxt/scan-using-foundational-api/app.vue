<template>
  <div class='hello-world-page'>
    <div class='title'>
      <h2 class='title-text'>Hello World for NuxtJS</h2>
      <img class='title-logo' src="./assets/logo.svg" alt="logo" />
    </div>
    <div class='buttons-container'>
      <button @click="mode = 'video'"
        :style="{ backgroundColor: mode === 'video' ? 'rgb(255, 174, 55)' : '#FFFFFF' }">Video Capture</button>
      <button @click="mode = 'image'"
        :style="{ backgroundColor: mode === 'image' ? 'rgb(255, 174, 55)' : '#FFFFFF' }">Image Capture</button>
    </div>
    <client-only>
      <VideoCapture v-if="mode === 'video'" />
      <ImageCapture v-else />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import "./assets/main.css";

import { ref, type Ref } from "vue";
import VideoCapture from "./components/VideoCapture.client.vue";
import ImageCapture from "./components/ImageCapture.client.vue";

const mode: Ref<string> = ref("video");
</script>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.title .title-logo {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}

.buttons-container {
  width: 30%;
  margin: 20px auto;
}

.buttons-container button {
  display: inline-block;
  border: 1px solid black;
  padding: 5px 15px;
  background-color: transparent;
  cursor: pointer;
}

.buttons-container button:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right: transparent;
}

.buttons-container button:nth-child(2) {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: transparent;
}

@media screen and (max-width: 800px) {
  .buttons-container {
    width: 70%;
  }
}
</style>