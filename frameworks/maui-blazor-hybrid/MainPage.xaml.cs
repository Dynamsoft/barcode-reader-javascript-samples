using Microsoft.AspNetCore.Components.WebView;
#if IOS || MACCATALYST
using WebKit;
#endif
#if ANDROID
using AndroidX.Activity;
using dnet_maui_blazor_hybrid.Platforms.Android;
using Microsoft.Maui.Platform;
#endif

namespace dnet_maui_blazor_hybrid
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();

            blazorWebView.BlazorWebViewInitializing += BlazorWebViewInitializing;
            blazorWebView.BlazorWebViewInitialized += BlazorWebViewInitialized;
        }

        private void BlazorWebViewInitializing(object? sender, BlazorWebViewInitializingEventArgs e)
        {
#if IOS || MACCATALYST
            e.Configuration.AllowsInlineMediaPlayback = true;
            e.Configuration.MediaTypesRequiringUserActionForPlayback = WebKit.WKAudiovisualMediaTypes.None;
            // Refer: https://stackoverflow.com/a/51736967
            e.Configuration.WebsiteDataStore = WKWebsiteDataStore.DefaultDataStore;
#endif
        }
        private void BlazorWebViewInitialized(object? sender, BlazorWebViewInitializedEventArgs e) {
#if ANDROID
            if (e.WebView.Context?.GetActivity() is not ComponentActivity activity)
            {
                throw new InvalidOperationException($"The permission-managing WebChromeClient requires that the current activity be a '{nameof(ComponentActivity)}'.");
            }

            e.WebView.Settings.JavaScriptEnabled = true;
            e.WebView.Settings.MediaPlaybackRequiresUserGesture = false;
            e.WebView.Settings.DomStorageEnabled = true;
            e.WebView.SetWebChromeClient(new PermissionManagingBlazorWebChromeClient(e.WebView.WebChromeClient!, activity));
#endif
        }
    }
}
