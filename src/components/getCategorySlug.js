import { rootDir } from "./new/const"
import fs from 'fs.promises'

export async function getCategorySlug(folderName){
    const jsonFile = await fs.readFile(`./${rootDir}/${folderName}/general_information.json`, 'utf8')
    const categorySlug = jsonFile.category[1]
    return categorySlug
}