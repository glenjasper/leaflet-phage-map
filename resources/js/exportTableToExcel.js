function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    // https://www.w3schools.com/tags/ref_urlencode.ASP
    // https://www.htmlhelp.com/reference/html40/entities/symbols.html
    // https://www.dm.ufscar.br/profs/waldeck/curso/html/apend/tabcod.html
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20')
                                         .replace(/#/g, '%23')
                                         .replace(/ò/g, '&ograve')
                                         .replace(/Φ/g, '&Phi;');

    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}
