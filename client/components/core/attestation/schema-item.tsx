
export default function SchemaItem({name, type}: {name: string, type: string}) {
  return (
    <div className="flex flex-col text-left bg-gray-700 rounded-md p-2 w-fit">
        <span className="font-medium ">
            {type} 
        </span>
        <span className="text-sm font-light text-green-300">
            {name}
        </span>
    </div>
  )
}
