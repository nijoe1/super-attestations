"use client";

import Image from "next/image";

interface UserDetailsProps {
  username: string;
  address: string;
  totalTokens: number;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  username,
  address,
  totalTokens,
}) => {
    type GamerNamePart = string[];

const prefixes: GamerNamePart = ["Shadow", "Mystic", "Epic", "Dragon", "Knight", "Cyber", "Phantom"];
const suffixes: GamerNamePart = ["Slayer", "Hunter", "Gamer", "Warrior", "Mage", "Rogue", "Titan"];

function getRandomGamerName(): string {
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${randomPrefix}${randomSuffix}`;
}

// Use the function

  return (
    <div className="flex flex-col gap-8 items-center">
      {/* This will be the top profile item */}
      <div className="items-center mx-auto flex flex-col justify-center">
        <div className="rounded-md relative h-[150px] w-[150px]">
          <Image
            src="https://ipfs.io/ipfs/bafybeiafbapjoweekp2bkk7opijf7ysveq6zy4hkptomarcynofx3poieu"
            alt="Profile"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="col-span-2 m-4 w-full text-center">
          <h3 className="text-xl font-bold">{getRandomGamerName()}</h3>
          <h5 className="text-xs text-gray-300 tracking-tighter">{address}</h5>
          <div></div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-1 text-center py-2 divide-x divide-gray-400">
        <StatItem title="Vaults" value="N/A" />
        <StatItem title="Submitted" value={totalTokens.toString()} />
        <StatItem title="Acceptance" value="N/A" />
      </div>
    </div>
  );
};

export default UserDetails;

// i want to create a user Profile

const StatItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-white text-2xl">{value}</span>
      <span className="text-gray-400 text-xs font-semibold tracking-wide uppercase">
        {title}
      </span>
    </div>
  );
};
