// import { useCreateSession } from "../hooks/useCreateSession";

export default function Call() {
    // const { createSession } = useCreateSession();

    return (
        <div style={{ padding: 20, color: "white" }}>
            <h1>Call Session</h1>

            <button
                // onClick={createSession}
            >
                Get Session Token
            </button>
        </div>
    );
}
