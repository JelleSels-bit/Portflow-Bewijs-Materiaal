namespace Restaurant.Services;

public interface IMailSender
{
    public Task SendMail(int mailId, Reservatie rs);
    public Task SendWelcomeMail(int mailId, int reservatieId);
    Task SendEvalMail(int mailId, Reservatie rs);
    public Task SendPasswordResetMail(int mailId, string email, string link, Guid token);
}