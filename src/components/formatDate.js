export function formatDate(date){
    const dateParts = date.split("/")
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    return dateObject
}