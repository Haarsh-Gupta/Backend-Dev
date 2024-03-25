import mongoose, { Schema } from "mongoose";

const subscripitionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // one who is subscriber
      ref: "User",
    },

    channel: {
      type: Schema.Types.ObjectId, // one who is owner of channel
      ref: "user",
    },
  },
  { timestamps: true }
);

export const Subscripition = mongoose.model(
  "Subscripition",
  subscripitionSchema
);
