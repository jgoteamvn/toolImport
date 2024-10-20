import { Cheerio } from "cheerio"
import fs from 'fs.promises'
import { rootDir } from "./new/const"

export async function getContent(item){
    const noidungFile = await fs.readFile(`./${rootDir}/${item}/nộidung.html`)
    const $ = Cheerio.load(noidungFile)
    const content = $('.content1').html()

    // nho repeat sau
    return content
}