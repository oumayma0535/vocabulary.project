<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Vocabulary Test</title>
</head>
<body>

  <h2 id="word"></h2>

  <div id="options"></div>

  <p id="progress"></p>

  <button onclick="nextQuestion()">Question suivante</button>

  <script>
    let questions = [];
    let currentIndex = 0;
    let totalScore = 0;

    // تحميل ملف JSON
    fetch("vocabulary_questions.json")
      .then(response => response.json())
      .then(data => {
        questions = data;
        showQuestion();
      });

    function showQuestion() {
      const question = questions[currentIndex];

      document.getElementById("word").textContent = question.text;
      document.getElementById("options").innerHTML = "";
      document.getElementById("progress").textContent =
        `Question ${currentIndex + 1} / ${questions.length}`;

      question.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option.text;

        btn.onclick = () => {
          totalScore += option.score;
          nextQuestion();
        };

        document.getElementById("options").appendChild(btn);
      });
    }

    function nextQuestion() {
      currentIndex++;

      if (currentIndex < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }

    function showResult() {
      document.body.innerHTML = `
        <h2>الاختبار انتهى</h2>
        <p>السكور الكلي: ${totalScore}</p>
      `;
    }
  </script>

</body>
</html>
