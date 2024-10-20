import { getAttribute } from "@/components/new/attribute"
import { api_url, rootDir } from "@/components/new/const"
import axios from "axios"
import fs from 'fs.promises'
import Cookies from "cookies";
import { getCategoryId } from "@/components/new/categories";
import _ from "lodash"

function formatArray(datas){
    let result = []
    datas.map(item => result.push(item.name))
    return result
}

export default async function handler(req, res) {

    const {folderName,start,end} = req.body

    const cookies = new Cookies(req, res, {
        secure: process.env.NODE_ENV !== "development",
    });

    const accessToken = cookies.get("tool_tvpl_token");

    try {

        // lấy ds người ký trên api
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${api_url}/backend/categories?limit=100000`,
            headers: { 
            'Authorization': `Bearer ${accessToken}`, 
            },
        };
        const getAll = await axios(config)
        let allCategories = getAll.data.data
        
        const categories = formatArray(allCategories)
        
        const folders = await fs.readdir(folderName) 

        let getCategories = []

        for(let i = +start;i< +end + 1;i++){

            if(folders[i] == '.DS_Store') continue;

            // lấy dc attribute
            const category = await getCategoryId(folders[i],folderName)

            getCategories = getCategories.concat(category)
        }

        let result = []

        const clearCategory = _.uniqBy(getCategories)

        for(let j=0;j<clearCategory.length;j++){

            if(categories.includes(clearCategory[j]) === false){
                result.push({
                    "name": clearCategory[j]
                })
            }
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error)
        return res.status(400).json("loi")
    }
    
}