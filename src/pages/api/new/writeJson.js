import { api_url, token } from "@/components/new/const";
import axios from "axios";
import fs from 'fs.promises'

export default async function handler(req, res) {


    try {
        let configPerson = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${api_url}/backend/sign-persons?limit=100000`,
            headers: { 
            'Authorization': `Bearer ${token}`, 
            },
        };

        let configAgency = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${api_url}/backend/agencies?limit=100000`,
            headers: { 
            'Authorization': `Bearer ${token}`, 
            },
        };

        let configCategory = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${api_url}/backend/categories?limit=100000`,
            headers: { 
            'Authorization': `Bearer ${token}`, 
            },
        };

        const getAllAgency = await axios(configAgency)
        let allAgency = getAllAgency.data.data

        const getAllCategory = await axios(configCategory)
        let allCategory = getAllCategory.data.data

        const getAllPerson = await axios(configPerson)
        let allSignPerson = getAllPerson.data.data

        // ghi vào file json
        await fs.writeFile(`./src/components/new/json/agency.json`, JSON.stringify(allAgency))
        await fs.writeFile(`./src/components/new/json/category.json`, JSON.stringify(allCategory))
        await fs.writeFile(`./src/components/new/json/person.json`, JSON.stringify(allSignPerson))

        return res.status(200).json("success")

    } catch (error) {
        return res.status(400).json("loi roi")
    }
}