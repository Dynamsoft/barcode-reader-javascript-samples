using Microsoft.Extensions.Logging;
#if IOS || MACCATALYST
using WebKit;
#endif

namespace dnet_maui_blazor_hybrid
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                });

            builder.Services.AddMauiBlazorWebView();

#if IOS || MACCATALYST
            Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebViewHandler.BlazorWebViewMapper.Add("AllowCameraPermission", (handler, view) =>
            {
                handler.PlatformView.UIDelegate = new AllowCameraPermissionWebViewDelegate();
            });
#endif

#if DEBUG
            builder.Services.AddBlazorWebViewDeveloperTools();
    		builder.Logging.AddDebug();
#endif

            return builder.Build();
        }
    }

#if IOS || MACCATALYST
    public class AllowCameraPermissionWebViewDelegate : WKUIDelegate
    {
        public override void RequestMediaCapturePermission(
            WKWebView webView,
            WKSecurityOrigin origin,
            WKFrameInfo frame,
            WKMediaCaptureType type,
            Action<WKPermissionDecision> decisionHandler
        ) => decisionHandler(WKPermissionDecision.Grant);
    }
#endif
}
