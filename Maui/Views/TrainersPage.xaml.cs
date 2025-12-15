using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITC2Wedstrijd.Views;

public partial class TrainersPage : ContentPage
{
    public TrainersPage(TrainersToewijzenViewModel vm)
    {
        InitializeComponent();
        BindingContext = vm;
    }
}