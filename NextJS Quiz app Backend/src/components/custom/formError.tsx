'use client'

import type {FunctionComponent} from 'react'
import {useFormContext} from 'react-hook-form'

interface FormErrorProps {
  path: string
}

const FormError: FunctionComponent<FormErrorProps> = ({path}) => {
  const {
    formState: {errors: formErrors},
  } = useFormContext()

  // Navigeer door het error object
  const error = path.split('.').reduce((acc, key) => (acc ? (acc[key] as any) : undefined), formErrors)

  // Haal de message veilig op. We checken expliciet of het een string is.
  // Voor normale velden: error.message
  // Voor arrays: error.root.message
  const message = error?.message || error?.root?.message

  // Als er geen message is, renderen we niets (of een spatie voor layout stabiliteit)
  if (!message || typeof message !== 'string') {
    return null
  }

  return (
    <div className="text-destructive text-sm font-medium mt-1.5 animate-in fade-in slide-in-from-top-1">{message}</div>
  )
}

export default FormError
