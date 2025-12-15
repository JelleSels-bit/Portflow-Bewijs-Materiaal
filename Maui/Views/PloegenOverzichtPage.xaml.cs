namespace ITC2Wedstrijd.Views;

public partial class PloegenOverzichtPage : ContentPage
{
	public PloegenOverzichtPage(PloegenOverzichtViewModel vm)
	{
		InitializeComponent();
		BindingContext = vm;
	}
}