using UnityEngine;

public class ComputerScript : MonoBehaviour
{
    public float moveSpeed = 5f;    
    public float minY = -4.5f;      
    public float maxY = 4.5f;       
    public Transform Ball;           

    private Rigidbody2D body;

    void Start()
    {
        body = GetComponent<Rigidbody2D>();
        body.constraints = RigidbodyConstraints2D.FreezePositionX | RigidbodyConstraints2D.FreezeRotation;
    }

    void FixedUpdate()
    {
        if (Ball == null) return;
                
        float direction = Ball.position.y - transform.position.y;
        float step = Mathf.Clamp(direction, -moveSpeed * Time.fixedDeltaTime, moveSpeed * Time.fixedDeltaTime);
        
        Vector2 newPos = body.position + Vector2.up * step;
        newPos.y = Mathf.Clamp(newPos.y, minY, maxY);
                
        body.MovePosition(newPos);
    }
}
