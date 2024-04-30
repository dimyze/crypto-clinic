"use client";

export default function Pagination({ currentPage }: { currentPage: number }) {
  let translateAmount = 2;

  if (currentPage === 2) {
    translateAmount += 10 + 16;
  } else if (currentPage === 3) {
    translateAmount += 10 + 10 + 16 + 14;
  }

  return (
    <div className="flex flex-col gap-[4px] w-fit">
      <div className="h-[16px] rounded-3xl bg-white relative shadow-[inset_0_0_0_1px_#290d6b]">
        <div
          style={{ left: translateAmount + "px" }}
          className={`h-[12px] w-[12px] absolute bg-[#290d6b] rounded-3xl top-[2px] transition-all duration-300`}
        ></div>
      </div>
      <div className="flex gap-[16px] pl-[2px] pr-[2px] text-[#666]">
        <p className="text-xs w-[10px] flex justify-center">1</p>
        <p className="text-xs w-[10px] flex justify-center">2</p>
        <p className="text-xs w-[10px] flex justify-center">3</p>
      </div>
    </div>
  );
}
