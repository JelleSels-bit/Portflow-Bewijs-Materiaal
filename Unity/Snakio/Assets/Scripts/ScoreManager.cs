using TMPro;
using UnityEngine;


public class ScoreManager : MonoBehaviour
{
    public static ScoreManager Instance;
    public int Score = 0;
    public int HighScore = 0;

    [SerializeField] private TextMeshProUGUI ScoreText;
    [SerializeField] private TextMeshProUGUI HighScoreText;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
            HighScore = PlayerPrefs.GetInt("HighScore", 0);
        }
        else
            Destroy(gameObject);
    }

    void Start()
    {
        if (ScoreText == null)
            ScoreText = GameObject.Find("Canvas/ScoreText")?.GetComponent<TextMeshProUGUI>();

        if (HighScoreText == null)
            HighScoreText = GameObject.Find("Canvas/HighScoreText")?.GetComponent<TextMeshProUGUI>();




        HighScore = PlayerPrefs.GetInt("HighScore", 0);
        UpdateScoreText();
        UpdateHighScoreText();
    }

    public void AddScore(int amount)
    {
        Score += amount;

        if (Score > HighScore)
        {
            HighScore = Score;
            PlayerPrefs.SetInt("HighScore", HighScore); 
            PlayerPrefs.Save();
            UpdateHighScoreText();
        }

        UpdateScoreText();

    }
    
    public void ResetScore()
    {
        Score = 0;
        UpdateScoreText();
    }

    public void AddHighScore(int score)
    {
        if (score > HighScore)
        {
            HighScore = score;
            PlayerPrefs.SetInt("HighScore", HighScore);
            PlayerPrefs.Save();
        }
    }

    public void UpdateScoreText()
    {
        if (ScoreText != null)
            ScoreText.text = $"Score: {Score}";
        
    }

    public void UpdateHighScoreText()
    {
        if (HighScoreText != null)
            HighScoreText.text = $"High Score: {HighScore}";
    }


    
}
