import { Badge } from "@/components/ui/badge";
import {
  BookLockIcon,
  BookOpenCheckIcon,
  CheckIcon,
  CoinsIcon,
  GemIcon,
  TimerIcon
} from "lucide-react";
import Link from "next/link";
import { formatEther } from 'viem';

export function AttestionAccess() {
  return (
    <div className="bg-gray-600 rounded-md p-4">
      <span>Attestion Access</span>
      <CheckIcon className="text-green-700" />
    </div>
  );
}

export default function AttestionItem({ schema}: {schema: any}) {

  
  if(schema){
    return (
      <Link className="bg-gray-600 rounded-md p-4 flex flex-col gap-4 hover:outline hover:outline-green-300"  href={`/attestation/${schema.schemaUID}`}>
      <div className="flex justify-between pt-4 px-4">
          <div className="text-xl text-white hover:text-green-300" >{schema.name}</div>
      </div>
      <div>
      <div className="text-gray-200 font-light text-sm m-2">
        {schema.description}
       </div>
    </div>
    <div>
      {schema.tags?.map((tag: string) => (
        <Badge key={tag} className="bg-gray-700 text-gray-200 m-1">
          {tag}
        </Badge>
        ))}
    </div>
    
    <div className="grid  m-4 items-start gap-2 ">
      <IconItem icon={<TimerIcon />} value={schema.attestResolutionDays} />
      { !schema.isMintable ? <IconItem icon={<BookOpenCheckIcon />} value="Open" /> : <IconItem icon={<BookLockIcon />} value="Close" />}
      { !schema.isMintable ? <IconItem icon={<CoinsIcon />} value={formatEther(schema.mintPrice)} /> :  <IconItem icon={<GemIcon />} value={schema.attestReward} />}
     
    </div>

  
  </Link>
    )
  }
  
  return (
    <span>Something went wrong</span>
  )
}

export function IconItem({ icon, value }: { icon: any, value: any }) {
  
  return(
    <div className="flex gap-5 items-center">
        <div className="text-green-300">
        {icon}
        </div>  
        <span className="text-gray-200 font-medium tracking-wider text-sm">
          {value}
        </span>
      </div>

  )
  }  
        
