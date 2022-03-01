<template>
  <div class="ImgDecode"><input type="file" @change="decodeImg"/></div>
</template>

<script>
import DBR from "../dbr";
export default {
  name: 'ImgDecode',
  data() {
    return {
      pReader: null,
    }
  },

  methods: {
    async decodeImg(e) {
      try {
        const reader = await (this.pReader = DBR.BarcodeReader.createInstance());
        let results = await reader.decode(e.target.files[0]);
        for(let result of results){
          alert(result.barcodeText);
        }
      } catch(ex) {
        console.error(ex);
      }
    }
  },
  async beforeDestroy() {
    if (this.pReader) {
      (await this.pReader).destroy();
      console.log('ImgDecode Component Unmount');
    }
  },
}
</script>

<style scoped>
  .ImgDecode {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90%;
    border: 1px solid black
  }
</style>