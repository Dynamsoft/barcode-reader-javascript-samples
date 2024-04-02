import { useEffect, useRef, MutableRefObject } from "react";
import type { BarcodeResultItem } from "dynamsoft-barcode-reader"
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import "./ImageCapture.css";

function ImageRecognizer() {
    const iptRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const resRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const pRouter: MutableRefObject<Promise<CaptureVisionRouter> | null> = useRef(null);

    useEffect((): any => {
        pRouter.current = CaptureVisionRouter.createInstance();

        return async () => {
            (await pRouter.current)!.dispose();
            console.log('ImageCapture Component Unmount');
        }
    }, []);

    const captureImage = async (e: any) => {
        try {
            resRef.current!.innerText = "";
            const router = await pRouter.current;
            const result = await router!.capture(e.target.files[0]);
            for (let item of result.items) {
                let _item = item as BarcodeResultItem;
                console.log(_item.text);
                resRef.current!.innerText += `${_item.formatString} : ${_item.text}\n`
            }
            iptRef.current!.value = '';
        } catch (ex: any) {
            let errMsg = ex.message || ex;
            console.error(errMsg);
            alert(errMsg);
        }
    }

    return (
        <div className="capture-img">
            <div className="img-ipt"><input type="file" ref={iptRef} onChange={captureImage} /></div>
            <div className="result-area" ref={resRef}></div>
        </div>
    )
}

export default ImageRecognizer;