namespace dnet_maui_blazor_hybrid
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();
        }

        protected override Window CreateWindow(IActivationState? activationState)
        {
            return new Window(new MainPage()) { Title = "dnet_maui_blazor_hybrid" };
        }
    }
}
