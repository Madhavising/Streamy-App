import React from "react";
import { Shimmer } from "react-shimmer";

const ShimmerHome = ({ VideoCards }) => {
  const BoxCount = 3 - (VideoCards % 3) + 3 || 3;

  return (
    <>
      {[...Array(BoxCount)].map((_, index) => (
        <div key={index} className="flex flex-col gap-y-4 mr-4">
          <Shimmer width={340} height={200} />
          <Shimmer width={340} height={20} />
          <Shimmer width={250} height={20} />
        </div>
      ))}
    </>
  );
};

export default ShimmerHome;

// const ShimmerHome = () => {
//   return (
//     <>
//       <div className='flex flex-wrap' data-testid='shimmer'>
//         {Array(12)
//           .fill([])
//           .map((e, index) => (
//             <div key={index} className=' m-2 p-3 w-80 h-80'>
//               <div className='w-full h-1/2 border rounded-xl bg-64 custom-linear-gradient animate-pulse'></div>
//               <div
//                 className='w-[90%] h-[10%] mt-3 border rounded-full
//                bg-64 custom-linear-gradient animate-pulse '
//               ></div>
//               <div className='w-[70%] h-[7%]  mt-3 border rounded-full bg-64 custom-linear-gradient animate-pulse'></div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };
// export default ShimmerHome;