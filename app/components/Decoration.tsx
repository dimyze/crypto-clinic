import { PT_Serif } from "next/font/google";
import Image from "next/image";
import blockchainLogo from "@/public/blockchain-logo.svg";

const ptSerif = PT_Serif({ weight: ["400", "700"], subsets: ["latin"] });

export default function Decoration() {
  return (
    <div className="bg-[#290d6b] flex flex-col justify-center pl-20 pr-20 rounded-[2rem]">
      <div className="flex flex-col gap-6 items-center">
        <Image
          className="mb-6"
          src={blockchainLogo}
          alt="health-logo"
          width={250}
          quality={100}
          priority
        />
        <div className="text-white text-center">
          <h2
            className={`${ptSerif.className} font-normal text-3xl leading-relaxed mb-6`}
          >
            Crypto Clinic
          </h2>
          <p className="text-[#ddd] font-normal text-sm">
            Securing health, one block at a time
          </p>
        </div>
      </div>
    </div>
  );
}
