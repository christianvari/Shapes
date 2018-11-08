using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Advertisements;
using UnityEngine.SceneManagement;

public class punteggiogameover : MonoBehaviour {

    public Text testoscore;
    public Text testohigh;
    public GameObject continua;

    void Start()
    {
        Time.timeScale = 0;
        if (Morte.Cont || !Advertisement.IsReady("rewardedVideo"))
        {
            continua.SetActive(false);
        }
        testohigh.text = PlayerPrefs.GetInt("highscore").ToString();
        testoscore.text = CheckCollision.Punti.ToString();
    }

    void Update()
    {
        if(Input.GetKey(KeyCode.Escape))
        {
            SceneManager.LoadSceneAsync("Shapes", LoadSceneMode.Single);
        }
    }

}
