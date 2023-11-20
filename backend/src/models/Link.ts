import mongoose, { Document, Schema } from "mongoose";

const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);
