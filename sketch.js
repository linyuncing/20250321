let question, options, submitButton, inputBox;
let selectedOption = null;
let table;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

function preload() {
  // 載入CSV文件
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() { //這是一個初始設定的函數
  // 建立一個全視窗畫布
  createCanvas(windowWidth, windowHeight);
  // 設定背景顏色(在setup()裡面設定背景顏色，如同買回來的圖畫紙背景顏色)
  background('#4cc9f0');
  
  // 顯示第一題
  displayQuestion();
}

function draw() { //這是一個重複執行的函數，畫圖的函數
  background('#4cc9f0'); //一直塗上整張畫圖紙的背景顏色
  
  // 設定填充顏色
  fill('#4361ee');
  // 設定無邊框
  noStroke();
  // 繪製矩形，位置為視窗中間，寬度為視窗寬度的一半，高度為視窗高度的一半
  rect(windowWidth / 4, windowHeight / 4, windowWidth / 2, windowHeight / 2);
}

function windowResized() {
  // 當視窗大小改變時，重新設置畫布大小
  resizeCanvas(windowWidth, windowHeight);
}

function displayQuestion() {
  if (currentQuestionIndex < table.getRowCount()) {
    let row = table.getRow(currentQuestionIndex);
    let questionText = row.get('question');
    let option1 = row.get('option1');
    let option2 = row.get('option2');
    let option3 = row.get('option3');
    let option4 = row.get('option4');
    let correctAnswer = row.get('answer');
    let questionType = row.get('type');
    
    // 設定題目
    if (question) question.remove();
    question = createP(questionText);
    question.style('font-size', '35px');
    question.style('color', '#3a0ca3');
    question.position(windowWidth / 2 - 100, windowHeight / 4 + 100); // 題目顯示的位置
    
    // 設定選項或填空框
    if (options) options.remove();
    if (inputBox) inputBox.remove();
    
    if (questionType === 'choice') {
      options = createRadio();
      options.option(option1);
      options.option(option2);
      options.option(option3);
      options.option(option4);
      options.style('font-size', '35px');
      options.style('color', '#3a0ca3');
      options.position(windowWidth / 2 - 100, windowHeight / 4 + 250);
    } else if (questionType === 'fill') {
      inputBox = createInput();
      inputBox.style('font-size', '35px');
      inputBox.position(windowWidth / 2 - 100, windowHeight / 4 + 250);
    }
    
    // 設定送出按鈕
    if (submitButton) submitButton.remove();
    submitButton = createButton('下一題');
    submitButton.style('font-size', '35px');
    submitButton.style('color', '#7209b7')
    submitButton.position(windowWidth / 2 - 70, windowHeight / 4 + 350);
    submitButton.mousePressed(() => checkAnswer(correctAnswer, questionType));
  } else {
    // 顯示結果
    if (question) question.remove();
    if (options) options.remove();
    if (inputBox) inputBox.remove();
    if (submitButton) submitButton.remove();
    
    let resultText = `答對了 ${correctAnswers} 題，答錯了 ${incorrectAnswers} 題`;
    question = createP(resultText);
    question.style('font-size', '35px');
    question.style('color', '#3a0ca3');
    question.position(windowWidth / 2 - 200, windowHeight / 4 + 100); // 顯示結果的位置
    
    // 設定再試一次按鈕
    submitButton = createButton('再試一次');
    submitButton.style('font-size', '35px');
    submitButton.style('color', '#7209b7')
    submitButton.position(windowWidth / 2 - 70, windowHeight / 4 + 350);
    submitButton.mousePressed(resetQuiz);
  }
}

function checkAnswer(correctAnswer, questionType) {
  if (questionType === 'choice') {
    selectedOption = options.value();
    options.remove(); // 清空選擇題的選項
  } else if (questionType === 'fill') {
    selectedOption = inputBox.value();
    inputBox.value(''); // 清空填空題的文字框
  }
  
  if (selectedOption === correctAnswer) {
    correctAnswers++;
  } else {
    incorrectAnswers++;
  }
  currentQuestionIndex++;
  displayQuestion();
}

function resetQuiz() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  displayQuestion();
}