

namespace ITC2Wedstrijd.Views;

public partial class ToewijzenPage : ContentPage
{

	public ToewijzenPage(ToewijzenViewModel vm)
	{
		InitializeComponent();
		BindingContext = vm;	
	}
}