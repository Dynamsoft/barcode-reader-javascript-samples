import React, { Component } from 'react'
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import './ImgDecode.css'

export default class ImgDecode extends Component {
  constructor(props) {
    super(props);
    this.pReader = null;
  }

  decodeImg = async (e) => {
    try {
      const reader = await (this.pReader = this.pReader || BarcodeReader.createInstance());
      let results = await reader.decode(e.target.files[0]);
      for (let result of results) {
        alert(result.barcodeText);
      }
      if (!results.length) { alert('No barcode found'); }
    } catch (ex) {
      let errMsg;
      if (ex.message.includes("network connection error")) {
        errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
      } else {
        errMsg = ex.message||ex;
      }
      console.error(errMsg);
      alert(errMsg);
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
      <div className="ImgDecode"><input type="file" onChange={this.decodeImg} /></div>
    )
  }
}