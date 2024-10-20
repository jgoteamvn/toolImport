export function checkDistableBtn(arr,action){
    if(!arr) return true
    if(arr?.length == 0) return false
    if(action == arr?.length + 1) return false
    return true
}