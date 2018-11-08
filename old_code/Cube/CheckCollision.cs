using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;

public class CheckCollision : MonoBehaviour {

    private static int punti;
    public Text testopunti;

    void Start()
    {
        punti = 0;
        testopunti.text = "Score: " + punti.ToString();
    }

    void OnTriggerExit2D(Collider2D coll)
    {
        if (coll.tag == "Ostacolo" || coll.tag == "secondo")
        {
            Destroy(coll.gameObject);
            punti += 10;
            testopunti.text = "Score: " + punti.ToString();
        }
    }

    public static int Punti
    {
        get { return punti; }
    }

}
