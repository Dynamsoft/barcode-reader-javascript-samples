import { Component } from '@angular/core';
// import '../dbr'; // import side effects. The license, engineResourcePath, so on.
// import '../../cvr'; // import side effects. The license, engineResourcePath, so on.
// import '../dce'; // import side effects. The license, engineResourcePath, so on.
import '../../dbr'; // import side effects. The license, engineResourcePath, so on.
import '../../cvr'; // import side effects. The license, engineResourcePath, so on.
import '../../dce'; // import side effects. The license, engineResourcePath, so on.

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent {
  bShowScanner = true;
  bShowImgDecode = false;
  
  showScanner(): void {
    this.bShowScanner = true;
    this.bShowImgDecode = false;
  }
  showImgDecode(): void {
    this.bShowScanner = false;
    this.bShowImgDecode = true;
  }
}
