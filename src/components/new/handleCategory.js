import fs from 'fs.promises'
export async function handleCategory(datas){
    if(!datas) return [100]
    
    let result = []

    const categorieJson = await fs.readFile(`./src/components/new/json/category.json`,'utf8')
    const categories = JSON.parse(categorieJson)

    for(let i=0;i < datas?.length; i ++){
        // tìm ID theo tên
        const category_id = categories.find(e => e.name === datas[i]).id
        result.push(category_id)
    }

    return result
}