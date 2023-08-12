import { CheckIcon, XIcon } from "lucide-react"

export default function AccessType({type, access}: {type: string, access: boolean}) {
  return (
    <div className="rounded-md flex gap-2 px-2 py-1 border border-gray-900 bg-gray-900/2">
      <div className="flex items-center">
            {access ? <CheckIcon className="text-green-300" /> : <XIcon className="text-red-300" />}
        </div>
        <span className="px-1 text-gray-300 capitalise text-sm">
            {type}
        </span>
        
    </div>
  )
}
