'use client'

import {Button} from '@/components/ui/button'
import {ArrowLeft, Tag} from 'lucide-react'
import type {FunctionComponent} from 'react'
import {Card} from '@/components/ui/card'
import Link from 'next/link'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import Form from '@/components/custom/form'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {createThemeSchema} from '@/schemas/themeSchema'
import {createThemeAction} from '@/serverFunctions/theme'
import FormError from '@/components/custom/formError'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import CrudCreateHeader from '@/components/custom/CRUD/CrudCreateHeader'

const ThemeCreateForm: FunctionComponent = () => {
  const [hookForm, action] = useZodValidatedForm(createThemeSchema, createThemeAction)

  return (
    <>
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 border-2">
            <Form hookForm={hookForm} action={action}>
              <div className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-semibold">
                    Naam <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    {...hookForm.register('name')}
                    type="text"
                    placeholder="Bijv. Geschiedenis, Wetenschap, Geografie..."
                    className="text-base"
                  />
                  <p className="text-sm text-muted-foreground">Geef je thema een duidelijke en herkenbare naam</p>
                  <FormError path={'name'} />
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
                  <FormError path={'description'} />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <SubmitButtonWithLoading text="Opslaan" loadingText="Bezig met uw verzoek te verwerken" />
                </div>
              </div>
            </Form>
          </Card>
        </div>
      </section>
    </>
  )
}

export default ThemeCreateForm
