'use client'

import type {FunctionComponent} from 'react'
import {Card} from '@/components/ui/card'
import {AlertTriangle, Tag} from 'lucide-react'
import type {Theme} from '@/generated/prisma/client'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {deleteThemeAction} from '@/serverFunctions/theme'
import {deleteThemeSchema} from '@/schemas/themeSchema'
import Form from '@/components/custom/form'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'

interface ThemeDeleteConfirmProps {
  theme: Theme
}

export const ThemeDeleteConfirm: FunctionComponent<ThemeDeleteConfirmProps> = ({theme}) => {
  const [hookform, action] = useZodValidatedForm(deleteThemeSchema, deleteThemeAction)

  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-8">
        <Form hookForm={hookform} action={action}>
          <input type="hidden" {...hookform.register('id')} value={theme.id} />
          <div className="max-w-3xl mx-auto">
            {/* Warning Card */}
            <Card className="p-6 border-2 border-destructive/50 bg-destructive/5">
              <div className="flex items-start gap-4 mb-6">
                <div className="rounded-full bg-destructive/20 w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Verwijderen</h1>
                  <p className="text-muted-foreground">
                    Weet je zeker dat je dit thema wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
                  </p>
                </div>
              </div>

              {/* Theme Info */}
              <Card className="p-6 border-2 bg-background mb-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Tag className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2 flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-foreground">{theme.name}</h3>
                    <p className="text-sm text-muted-foreground">{theme.description}</p>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-3">
                <SubmitButtonWithLoading
                  text="Verwijderen"
                  loadingText="Bezig met je verzoek te verwerken"></SubmitButtonWithLoading>
              </div>
            </Card>
          </div>
        </Form>
      </section>
    </div>
  )
}

export default ThemeDeleteConfirm
