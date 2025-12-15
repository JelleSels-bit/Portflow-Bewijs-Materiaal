using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;

public class UIManager : MonoBehaviour
{
    public static UIManager Instance;

    [Header("UI Elements")]
    public TextMeshProUGUI ScoreText;
    public TextMeshProUGUI HighScoreText;
    public TextMeshProUGUI GameOverScoreText;
    public GameObject GameOverScreen;

    private void Awake()
    {
        Instance = this;
    }

    private void Start()
    {
        GameOverScreen.SetActive(false);
        ScoreManager.Instance.UpdateHighScoreText();
    }

    public void ShowGameOver(int score)
    {
        GameOverScreen.SetActive(true);
        Time.timeScale = 0;

        
        ScoreManager.Instance.AddHighScore(score);
        GameOverScoreText.text = $"Score: {score}";
        ScoreManager.Instance.UpdateHighScoreText();
    }
    public void RestartGame()
    {
        GameOverScreen.SetActive(false);
        Time.timeScale = 1;
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    public void ReturnToMainMenu()
    {
        Time.timeScale = 1;
        SceneManager.LoadScene("Main Menu");
    }
}
