import { Model, Types } from 'mongoose';
import { IBook } from '../challenge/challenge.interface';

export type ICurrentList = {
  email: string;
  isComplete: true | false;
  book: Types.ObjectId | IBook;
};

export type CurrentListModel = Model<ICurrentList, Record<string, unknown>>;
