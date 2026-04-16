using UnityEngine;
using TMPro;

public class ReferenceEditorItem : MonoBehaviour
{
    public TMP_InputField titleInput;
    public TMP_InputField referenceInput;
    public TMP_InputField bookIdInput;
    public TMP_InputField chapterInput;

    public TMP_InputField startVerseInput;
    public TMP_InputField endVerseInput;
    public TMP_InputField verseInput;

    public Reference Build()
    {
        Reference r = new Reference();

        r.title = titleInput.text;
        r.reference = referenceInput.text;
        r.bookId = int.Parse(bookIdInput.text);
        r.chapter = int.Parse(chapterInput.text);

        r.startVerse = Parse(startVerseInput.text);
        r.endVerse = Parse(endVerseInput.text);
        r.verse = Parse(verseInput.text);

        return r;
    }

    int Parse(string v)
    {
        if (string.IsNullOrEmpty(v)) return -1;
        return int.Parse(v);
    }
}