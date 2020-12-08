'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    id: { type: String },
    piciId: { type: String }, integrity: { type: String },
    declaration: { type: String },
    fileType: { type: String },
    sourceType: { type: Number },
    reliability: { type: Number },
    sheetName: { type: String },
    qualifiedNum: { type: Number },
    unqualifiedNum: { type: Number },
    total: { type: Number },
    qualifiedRate: { type: String },
    isComplete: { type: Number },
    memo: { type: String },
    attachmentNum: { type: Number },
    isCombine: { type: Number },
    snapshotId: { type: String },
    notificationId: { type: String },
    url: {
      type: String,
    },
    sheetId: {
      type: String,
    },
    processor: {
      type: String,
    },
    processTime: {
      type: String,
    },
    notificationTitle: {
      type: String,
    },
    publisher: {
      type: String,
    },
    publishTime: {
      type: String,
    },
    collectPerson: {
      type: String,
    },
    collectTime: {
      type: String,
    },
    belongWebsiteUrl: {
      type: String,
    },
    belongWebsite: {
      type: String,
    },
    dataSourceType: {
      type: Number,
    },
    dataSource: {
      type: String,
    },
  });

  return mongoose.model('Quota', UserSchema, 'quota');
};
