"use client";

import { useOthers } from "../liveblocks.config";

export function CollaborativeApp() {
    const others = useOthers();
    const userCount = others.length;

    return (
        <div>
            <h1>Collaborative App</h1>
            <p>There are {userCount} users in this room.</p>
        </div>
    );
}