document.addEventListener("DOMContentLoaded", function () {
    var storedText = localStorage.getItem("wordCounterText");
    if (storedText) {
        document.getElementById("word-counter-textarea").value = storedText;
        countWords();
        toggleButton(false);
    } else {
        toggleButton(true);
    }
});

function clearMetrics() {
    document.getElementById("word-count").innerHTML = "Word Count: 0";
    document.getElementById("character-count-with-space").innerHTML = "Character Count (with space): 0";
    document.getElementById("character-count-without-space").innerHTML = "Character Count (without space): 0";
    document.getElementById("paragraph-count").innerHTML = "Paragraph Count: 0";
    document.getElementById("sentence-count").innerHTML = "Sentence Count: 0";
    document.getElementById("estimated-reading-time").innerHTML = "Estimated Reading Time: 0 minute";
}

function updateMetrics() {
    clearMetrics();
    var text = document.getElementById("word-counter-textarea").value.trim();
    if (text.length > 0) {
        countWords();
        // Store the entered text in local storage
        localStorage.setItem("wordCounterText", text);
        toggleButton(false);
    } else {
        toggleButton(true);
    }
}

function countWords() {
    let text = document.getElementById("word-counter-textarea").value.trim();

    // Word Count
    let wordCount = text.split(/\s+/).length;
    document.getElementById("word-count").innerHTML = `Word Count: ${addCommas(wordCount)}`;

    // Character Count (with space)
    let characterCountWithSpace = text.length;
    document.getElementById("character-count-with-space").innerHTML = `Character Count (with space): ${addCommas(characterCountWithSpace)}`;

    // Character Count (without space)
    let characterCountWithoutSpace = text.replace(/\s/g, "").length;
    document.getElementById("character-count-without-space").innerHTML = `Character Count (without space): ${addCommas(characterCountWithoutSpace)}`;

    // Paragraph Count
    let paragraphCount = text.split("\n\n").filter(Boolean).length;
    document.getElementById("paragraph-count").innerHTML = `Paragraph Count: ${addCommas(paragraphCount)}`;

    // Sentence Count
    let sentenceCount = text.split(/[.!?।]+/).filter(Boolean).length;
    document.getElementById("sentence-count").innerHTML = `Sentence Count: ${addCommas(sentenceCount)}`;

    // Estimated Reading Time
    let readingTimeSeconds = Math.ceil((wordCount / 200) * 60);
    let hours = Math.floor(readingTimeSeconds / 3600);
    let minutes = Math.floor((readingTimeSeconds % 3600) / 60);
    let seconds = readingTimeSeconds % 60;

    let readingTimeText = `Estimated Reading Time: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    document.getElementById("estimated-reading-time").innerHTML = readingTimeText;
}

function formatTime(value) {
    return value.toString().padStart(2, "0");
}

function clearTextArea() {
    document.getElementById("word-counter-textarea").value = "";
    clearMetrics();
    // Clear the stored text from local storage
    localStorage.removeItem("wordCounterText");
    toggleButton(true);
}

function toggleButton(isPasteButton) {
    var button = document.getElementById("clear-button");
    if (isPasteButton) {
        button.innerHTML = "Paste";
        button.onclick = pasteText;
    } else {
        button.innerHTML = "Clear";
        button.onclick = clearTextArea;
    }
}

function pasteText() {
    navigator.clipboard.readText().then(function (text) {
        document.getElementById("word-counter-textarea").value = text;
        updateMetrics();
    });
}

function addCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}