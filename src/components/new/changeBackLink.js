import _ from 'lodash';
import * as cheerio from 'cheerio';

export function changeBackLink(content){
    let contentChange = _.replace(content,new RegExp('https://thuvienphapluat.vn','g'), 'https://luatphapvietnam.org')
    contentChange = _.replace(contentChange,new RegExp('.aspx','g'), '')

    const $ = cheerio.load(contentChange)

    // const tests = $('a').map(function () {
    //     var link = $(this).attr('href');
        
    //     if(link){
    //         var linkArr = link.split('/')
    //         const newLink = `https://luatphapvietnam.org/van-ban/${linkArr[5]}`

    //         return {
    //             link,
    //             newLink
    //         }
            
    //         // contentChange = _.replace(content,new RegExp(link,'g'), newLink)
    //     }
    // }).toArray();

    // if(tests.length > 0){
    //     for(let i=0;i < tests.length; i ++){
    //         contentChange = _.replace(contentChange,new RegExp(link,'g'), newLink)
    //     }
    // }

    $('a').each(function () {
        var link = $(this).attr('href');
        
        if(link){
            var linkArr = link.split('/')

            if(linkArr[3] == "van-ban"){
                const subEnd = linkArr[5] ? linkArr[5] : linkArr[4]
                const newLink = `https://luatphapvietnam.org/van-ban/${subEnd}`
                contentChange = _.replace(contentChange,new RegExp(link,'g'), newLink)
            }
        }
    })

    return contentChange
}