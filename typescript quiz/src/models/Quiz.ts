import Question from "./Question";
import Player from "./Player";
import { QuestionMode } from "../types/enum/QuestionMode";
import { GameMode } from "../types/enum/GameMode.ts";


export class Quiz {
    public isRunning: boolean = false;
    public questions: Question[] = [];
    public quizDuration: number = 0;
    public players: Player[] = [];
    private currentQuestionIndex: number;
    private currentPlayerIndex: number;
    private gameMode: GameMode;
    private questionMode: QuestionMode;
    private numberOfPlayers: number = 1;
    private totalAmountOfQuestionToBeAsked: number = 0;
    private amountOfQuestionsAlreadyAsked: number = 0;

    public constructor(duration: number, questions: Question[] = [], players: Player[], Gmode: GameMode = GameMode.Single, Qmode: QuestionMode = QuestionMode.Custom ){
        this.quizDuration = duration;
        this.questions = questions;
        this.gameMode = Gmode;
        this.questionMode = Qmode;
        if (players) {
            this.players = players;
            this.numberOfPlayers = players.length}
        this.currentQuestionIndex = 0;
        this.currentPlayerIndex = 0;
        this.amountOfQuestionsAlreadyAsked = 0;
        this.totalAmountOfQuestionToBeAsked = 0;
        this.updateTotalAmountOfQuestionToBeAsked();

    }

    public getGameMode(): GameMode {
        return this.gameMode;
    }

    public getQuestionMode(): QuestionMode { return this.questionMode }

    public getNumberOfPlayers(): number { return this.numberOfPlayers; }

    public getCurrentPlayerName(): string
    {
        return this.players[this.currentPlayerIndex].name;
    }

    public getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    public updateCurrentPlayerScore(amount: number) {
        this.players[this.currentPlayerIndex].updateScore(amount);
    }

    public setQuestionMode(mode: QuestionMode) {
        this.questionMode = mode;
    }

    private updateTotalAmountOfQuestionToBeAsked() {
        this.totalAmountOfQuestionToBeAsked = this.questions.length;
    }

    public addQuestion(q: Question) {
        this.questions.push(q);
        this.updateTotalAmountOfQuestionToBeAsked();
    }

    public addPlayer(name: string) {
        this.players.push(new Player(name));

    }

    private getAmountOfPlayers() {
        return this.players.length;
    }

    public removePlayer(name: string) {
        this.players = this.players.filter(p => p.name !== name);
    }

    public startQuiz() {
        this.isRunning = true;
        this.currentQuestionIndex = 0;
        this.currentPlayerIndex = 0;
        this.shuffleAnswersInQuestions();
    }

    public testIfAnswerIsCorrect(answer: string) {
        let isCorrect = false;
        this.getCurrentQuestion().answers.forEach(a => {
            if (a.isCorrect)
            {
                if (a.text == answer) {
                    isCorrect = true;
                    return
                }
            }
        })
        return isCorrect;
    }

    public nextQuestion() {

        if(this.currentQuestionIndex >= this.questions.length - 1)
        {

            if(this.currentPlayerIndex >= this.players.length - 1) {
                this.endQuiz();
                return;
            }
            this.currentPlayerIndex++;
            this.currentQuestionIndex = 0;
            return;
        }
        this.currentQuestionIndex++;
    }

    public shuffleAnswersInQuestions() {
        this.questions.forEach(q => {
            q.answers.sort(() => Math.random() - 0.5);
        })
    }

    public endQuiz() {
        this.isRunning = false;
    }

    public setGameMode(gameMode: GameMode, amountOfPlayers: number) {
        this.gameMode = gameMode;
        this.numberOfPlayers = amountOfPlayers;
    }

    public sortPlayersByScore() {
        return this.players.sort((a,b) => b.score - a.score);
    }

    public resetGame() {
        this.isRunning = false;
        this.questions = [];
        this.players = [];
        this.gameMode = GameMode.Single;
        this.amountOfQuestionsAlreadyAsked = 0;
        this.questionMode = QuestionMode.Custom;
        this.numberOfPlayers = 1;
        this.currentQuestionIndex = 0;
        this.currentPlayerIndex = 0;
        this.totalAmountOfQuestionToBeAsked = 0;
        this.amountOfQuestionsAlreadyAsked = 0;

    }
}
