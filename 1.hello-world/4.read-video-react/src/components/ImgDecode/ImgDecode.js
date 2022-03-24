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
      const reader = await (this.pReader = BarcodeReader.createInstance());
      let results = await reader.decode(e.target.files[0]);
      for(let result of results){
        alert(result.barcodeText);
      }
    } catch(ex) {
      console.error(ex);
    }
  }

  async componentWillUnmount() {
    if (this.pReader) {
      (await this.pReader).destroyContext();
      console.log('ImgDecode Component Unmount');
    }
  }

  render() {
    return (
      <div className="ImgDecode"><input type="file" onChange={this.decodeImg}/></div>
    )
  }
}