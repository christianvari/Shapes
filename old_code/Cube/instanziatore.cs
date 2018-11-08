using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Advertisements;
using UnityEngine.SceneManagement;

public class instanziatore : MonoBehaviour {

    public GameObject prefab;
    private GameObject Giocatore1, Giocatore2;
    private float i;
    private int nblocchi;
    private int schermo;
    

    // Use this for initialization
    void Start () {
        Time.timeScale = 1;
        Giocatore1 = Instantiate(prefab);
        i = Time.time;
        nblocchi = 1;
        Morte.Cont = false;
        Advertisement.Initialize("1340807");
        Pausa.isPaused = false;
        schermo = Screen.height * 9 / 10;

    }

    // Update is called once per frame
	void Update () {
        if (Time.timeScale == 1 && !Pausa.isPaused && (Input.GetKey(KeyCode.Space) || (Input.touchCount>0 && Input.GetTouch(0).position.y < schermo)) && Time.time>i+0.20f)
        {

            i = Time.time;
            if (nblocchi == 1)
            {

                Destroy(Giocatore1);
                Giocatore1 = Instantiate(prefab, new Vector2(-1.5f, -4.5f), Quaternion.identity);
                Giocatore2 = Instantiate(prefab, new Vector2(1.5f, -4.5f), Quaternion.identity);
                nblocchi = 2;
            }
            else
            {
                Destroy(Giocatore1);
                Destroy(Giocatore2);
                Giocatore1 = Instantiate(prefab, new Vector2(0f, -4.5f), Quaternion.identity);
                nblocchi = 1;

            }
        }
        if (Input.GetKeyDown(KeyCode.Escape) && SceneManager.sceneCount==1)
        {
            vaiinPausa();
        }

    }

    public void vaiinPausa()
    {
        if (!Pausa.isPaused)
        {
            SceneManager.LoadSceneAsync("Pause", LoadSceneMode.Additive);
        }
    }
}
