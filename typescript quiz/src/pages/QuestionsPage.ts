import {quiz, quizPage} from "../globals.ts";
import {QuestionMode} from "../types/enum/QuestionMode.ts";
import {QuestionService} from "../services/QuestionService.ts";
import {ICategory} from "../types/interfaces/ICategory.ts";
import {Difficulty} from "../types/enum/Difficulty.ts";
import {disableEl, displayAlert, enableEl, getElementWrapper} from "../utils";
import Question from "../models/Question.ts";


const questionService = new QuestionService();

// language=HTML
const apiModeHtml: string = `
    <h2>API questions</h2>
    <p>Configure the API for retrieving questions</p>
    <select class="form-select" id="input-difficulty" data-testid="input-difficulty"></select>
    <select class="form-select mt-2" id="input-category" data-testid="input-category"></select>
    <button id="btn-fetch-questions" class="btn btn-primary mt-2" data-testid="btn-fetch-questions">Fetch questions</button>`;


// language=HTML
const customModeHtml: string = `
    <h2>Custom questions</h2>
    <div class="row mb-3">
        <label for="input-question" class="col-sm-2 col-form-label">Question</label>
        <div class="col-sm-10">
            <input class="form-control" id="input-question" data-testid="input-question">
        </div>
    </div>
    <div class="row mb-3">
        <label for="input-correct-answer" class="col-sm-2 col-form-label">Correct answer</label>
        <div class="col-sm-10">
            <input class="form-control" id="input-correct-answer" data-testid="input-correct-answer">
        </div>
    </div>
    <div class="row mb-3">
        <label for="input-incorrect-answer" class="col-sm-2 col-form-label">Incorrect answer</label>
        <div class="col-sm-10">
            <div class="input-group">
                <input id="input-incorrect-answer" type="text" class="form-control" aria-label="Recipient's username"
                       aria-describedby="button-addon2" data-testid="input-incorrect-answer">
                <button class="btn btn-outline-secondary" type="button" id="btn-add-incorrect-answer" data-testid="btn-add-incorrect-answer">Add</button>
            </div>
        </div>
    </div>
    <table class="table table-bordered">
        <thead>
        <tr>
            <th scope="col">Question</th>
            <th scope="col">Correct answer</th>
            <th scope="col">Incorrect answers</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td id="output-question" data-testid="output-question"></td>
            <td>
                <ul id="output-correct-answer" data-testid="output-correct-answer">
                </ul>
            </td>
            <td>
                <ul id="output-incorrect-answers" data-testid="output-incorrect-answers">
                </ul>
            </td>
        </tr>
        </tbody>
    </table>
    <button type="submit" class="btn btn-primary" id="btn-submit-question" data-testid="btn-submit-question">Submit question</button>
`;

//language=HTML
const questionsHtml: string = `
    <h2 class="mt-2">Confirmed questions <span id="question-counter" data-testid="question-counter">(0/0)</span></h2>
    <div id="questions" data-testid="questions">No questions to display</div>
`;





const fillCategories = async () => {
    const select = getElementWrapper<HTMLSelectElement>("#input-category");
    const categories = await questionService.getCategories();
    console.log("Categories", categories)
    categories.forEach((c: ICategory) => {
        const option = document.createElement("option");
        option.value = c.id.toString();
        option.text = c.name;
        select.appendChild(option);
    });
}

const fillDifficulty = async () => {
    const select = getElementWrapper<HTMLSelectElement>("#input-difficulty");
    Object.keys(Difficulty).forEach(key => {
        const option = document.createElement("option");
        option.value = key.toLowerCase();
        option.text = key;
        select.appendChild(option);
    });
};

export class QuestionsPage {
    private tempQuestion: Question = new Question("");

    public constructor() {
    }

    public init(contentElement: HTMLElement) {
        //language=HTML
        let htmlToShow = quiz.getQuestionMode() === QuestionMode.Api ? apiModeHtml : customModeHtml;

        const fullHtml = `
            <div class="row">
                <div class="col">
                    <p data-testid="intro">A quiz can not start without questions. Add questions to the quiz by fetching them from an API or by adding them manually.</p>
                </div>
            </div>
            <div class="row">
                <div class="col">${htmlToShow}</div>
                <div class="col">${questionsHtml}</div>
            </div>
            <hr>
            <div class="row">
                <div class="col">
                    <button class="btn btn-success w-100" id="btn-start-quiz" data-testid="btn-start-quiz" disabled>Start quiz</button>
                </div>
            </div>
        `;
        contentElement.innerHTML = fullHtml;
        getElementWrapper<HTMLButtonElement>("#btn-start-quiz").addEventListener("click", () => quizPage.init(getElementWrapper("#content")));
        //Custom
        if (quiz.getQuestionMode() === QuestionMode.Custom) {

        getElementWrapper<HTMLButtonElement>('#btn-submit-question').addEventListener("click", () => this.SubmitQuestion());
        getElementWrapper<HTMLTableElement>(`#input-question`).addEventListener("change", () => this.UpdateQuestionName());
        getElementWrapper<HTMLInputElement>(`#input-correct-answer`).addEventListener("change", () => this.UpdateCorrectAnswer());
        getElementWrapper<HTMLButtonElement>(`#btn-add-incorrect-answer`).addEventListener("click", () => this.UpdateIncorrectAnswer());
        getElementWrapper<HTMLSpanElement>(`#question-counter`).innerHTML = `${quiz.questions.length}/${quiz.quizDuration}`;
        }
        //API
        if (quiz.getQuestionMode() === QuestionMode.Api) {
        fillCategories();
        fillDifficulty();
        getElementWrapper<HTMLSpanElement>(`#question-counter`).innerHTML = `${quiz.questions.length}/${quiz.quizDuration}`;
        getElementWrapper<HTMLButtonElement>("#btn-fetch-questions").addEventListener("click", () =>this.fetchQuestions() )
        }


    }
    //Custom Mode Methods
    private SubmitQuestion = () => {
        if(!this.validateSubmit()) return
        quiz.addQuestion(this.tempQuestion);
        this.AddQuestionsToList();
        this.tempQuestion = new Question("");
        this.clearInputAndOutput();
        this.checkIfAllQuestionsAreAdded();


    }

