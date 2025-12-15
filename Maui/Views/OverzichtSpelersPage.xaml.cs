namespace ITC2Wedstrijd.Views;

public partial class OverzichtSpelersPage : ContentPage
{
	public OverzichtSpelersPage(OverzichtSpelersViewModel vm)
	{
		InitializeComponent();
		BindingContext = vm;
	}
}