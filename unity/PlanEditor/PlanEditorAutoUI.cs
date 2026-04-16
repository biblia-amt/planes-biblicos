using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System.Collections.Generic;

public class PlanEditorAutoUI : MonoBehaviour
{
    public Transform root;

    List<TMP_InputField> learningInputs = new List<TMP_InputField>();
    List<DayBlock> days = new List<DayBlock>();

    TMP_InputField idInput, titleInput, subtitleInput, minutesInput;
    Transform learningContainer, daysContainer;

    void Start()
    {
        BuildUI();
    }

    void BuildUI()
    {
        idInput = CreateField("ID");
        titleInput = CreateField("Título");
        subtitleInput = CreateField("Subtítulo", true);
        minutesInput = CreateField("Minutos");

        CreateLabel("Learning Points");
        learningContainer = CreateContainer();

        CreateButton("+ Agregar Learning", () =>
        {
            var input = CreateField("Learning", false, learningContainer);
            learningInputs.Add(input);
        });

        CreateLabel("Días");
        daysContainer = CreateContainer();

        CreateButton("+ Día", () =>
        {
            var day = new DayBlock(daysContainer);
            days.Add(day);
        });

        CreateButton("Generar JSON", GenerateJson);
    }

    TMP_InputField CreateField(string placeholder, bool multi = false, Transform parent = null)
    {
        GameObject go = new GameObject(placeholder);
        go.transform.SetParent(parent ?? root);

        var input = go.AddComponent<TMP_InputField>();
        var textGO = new GameObject("Text");
        textGO.transform.SetParent(go.transform);

        var text = textGO.AddComponent<TextMeshProUGUI>();
        input.textComponent = text;
        text.text = "";

        return input;
    }

    void CreateLabel(string txt)
    {
        var go = new GameObject("Label");
        go.transform.SetParent(root);
        var t = go.AddComponent<TextMeshProUGUI>();
        t.text = txt;
    }

    Transform CreateContainer()
    {
        var go = new GameObject("Container");
        go.transform.SetParent(root);
        go.AddComponent<VerticalLayoutGroup>();
        return go.transform;
    }

    void CreateButton(string text, UnityEngine.Events.UnityAction action)
    {
        var go = new GameObject(text);
        go.transform.SetParent(root);
        var btn = go.AddComponent<Button>();
        btn.onClick.AddListener(action);

        var txt = new GameObject("Text").AddComponent<TextMeshProUGUI>();
        txt.transform.SetParent(go.transform);
        txt.text = text;
    }

    void GenerateJson()
    {
        Plan p = new Plan();
        p.id = idInput.text;
        p.title = titleInput.text;
        p.subtitle = subtitleInput.text;
        int.TryParse(minutesInput.text, out p.estimatedMinutes);

        p.learningPoints = new List<string>();
        foreach (var l in learningInputs) p.learningPoints.Add(l.text);

        p.days = new List<Day>();
        foreach (var d in days) p.days.Add(d.Build());

        Debug.Log(JsonUtility.ToJson(p, true));
    }
}

[System.Serializable]
public class DayBlock
{
    TMP_InputField title;
    TMP_InputField day;

    public DayBlock(Transform parent)
    {
        var go = new GameObject("Day");
        go.transform.SetParent(parent);

        day = CreateField(go.transform, "Day");
        title = CreateField(go.transform, "Title");
    }

    TMP_InputField CreateField(Transform parent, string name)
    {
        var go = new GameObject(name);
        go.transform.SetParent(parent);
        return go.AddComponent<TMP_InputField>();
    }

    public Day Build()
    {
        Day d = new Day();
        int.TryParse(day.text, out d.day);
        d.title = title.text;
        d.references = new List<Reference>();
        return d;
    }
}
