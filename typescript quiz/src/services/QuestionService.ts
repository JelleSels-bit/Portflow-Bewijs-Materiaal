import Question from "../models/Question";
import { IApiQuestion } from "../types/interfaces/IApiQuestion.ts";
import { displayAlert } from "../utils";
import { ICategory } from "../types/interfaces/ICategory.ts";

export class QuestionService {
    baseUrl: string = 'https://opentdb.com/api.php?'
    categoryUrl: string = 'https://opentdb.com/api_category.php'

    constructor() {

    }

    getCategories = async (): Promise<ICategory[]> => {
    try {
        const response = await fetch(this.categoryUrl);
        if (!response.ok) throw new Error("Error fetching categories");

        const json = await response.json();
        return json.trivia_categories;
    } catch (error:any) {
        console.error(error.message);
        return [];
    }

    }

    getQuestions = async (amount: number, category: string, difficulty: string): Promise<Question[]>  => {

    return fetch(this.baseUrl + `amount=${amount}&category=${category}&difficulty=${difficulty}`)
            .then(response => response.json())
            .then(json => {
                if (json.response_code !== 0) {
                    displayAlert(json.response_code, json.message);
                    return [];
                } else {
                    const questions = this.mapQuestionsToQuestionModel(json.results);
                    return questions;
                }
            })

    }

    mapQuestionsToQuestionModel = (questions: IApiQuestion[]): Question[] => {

        let questionList: Question[] = [];

        for (const q of questions) {
            const question = new Question(q.question);
            question.addAnswer({ text: q.correct_answer, isCorrect: true });
            q.incorrect_answers.forEach(a => question.addAnswer({ text: a, isCorrect: false }));
            questionList.push(question);
        }

        return questionList;
    }
}