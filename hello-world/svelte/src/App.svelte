<script lang="ts">
  import "./lib/cvr"; // import side effects. The license, engineResourcePath, so on.
  import VideoCapture from "./components/VideoCapture.svelte";
  import ImageCapture from './components/ImageCapture.svelte';

  let bShowVideoCapture = true;
  let bShowImageCapture = false;

  const showVideoCapture = () => {
    bShowVideoCapture = true;
    bShowImageCapture = false;
  };
  const showImageCapture = () => {
    bShowVideoCapture = false;
    bShowImageCapture = true;
  }
</script>

<main>
  <div class="div-hello-world">
    <h1>Hello World for Vue 3</h1>
    <div>
      <button style={`marginRight:10px;backgroundColor:${bShowVideoCapture?'rgb(255,174,55)':'white'}`}
        on:click={showVideoCapture}>Decode Video</button>
      <button style={`backgroundColor:${bShowImageCapture?'rgb(255,174,55)':'white'}`} on:click={showImageCapture}>Decode Image</button>
    </div>
    <div class="container">
      {#if bShowVideoCapture}
        <VideoCapture></VideoCapture>
      {/if}
      {#if bShowImageCapture}
        <ImageCapture></ImageCapture>
      {/if}
    </div>
  </div>
</main>

<style>
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
    text-align: center;
    font-size: medium;
    width: 100%;
  }
  
  h1 {
    font-size: 1.5em;
  }
</style>
