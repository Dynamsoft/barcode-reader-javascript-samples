<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import "../cvr"; // import side effects. The license, engineResourcePath, so on.

const bShowVideoCapture: Ref<boolean> = ref(true);
const bShowImageCapture: Ref<boolean> = ref(false)

const showVideoCapture = () => {
  bShowVideoCapture.value = true;
  bShowImageCapture.value = false;
};
const showImageCapture = () => {
  bShowVideoCapture.value = false;
  bShowImageCapture.value = true;
}
</script>

<template>
  <div>
    <div class="div-hello-world">
      <h1>Hello World for Nuxt</h1>
      <div>
        <button :style="{ marginRight: '10px', backgroundColor: bShowVideoCapture ? 'rgb(255,174,55)' : 'white' }"
          @click="showVideoCapture">Decode Video</button>
        <button :style="{ backgroundColor: bShowImageCapture ? 'rgb(255,174,55)' : 'white' }" @click="showImageCapture">Decode Image</button>
      </div>
      <div class="container">
          <VideoCapture v-if="bShowVideoCapture"></VideoCapture>
          <ImageCapture v-if="bShowImageCapture"></ImageCapture>
      </div>
    </div>
  </div>
</template>

<style scoped>
.div-hello-world {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #455a64;
}

button {
  font-size: 1.5rem;
  margin-bottom: 2vh;
  border: 1px solid black;
}

.container {
  margin: 2vmin auto;
  font-size: medium;
  width: 100%;
}

h1 {
  font-size: 1.5em;
}
</style>
