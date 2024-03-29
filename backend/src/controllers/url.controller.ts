import { Request, Response } from "express";
import {
  getShortenedUrl,
  getUrl,
  getUrlByShortenedUrl,
  getUrlByUserId,
} from "../services/url.service";
import ERROR_MESSAGE from "../config/errorMessages";
import Url from "../models/urlModel";
import { nanoid } from "nanoid";

async function getAllUrl(req: Request, res: Response) {
  try {
    const { userId } = res.locals;
    const allUrl = await getUrlByUserId(userId);
    if (!allUrl) {
      return res.status(404).json({ status: "fail", error: "No URl" });
    } else {
      return res.status(200).json({ status: "success", urls: allUrl });
    }
  } catch (e: any) {
    console.log(e.message);
    res
      .status(500)
      .json({ status: "fail", message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

async function redirectUrl(req: Request, res: Response) {
  try {
    const { shortenedUrl } = req.params;
    console.log(shortenedUrl);
    const urlDoc = await getUrlByShortenedUrl(shortenedUrl);
    if (!urlDoc) {
      return res.status(404).json({ status: "fail", error: "wrong Url" });
    }
    await urlDoc.increaseClicks();
    res.redirect(urlDoc.url);
  } catch (e: any) {
    console.log(e.message);
    res
      .status(500)
      .json({ status: "fail", message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

async function addUrl(req: Request, res: Response) {
  try {
    const { userId } = res.locals;
    const { url } = req.body;

    const checkExisting = await getUrl(url, userId);
    if (checkExisting) {
      return res
        .status(404)
        .json({ status: "fail", error: "Url already exists" });
    }

    await getShortenedUrl(url, userId);

    res.status(200).json({ status: "success", message: "new url created" });
  } catch (e: any) {
    console.log(e.message);
    res
      .status(500)
      .json({ status: "fail", error: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export { getAllUrl, redirectUrl, addUrl };
