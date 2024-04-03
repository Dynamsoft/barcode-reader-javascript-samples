import { CapturedResultItem } from "dynamsoft-core";
import { EnumMappingStatus, EnumValidationStatus } from "../dcp";
export interface ParsedResultItem extends CapturedResultItem {
    codeType: string;
    jsonString: string;
    parsedFields: Array<{
        FieldName: string;
        Value: string;
    }>;
    getFieldValue(fieldName: string): string;
    getFieldMappingStatus: (fieldName: string) => EnumMappingStatus;
    getFieldValidationStatus: (fieldName: string) => EnumValidationStatus;
}
