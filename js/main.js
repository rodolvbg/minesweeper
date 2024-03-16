import {form} from "./elements.js";
import {createTable} from "./configure.js";


form.addEventListener("submit", ()=>{
    const formData = new FormData(form);
    createTable(Number(formData.get("rows_number")), Number(formData.get("columns_number")));
})