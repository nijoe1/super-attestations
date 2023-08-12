import { useEffect, useState } from 'react'
import SchemaItem from '../schema-item'

export type SchemaInput = {
    name: string
    type: string
}
export default function SchemaList({list}: {list?: string}) {
    const [schema, setSchema] = useState<SchemaInput[]>([])
    useEffect(() => {
        console.log(list)
        
        if(list){
            list.split(",").map((listItem: string, index:number) => {
                    
                    if(index > 0){
                        const [empty, type, name] = listItem.split(" ")
                    setSchema((prev) => [...prev, {name, type}])
                    }else{
                        const [type, name] = listItem.split(" ")
                    setSchema((prev) => [...prev, {name, type}])
                    }
                    

            });
        }
    }, [list])
    
  return (
    <div className={`flex gap-2 m-2`}>
        {schema.map((item, index) => (
            <SchemaItem key={index} name={item.name} type={item.type} />
        ))}
    </div>
  )
}
