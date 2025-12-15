using UnityEngine;

public class Goal : MonoBehaviour
{
    public ScoreManager ScoreManager;
    public BallScript BallScript;
    public bool isPlayerGoal;

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Ball"))
        {
            if (isPlayerGoal)
            {
                ScoreManager.AddComputerScore();
                BallScript.Restart();
            }
            else
            {
                
                ScoreManager.AddPlayerScore();
                BallScript.Restart();
            }
        }

    }
}
