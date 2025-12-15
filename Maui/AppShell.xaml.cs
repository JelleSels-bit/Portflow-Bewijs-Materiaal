namespace ITC2Wedstrijd
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();

            Routing.RegisterRoute(nameof(ToewijzenPage), typeof(ToewijzenPage));
            Routing.RegisterRoute(nameof(PloegPage), typeof(PloegPage));
            Routing.RegisterRoute(nameof(SpelerPage), typeof(SpelerPage));
            Routing.RegisterRoute(nameof(CategoriePage), typeof(CategoriePage));
            Routing.RegisterRoute(nameof(SportPage), typeof(SportPage));
            Routing.RegisterRoute(nameof(ClubPage), typeof(ClubPage));
            
        }
    }
}
