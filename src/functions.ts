export function handleClick(rbId: HTMLInputElement): void {
    let OptionGood = document.getElementById("good");
    let OptionMed = document.getElementById("med");
    let OptionBad = document.getElementById("bad");
    if (document.getElementById(rbId.id) == OptionGood) {
        (document.getElementById("mood") as HTMLInputElement).value = String("Super, das freut mich!");
    }
    if (document.getElementById(rbId.id) == OptionMed) {
        (document.getElementById("mood") as HTMLInputElement).value = String("Vielleicht hilft mehr Schlaf!");
    }
    if (document.getElementById(rbId.id) == OptionBad) {
        (document.getElementById("mood") as HTMLInputElement).value = String("Geh mal besser nach Hause!");
    }
}

function dynamicClickEvent(rbId: HTMLInputElement): void {
    //alert(rbId.id)   
}

export function createDataTable(): void {
    let selection = <HTMLSelectElement>document.getElementById("tabSelect");
    let selectedOption = selection.options[selection.selectedIndex].value;
    let createTable: boolean = false;
    let col: number = 0;
    let row: number = 0;
    if (selectedOption == "0x0") {
        alert("Bitte eine Option wählen");
    }
    if (selectedOption == "1x2") {
        col = 1;
        row = 2;
        createTable = true;
    }
    if (selectedOption == "2x3") {
        col = 2;
        row = 3;
        createTable = true;
    }
    if (selectedOption == "4x6") {
        col = 4;
        row = 6;
        createTable = true;
    }
    if (createTable) {
        let tableExisting = document.getElementById("DataTable");
        if (tableExisting != null) {
            document.body.removeChild(<HTMLTableElement>document.getElementById("DataTable"));
        }
        let tableElem = document.createElement("table");
        tableElem.setAttribute("id", "DataTable");
        for (let i = 0; i < row; i++) {
            let rowElem = document.createElement("tr");
            
            for (let j = 0; j < col; j++) {
                let colElem = document.createElement("td");
                rowElem.appendChild(colElem);

                let newRad = document.createElement("input");
                let newLabel = document.createElement("label");

                let rbIdent: string = j.toString() + i.toString();

                newRad.setAttribute("type", "radio");
                newRad.setAttribute("id", rbIdent);
                newRad.setAttribute("name", String(j));
                newRad.addEventListener("click", (e:Event) => dynamicClickEvent(newRad))

                newLabel.setAttribute("for", rbIdent);
                newLabel.textContent = "Option " + rbIdent;

                rowElem.appendChild(newRad);
                rowElem.appendChild(newLabel);
            }
            tableElem.appendChild(rowElem);
        }
        document.body.appendChild(tableElem);
    }
}

export function importFromJSON(): void {
    let jsFile = JSON.parse('[ \
        { \
            "Beschreibung":"Bedarf", \
            "Auswahl":"", \
            "Punktwert":"1" \
        }, \
        { \
            "Beschreibung":"Kein Bedarf", \
            "Auswahl":"", \
            "Punktwert":"3" \
        }, \
        { \
            "Beschreibung":"Manchmal Bedarf", \
            "Auswahl":"", \
            "Punktwert":"5" \
        }]')
    
    //Get the headings
    let header = [];
    for (let i = 0; i < jsFile.length; i++) {
        for (let key in jsFile[i]) {
            if (header.indexOf(key) == -1) {
                header.push(key);
            }
        }  
    }
    //Create dynamics table
    let table: HTMLTableElement = document.createElement("table");
    document.body.appendChild(table);

    //Fill header data
    let tr: HTMLTableRowElement = table.insertRow(-1);
    for (let j = 0; j < header.length; j++) {
        let th: HTMLTableHeaderCellElement = document.createElement("th");
        th.innerHTML = header[j];
        tr.appendChild(th);
    }

    //Fill row data
    for (let k = 0; k < jsFile.length; k++) {
        let tr2: HTMLTableRowElement = table.insertRow(-1);
        for (let l = 0; l < header.length; l++) {            
            let tcell = tr2.insertCell(-1);
            tr2.setAttribute("id",l.toString() + k.toString());
            tcell.innerHTML = jsFile[k][header[l]];
            if (tcell.innerHTML === "") {
                let newRad = document.createElement("input");
                let rbIdent: string = tr2.id.toString();

                newRad.setAttribute("type", "radio");
                newRad.setAttribute("id", rbIdent);
                newRad.setAttribute("name", l.toString());
                newRad.addEventListener("click", (e:Event) => dynamicClickEvent(newRad))

                tcell.appendChild(newRad)
            }
        }
    }    
}