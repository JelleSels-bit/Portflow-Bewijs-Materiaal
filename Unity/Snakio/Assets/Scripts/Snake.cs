using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Snake : MonoBehaviour
{
    public static Snake Instance;
    private Vector2 _direction;
    private Vector2 _nextDirection;
    private List<Transform> _segments = new List<Transform>();
    private float moveTimer = 0f;
    private bool canDie = false;
    private bool canMove = true;



    [Header("Snake Settings")]
    public int initialSize = 4;
    public Transform segmentPrefab;

    private void Awake()
    {
        if (Instance == null)
            Instance = this;
        else
            Destroy(gameObject);
    }

    private void Start()
    {
        ResetState();
        StartCoroutine(EnableDeathAfterSeconds(0.5f));
    }

    private void Update()
    {
        RotateSnake();
        RotateHeadPrefab();
        
    }
        
    private void FixedUpdate()
    {
        if (!canMove) return;
        moveTimer += Time.fixedDeltaTime;

        if (moveTimer >= GameManager.Instance.snakeSpeed)
        {
            Move();
            moveTimer = 0f;
        }
    }

    private void RotateSnake()
    {
        if (Input.GetKeyDown(KeyCode.UpArrow) && _direction != Vector2.down)
            _nextDirection = Vector2.up;
        else if (Input.GetKeyDown(KeyCode.DownArrow) && _direction != Vector2.up)
            _nextDirection = Vector2.down;
        else if (Input.GetKeyDown(KeyCode.RightArrow) && _direction != Vector2.left)
            _nextDirection = Vector2.right;
        else if (Input.GetKeyDown(KeyCode.LeftArrow) && _direction != Vector2.right)
            _nextDirection = Vector2.left;
    }

    private void RotateHeadPrefab()
    {
        float rotationZ = 0f;

        if (_direction == Vector2.up)
            rotationZ = 180;
        else if (_direction == Vector2.down)
            rotationZ = 0;
        else if (_direction == Vector2.left)
            rotationZ = -90;
        else if (_direction == Vector2.right)
            rotationZ = 90;

        transform.rotation = Quaternion.Euler(0, 0, rotationZ);
    }
    
    private void Move()
    {
        _direction = _nextDirection;
        for (int i = _segments.Count - 1; i > 0; i--)
        {
            _segments[i].position = _segments[i - 1].position;
        }

        this.transform.position = new Vector3(
            Mathf.Round(this.transform.position.x) + _direction.x,
            Mathf.Round(this.transform.position.y) + _direction.y,
            0);
    }

    private void Grow()
    {
        Transform segment = Instantiate(this.segmentPrefab);
        segment.position = _segments[_segments.Count - 1].position;
        _segments.Add(segment);

    }

    private void ResetState()
    {
        canDie = false;

        for (int i = 1;  i < _segments.Count; i++)
        {
            Destroy(_segments[i].gameObject);
        }

        _segments.Clear();
        _segments.Add(this.transform);

        for (int i = 1; i < initialSize; i++)
        {
            _segments.Add(Instantiate(this.segmentPrefab));
        }

        this.transform.position = new Vector3(0,0,0);

        Vector2[] possibleDirections = { Vector2.up, Vector2.down, Vector2.left, Vector2.right };
        _direction = possibleDirections[UnityEngine.Random.Range(0, possibleDirections.Length)];
        _nextDirection = _direction;

        RotateHeadPrefab();
                
    }

    public void Shrink(int amount)
    {
        int segmentsToRemove = Mathf.Min(amount, _segments.Count - 2);

        for (int i = 0; i < segmentsToRemove; i++)
        {
            Transform segment = _segments[_segments.Count - 1];
            _segments.RemoveAt(_segments.Count - 1);
            Destroy(segment.gameObject);
        }
    }

    public void GrowSnake(int amount)
    {
        for (int i = 0; i < amount; i++)
        {
            Transform segment = Instantiate(segmentPrefab);
            segment.position = _segments[_segments.Count - 1].position;
            _segments.Add(segment);
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (SceneManager.GetActiveScene().name != "Snakio")
            return;

        if (!canDie) return;

        if (collision.tag == "Food")
        {
            Grow();
            ScoreManager.Instance.AddScore(10);
            SpawnScript.Instance.SpawnFood();
            Destroy(collision.gameObject);
        }
        else if (collision.tag == "GameOver")
        {
            GameOver();
            canDie = false;

        }
        else if (collision.tag == "GoodPowerUp")
        {
            PowerUpManager.Instance.PowerUp();
            Destroy(collision.gameObject);
        }
        else if(collision.tag == "ExtraFood")
        {
            Grow();
            ScoreManager.Instance.AddScore(30);
            Destroy(collision.gameObject);
        }
    }
    private IEnumerator EnableDeathAfterSeconds(float seconds)
    {
        yield return new WaitForSeconds(seconds);
        canDie = true;
    }

    private void GameOver()
    {
        int finalScore = ScoreManager.Instance.Score;
        UIManager.Instance.ShowGameOver(finalScore);
        ResetState();
        ScoreManager.Instance.ResetScore();
        SpawnScript.Instance.SpawnFood();
        SpawnScript.Instance.ClearAllSpawns();
        SpawnScript.Instance.ClearObstacles();
        PowerUpManager.Instance.ResetDebuffTimer();
    }

    public void CallStart()
    {
        Start();
    }




} 
