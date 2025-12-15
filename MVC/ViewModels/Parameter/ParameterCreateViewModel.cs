namespace Restaurant.ViewModels
{
    public class ParameterCreateViewModel
    {
        [Required(ErrorMessage = "Naam is verplicht")]
        public string Naam { get; set; }

        [Required(ErrorMessage = "Waarde is verplicht")]
        public string Waarde { get; set; }
    }
}
