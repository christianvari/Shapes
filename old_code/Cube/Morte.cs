using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;

public class Morte : MonoBehaviour {

    private static bool cont=false;

    void OnTriggerEnter2D(Collider2D coll)
    {
        if(coll.tag == "secondo")
        {
            Destroy(coll.gameObject);
        }
        if (coll.tag == "Ostacolo")
        {
            Destroy(coll.gameObject);
            if (PlayerPrefs.GetInt("highscore", 0)<CheckCollision.Punti)
            {
                PlayerPrefs.SetInt("highscore", CheckCollision.Punti);
            }
            SceneManager.LoadSceneAsync("Gameover", LoadSceneMode.Additive);
        }
    }

    public static bool Cont
    {
        get { return cont; }
        set { cont = value; }
    }
}
