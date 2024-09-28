import fs from 'fs.promises'
import * as cheerio from 'cheerio';
import _ from 'lodash';
import { changeBackLink } from './changeBackLink';

export async function getDiagrams(item,rootDir="data_new"){    

    const luocdoFile = await fs.readFile(`./${rootDir}/${item}/lượcđồ.html`)
    const $ = cheerio.load(luocdoFile)

    let result = [];

    $(".ghd")?.each(function(i, elem) {

        let title = _.trim($(this).text())

        if(title.indexOf('đang xem') > 0){
            title = "Văn bản hiện tại"
        }

        let content = $(this).next().html()
        content = _.replace(content,new RegExp('<div class="dgcvm">Xem thêm...</div>','g'), '')
        content = _.replace(content,new RegExp('<div class="dgcvm" style="display: block;">Xem thêm...</div>','g'), '')
        content = changeBackLink(content)
        // content = _.replace(content,new RegExp('...','g'), '')

        result.push({
            "title": title,
            "content": changeBackLink(content)
        })
    });

    return result
}