    private validateSubmit= (): boolean => {
        const wordCount: number = this.tempQuestion.question.split(" ").length;
        const inCorrectAnswersCheck: number = this.tempQuestion.answers.filter(a => !a.isCorrect).length;
        const correctAnswerCheck: number = this.tempQuestion.answers.filter(a => a.isCorrect).length;

        if (wordCount < 4 ) {
            displayAlert("Question should contain at least 4 words",3000)
            return false;
        }else if (correctAnswerCheck < 1) {
            displayAlert("Question should contain at least 1 correct answer which can not be empty",3000)
            return false
        }else if (inCorrectAnswersCheck < 2) {
            displayAlert("Question should contain at least 2 incorrect answers",3000)
            return false;
        }
        return true;
    }

    private checkIfIncorrectAnswerIsEmpty = (answerText:string):boolean =>
    {
        if (answerText === "")
        {
            displayAlert("Incorrect answer can not be empty",3000)
            return false;
        }
        return true;
    }

    private clearInputAndOutput = () => {
        getElementWrapper<HTMLInputElement>("#input-question").value = "";
        getElementWrapper<HTMLUListElement>("#output-question").textContent = "";

        getElementWrapper<HTMLInputElement>("#input-correct-answer").value = "";
        getElementWrapper<HTMLUListElement>("#output-correct-answer").textContent = "";

        getElementWrapper<HTMLInputElement>("#input-incorrect-answer").value = "";
        getElementWrapper<HTMLUListElement>("#output-incorrect-answers").textContent = "";
    }

    private AddIncorrectAnswerToList = (answerText: string) => {

        const list = getElementWrapper<HTMLUListElement>(`#output-incorrect-answers`);
        const li = document.createElement("li");
        li.textContent = answerText;
        list.appendChild(li);

    }

    private UpdateQuestionName = () => {
        const inputQuestion = getElementWrapper<HTMLInputElement>("#input-question");
        getElementWrapper<HTMLTableElement>(`#output-question`).innerHTML = inputQuestion.value;
        this.tempQuestion.question = inputQuestion.value;
    }

    private UpdateAnswer = (inputElement: string,outputElement: string) => {
        const inputAnswer = getElementWrapper<HTMLInputElement>(inputElement)
        const answerText: string = inputAnswer.value;

        if(inputElement === "#input-correct-answer") {
            this.tempQuestion.addAnswer({text: answerText, isCorrect: true});
            getElementWrapper<HTMLInputElement>(outputElement).innerHTML = answerText;
        }else {
            if (!this.checkIfIncorrectAnswerIsEmpty(answerText)) return;
            this.tempQuestion.addAnswer({text: answerText, isCorrect: false});
            this.AddIncorrectAnswerToList(answerText);
        }

        inputAnswer.value = "";
    }

    private UpdateCorrectAnswer = () => {
        this.UpdateAnswer("#input-correct-answer","#output-correct-answer");
    }

    private UpdateIncorrectAnswer = () => {
        this.UpdateAnswer("#input-incorrect-answer","#output-incorrect-answers");
    }

    //API Mode Methods
    private fetchQuestions = async () => {
        const categoryId: string = getElementWrapper<HTMLSelectElement>("#input-category").value;
        const difficultyId: string = getElementWrapper<HTMLSelectElement>("#input-difficulty").value;
        quiz.questions = await questionService.getQuestions(quiz.quizDuration,categoryId,difficultyId);
        this.AddQuestionsToList();
        this.checkIfAllQuestionsAreAdded();
    }
    //Mix
    private AddQuestionsToList = () => {
        const questionList = getElementWrapper<HTMLUListElement>(`#questions`);
        questionList.innerHTML = "";
        this.UpdateCounter();

        if (quiz.questions.length > 0) {
            quiz.questions.forEach(q   => {
                const li = document.createElement("li");
                li.textContent = q.toString();
                questionList.appendChild(li);
            })
        }else {
            const li = document.createElement("li");
            li.textContent = "no questions to display";
            questionList.appendChild(li);
        }
    }
    private checkIfAllQuestionsAreAdded = () => {
        if (quiz.getQuestionMode() === QuestionMode.Custom && quiz.questions.length === quiz.quizDuration)
        {
            disableEl(getElementWrapper<HTMLButtonElement>("#btn-submit-question"));
            enableEl(getElementWrapper<HTMLButtonElement>("#btn-start-quiz"));

        }else
        {
            disableEl(getElementWrapper<HTMLButtonElement>("#btn-fetch-questions"));
            enableEl(getElementWrapper<HTMLButtonElement>("#btn-start-quiz"));
        }
    }
    private UpdateCounter = () => {

        if (quiz.getQuestionMode() === QuestionMode.Api) getElementWrapper<HTMLSpanElement>(`#question-counter`).innerHTML = `${quiz.quizDuration}/${quiz.quizDuration}`;
        else{getElementWrapper<HTMLSpanElement>(`#question-counter`).innerHTML = `${quiz.questions.length}/${quiz.quizDuration}`;}

    }






}