import { ShExCStatus } from '@/Store/ShExCStatus';
import EntityInterface from '@/Store/EntityInterface';

export default interface StateInterface {
  Query: string;
  QueryError: string;
  QueryEntities: EntityInterface;
  ShemaParsed: any;
  ShExC: string;
  ShExCStatus: ShExCStatus;
  ShExCParseError: {
    message: string;
    lineNo: number;
  };
}
