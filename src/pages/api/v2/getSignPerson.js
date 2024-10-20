import { getAttribute } from "@/components/new/attribute"
import { api_url, rootDir } from "@/components/new/const"
import axios from "axios"
import fs from 'fs.promises'
import Cookies from "cookies";
import _ from "lodash"

function formatArray(datas){
    let result = []
    datas.map(item => result.push(item.name))
    return result
}

export default async function handler(req, res) {

    const {folderName} = req.body

    const cookies = new Cookies(req, res, {
        secure: process.env.NODE_ENV !== "development",
    });

    const accessToken = cookies.get("tool_tvpl_token");

    try {

        // lấy ds người ký trên api
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${api_url}/backend/sign-persons?limit=100000`,
            headers: { 
            'Authorization': `Bearer ${accessToken}`, 
            },
        };
        const getAll = await axios(config)
        let allSignPerson = getAll.data.data

        const signPerson = formatArray(allSignPerson)
        
        const folders = await fs.readdir(folderName) 

        let result = []

        for(let i =0;i< folders.length;i++){

            if(folders[i] == '.DS_Store') continue;

            // lấy dc attribute
            const {sign_person} = await getAttribute(folders[i], folderName)

            if(signPerson.includes(sign_person) == false){
                result.push({
                    "name": sign_person,
                })
            }
        }

        result = _.uniqBy(result, 'name')

        return res.status(200).json(result)

    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error)
        return res.status(400).json("loi")
    }
    
}