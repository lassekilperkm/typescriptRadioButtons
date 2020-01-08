"use strict";
require.config({
    baseUrl: 'scripts/lib',
    paths: {},
    shim: {}
});
// load AMD module main.ts (compiled to main.js)
require(['main'], function (Main) {
    var main = new Main();
    main.run();
});
define("functions", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function handleClick(rbId) {
        var OptionGood = document.getElementById("good");
        var OptionMed = document.getElementById("med");
        var OptionBad = document.getElementById("bad");
        if (document.getElementById(rbId.id) == OptionGood) {
            document.getElementById("mood").value = String("Super, das freut mich!");
        }
        if (document.getElementById(rbId.id) == OptionMed) {
            document.getElementById("mood").value = String("Vielleicht hilft mehr Schlaf!");
        }
        if (document.getElementById(rbId.id) == OptionBad) {
            document.getElementById("mood").value = String("Geh mal besser nach Hause!");
        }
    }
    exports.handleClick = handleClick;
    function dynamicClickEvent(rbId) {
        //alert(rbId.id)   
    }
    function createDataTable() {
        var selection = document.getElementById("tabSelect");
        var selectedOption = selection.options[selection.selectedIndex].value;
        var createTable = false;
        var col = 0;
        var row = 0;
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
            var tableExisting = document.getElementById("DataTable");
            if (tableExisting != null) {
                document.body.removeChild(document.getElementById("DataTable"));
            }
            var tableElem = document.createElement("table");
            tableElem.setAttribute("id", "DataTable");
            for (var i = 0; i < row; i++) {
                var rowElem = document.createElement("tr");
                var _loop_1 = function (j) {
                    var colElem = document.createElement("td");
                    rowElem.appendChild(colElem);
                    var newRad = document.createElement("input");
                    var newLabel = document.createElement("label");
                    var rbIdent = j.toString() + i.toString();
                    newRad.setAttribute("type", "radio");
                    newRad.setAttribute("id", rbIdent);
                    newRad.setAttribute("name", String(j));
                    newRad.addEventListener("click", function (e) { return dynamicClickEvent(newRad); });
                    newLabel.setAttribute("for", rbIdent);
                    newLabel.textContent = "Option " + rbIdent;
                    rowElem.appendChild(newRad);
                    rowElem.appendChild(newLabel);
                };
                for (var j = 0; j < col; j++) {
                    _loop_1(j);
                }
                tableElem.appendChild(rowElem);
            }
            document.body.appendChild(tableElem);
        }
    }
    exports.createDataTable = createDataTable;
    function importFromJSON() {
        var jsFile = JSON.parse('[ \
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
        }]');
        //Get the headings
        var header = [];
        for (var i = 0; i < jsFile.length; i++) {
            for (var key in jsFile[i]) {
                if (header.indexOf(key) == -1) {
                    header.push(key);
                }
            }
        }
        //Create dynamics table
        var table = document.createElement("table");
        document.body.appendChild(table);
        //Fill header data
        var tr = table.insertRow(-1);
        for (var j = 0; j < header.length; j++) {
            var th = document.createElement("th");
            th.innerHTML = header[j];
            tr.appendChild(th);
        }
        //Fill row data
        for (var k = 0; k < jsFile.length; k++) {
            var tr2 = table.insertRow(-1);
            var _loop_2 = function (l) {
                var tcell = tr2.insertCell(-1);
                tr2.setAttribute("id", l.toString() + k.toString());
                tcell.innerHTML = jsFile[k][header[l]];
                if (tcell.innerHTML === "") {
                    var newRad_1 = document.createElement("input");
                    var rbIdent = tr2.id.toString();
                    newRad_1.setAttribute("type", "radio");
                    newRad_1.setAttribute("id", rbIdent);
                    newRad_1.setAttribute("name", l.toString());
                    newRad_1.addEventListener("click", function (e) { return dynamicClickEvent(newRad_1); });
                    tcell.appendChild(newRad_1);
                }
            };
            for (var l = 0; l < header.length; l++) {
                _loop_2(l);
            }
        }
    }
    exports.importFromJSON = importFromJSON;
});
define("main", ["require", "exports", "functions"], function (require, exports, functions_1) {
    "use strict";
    var Main = /** @class */ (function () {
        function Main() {
        }
        Main.prototype.run = function () {
            //Get all manually created radio buttons
            var buttons = document.getElementsByName("befinden");
            //Assign a click event listener to each radio button which calls the imported function
            buttons.forEach(function (element) {
                element.addEventListener("click", function (e) { return functions_1.handleClick(element); });
            });
            //Import from json
            var jsSubmit = document.getElementById("jsSubmit");
            jsSubmit.addEventListener("click", function (e) { return functions_1.importFromJSON(); });
        };
        return Main;
    }());
    return Main;
});
//# sourceMappingURL=app.js.map