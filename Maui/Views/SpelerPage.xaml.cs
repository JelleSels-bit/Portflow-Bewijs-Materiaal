
namespace ITC2Wedstrijd.Views;

public partial class SpelerPage : ContentPage
{
	public SpelerPage(SpelerViewModel vm)
	{
		InitializeComponent();
		BindingContext = vm;
	}
}