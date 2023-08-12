"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import ModalLayout from "../account/modal-layout";


export default function CustomAddress({
  showModal,
  open,
  setShowModal,
  addresses,
  addAddress,
}: any) {
  const [enteredAddress, setEnteredAddress] = useState("");
  
  const checkAddressBeforeAdd = () => {
    if (enteredAddress.length === 42) {
      //check if it already exists in addresses 
        if(addresses.includes(enteredAddress)){
            toast.error("Address already exists");
            return;
        }
        addAddress(enteredAddress);
        addresses.push(enteredAddress);
    } else {
      toast.error("Invalid address");
    }
  };

  return (
    <ModalLayout title="Create Custom Access" showModal={showModal}>
      <div className="flex flex-col divide-solid">
        <div className="flex gap-2 ">
          <Input
            type="string"
            name="address"
            id="address"

            placeholder="Enter your address"
            onChange={(e) => setEnteredAddress(e.target.value)}
            value={enteredAddress}
          />
          <Button onClick={() => checkAddressBeforeAdd()}>
            <PlusIcon />
          </Button>
        </div>
        <div>
        <h3 className="m-4">Addresses ({addresses.length})</h3>
          <div className="flex flex-col gap-4 m-4 max-h-[300px] overflow-auto">
            
            {addresses.map((address: string, key: number) => (
              <span className="p-2 bg-gray-300  text-center text-gray-800 rounded-md text-sm" key={key}>{address}</span>
            ))}
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}
