using UnityEngine;
using TMPro;
using System.Collections.Generic;

[System.Serializable]
public class Plan
{
    public string id;
    public string title;
    public string subtitle;
    public int estimatedMinutes;
    public List<string> learningPoints;
    public List<Day> days;
}

[System.Serializable]
public class Day
{
    public int day;
    public string title;
    public string focusLine;
    public string beforeReading;
    public List<Reference> references;
    public string passageHighlight;
    public string reflection;
    public string question;
    public string prayer;
    public string action;
    public string memoryVerse;
}

[System.Serializable]
public class Reference
{
    public string title;
    public string reference;
    public int bookId;
    public int chapter;
    public int startVerse = -1;
    public int endVerse = -1;
    public int verse = -1;
}

public class PlanEditor : MonoBehaviour
{
    public TMP_InputField idInput;
    public TMP_InputField titleInput;
    public TMP_InputField subtitleInput;
    public TMP_InputField minutesInput;

    public Transform learningContainer;
    public GameObject learningPrefab;

    public Transform daysContainer;
    public GameObject dayPrefab;

    public void AddLearningPoint()
    {
        Instantiate(learningPrefab, learningContainer);
    }

    public void AddDay()
    {
        Instantiate(dayPrefab, daysContainer);
    }

    public void Save()
    {
        Plan plan = new Plan();

        plan.id = idInput.text;
        plan.title = titleInput.text;
        plan.subtitle = subtitleInput.text;
        plan.estimatedMinutes = int.Parse(minutesInput.text);

        plan.learningPoints = new List<string>();
        foreach (Transform t in learningContainer)
        {
            var input = t.GetComponentInChildren<TMP_InputField>();
            plan.learningPoints.Add(input.text);
        }

        plan.days = new List<Day>();
        foreach (Transform t in daysContainer)
        {
            plan.days.Add(t.GetComponent<DayEditorItem>().Build());
        }

        string json = JsonUtility.ToJson(plan, true);
        Debug.Log(json);
    }
}