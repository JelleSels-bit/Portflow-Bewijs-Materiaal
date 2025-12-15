namespace ITC2Wedstrijd.Views
{
    public partial class MainPage : ContentPage
    {
        public MainPage(BaseViewModel vm)
        {
            InitializeComponent();
            BindingContext = vm;
        }
    }

}
