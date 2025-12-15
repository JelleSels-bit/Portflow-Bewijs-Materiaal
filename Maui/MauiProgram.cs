using Microsoft.Extensions.Logging;
using Microsoft.Maui.Controls.Compatibility.Hosting;

namespace ITC2Wedstrijd
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });

#if DEBUG
    		builder.Logging.AddDebug();
#endif

            builder.Services.AddSingleton<CategorieRepository>();
            builder.Services.AddSingleton<ClubRepository>();
            builder.Services.AddSingleton<SportRepository>();
            builder.Services.AddSingleton<SpelerRepository>();
            builder.Services.AddSingleton<PloegRepository>();
            builder.Services.AddSingleton<SpelerPloegRepository>();
            builder.Services.AddSingleton<TrainerRepository>();


            builder.Services.AddTransient<CategoriePage>();
            builder.Services.AddTransient<ClubPage>();
            builder.Services.AddTransient<SportPage>();
            builder.Services.AddTransient<SpelerPage>();
            builder.Services.AddTransient<PloegPage>();
            builder.Services.AddTransient<ToewijzenPage>();
            builder.Services.AddTransient<MainPage>();
            builder.Services.AddTransient<PloegStatistiekenPage>();
            builder.Services.AddTransient<OverzichtSpelersPage>();
            builder.Services.AddTransient<PloegenOverzichtPage>();
            builder.Services.AddTransient<TrainersPage>();


            builder.Services.AddSingleton<CategorieViewModel>();
            builder.Services.AddSingleton<ClubViewModel>();
            builder.Services.AddSingleton<SportViewModel>();
            builder.Services.AddSingleton<SpelerViewModel>();
            builder.Services.AddSingleton<PloegViewModel>();
            builder.Services.AddTransient<ToewijzenViewModel>();
            builder.Services.AddSingleton<BaseViewModel>();
            builder.Services.AddTransient<PloegStatistiekenViewModel>();
            builder.Services.AddTransient<OverzichtSpelersViewModel>();
            builder.Services.AddTransient<PloegenOverzichtViewModel>();
            builder.Services.AddSingleton<TrainersToewijzenViewModel>();
            

            return builder.Build();
        }
    }
}
