import { ApplicationCommandInputType } from "@api/Commands";
import ErrorBoundary from "@components/ErrorBoundary";
import definePlugin from "@utils/types";
import { Button, ButtonLooks, React, Tooltip } from "@webpack/common";


function makeBtn() {
    return (
        <Tooltip text={"Go to guilded.gg"}>
            {(tooltipProps: any) => (
                <div style={{ display: "flex" }}>
                    <Button
                        {...tooltipProps}
                        onClick={() => window.location.href = "https://www.guilded.gg/"}
                        size=""
                        look={ButtonLooks.BLANK}
                        style={{ padding: "0 6px" }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0V0Z" fill="#EEBF01"/>
                            <path d="M4.5 6h15v3h-12l3 6h3l-3-1.5v-3h9c-1.125 3.657-1.125 3.657-3 7.5-2.907 1.5-2.907 1.5-6 1.5C7.968 17.905 7.968 17.905 6 15c-1.032-4.782-1.032-4.782-1.5-9Z" fill="#34322F"/>
                            <path d="M10.5 10.5h9c-1.125 3.657-1.125 3.657-3 7.5-3.188 1.22-3.188 1.22-6 1.5l-1.5-3 4.5-1.5-3-1.5v-3Z" fill="#34322F"/>
                        </svg>
                    </Button>
                </div>
            )}
        </Tooltip>
    );
}

export default definePlugin({
    name: "Guilded",
    authors: [
        {
            id: 467230314268196898n,
            name: "Banaanae",
        },
    ],
    description: "Adds a button to access guilded.gg",
    patches: [
        {
            find: ".activeCommandOption",
            replacement: {
                match: /(.)\.push.{1,30}disabled:(\i),.{1,20}\},"gift"\)\)/,
                replace: "$&;try{$2||$1.push($self.chatBarIcon(arguments[0]))}catch{}",
            }
        },
    ],
    dependencies: ["CommandsAPI"],
    commands: [{
        name: "guilded",
        description: "Go to guilded.gg",
        inputType: ApplicationCommandInputType.BUILT_IN,
        execute: async () => {
            window.location.href = "https://www.guilded.gg/"
        },
    }],
    chatBarIcon: ErrorBoundary.wrap(makeBtn, { noop: true }),
});
