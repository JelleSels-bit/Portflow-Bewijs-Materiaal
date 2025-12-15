using UnityEngine;
using UnityEngine.SceneManagement;

public class MainMenu : MonoBehaviour
{
    public void SetDifficultyEasy()
    {
        GameManager.Instance.SetDifficulty("Easy");
        SceneManager.LoadSceneAsync("Snakio");
    }

    public void SetDifficultyMedium()
    {
        GameManager.Instance.SetDifficulty("Medium");
        SceneManager.LoadSceneAsync("Snakio");
    }

    public void SetDifficultyHard()
    {
        GameManager.Instance.SetDifficulty("Hard");
        SceneManager.LoadSceneAsync("Snakio");
    }

    public void QuitGame()
    {
        Application.Quit();
    }
}
