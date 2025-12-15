using UnityEngine;

public class BallScript : MonoBehaviour
{
    public float initialSpeed = 5f;
    private float currentSpeed;
    private Rigidbody2D body;

    void Start()
    {
        body = GetComponent<Rigidbody2D>();
        currentSpeed = initialSpeed;
        Launch();
    }

    private void Launch()
    {
        float x = Random.Range(0, 2) == 0 ? -1 : 1;
        float y = Random.Range(0, 2) == 0 ? -1 : 1;
        body.linearVelocity = new Vector2(x, y).normalized * currentSpeed;
    }

    public void Restart()
    {
        transform.position = Vector3.zero;
        body.linearVelocity = Vector2.zero;
        currentSpeed = initialSpeed;
        Launch();
    }


    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Paddle"))
        {
            Vector2 velocity = body.linearVelocity;

            float yVariation = Random.Range(-0.3f, 0.3f);
            velocity.y += yVariation;
                        
            currentSpeed *= 1.05f;
                        
            velocity = velocity.normalized * currentSpeed;
            body.linearVelocity = velocity;
        }
    }





}
