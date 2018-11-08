using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class Ostacoli2 : MonoBehaviour {

    public GameObject prefab;
    public GameObject sfondo;
    public Text testolevelup;

    private GameObject ostacolo;

    private float add, addvel, addcambio;
    private float tostacoli;
    private int nostacoli;
    private int unodue;
    private float mintempo;
    private SpriteRenderer rendersfondo;

    void Start()
    {
        add = 1.3f;
        rendersfondo = sfondo.GetComponent<SpriteRenderer>();
        tostacoli = Time.time;
        nostacoli = 0;
        addvel = 0;
        addcambio = 1.3f;
        unodue = 0;
        mintempo = 0.7f;
        SceneManager.sceneUnloaded += Tolta;
    }

    // FixedUpdate is called once per fixed frame

    void FixedUpdate()
    {

        //SceneManager.sceneUnloaded += Tolta;
        if (Time.time > tostacoli + add)
        {
            tostacoli = Time.time;
            if (unodue == 0)
            {
                switch (Random.Range(0, 9))
                {
                    case 0:
                    case 4:
                    case 5:
                        {
                            ostacolo = Instantiate(prefab, new Vector2(0, 8), Quaternion.identity);
                            ostacolo.GetComponent<Transform>().localScale = new Vector2(0.5f, Random.Range(1, 4));
                            ostacolo.GetComponent<Rigidbody2D>().velocity = new Vector2(0, -6f - addvel);
                            nostacoli += 1;
                            unodue = 0;
                            break;
                        }
                    case 1:
                    case 6:
                        {
                            for (int a = -1; a < 2; a = a + 2)
                            {
                                ostacolo = Instantiate(prefab, new Vector2(-1.5f * a, 8), Quaternion.identity);
                                ostacolo.GetComponent<Transform>().localScale = new Vector2(0.5f, Random.Range(1, 4));
                                ostacolo.GetComponent<Rigidbody2D>().velocity = new Vector2(0, -6f - addvel);
                            }
                            ostacolo.tag = "secondo";
                            nostacoli += 1;
                            unodue = 1;
                            break;
                        }
                    case 2:
                    case 8:
                        {
                            ostacolo = Instantiate(prefab, new Vector2(-1.5f, 8), Quaternion.identity);
                            ostacolo.GetComponent<Transform>().localScale = new Vector2(0.5f, Random.Range(1, 4));
                            ostacolo.GetComponent<Rigidbody2D>().velocity = new Vector2(0, -6f - addvel);
                            nostacoli += 1;
                            unodue = 1;
                            break;
                        }
                    case 3:
                    case 7:
                        {
                            ostacolo = Instantiate(prefab, new Vector2(1.5f, 8), Quaternion.identity);
                            ostacolo.GetComponent<Transform>().localScale = new Vector2(0.5f, Random.Range(1, 4));
                            ostacolo.GetComponent<Rigidbody2D>().velocity = new Vector2(0, -6f - addvel);
                            unodue = 1;
                            nostacoli += 1;
                            break;
                        }
                }
            }
            else
            {
                switch (Random.Range(0, 9))
                {
                    case 0:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        {
                            ostacolo = Instantiate(prefab, new Vector2(0f, 8), Quaternion.identity);
                            ostacolo.GetComponent<Transform>().localScale = new Vector2(0.5f, Random.Range(1, 4));
                            ostacolo.GetComponent<Rigidbody2D>().velocity = new Vector2(0, -6f - addvel);
                            nostacoli += 1;
                            unodue = 0;
                            break;
                        }
                    case 1:
                        {
                            for (int a = -1; a < 2; a = a + 2)
                            {
                                ostacolo = Instantiate(prefab, new Vector2(-1.5f * a, 8), Quaternion.identity);
                                ostacolo.GetComponent<Transform>().localScale = new Vector2(0.5f, Random.Range(1, 4));
                                ostacolo.GetComponent<Rigidbody2D>().velocity = new Vector2(0, -6f - addvel);
                            }
                            ostacolo.tag = "secondo";
                            nostacoli += 1;
                            unodue = 1;
                            break;
                        }
                    case 2:
                        {
                            ostacolo = Instantiate(prefab, new Vector2(-1.5f, 8), Quaternion.identity);
                            ostacolo.GetComponent<Transform>().localScale = new Vector2(0.5f, Random.Range(1, 4));
                            ostacolo.GetComponent<Rigidbody2D>().velocity = new Vector2(0, -6f - addvel);
                            nostacoli += 1;
                            unodue = 1;
                            break;
                        }
                    case 3:
                        {
                            ostacolo = Instantiate(prefab, new Vector2(1.5f, 8), Quaternion.identity);
                            ostacolo.GetComponent<Transform>().localScale = new Vector2(0.5f, Random.Range(1, 4));
                            ostacolo.GetComponent<Rigidbody2D>().velocity = new Vector2(0, -6f - addvel);
                            nostacoli += 1;
                            unodue = 1;
                            break;
                        }
                }
            }
        }
        if (nostacoli == 5)
        {
            add -= 0.10f;
            nostacoli = 0;
        }
        if (add < mintempo)
        {
            rendersfondo.color = Random.ColorHSV(0f, 1f, 1f, 1f, 0.5f, 1f);
            StartCoroutine(TestoLevelUP());
            addvel += 1.5f;
            if (addvel >= 6)
            {
                mintempo = 0.4f;
                add = 0.8f;
            }
            else
            {
                add = addcambio;
                addcambio -= 0.3f;
            }
        }

    }

    IEnumerator TestoLevelUP()
    {
        testolevelup.text = "Speed UP!";
        while (testolevelup.color.a < 1.0f)
        {
            testolevelup.color = new Color(1f, 1f, 1f, testolevelup.color.a + Time.deltaTime);
            yield return null;
        }
        yield return new WaitForSeconds(1);
        while (testolevelup.color.a >= 0.0f)
        {
            testolevelup.color = new Color(1f, 1f, 1f, testolevelup.color.a - Time.deltaTime);
            yield return null;
        }

    }

    IEnumerator Crovescia()
    {
        Time.timeScale = 0;
        testolevelup.text = "3";
        testolevelup.color = new Color(1f, 1f, 1f, 1f);
        yield return new WaitForSecondsRealtime(0.5f);
        testolevelup.color = new Color(1f, 1f, 1f, 0f);
        yield return new WaitForSecondsRealtime(0.5f);
        testolevelup.text = "2";
        testolevelup.color = new Color(1f, 1f, 1f, 1f);
        yield return new WaitForSecondsRealtime(0.5f);
        testolevelup.color = new Color(1f, 1f, 1f, 0f);
        yield return new WaitForSecondsRealtime(0.5f);
        testolevelup.text = "1";
        testolevelup.color = new Color(1f, 1f, 1f, 1f);
        yield return new WaitForSecondsRealtime(0.5f);
        testolevelup.color = new Color(1f, 1f, 1f, 0f);
        yield return new WaitForSecondsRealtime(0.5f);
        Time.timeScale = 1;
    }

    void Tolta(Scene scene)
    {
        if (scene.name == "Pause")
        {
            StartCoroutine(Crovescia());
            Pausa.isPaused = false;
        }
    }

    private void OnDestroy()
    {
        SceneManager.sceneUnloaded -= Tolta;
    }
}
