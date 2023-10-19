//
//  ViewController.swift
//  dbrjswebview
//
//  Created by Dynamsoft on 2023/4/18.
//

import UIKit
import WebKit

// Refer: https://developer.apple.com/documentation/webkit/viewing_desktop_or_mobile_web_content_using_a_web_view
class ViewController: UIViewController, WKUIDelegate {
    
    let webView: WKWebView

    required init?(coder: NSCoder) {
        print("entered init")
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        // Refer: https://stackoverflow.com/a/51736967
        configuration.websiteDataStore = WKWebsiteDataStore.default()
        webView = WKWebView(frame: .init(), configuration: configuration)
        
        super.init(coder: coder)
    }
    
    // Refer: https://www.hackingwithswift.com/articles/112/the-ultimate-guide-to-wkwebview
    override func loadView() {
        self.view = webView
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print("entered viewDidLoad")
        // Do any additional setup after loading the view.
        
        // Refer: https://stackoverflow.com/a/40316507
        webView.uiDelegate = self
        
        //let url = URL(string: "https://your.online.website/target/page.html")!
        //webView.load(URLRequest(url: url))
        
        // load local html
        let fileUrl = Bundle.main.url(forResource: "html/decodeFileInVideo", withExtension: "html")!
        webView.loadFileURL(fileUrl, allowingReadAccessTo: fileUrl)
        print("finish viewDidLoad")
    }
    
    // Refer: https://stackoverflow.com/a/40316507

    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping () -> Void) {

        let alertController = UIAlertController(title: nil, message: message, preferredStyle: .actionSheet)
        alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: { (action) in
            completionHandler()
        }))

        present(alertController, animated: true, completion: nil)
    }


    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping (Bool) -> Void) {

        let alertController = UIAlertController(title: nil, message: message, preferredStyle: .actionSheet)

        alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: { (action) in
            completionHandler(true)
        }))

        alertController.addAction(UIAlertAction(title: "Cancel", style: .default, handler: { (action) in
            completionHandler(false)
        }))

        present(alertController, animated: true, completion: nil)
    }


    func webView(_ webView: WKWebView, runJavaScriptTextInputPanelWithPrompt prompt: String, defaultText: String?, initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping (String?) -> Void) {

        let alertController = UIAlertController(title: nil, message: prompt, preferredStyle: .actionSheet)

        alertController.addTextField { (textField) in
            textField.text = defaultText
        }

        alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: { (action) in
            if let text = alertController.textFields?.first?.text {
                completionHandler(text)
            } else {
                completionHandler(defaultText)
            }
        }))

        alertController.addAction(UIAlertAction(title: "Cancel", style: .default, handler: { (action) in
            completionHandler(nil)
        }))

        present(alertController, animated: true, completion: nil)
    }

}

