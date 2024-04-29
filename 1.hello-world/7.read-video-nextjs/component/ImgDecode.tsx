import React, { ChangeEvent, Component } from 'react'
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import "@/lib/dbr"; // import side effects. The license, engineResourcePath, so on.
import styles from './ImgDecode.module.css'

export default class ImgDecode extends Component {
  pReader: Promise<BarcodeReader>|null = null;

  async componentDidMount() {
    this.pReader = BarcodeReader.createInstance();
  }

  decodeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const reader = (await this.pReader)!;
      let results = await reader.decode(e.target.files![0]);
      for (let result of results) {
        alert(result.barcodeText);
      }
      if (!results.length) { alert('No barcode found'); }
    } catch (ex: any) {
      console.error(ex);
      alert(ex?.message);
      throw ex;
    }
    e.target.value = '';
  }

  async componentWillUnmount() {
    if (this.pReader) {
      (await this.pReader).destroyContext();
      console.log('ImgDecode Component Unmount');
    }
  }

  render() {
    return (
      <div className={styles.ImgDecode}><input type="file" onChange={this.decodeImg} /></div>
    )
  }
}