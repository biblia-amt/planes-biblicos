using UnityEngine;
using TMPro;
using System.Collections.Generic;

public class DayEditorItem : MonoBehaviour
{
    public TMP_InputField dayInput;
    public TMP_InputField titleInput;
    public TMP_InputField focusLineInput;
    public TMP_InputField beforeReadingInput;

    public TMP_InputField passageHighlightInput;
    public TMP_InputField reflectionInput;
    public TMP_InputField questionInput;
    public TMP_InputField prayerInput;
    public TMP_InputField actionInput;
    public TMP_InputField memoryVerseInput;

    public Transform referencesContainer;
    public GameObject referencePrefab;

    public void AddReference()
    {
        Instantiate(referencePrefab, referencesContainer);
    }

    public Day Build()
    {
        Day d = new Day();

        d.day = int.Parse(dayInput.text);
        d.title = titleInput.text;
        d.focusLine = focusLineInput.text;
        d.beforeReading = beforeReadingInput.text;

        d.passageHighlight = passageHighlightInput.text;
        d.reflection = reflectionInput.text;
        d.question = questionInput.text;
        d.prayer = prayerInput.text;
        d.action = actionInput.text;
        d.memoryVerse = memoryVerseInput.text;

        d.references = new List<Reference>();
        foreach (Transform t in referencesContainer)
        {
            d.references.Add(t.GetComponent<ReferenceEditorItem>().Build());
        }

        return d;
    }
}