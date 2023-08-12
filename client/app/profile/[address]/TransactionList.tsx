import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckIcon, XIcon } from "lucide-react";

// components/TransactionsList.tsx

interface TransactionsListProps {
  transactions: any[];
}

const BASE_IMG =
  "https://ipfs.io/ipfs/bafkreiakkhglt2w4zcq42jostqesnyaruaqgpt2rv5mk3twq2zsoockbb4";
const OPTIMISM =
  "https://ipfs.io/ipfs/bafkreicl7z5dtm4l27p3nzwfzkkowyg2h4uukmd2hjchjnr4xwkvvrgy6i";

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
  


  return (
    <div className="space-y-8 my-5">
      <h1 className="text-gray-300 text-xl font-semibold">
        Latest Transactions
      </h1>
      {transactions.map((transaction:any, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            {transaction.chainId == "420" ? (
               <AvatarImage
               src="https://ipfs.io/ipfs/bafkreicl7z5dtm4l27p3nzwfzkkowyg2h4uukmd2hjchjnr4xwkvvrgy6i"
               alt="Avatar"
             />
              ): (
                <AvatarImage
                src="https://ipfs.io/ipfs/bafkreiakkhglt2w4zcq42jostqesnyaruaqgpt2rv5mk3twq2zsoockbb4"
                alt="Avatar"
              />
              )}
           
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1 max-w-[300px]">
            <p className="text-sm font-medium leading-none overflow-auto truncate">{transaction.schemaId}</p>
            <p className="text-sm text-muted-foreground overflow-auto truncate">
              {transaction.txid}
            </p>
          </div>
          <div className="ml-auto font-medium">{transaction?.revoked ? <XIcon className="text-red-600"/> : <CheckIcon className="text-green-400" />}</div>
        </div>
      ))}

      
    </div>
  );
};

export default TransactionsList;
