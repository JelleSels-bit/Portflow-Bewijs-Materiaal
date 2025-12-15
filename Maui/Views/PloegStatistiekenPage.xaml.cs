namespace ITC2Wedstrijd.Views;

public partial class PloegStatistiekenPage : ContentPage
{
	public PloegStatistiekenPage(PloegStatistiekenViewModel vm)
	{
		InitializeComponent();
		BindingContext = vm;
	}
}