import { ParsedResultItem } from "../interface/ParsedResultItem";
export default class CodeParser {
    private _instanceID;
    /**
     * Initializes a new instance of the `CodeParser` class.
     *
     * @returns A promise that resolves with the initialized `CodeParser` instance.
     */
    static createInstance(): Promise<CodeParser>;
    /**
     * Releases all resources used by the `CodeParser` instance.
     *
     * @returns A promise that resolves when the resources have been successfully released. It does not provide any value upon resolution.
     */
    dispose(): Promise<void>;
    /**
     * Returns whether the `CodeParser` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `CodeParser` instance has been disposed of.
     */
    protected bDestroyed: boolean;
    get disposed(): boolean;
    /**
     * Configures runtime settings using a provided JSON string.
     * @param settings A JSON string that represents the content of the settings which contain at least one `CodeParserTaskSetting` object.
     *
     * @returns A promise that resolves when the operation has completed. It does not provide any value upon resolution.
     */
    initSettings(settings: string): Promise<void>;
    /**
     * Restores all runtime settings to their original default values.
     *
     * @returns A promise that resolves when the operation has completed. It does not provide any value upon resolution.
     */
    resetSettings(): Promise<void>;
    /**
     * Parses a single string or a `Uint8Array` object to be human-readable.
     * @param source Specifies the string or the `Uint8Array` object.
     * @param taskSettingName [Optional] Specifies a `CodeParserTaskSetting` to use.
     *
     * @returns A promise that resolves with a `ParsedResultItem` object which contains the parsed result.
     */
    parse(source: Uint8Array | string, taskSettingName?: string): Promise<ParsedResultItem>;
}
