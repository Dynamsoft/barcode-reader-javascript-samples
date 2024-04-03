import { ImageTag } from "dynamsoft-core";
import { ParsedResultItem } from "./ParsedResultItem";
export interface ParsedResult {
    readonly originalImageHashId: string;
    readonly originalImageTag: ImageTag;
    parsedResultItems: Array<ParsedResultItem>;
    readonly errorCode: number;
    readonly errorString: string;
}
declare module "dynamsoft-capture-vision-router" {
    interface CapturedResultReceiver {
        onParsedResultsReceived?: (result: ParsedResult) => void;
    }
}
