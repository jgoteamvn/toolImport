import { getCategoryId } from "@/components/new/categories"
import { api_url, rootDir, token } from "@/components/new/const"
import axios from "axios"
import fs from 'fs.promises'

function formatArray(datas){
    let result = []
    datas.map(item => result.push(item.name))
    return result
}

export default async function handler(req, res) {

    try {

        // lấy ds người ký trên api
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${api_url}/backend/categories?limit=100000`,
            headers: { 
            'Authorization': `Bearer ${token}`, 
            },
        };
        const getAll = await axios(config)
        let allCategoies = getAll.data.data

        const category_db = formatArray(allCategoies)

        const folders = await fs.readdir(rootDir) 

        let categories = []

        for(let i =0;i< folders.length;i++){

            // lấy dc attribute
            const category = await getCategoryId(folders[i])

            for(let j=0;j <category.length;j++){
                // check
                if(category_db.includes(category[j]) === false){
                    categories.push({
                        "name": category[j]
                    });
                }
            }

        }

        // ghi vào file json
        // await fs.writeFile(`./src/components/new/json/category.json`, JSON.stringify(allCategoies))

        return res.status(200).json(categories)

    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error)
        return res.status(400).json("loi")
    }
    
}