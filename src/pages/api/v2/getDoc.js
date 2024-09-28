import fs from 'fs.promises'
import axios from 'axios';
import _ from 'lodash';
import { getSlug } from '@/components/getSlug'
import { docEffect,apiUrl } from '@/components/new/const'
import { getDoc } from '@/components/new/getDoc';
import { getDescription } from '@/components/new/getDescription';
import { getAttribute } from '@/components/new/attribute';
import { getPersonId } from '@/components/new/signPerson';
import { getAgencyId } from '@/components/new/agency';
import { getStatusId } from '@/components/new/status';
import { getCategoryId } from '@/components/new/categories';
import { getDiagrams } from '@/components/new/diagram';
import { format } from 'date-fns';
import { formatDate } from '@/components/formatDate';
import { handleCategory } from '@/components/new/handleCategory';
import Cookies from "cookies";

function getTypeId(folderName){
    const type_id = folderName.slice(0,1)
    return type_id
}

function getEffectId(effect){
    let result = 1

    docEffect?.map(e => {
        if(effect.includes(e.name)) result = e.id
    })

   return result
}

function formatDateInsu(text){
    try {
        return format(formatDate(text),'yyyy-MM-dd')
    } catch (error) {
        const year = text.slice(text.length - 4)
        return `${year}-01-01`
    }
}


export default async function handler(req, res) {
    const {rootDir,folderName, id} = req.body

    if(!folderName) return res.status(400).json("loi")

    const cookies = new Cookies(req, res, {
        secure: process.env.NODE_ENV !== "development",
    });

    const token = cookies.get("tool_tvpl_token");

    try {
        // đọc file json
        const jsonFileRead = await fs.readFile(`./${rootDir}/${folderName}/general_information.json`, 'utf8')
        
        const jsonFile = JSON.parse(jsonFileRead)
        
        const typeId = getTypeId(folderName)
        
        // lấy slug, nhớ khi result ra phải set lại
        let slug = getSlug(jsonFile)
        let slugForApi = slug + '-' + jsonFile.law_id
        
        // lấy tiêu đề, file, nội dung
        const {
            title,
            doc_pdf,
            doc_word,
            content
        } = await getDoc(jsonFile,folderName,slug,rootDir)

        // lấy description
        const description = await getDescription(folderName,rootDir)

        // lấy dc attribute
        const {
            num_code,
            agency,
            effect,
            date_issued,
            date_effective,
            date_published,
            sign_person,
            status,
            num_gazette,
        } = await getAttribute(folderName,rootDir)

        // Lấy người ký
        const personId = await getPersonId(sign_person)

        // lấy agency id
        const agencyId = await getAgencyId(agency)

        // lấy status id
        const status_id = getStatusId(status)

        // lấy categories
        const categorys = await getCategoryId(folderName,rootDir)

        const category_id = await handleCategory(categorys)

        // lấy diagrams
        const diagrams = await getDiagrams(folderName,rootDir)

        // gọi api đẩy dữ liệu
        let data = {
            "id": id,
            "title": title,
            "slug": slugForApi,
            "doc_word": doc_word,
            "doc_pdf": doc_pdf,
            "law_id": jsonFile.law_id,
            "attribute": {
              "id": id,
              "num_code": num_code,
              "is_outstanding": 0,
              "agency_id": agencyId,
              "type": +typeId,
              "effect": getEffectId(effect),
              "date_issued": formatDateInsu(date_issued),
              "date_effective": formatDateInsu(date_effective || date_published),
              "date_published": formatDateInsu(date_published),
              "sign_person_id": personId,
              "status_id": status_id,
              "num_gazette":num_gazette
            },
            "diagrams":diagrams,
            "categories": category_id,
            "description": description,
            "content": content
        };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: apiUrl,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            data : data
        };

        const request = await axios.request(config)
        return res.status(200).json("Tải lên thành công")

    } catch (error) {
        if(error?.response?.data?.code === 500) return res.status(200).json("Văn bản đã tồn tại")
        return res.status(400).json(error?.response?.data)
    }
    
    
}