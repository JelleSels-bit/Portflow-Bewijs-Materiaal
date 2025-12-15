// language=HTML
import { getElementWrapper } from "../utils";
import { quiz, scoreboardPage } from "../globals.ts";
import Player from "../models/Player.ts";
import player from "../models/Player.ts";
import {GameMode} from "../types/enum/GameMode.ts";

const html: string = `
    <div class="row">
        <div class="col">
            <p data-testid="intro">Try to score as many points as possible by answering the questions correctly. Good
                luck!</p>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div id="current-player-container" class="" data-testid="current-player-container">
                <p><span class="fw-bold">Current player: </span><span id="current-player-name"
                                                                      data-testid="current-player-name"></span></p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div id="quiz-container" class="" data-testid="quiz-container">
                <!-- Quiz content will be displayed here -->
                <p><span class="fw-bold">Question: </span><span id="question" data-testid="question"></span>
                </p>
                <p class="fw-bold">Select the correct answer!</p>
                <div id="answer-container" class="mb-3" data-testid="answer-container"></div>
                <button id="btn-submit-answer" class="btn btn-success" data-testid="btn-submit-answer">Submit Answer
                </button>
            </div>
        </div>
    </div>
`;

export class QuizPage {

    public constructor() {

    }


    public init(element: HTMLElement) {
        element.innerHTML = html;
        quiz.startQuiz();
        quiz.shuffleAnswersInQuestions();
        this.updatePlayerName();
        this.updateCurrentQuestion();
        getElementWrapper<HTMLButtonElement>('#btn-submit-answer').addEventListener('click', () => this.submitAnswer());
        getElementWrapper<HTMLButtonElement>('#current-player-name').addEventListener('change', () => this.updatePlayerName())

    }

    private updatePlayerName() {
        const playerNameElement = getElementWrapper<HTMLSpanElement>("#current-player-name")
        playerNameElement.innerText = quiz.getCurrentPlayerName();
    }

    private submitAnswer() {

        //zoekt het radio element met de name answer zie updateCurrentQuestion met een #ervoor zoekt hij puur op de css id naam.
        const selectedAnswer:string = getElementWrapper<HTMLInputElement>(`input[name="answer"]:checked`).value
        this.checkAnswer(selectedAnswer);
        this.checkIfAllQuestionsAreAnswered();
        quiz.nextQuestion();
        this.updatePlayerName();
        this.updateCurrentQuestion();
    }

    private checkAnswer = (answer:string) => {
        if (quiz.testIfAnswerIsCorrect(answer)) quiz.updateCurrentPlayerScore(1);
    }

    private checkIfAllQuestionsAreAnswered = () => {

        if (quiz.getGameMode() === "Single Player" && quiz.getCurrentQuestion() === quiz.questions[quiz.questions.length - 1])
        {
            this.goToScorePage();
        }else if (quiz.getGameMode() === "Multiplayer" && quiz.getCurrentPlayerName() === quiz.players[quiz.players.length - 1].name && quiz.getCurrentQuestion() === quiz.questions[quiz.questions.length - 1] ){
            this.goToScorePage();
        }

    }

    private goToScorePage = () => {

        quiz.endQuiz()
        scoreboardPage.init(getElementWrapper<HTMLElement>("#content"));
    }

    private updateCurrentQuestion() {
        const currentQuestion = quiz.getCurrentQuestion();
        // Show the current question
        getElementWrapper<HTMLHeadingElement>('#question').innerText = currentQuestion.question;
        const answers = currentQuestion.answers;
        const answerContainer = getElementWrapper<HTMLDivElement>('#answer-container');
        // Clear previous answers
        answerContainer.innerHTML = "";
        // Show all possible answers
        answers.forEach((answer) => {
            // Create the holding div
            const formCheck = document.createElement("div");
            formCheck.className = "form-check";
            // Create the radio input
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.className = "form-check-input";
            radioInput.name = "answer";
            radioInput.value = answer.text;
            // Create the label
            const label = document.createElement("label");
            label.className = "form-check-label";
            label.appendChild(radioInput);
            label.appendChild(document.createTextNode(answer.text));
            formCheck.appendChild(label);
            // Append to the answer container
            answerContainer.appendChild(formCheck);
        });
    }
}