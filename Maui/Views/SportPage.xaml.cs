
namespace ITC2Wedstrijd.Views;

public partial class SportPage : ContentPage
{
	public SportPage(SportViewModel vm)
	{
		InitializeComponent();
		BindingContext = vm;
	}
}