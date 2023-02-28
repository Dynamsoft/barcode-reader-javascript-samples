import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, DBRLicenseVerificationListener {
    
    var window: UIWindow?
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        if #available(iOS 15.0, *) {
            let app = UINavigationBarAppearance()
            app.configureWithOpaqueBackground()
            app.titleTextAttributes = [
                NSAttributedString.Key.foregroundColor: UIColor.black
            ]
            app.backgroundColor = UIColor.white

            UINavigationBar.appearance().scrollEdgeAppearance = app
            UINavigationBar.appearance().standardAppearance = app
            
        }
        
        // Initialize license.
        // The license string here is a time-limited trial license. Note that network connection is required for this license to work.
        // You can also request an extension for your trial license in the customer portal: https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&utm_source=installer&package=ios
        DynamsoftBarcodeReader.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", verificationDelegate: self)
        // Override point for customization after application launch.
        return true
    }
    
    func dbrLicenseVerificationCallback(_ isSuccess: Bool, error: Error?) {
        var msg:String? = nil
        if(error != nil)
        {
            let err = error as NSError?
            msg = err!.userInfo[NSUnderlyingErrorKey] as? String
            DispatchQueue.main.async {
                var topWindow: UIWindow? = UIWindow(frame: UIScreen.main.bounds)
                topWindow?.rootViewController = UIViewController()
                let alert = UIAlertController(title: "Server license verify failed", message: msg, preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "OK", style: .cancel) { _ in
                    topWindow?.isHidden = true
                    topWindow = nil
                 })
                topWindow?.makeKeyAndVisible()
                topWindow?.rootViewController?.present(alert, animated: true, completion: nil)
            }
        }
    }
    
}

