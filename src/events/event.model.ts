import { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  description: string;
  dayOfWeek: string;
  userId: string;
}

export const EventSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    dayOfWeek: {
      type: String,
      enum: [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ],
      required: true,
    },
    userId: { type: String, required: true },
  },
  { versionKey: false },
);
