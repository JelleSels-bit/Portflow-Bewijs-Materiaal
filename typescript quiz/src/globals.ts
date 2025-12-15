import {Quiz} from './models/Quiz';
import {QuestionsPage} from "./pages/QuestionsPage.ts";
import {QuizPage} from "./pages/QuizPage.ts";
import {ScoreboardPage} from "./pages/ScoreboardPage.ts";
import {HomePage} from "./pages/HomePage.ts";
import {PlayersPage} from "./pages/PlayersPage.ts";
import {GameMode} from "./types/enum/GameMode.ts";
import {QuestionMode} from "./types/enum/QuestionMode.ts";

export let quiz = new Quiz(0, [], [], GameMode.Single, QuestionMode.Custom);
export const questionsPage = new QuestionsPage();
export const homePage = new HomePage();
export const playersPage = new PlayersPage();
export const quizPage = new QuizPage();
export const scoreboardPage = new ScoreboardPage();