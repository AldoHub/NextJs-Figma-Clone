"use client";

import { LiveList, LiveMap } from "@liveblocks/client";
import { ClientSideSuspense, LiveblocksProvider } from "@liveblocks/react";

//import Loader from "@/components/Loader";
import { RoomProvider } from "@/liveblocks.config";
import Loader from "./components/Loader";

const Room = ({ children }: { children: React.ReactNode }) => {
 return (

    <LiveblocksProvider publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUB_KEY!}>
    <RoomProvider
      id="fig-room"
      /**
       * initialPresence is used to initialize the presence of the current
       * user in the room.
       *
       * initialPresence: https://liveblocks.io/docs/api-reference/liveblocks-react#RoomProvider
       */
      initialPresence={{ cursor: null, cursorColor: null, editingText: null }}
      /**
       * initialStorage is used to initialize the storage of the room.
       *
       * initialStorage: https://liveblocks.io/docs/api-reference/liveblocks-react#RoomProvider
       */
      initialStorage={{
        person: { name: "Marie", age: 30 },
        canvasObjects: new LiveMap([]),
        testObjects: new LiveList([
          { objectId: "1", name: "test1", fill: "red" },
          { objectId: "2", name: "test2", fill: "blue" },
        ]),
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
    </LiveblocksProvider>
  );
}

export default Room;