using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Advertisements;
public class Inizio : MonoBehaviour {

    void Update () {

        if (Input.GetKey(KeyCode.Escape))
        {
            Application.Quit();
        }

    }
}
