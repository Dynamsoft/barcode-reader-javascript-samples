//
//  ViewController.swift
//
//

import UIKit
import WebKit

class ViewController: UIViewController {
    
    var myButton: UIButton?
    var wkWebView: WKWebView?
    var dbrWKWebViewHelper: DBRWKWebViewHelper?
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        
        wkWebView = WKWebView(frame: self.view.frame)
        myButton = UIButton(type: .system)
        myButton!.setTitle("Start Scanning", for: .normal)
        myButton!.setTitleColor(.white, for: .normal)
        myButton!.isHidden = true
        myButton!.frame = CGRect(x: (self.view.bounds.width - 150) / 2, y: self.view.bounds.height - 200, width: 150, height: 50)
        myButton!.backgroundColor = UIColor(red: 0.4, green: 0.2, blue: 0.5, alpha: 1)
        myButton!.addTarget(self, action: #selector(buttonClicked), for: .touchUpInside)
        
        self.view.addSubview(wkWebView!)
        self.view.addSubview(myButton!)
        // pollute your WKUserContentController
        dbrWKWebViewHelper = DBRWKWebViewHelper()
        dbrWKWebViewHelper!.pollute(wkWebView!)
        
        let fileURL = Bundle.main.url(forResource: "html/index", withExtension: "html" )
        wkWebView!.loadFileURL(fileURL!,allowingReadAccessTo:Bundle.main.bundleURL);
    }
    
    @objc func buttonClicked() {
        let title = myButton!.title(for: .normal)
        if (title == "Start Scanning") {
            myButton!.setTitle("Stop Scanning", for: .normal)
            dbrWKWebViewHelper!.startScanner()
        } else {
            myButton!.setTitle("Start Scanning", for: .normal)
            dbrWKWebViewHelper!.stopScanner()
        }
    }

    func showController() {
        let alertController = UIAlertController(title: "Wasm loaded!", message: nil, preferredStyle: .alert)
        self.present(alertController, animated: true, completion: nil)
        DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 2.0) {
            alertController.dismiss(animated: true, completion: nil)
        }
        myButton!.isHidden = false
    }
    
    func showResult(_ result: String) {
        let alertController = UIAlertController(title: "Result: ", message: result, preferredStyle: .alert)
        let cancelAction = UIAlertAction(title: "OK", style: .cancel, handler: nil)
        alertController.addAction(cancelAction)
        self.present(alertController, animated: true, completion: nil)
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    }

}
