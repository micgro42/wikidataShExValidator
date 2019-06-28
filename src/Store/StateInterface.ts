import { ShExCStatus } from '@/Store/ShExCStatus';
import EntityInterface from '@/Store/EntityInterface';
import { ParsedSchema } from '@shexjs/parser';

export default interface StateInterface {
  Query: string;
  QueryError: string;
  QueryEntities: EntityInterface;
  ShemaParsed: ParsedSchema;
  ShExC: string;
  ShExCStatus: ShExCStatus;
  ShExCParseError: {
    message: string;
    lineNo: number;
  };
}
