import { playersPage, quiz } from "../globals.ts";
import { GameMode } from "../types/enum/GameMode.ts";
import { QuestionMode } from "../types/enum/QuestionMode.ts";
import {displayAlert,  getElementWrapper, hideEl, showEl} from "../utils";

// language=HTML
const html: string = `
    <div class="row">
        <p data-testid="intro">Welcome to the happy coding quiz! This quiz can be played solo or with multiple players. Please start by configuring
            your quiz settings.</p>
    </div>
    <div class="row g-3">
        <div class="col-md-12">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="input-game-mode" data-testid="input-game-mode"/>
                <label class="form-check-label" for="input-game-mode"><span
                        id="lbl-game-mode" data-testid="lbl-game-mode">Single player</span></label>
            </div>
        </div>
        <div class="col-md-12" id="rowAmountPlayers">
            <input class="form-control" id="input-amount-players" data-testid="input-amount-players" placeholder="Enter the amount of players">
        </div>
        <div class="col-md-12">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="input-question-mode" data-testid="input-question-mode"/>
                <label class="form-check-label" for="input-question-mode"><span
                        id="lbl-question-mode" data-testid="lbl-question-mode">Free input</span></label>
            </div>
        </div>
        <div class="col-md-12">
            <input class="form-control" id="input-question-amount" data-testid="input-question-amount" placeholder="Enter the amount of questions">
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col">
            <button id="btn-save-configuration" class="btn btn-success w-100" data-testid="btn-save-configuration">Save configuration</button>
            
        </div>
    </div>
`;

export class HomePage {
    public constructor() {
    }

    public init(contentElement: HTMLElement) {
        contentElement.innerHTML = html;
        getElementWrapper<HTMLButtonElement>('#btn-save-configuration').addEventListener('click', () => this.saveConfiguration());
        getElementWrapper<HTMLInputElement>('#input-game-mode').addEventListener('change', () => this.toggleGameModeLabel());
        getElementWrapper<HTMLInputElement>('#input-question-mode').addEventListener('change', () => this.toggleQuestionModeLabel());
        hideEl(getElementWrapper<HTMLDivElement>('#input-amount-players'));
    }

    private validateFields = (): boolean => {
        const InputAmountOfQuestions:HTMLInputElement = getElementWrapper<HTMLInputElement>('#input-question-amount');
        const inputGameMode:HTMLInputElement = getElementWrapper<HTMLInputElement>('#input-game-mode');
        const inputAmountOfPLayers:HTMLInputElement = getElementWrapper<HTMLInputElement>('#input-amount-players');
        const amountOfPLayers: number = parseInt(inputAmountOfPLayers.value);
        const amountOfQuestions: number = parseInt(InputAmountOfQuestions.value);
        const gameMode:GameMode = inputGameMode.checked ? GameMode.Multi : GameMode.Single;


        if ( gameMode === GameMode.Multi && (amountOfPLayers < 1 || isNaN(amountOfPLayers))) {
            displayAlert("Please enter the amount of players",3000);
            return false;
        }else if (amountOfQuestions < 1 || isNaN(amountOfQuestions)) {
            displayAlert("Please enter the amount of questions",3000);

            return false;
        }
        return true;
    }

    private saveConfiguration = () => {
        if (!this.validateFields()) return


        const inputGameMode = getElementWrapper<HTMLInputElement>('#input-game-mode');
        const gameMode = inputGameMode.checked ? GameMode.Multi : GameMode.Single;
        const inputQuestionMode = getElementWrapper<HTMLInputElement>('#input-question-mode');
        const questionMode = inputQuestionMode.checked ? QuestionMode.Api : QuestionMode.Custom;
        const inputAmountQuestions = getElementWrapper<HTMLInputElement>('#input-question-amount');
        const amountQuestions = parseInt(inputAmountQuestions.value);
        let amountOfPlayers = 1;

        if (gameMode === GameMode.Multi) {
            const inputAmountPlayers = getElementWrapper<HTMLInputElement>('#input-amount-players');
            amountOfPlayers = parseInt(inputAmountPlayers.value);
        }

        quiz.setGameMode(gameMode, amountOfPlayers);
        quiz.setQuestionMode(questionMode);
        quiz.quizDuration = amountQuestions;

        playersPage.init(getElementWrapper<HTMLDivElement>('#content'))
    }

    private toggleQuestionModeLabel = () => {

        this.initLabel('#lbl-question-mode','#input-question-mode',"API questions","Free input");

    }

    private toggleGameModeLabel = () => {

        this.initLabel('#lbl-game-mode','#input-game-mode',"Multiplayer","Single player");

    }

    private initLabel = (labelName: string,checkboxString: string, option1: string, option2:string) => {
       const label = getElementWrapper<HTMLDivElement>(labelName);
       const checkbox = getElementWrapper<HTMLInputElement>(checkboxString);
       const playerInput = getElementWrapper<HTMLDivElement>('#input-amount-players');
       label.innerText = checkbox.checked ? option1 : option2;
       if (labelName === '#lbl-game-mode') this.showPlayerInputCheck(checkbox,playerInput);

    }

    private showPlayerInputCheck = (checkbox: any,playerInput: any) =>{
        if (checkbox.checked) {
            showEl(playerInput)

        }else
        {
            hideEl(playerInput)
        }
    }
}