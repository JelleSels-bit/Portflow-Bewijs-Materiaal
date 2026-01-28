"use client"

import {type FunctionComponent} from 'react'
import {Label} from '@/components/ui/label'
import {Card} from '@/components/ui/card'
import {AlignLeft, FileText, Gauge, Save, X} from 'lucide-react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import Form from '@/components/custom/form'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {quizCreateBaseSchema} from '@/schemas/quizSchema'
import FormError from '@/components/custom/formError'
import {createQuizAction} from '@/serverFunctions/quiz'


const QuizCreateForm: FunctionComponent = () => {


  const [HookForm, Action] = useZodValidatedForm(
    quizCreateBaseSchema,
    createQuizAction
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Create Form Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2">
             <Form hookForm={HookForm} action={Action}>
              <div className="space-y-8">
                {/* Title Field */}
                <div className="space-y-3">


                  <Label htmlFor="title" className="text-base font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Titel
                  </Label>
                  <p className="text-sm text-muted-foreground">De titel van de quiz</p>
                  <Input
                    id="title"
                    {...HookForm.register("title")}
                    type="text"
                    placeholder="Voer een titel in"
                    className="text-base"

                  />
                  <FormError path="title" />
                </div>

                {/* Description Field */}
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2">
                    <AlignLeft className="h-4 w-4 text-primary" />
                    Beschrijving
                  </Label>
                  <p className="text-sm text-muted-foreground">Een korte beschrijving van de quiz</p>
                  <textarea
                    id="description"
                    placeholder="Voer een beschrijving in"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-vertical"
                    {...HookForm.register("description")}

                  />
                  <FormError path="description" />


                </div>

                {/* Difficulty Field */}
                <div className="space-y-3">
                  <Label htmlFor="difficulty" className="text-base font-semibold flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-primary" />
                    Moeilijkheidsgraad
                  </Label>
                  <p className="text-sm text-muted-foreground">Kies de moeilijkheidsgraad van de quiz</p>
                  <select
                    id="difficulty"
                    {...HookForm.register("difficulty")}
                    defaultValue=""
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

                  >
                    <option value="">Kies een moeilijkheidsgraad</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>

                  <FormError path="difficulty" />
                </div>


                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button type="submit"  size="lg" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Aanmaken
                  </Button>
                  <Link href="/quizCRUD/index/QuizPage" className="flex-1">
                    <Button type="button" variant="outline" size="lg" className="w-full bg-transparent">
                      <X className="h-4 w-4 mr-2" />
                      Annuleren
                    </Button>
                  </Link>
                </div>
              </div>
             </Form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )

}

export default QuizCreateForm