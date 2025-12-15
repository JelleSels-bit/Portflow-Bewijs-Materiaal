using System;
using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerScript : MonoBehaviour
{
    public float moveSpeed = 5f;
    public float minY = -4.5f;   
    public float maxY = 4.5f;       
    public Keyboard keyboard;
    private Rigidbody2D body;

    void Start()
    {
        keyboard = Keyboard.current;
        body = GetComponent<Rigidbody2D>();
        SpriteRenderer sr = GetComponent<SpriteRenderer>();
        if (sr == null)
            Debug.Log("Geen SpriteRenderer aanwezig!");
        else if (sr.sprite == null)
            Debug.Log("SpriteRenderer heeft geen sprite toegewezen!");
        else
            Debug.Log("SpriteRenderer aanwezig en sprite toegewezen");
    }
        
    void Update()
    {
        float move = 0f;

        if (keyboard.upArrowKey.IsPressed())
            move = moveSpeed;
        else if (keyboard.downArrowKey.IsPressed())
            move = -moveSpeed;

        if (move != 0f)
        {
            Vector2 newPos = body.position + Vector2.up * move * Time.fixedDeltaTime;
            newPos.y = Mathf.Clamp(newPos.y, minY, maxY);
            body.MovePosition(newPos);
        }

    }
}
 