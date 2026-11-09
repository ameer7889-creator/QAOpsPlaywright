const ExcelJs = require('exceljs');

async function writeExcel(searchText,replaceText,change,filePath) {
    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);
    
    // writing iphone for 3,2 cell
    const cell = worksheet.getCell(output.row,output.cell+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
    console.log("File updated succesfully");
}

async function readExcel(worksheet,searchText)
{
    let output = {row:-1, cell:-1};
        if (!worksheet) 
        {
        console.error("Worksheet 'Sheet1' not found");
        return;
        }
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                // console.log(cell.value);
                if (cell.value === searchText) {
                    output.row = rowNumber;
                    output.cell = colNumber;
                }
            })
        })
    return output;
}
writeExcel("Republic","350",{rowchange:0, colChange:2}, "/Users/AmeerShaik/ExcelJSUtil/TestData/download.xlsx");