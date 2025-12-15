using UnityEngine;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance;

    [Header("Game Settings")]
    public float snakeSpeed = 0.1f;
    public string difficulty = "Medium";

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
            
        }
        else
        {
            Destroy(gameObject);
        }
    }

    public void SetDifficulty(string diff)
    {
        difficulty = diff;
        switch (diff)
        {
            case "Easy":
                snakeSpeed = 0.10f;
                break;
            case "Medium":
                snakeSpeed = 0.08f;
                break;
            case "Hard":
                snakeSpeed = 0.04f;
                break;
        }
    }

    
}
