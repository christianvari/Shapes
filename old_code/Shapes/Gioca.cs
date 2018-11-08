using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;
using UnityEngine;

public class Gioca : MonoBehaviour {

    public void Inizio()
    {
            SceneManager.LoadSceneAsync("Cube",LoadSceneMode.Single);
    }
}
