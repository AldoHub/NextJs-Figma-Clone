import { useOthers, useSelf } from "@liveblocks/react";
import { Avatar } from "./Avatar";
import styles from "./Index.module.css";
import { generateRandomName } from "@/lib/utils";
import { useMemo } from "react";

const ActiveUsers = () => {
    const users = useOthers();
    const currentUser = useSelf();
    const hasMoreUsers = users.length > 3;

    //memoize the users
    const usersMemo = useMemo(() => {
        return (
        <div className="flex items-center justify-center gap-1 px-2 py-2">
            <div className="flex flex-shrink-0 flex-wrap gap-2">
                {currentUser && (  
                    <Avatar name="You" title="You" otherStyles="border-[3px] rounded-full relative z-10" />
                )}
            
                {users.slice(0, 3).map(({connectionId, info}) => (
                    <Avatar name={generateRandomName()} key={connectionId} title={generateRandomName()} otherStyles="-ml-5 relative rouded-full border-[3px] border-primary-green rounded-full" />
                ))}

                {hasMoreUsers && <div className={styles.more} >
                    +{users.length - 3}
                </div>}


            
            </div>
        </div>
        )
    }, [users.length])

   return usersMemo
}

export default ActiveUsers;