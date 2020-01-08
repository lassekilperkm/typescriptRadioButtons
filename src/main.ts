//import the handleClick function
import { handleClick, importFromJSON } from "./functions";
class Main{
    constructor() {}
    public run(): void {                
        //Get all manually created radio buttons
        let buttons = document.getElementsByName("befinden");           
        //Assign a click event listener to each radio button which calls the imported function
        buttons.forEach(element => {
            element.addEventListener("click", (e:Event) => handleClick(<HTMLInputElement>element));
        });        

        //Import from json
        let jsSubmit = document.getElementById("jsSubmit") as HTMLButtonElement;
        jsSubmit.addEventListener("click", (e:Event) => importFromJSON());
    }
}
export = Main;
