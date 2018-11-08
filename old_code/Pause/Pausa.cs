using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class Pausa : MonoBehaviour
{

    public Text score;
    private static bool ispaused;

    // Use this for initialization
    void Start()
    {
        Time.timeScale = 0;
        score.text = CheckCollision.Punti.ToString();
        ispaused = true;

    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            esciPausa();
        }
    }

    public static bool isPaused
    {
        get { return ispaused; }
        set { ispaused = value; }
    }

    public static void esciPausa()
    {
        SceneManager.UnloadSceneAsync("Pause");
    }
}
