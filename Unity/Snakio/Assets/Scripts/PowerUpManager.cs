using TMPro;
using UnityEngine;


public class PowerUpManager : MonoBehaviour
{
    public float DebuffTimer = 15f;
    public float DebuffInterval = 15f;
    public static PowerUpManager Instance;
    string[] PowerUps = { "ExtraPoints", "MoreFoodSpawns", "MinusLength" };
    string[] Debuffs = { "ExtraLength", "spawnObstacles" };
    private string currentPowerup;
    private string currentDebuff;
    [SerializeField] private TextMeshProUGUI DebuffTimerToText;
    [SerializeField] private GameObject DebuffAnimationPrefab;
    

    private void Awake()
    {
        if (Instance == null)
            Instance = this;
        else
            Destroy(gameObject);
    }

    private void Update()
    {
        DebuffTimer -= Time.deltaTime;
        UpdateDebuffTimerToText();
        
        if (DebuffTimer <= 0f)
        {
            Debuff();
            DebuffTimer = DebuffInterval;
        }
    }

    public void PowerUp()
    {
        SpawnScript.Instance.SpawnExtraFood();

        currentPowerup = PowerUps[UnityEngine.Random.Range(0, PowerUps.Length)];
        if (currentPowerup == "ExtraPoints")
        {
            ScoreManager.Instance.AddScore(20);
        }
        else if (currentPowerup == "MoreFoodSpawns")
        {
            SpawnScript.Instance.SpawnExtraFood();
        }
        else if (currentPowerup == "MinusLength")
        {
            Snake.Instance.Shrink(5);
        }

    }

    private void UpdateDebuffTimerToText()
    {
        int TimerInSecconds = Mathf.CeilToInt(DebuffTimer);
        DebuffTimerToText.text = $"Next Debuff in: {TimerInSecconds}";
    }

    public void ResetDebuffTimer()
    {
        DebuffTimer = DebuffInterval;
    }

    public void Debuff()
    {
        if (SpawnScript.Instance.spawnedObstacles != null)
            SpawnScript.Instance.ClearObstacles();



        currentDebuff = Debuffs[UnityEngine.Random.Range(0, Debuffs.Length)];
        if (currentDebuff == "ExtraLength")
        {
            Snake.Instance.GrowSnake(5);
        }
        else if (currentDebuff == "spawnObstacles")
        {
            SpawnScript.Instance.SpawnObstacles(22);
        }


    }
}
