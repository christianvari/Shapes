using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Advertisements;
using UnityEngine.SceneManagement;

public class Continue : MonoBehaviour {

    public void ShowAdRiprova()
    {
        if (Advertisement.IsReady("prova") && Random.Range(0, 3) == 0)
        {
            SceneManager.UnloadSceneAsync("Cube");
            Advertisement.Show("prova");
            SceneManager.LoadSceneAsync("Cube");
        }
        else
        {
            SceneManager.LoadSceneAsync("Cube");
        }
    }

    public void ShowAdContinua()
    {
        if (Advertisement.IsReady("rewardedVideo"))
        {
            var options = new ShowOptions { resultCallback = HandleShowResult };
            Advertisement.Show("rewardedVideo", options);
        }
        else
        {
            SceneManager.LoadSceneAsync("Cube");
        }
    }

    private void HandleShowResult(ShowResult result)
    {
        switch (result)
        {
            case ShowResult.Finished:
                Morte.Cont = true;
                SceneManager.UnloadSceneAsync("Gameover");
                SceneManager.LoadSceneAsync("Pause",LoadSceneMode.Additive);
                break;
        }
    }
}
