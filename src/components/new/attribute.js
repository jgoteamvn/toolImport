import fs from 'fs.promises'
import { rootDir } from './const';
import * as cheerio from 'cheerio';
import _ from 'lodash';

export async function getAttribute(folderName) {
    const noidungFile = await fs.readFile(`./${rootDir}/${folderName}/thuộctính.html`)
    const $ = cheerio.load(noidungFile)

    let num_code;
    let agency;
    let effect;
    let is_outstanding = 0;
    let date_issued;
    let date_effective;
    let date_published;
    let sign_person;
    let status;
    let num_gazette;

    $("table td")?.each(function(i, elem) {

        const text = _.trim($(this).text())

        if(!text) return;
        if(text.includes('Số hiệu')) num_code = _.trim($(this).next().text())
        if(text.includes('Nơi ban hành')) agency = _.trim($(this).next().text())
        if(text.includes('Ngày ban hành')) date_published = _.trim($(this).next().text())
        if(text.includes('Ngày ban hành')) date_issued = _.trim($(this).next().text())
        if(text.includes('Ngày hiệu lực')) date_effective = _.trim($(this).next().text())
        if(text.includes('Người ký')) sign_person = _.trim($(this).next().text())
        if(text.includes('Số công báo')){
            num_gazette = _.trim($(this).next().text())
        }else{
            num_gazette = "Đang cập nhật"
        }
        if(text.includes('Tình trạng')){
            status = _.trim($(this).next().text())
            effect = _.trim($(this).next().text())
        }
    });

    return{
        num_code,
        agency,
        effect,
        is_outstanding,
        date_issued,
        date_effective,
        date_published,
        sign_person,
        status,
        num_gazette,
    }
}