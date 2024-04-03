export default class CodeParserModule {
    static getVersion(): string;
    static loadSpec(specificationName: string | Array<string>, specificationPath?: string): Promise<void>;
}
