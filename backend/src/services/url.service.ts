import mongoose from "mongoose";
import Url from "../models/urlModel";
import { nanoid } from "nanoid";

async function getUrlByUserId(userId: mongoose.Types.ObjectId) {
  return await Url.find({
    userId,
  });
}

async function getUrl(url: string) {
  return await Url.findOne({
    url,
  });
}

async function getUrlByShortenedUrl(shortendUrl: string) {
  return await Url.findOne({
    shortendUrl,
  });
}

async function getShortenedUrl(url: string, userId: mongoose.Types.ObjectId) {
  const shortendUrl = nanoid(7);
  const checkExisting = await getUrlByShortenedUrl(shortendUrl);
  if (!checkExisting) {
    return await Url.create({
      url,
      shortendUrl,
      userId,
    });
  } else {
    await getShortenedUrl(url, userId);
  }
}
export { getUrlByUserId, getUrl, getUrlByShortenedUrl, getShortenedUrl };
