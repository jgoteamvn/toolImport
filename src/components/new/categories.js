import fs from 'fs.promises'
import * as cheerio from 'cheerio';
import _ from 'lodash';

export async function getCategoryId(
    folderName,
    rootDir = "data_new"
){
    const noidungFile = await fs.readFile(`./${rootDir}/${folderName}/thuộctính.html`)
    const $ = cheerio.load(noidungFile)

    let resultText = ""

    $("table td")?.each(function(i, elem) {
        const text = _.trim($(this).text())

        if(text.includes('Loại văn bản')){
            resultText = _.trim($(this).next().text())
        }

    })
    
    const resultArr = resultText.split(',')

    if(resultArr.length < 1) return false

    return resultArr
}