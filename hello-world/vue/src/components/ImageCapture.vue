<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from "vue";
import "./cvr";
import { EnumCapturedResultItemType } from "dynamsoft-core";
import type { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";

const iptRef: Ref<HTMLInputElement | null> = ref(null);
const resRef: Ref<HTMLDivElement | null> = ref(null);

let pRouter: Promise<CaptureVisionRouter> | null = null;

onMounted(() => {
    pRouter = CaptureVisionRouter.createInstance();
})

onUnmounted(async () => {
    (await pRouter!).dispose();
})

const captureImage = async (e: any) => {
    try {
        resRef.value!.innerText = "";
        const cvRouter = await pRouter!;
        const result = await cvRouter!.capture(e.target.files[0]);
        for (let _item of result.items) {
            if(_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) { continue; }
            let item = _item as BarcodeResultItem;
            console.log(item.text);
            resRef.value!.innerText += `${item.formatString} : ${item.text}\n`;
        }
        iptRef.value!.value = '';
    } catch (ex: any) {
        let errMsg = ex.message || ex;
        console.error(errMsg);
        alert(errMsg);
    }
}
</script>

<template>
    <div class="capture-img">
        <div class="img-ipt"><input type="file" ref="iptRef" @change="captureImage" /></div>
        <div class="result-area" ref="resRef"></div>
    </div>
</template>
    
<style scoped>
.capture-img {
    width: 100%;
    height: 100%;
    font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
}

.capture-img .img-ipt {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    border: 1px solid black;
    margin: 0 auto;
}

.capture-img .result-area {
    margin-top: 20px;
}
</style>