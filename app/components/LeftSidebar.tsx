"use client";

import { useMemo } from "react";
import Image from "next/image";

import { getShapeInfo } from "@/lib/utils";

const LeftSidebar = ({ allShapes }: { allShapes: Array<any> }) => {

  
   let arr: any[] = [];

   for (const objectId in allShapes) {
     //console.log("OBJECT", objectId, "OBJECT SHAPE", allShapes[objectId])
      arr.push({
        type: allShapes[objectId].type,
        objectId: objectId,
      });
    }

  
  // memoize the result of this function so that it doesn't change on every render but only when there are new shapes
  const memoizedShapes = useMemo(
    () => (
      
    <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto pb-20">
        <h3 className="border border-primary-grey-200 px-5 py-4 text-xs uppercase">Layers</h3>
        <div className="flex flex-col">
          {arr?.map((shape: any) => {
            const info = getShapeInfo(shape[1]?.type);

            return (
              <div
                key={shape.objectId}
                className="group my-1 flex items-center gap-2 px-5 py-2.5 hover:cursor-pointer hover:bg-primary-green hover:text-primary-black"
              >
                <Image
                  src={info?.icon}
                  alt='Layer'
                  width={16}
                  height={16}
                  className='group-hover:invert'
                />
                <h3 className='text-sm font-semibold capitalize'>{shape.type}</h3>
              </div>
            );
          })}
        </div>
      </section>
     
    ),
    [arr.length]
  );

  return memoizedShapes;
};

export default LeftSidebar;
