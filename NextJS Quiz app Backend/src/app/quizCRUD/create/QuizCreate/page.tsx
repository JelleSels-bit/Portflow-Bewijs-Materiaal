import {type FunctionComponent} from 'react'
import QuizCreateForm from '@/app/quizCRUD/create/QuizCreateForm'
import CrudCreateHeader from '@/components/custom/CRUD/CrudCreateHeader'


const QuizCreatePage: FunctionComponent = () => {



    return (
        <>
            <CrudCreateHeader name="Quiz aanmaken" returnLink="/quizCRUD/index/QuizPage" />
            <QuizCreateForm />
        </>


    )
}

export default QuizCreatePage