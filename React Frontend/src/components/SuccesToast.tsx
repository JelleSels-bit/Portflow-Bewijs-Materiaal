import type {FunctionComponent} from 'react'

const SuccessToast: FunctionComponent = () => {
  return (
    <div className="fixed bottom-4 right-100 rounded-2xl bg-green-500 text-white px-4 py-2 shadow-lg z-50">
      Succes!
    </div>
  )
}

export default SuccessToast