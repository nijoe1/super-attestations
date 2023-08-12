"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEthersSigner } from "@/lib/ethers";
import { getLighthouseKeys } from "@/lib/lighthouse";

import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ReloadIcon } from "@radix-ui/react-icons";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

export type SchemaInput = {
  name: string;
  value: any;
  type: string;
};
export default function SchemaForm({
  schema,
  schemaUID,
}: {
  schema: string;
  schemaUID: string;
}) {
//  const [schema, setSchema] = useState<SchemaInput[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    name: "Test Attestation", 
    file: "QmUCfJPFi5oCGruzVQQyt9zB2bjBkfckjB53LNJ5Qpzv5b", 
    description: "This is incorrect and needs to be revoked if posisble",
    
  });
  const signer = useEthersSigner();
  const {address} = useAccount();
  

/*   useEffect(() => {
    console.log(list);

    if (list) {
      list.split(",").map((listItem: string, index) => {
          if (index > 0) {
            const [empty, type, name] = listItem.split(" ");
            setSchema((prev) => [
              ...prev,
              { name: name, type: type, value: null },
            ]);
          } else {
            const [type, name] = listItem.split(" ");
            setSchema((prev) => [
              ...prev,
              { name: name, type: type, value: null },
            ]);
          }
      });
    }
  }, [list]);
 */
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async(e: any) => {
    //need to upload file to lighthouse and make sure that we get back the hash.
    console.log(e)
    if (!address) {
      toast.error("no valid address");

      return;
    }
    const { JWT, apiKey } = await getLighthouseKeys(address);

    if (!apiKey) {
      toast.error("no valid apiKey");
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    formData.append("address", address);
    formData.append("apiKey", apiKey);

    const config = {
      headers: {
        Authorization: `${JWT}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const url = "https://api.dataponte.com";
      const response = await axios.post(
        `${url}/files/uploadFile`,
        formData,
        config
      );
      
      console.log(response)
      toast.success("File uploaded successfully");
      const hash = response.data.data[0].Hash;
      console.log(hash)
      setFormData((prev: any) => ({ ...prev, file: hash }));
    } catch (err) {
      toast.error("Something went wrong when uploading the file");
      throw err;
    }
  };

  const submitData = async () => {
    setLoading(true);
    const EASoGoerli = "0x4200000000000000000000000000000000000021";
    const eas = new EAS(EASoGoerli);

    //const signer = walletClientToSigner(walletCline);

      //@ts-ignore
      eas.connect(signer);

    //ts-ignore error
    const schemaEncoder = new SchemaEncoder("string name, string file, string description");
    //check if there is a type of uint256 and convert value to number
    
    
    const schemaList = [
      { name: "name", value: formData.name, type: "string" },
      { name: "file", value: formData.file, type: "string" },
      { name: "description", value: formData.description, type: "string" },
    ]
    // its not a schema so we can put in our won. 
    console.log(schemaList);
    const encodedData = schemaEncoder.encodeData(schemaList);
    
    
    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: "0x0000000000000000000000000000000000000000",
        revocable: true,
        data: encodedData,
      },
    });

    await tx.wait();

    toast.success("New attestation has been made");
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      
      <div>
              <Label>Name</Label>
              <Input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required={true}
            />
            </div>
            <div>
              <Label>Upload Data</Label>
              <Input
              type="file"
              id="image"
              name="image"
              multiple
              accept="*"
              onChange={(e) => handleFileChange(e)}
              className="rounded bg-none  text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.file && <span className="text-gray-300 text-xs mt-2 ">Succesfully uploaded: {formData.file}</span>}

            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                rows={3}
                className="bg-gray-300 text-gray-900"
                value={formData.description}
                onChange={handleChange}
                placeholder="Name"

              />
            </div>
            {loading ? 
             <Button disabled>
              <ReloadIcon className="w-5 h-5 mr-2 animate-spin" /> Attesting...
             </Button> : 
              <Button onClick={submitData}>Submit data</Button>
            }
     
    </div>
  );
}
