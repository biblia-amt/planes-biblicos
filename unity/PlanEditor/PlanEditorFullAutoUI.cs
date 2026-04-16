using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System.Collections.Generic;

public class PlanEditorFullAutoUI : MonoBehaviour
{
    public Transform root;

    TMP_InputField idInput, titleInput, subtitleInput, minutesInput;

    List<TMP_InputField> learningInputs = new List<TMP_InputField>();
    List<DayBlockFull> days = new List<DayBlockFull>();

    Transform learningContainer, daysContainer;

    void Start()
    {
        Build();
    }

    void Build()
    {
        idInput = CreateField("ID");
        titleInput = CreateField("Title");
        subtitleInput = CreateField("Subtitle", true);
        minutesInput = CreateField("Minutes");

        CreateLabel("Learning Points");
        learningContainer = CreateContainer();

        CreateButton("+ Learning", () =>
        {
            learningInputs.Add(CreateField("Point", false, learningContainer));
        });

        CreateLabel("Days");
        daysContainer = CreateContainer();

        CreateButton("+ Day", () =>
        {
            days.Add(new DayBlockFull(daysContainer));
        });

        CreateButton("Generate JSON", Generate);
    }

    void Generate()
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

    TMP_InputField CreateField(string name, bool multi = false, Transform parent = null)
    {
        var go = new GameObject(name);
        go.transform.SetParent(parent ?? root);

        var input = go.AddComponent<TMP_InputField>();
        var textGO = new GameObject("Text");
        textGO.transform.SetParent(go.transform);

        var text = textGO.AddComponent<TextMeshProUGUI>();
        input.textComponent = text;

        return input;
    }

    void CreateLabel(string t)
    {
        var go = new GameObject("Label");
        go.transform.SetParent(root);
        go.AddComponent<TextMeshProUGUI>().text = t;
    }

    Transform CreateContainer()
    {
        var go = new GameObject("Container");
        go.transform.SetParent(root);
        go.AddComponent<VerticalLayoutGroup>();
        return go.transform;
    }

    void CreateButton(string text, UnityEngine.Events.UnityAction act)
    {
        var go = new GameObject(text);
        go.transform.SetParent(root);
        var btn = go.AddComponent<Button>();
        btn.onClick.AddListener(act);

        var t = new GameObject("Text").AddComponent<TextMeshProUGUI>();
        t.transform.SetParent(go.transform);
        t.text = text;
    }
}

[System.Serializable]
public class DayBlockFull
{
    TMP_InputField day, title, focus, before, highlight, reflection, question, prayer, action, memory;
    List<ReferenceBlock> refs = new List<ReferenceBlock>();
    Transform root;

    public DayBlockFull(Transform parent)
    {
        root = new GameObject("Day").transform;
        root.SetParent(parent);
        root.gameObject.AddComponent<VerticalLayoutGroup>();

        day = Create("Day");
        title = Create("Title");
        focus = Create("FocusLine", true);
        before = Create("BeforeReading", true);

        CreateLabel("References");

        var refContainer = new GameObject("Refs").transform;
        refContainer.SetParent(root);

        var btn = new GameObject("+Ref").AddComponent<Button>();
        btn.transform.SetParent(root);
        btn.onClick.AddListener(() => refs.Add(new ReferenceBlock(refContainer)));

        highlight = Create("Highlight", true);
        reflection = Create("Reflection", true);
        question = Create("Question", true);
        prayer = Create("Prayer", true);
        action = Create("Action", true);
        memory = Create("MemoryVerse");
    }

    TMP_InputField Create(string name, bool multi=false)
    {
        var go = new GameObject(name);
        go.transform.SetParent(root);
        return go.AddComponent<TMP_InputField>();
    }

    void CreateLabel(string t)
    {
        var go = new GameObject("Label");
        go.transform.SetParent(root);
        go.AddComponent<TextMeshProUGUI>().text = t;
    }

    public Day Build()
    {
        Day d = new Day();
        int.TryParse(day.text, out d.day);
        d.title = title.text;
        d.focusLine = focus.text;
        d.beforeReading = before.text;
        d.passageHighlight = highlight.text;
        d.reflection = reflection.text;
        d.question = question.text;
        d.prayer = prayer.text;
        d.action = action.text;
        d.memoryVerse = memory.text;

        d.references = new List<Reference>();
        foreach (var r in refs) d.references.Add(r.Build());

        return d;
    }
}

[System.Serializable]
public class ReferenceBlock
{
    TMP_InputField title, reference, book, chapter, start, end, verse;
    Transform root;

    public ReferenceBlock(Transform parent)
    {
        root = new GameObject("Ref").transform;
        root.SetParent(parent);

        title = Create("Title");
        reference = Create("Reference");
        book = Create("BookId");
        chapter = Create("Chapter");
        start = Create("StartVerse");
        end = Create("EndVerse");
        verse = Create("Verse");
    }

    TMP_InputField Create(string n)
    {
        var go = new GameObject(n);
        go.transform.SetParent(root);
        return go.AddComponent<TMP_InputField>();
    }

    public Reference Build()
    {
        Reference r = new Reference();
        r.title = title.text;
        r.reference = reference.text;
        int.TryParse(book.text, out r.bookId);
        int.TryParse(chapter.text, out r.chapter);
        int.TryParse(start.text, out r.startVerse);
        int.TryParse(end.text, out r.endVerse);
        int.TryParse(verse.text, out r.verse);
        return r;
    }
}
