
namespace ITC2Wedstrijd.Views;

public partial class CategoriePage : ContentPage
{
	public CategoriePage(CategorieViewModel vm)
	{
		InitializeComponent();
		BindingContext = vm;
	}
}