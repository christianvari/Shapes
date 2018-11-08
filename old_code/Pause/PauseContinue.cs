using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PauseContinue : MonoBehaviour {

    public void pausacontinua()
    {
        Pausa.esciPausa();
        //esco
    }

    public void pauseesci()
    {
        SceneManager.LoadSceneAsync("Shapes", LoadSceneMode.Single);
    }
}
