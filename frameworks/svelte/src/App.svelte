<script lang="ts">
  import VideoCapture from "./components/VideoCapture.svelte";
  import ImageCapture from "./components/ImageCapture.svelte";

  let mode = "video";
</script>

<main>
  <div class="App">
    <div class="title">
      <h2 class="title-text">Hello World for Svelte</h2>
      <img class="title-logo" src="../logo.svg" alt="svelte" />
    </div>
    <div class="buttons-container">
      <button
        style="background-color: {mode === 'video' ? 'rgb(255, 174, 55)' : 'white'}"
        on:click={() => {
          mode = "video";
        }}>Decode Video</button
      >
      <button
        style="background-color: {mode === 'image' ? 'rgb(255, 174, 55)' : 'white'}"
        on:click={() => {
          mode = "image";
        }}>Decode Image</button
      >
    </div>
    {#if mode === "video"}
      <VideoCapture></VideoCapture>
    {:else}
      <ImageCapture></ImageCapture>
    {/if}
  </div>
</main>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-align: center;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .title .title-logo {
    width: 70px;
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
    margin-right: -5px;
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
