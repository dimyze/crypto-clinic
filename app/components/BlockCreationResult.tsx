import { PT_Serif } from "next/font/google";

interface MinedBlock {
  hash: string;
  difficulty: number;
  timestamp: number;
}

const ptSerif = PT_Serif({ weight: ["400", "700"], subsets: ["latin"] });

export default function BlockCreationResult({
  isBlockMined,
  minedBlock,
}: {
  isBlockMined: boolean;
  minedBlock: MinedBlock | null;
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className={`${ptSerif.className} font-normal text-4xl mb-6`}>
          {!isBlockMined && "Mining Block ..."}
          {isBlockMined && "Block Successfully Mined!"}
        </h2>
        {!isBlockMined && (
          <p className="text-[#999] text-sm">
            Please wait for the mining process to finish
          </p>
        )}
        {isBlockMined && (
          <p className="text-[#999] text-sm leading-relaxed">
            {minedBlock !== null && `Block with hash "${minedBlock.hash}"`}
            <br />
            {minedBlock !== null &&
              `mined at difficulty ${minedBlock?.difficulty} at ${String(
                new Date(Number(minedBlock?.timestamp))
              )}`}
          </p>
        )}
      </div>
    </div>
  );
}
