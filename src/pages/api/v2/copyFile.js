import { getSlug } from "@/components/getSlug"
import axios from "axios"
import fs from 'fs.promises'

async function checkFileExit(fileName){
    try {
        await fs.readFile(fileName)
        return true
    } catch (error) {
        return false
    }
}

async function checkDir(dir){
    try {
        await fs.readdir(dir)
        return true
    } catch (error) {
        await fs.mkdir(dir)
        return false
    }
}

export default async function handler(req, res) {
    try {
        const {folderName} = req.body

        const folders = await fs.readdir(folderName)

        for(let i =0;i< folders.length;i++){
            if(folders[i] == '.DS_Store') continue;

            const jsonFileRead = await fs.readFile(`./${folderName}/${folders[i]}/general_information.json`, 'utf8')
            const jsonFile = JSON.parse(jsonFileRead)
            let slug = getSlug(jsonFile)

            const fileUrl = `./${folderName}/${folders[i]}/${slug}.pdf`
            const checkpdf = await checkFileExit(fileUrl)

            const copyFolder = `./files/${folderName}/${slug}.pdf`

            await checkDir(`./files/${folderName}`)

            if(checkpdf){
                await fs.copyFile(fileUrl, copyFolder)
            }
        }

        return res.status(200).json('ok')
    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error)
        return res.status(400).json('loi')
    }
}