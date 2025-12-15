
namespace ITC2Wedstrijd.Views;

public partial class ClubPage : ContentPage
{
	public ClubPage(ClubViewModel vm)
	{
		InitializeComponent();
		BindingContext = vm;
	}
}