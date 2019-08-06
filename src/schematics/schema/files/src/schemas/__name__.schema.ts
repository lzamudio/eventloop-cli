import * as mongoose from 'mongoose';
import { SCHEMAS } from '../constants/schemas.const';

export const <%= classify(name) %>Schema = new mongoose.Schema({

}, { collection: SCHEMAS.<%= underscore(name).toUpperCase() %> });
