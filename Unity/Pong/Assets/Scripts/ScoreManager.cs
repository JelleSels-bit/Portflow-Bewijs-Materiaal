using TMPro;
using UnityEngine;

public class ScoreManager : MonoBehaviour
{

    public TextMeshProUGUI playerScoreText;
    public TextMeshProUGUI computerScoreText;
    
    private int playerScore = 0;
    private int computerScore = 0;

    public void AddPlayerScore()
    {
        playerScore++;
        playerScoreText.text = playerScore.ToString();
    }

    public void AddComputerScore()
    {
        computerScore++;
        computerScoreText.text = computerScore.ToString();
    }
}
