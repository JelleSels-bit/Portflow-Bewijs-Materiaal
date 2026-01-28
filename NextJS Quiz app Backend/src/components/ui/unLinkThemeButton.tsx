import {type FunctionComponent} from 'react'
import Form from '@/components/custom/form'
import FormError from '@/components/custom/formError'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {unLinkThemeToQuizSchema} from '@/schemas/quizSchema'
import {unLinkThemeToQuizAction} from '@/serverFunctions/quiz'

interface UnLinkThemeButtonProps {
  quizId: string,
  themeId: string,
  themeName: string
}


const UnLinkThemeButton: FunctionComponent<UnLinkThemeButtonProps> = ({quizId, themeId, themeName}) => {

  const [unLinkHookForm, unLinkAction] = useZodValidatedForm(
    unLinkThemeToQuizSchema,
    unLinkThemeToQuizAction,
    {
      defaultValues: {
        id: quizId,
        themeId: themeId
      }
    }
  )

  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary border border-primary/20">
      {themeName}

      <Form hookForm={unLinkHookForm} action={unLinkAction}>

        <input type="hidden" {...unLinkHookForm.register("id")}  />
        <input type="hidden" {...unLinkHookForm.register("themeId")}  />

        {/*Hier heb ik gekozen voor de waardes direct mee te geven met de hookForm i.p.v op de input te zetten*/}
        {/*Dit komt omdat react componenten hergebruikt om snelheid te winnen. Maar als je de waarde in de input zelf zet kan dit blijven hangen */}
        {/*op de oude waarde. Waardoor je bugs kan krijgen die de verkeerde id's deleten :) */}

        {/*<input type="hidden" {...unLinkHookForm.register("id")} defaultValue={quizId} />*/}
        {/*<input type="hidden" {...unLinkHookForm.register("themeId")} defaultValue={themeId} />*/}

        <button
          type="submit"
          className="hover:text-destructive transition-colors flex items-center"
          title="Verwijder thema"
        >
          <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Error Msg */}
        <FormError path="themeId" />
        <FormError path="root" />
      </Form>
    </span>

  )
}

export default UnLinkThemeButton