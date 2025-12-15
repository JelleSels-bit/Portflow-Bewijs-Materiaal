using UnityEngine;
using System.Collections.Generic;


public class SpawnScript : MonoBehaviour
{
    public static SpawnScript Instance;
    public BoxCollider2D gridArea;
    private List<GameObject> extraFoods = new List<GameObject>();
    
    [Header("Prefabs")]
    public GameObject foodPrefab;
    public GameObject extraFoodPrefab;
    public GameObject goodPowerupPrefab;
    public GameObject badPowerupPrefab;
    public GameObject obstaclePrefab;

    [Header("Powerup instellingen")]
    public float minSpawnTime = 5f;
    public float maxSpawnTime = 10f;
    public float powerupLifeTime = 5f;
    private float spawnTimer;
    private float extraFoodSpawnTimer;

    private GameObject currentFood;
    private GameObject currentPowerup;
    public List<GameObject> spawnedObstacles = new List<GameObject>();
    

    private void Awake()
    {
        if (Instance == null)
            Instance = this;
        else
            Destroy(gameObject);
    }

    private void Start()
    {
        SpawnFood();
        ResetPowerupTimer();
    }

    private void Update()
    {
        CheckTimers();
    }

    private void ResetPowerupTimer()
    {
        spawnTimer = Random.Range(minSpawnTime, maxSpawnTime);
    }

    private Vector3 GetRandomPosition()
    {
        Bounds bounds = gridArea.bounds;

        float x = Mathf.Round(Random.Range(bounds.min.x, bounds.max.x));
        float y = Mathf.Round(Random.Range(bounds.min.y, bounds.max.y));

        return new Vector3(x, y, 0f);
    }
      
    public void SpawnFood()
    {
        if (currentFood != null) Destroy(currentFood);
        currentFood = Instantiate(foodPrefab, GetRandomPosition(), Quaternion.identity);
    }

    private void SpawnGoodPowerup()
    {
        currentPowerup = Instantiate(goodPowerupPrefab, GetRandomPosition(), Quaternion.identity);
        Destroy(currentPowerup, powerupLifeTime);
    }
        
    public void SpawnExtraFood()
    {
        for (int i = 0; i < 5; i++) 
        {
            GameObject extraFood = Instantiate(extraFoodPrefab, GetRandomPosition(), Quaternion.identity);
            extraFoods.Add(extraFood);
        }
        extraFoodSpawnTimer = powerupLifeTime;
    }

    public void SpawnObstacles(int amount)
    {
       for (int i = 0; i < amount; i++)
        {
            Vector3 spawnPos = GetUniquePosition();
            GameObject obstacle = Instantiate(obstaclePrefab, spawnPos, Quaternion.identity);
            spawnedObstacles.Add(obstacle);
        }
    }

    private Vector3 GetUniquePosition()
    {
        Vector3 newPos;
        bool positionIsUsed;

        do
        {
            newPos = GetRandomPosition();
            positionIsUsed = false;

            foreach (GameObject obstacle in spawnedObstacles)
            {
                if (obstacle != null && obstacle.transform.position == newPos)
                {
                    positionIsUsed = true;
                    break;
                }
            }
        }
        while (positionIsUsed);

        return newPos;
    }

    public void ClearObstacles()
    {
        foreach (GameObject obstacle in spawnedObstacles)
        {
            if (obstacle != null) Destroy(obstacle);
        }
        spawnedObstacles.Clear();
    }

    public void ClearAllSpawns()
    {
        foreach (GameObject Food in extraFoods)
        {
            if (Food != null) Destroy(Food);
        }
        extraFoods.Clear();
        Destroy(currentPowerup);
    }
    private void CheckTimers()
    {
        // PowerupTimer
        spawnTimer -= Time.deltaTime;
        if (spawnTimer <= 0f)
        {
            SpawnGoodPowerup();
            ResetPowerupTimer();
        }

        //ExtraFoodTimer
        if (extraFoods.Count > 0)
        {
            extraFoodSpawnTimer -= Time.deltaTime;

            if (extraFoodSpawnTimer <= 0)
            {
                ClearAllSpawns();
                extraFoodSpawnTimer = 0;
            }
        }
    }

    

}
