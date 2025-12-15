
namespace ITC2Wedstrijd.Views;

public partial class PloegPage : ContentPage
{
	public PloegPage(PloegViewModel vm)
	{
		InitializeComponent();
		BindingContext = vm;
	}
}