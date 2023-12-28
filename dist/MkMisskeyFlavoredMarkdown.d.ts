import { VNode, SetupContext } from 'vue';
import * as mfm from 'mfm-js';
type MfmProps = {
    text: string;
    plain?: boolean;
    nowrap?: boolean;
    isNote?: boolean;
    emojiUrls?: string[];
    rootScale?: number;
    nyaize?: boolean | 'respect';
    parsedNodes?: mfm.MfmNode[] | null;
    enableEmojiMenu?: boolean;
    enableEmojiMenuReaction?: boolean;
    useAnim?: boolean;
};
type MfmEvents = {
    clickEv(id: string): void;
};
export default function (props: MfmProps, context: SetupContext<MfmEvents>): VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}> | undefined;
export {};
