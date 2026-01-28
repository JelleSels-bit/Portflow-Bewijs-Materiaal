'use client'

import {type FunctionComponent, useEffect} from 'react'
import type {Theme} from '@/generated/prisma/client'
import {Card} from '@/components/ui/card'
import Form from '@/components/custom/form'
import FormError from '@/components/custom/formError'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {updateThemeSchema} from '@/schemas/themeSchema'
import {updateThemeAction} from '@/serverFunctions/theme'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'

interface ThemeEditFormProps {
  theme: Theme
}

const ThemeEditForm: FunctionComponent<ThemeEditFormProps> = ({theme}) => {
  //Default values hier omdat de Text area geen null accepteert on default en description mag in mijn database null zijn.
  const [hookForm, action] = useZodValidatedForm(updateThemeSchema, updateThemeAction, {
    defaultValues: {
      id: theme.id,
      name: theme.name,
      description: theme.description ?? '',
    },
  })

  //Resetten van de form na de revalidate path zodat we de waardes niet kwijt zijn.
  useEffect(() => {
    hookForm.reset({
      id: theme.id,
      name: theme.name,
      description: theme.description ?? '',
    })
  }, [theme, hookForm])

  return (
    <>
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 border-2">
            <Form hookForm={hookForm} action={action}>
              <div className="space-y-6">
                <input type="hidden" {...hookForm.register('id')} />

                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-semibold">
                    Naam <span className="text-destructive">*</span>
                  </Label>
                  <Input id="name" {...hookForm.register('name')} type="text" className="text-base" />
                  <p className="text-sm text-muted-foreground">Geef je thema een duidelijke en herkenbare naam</p>
                  <FormError path="name" />
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold">
                    Beschrijving <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    {...hookForm.register('description')}
                    placeholder="Beschrijf waar dit thema over gaat..."
                    rows={4}
                    className="text-base resize-none"
                  />
                  <p className="text-sm text-muted-foreground">Geef een korte uitleg over de inhoud van dit thema</p>
                  <FormError path="description" />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <SubmitButtonWithLoading text="Wijzigingen opslaan" loadingText="Bezig met uw verzoek te verwerken" />
                </div>
              </div>
            </Form>
          </Card>
        </div>
      </section>
    </>
  )
}

export default ThemeEditForm
