pl.view.listPhones = {
    setupUserInterface: function () {
        var tableBodyEl = document.querySelector("table#ListPhones>tbody");
        var i=0, keys=[], key="", row={};
        // load all phone objects
        Phone.loadAll();
        keys = Object.keys(Phone.instances);
        // for each phone, create a table row with a cell for each attribute
        for (i=0; i < keys.length; i++) {
            key = keys[i];
            row = tableBodyEl.insertRow();
            row.insertCell(-1).textContent = Phone.instances[key].imei;      
            row.insertCell(-1).textContent = Phone.instances[key].manufacturer;  
            row.insertCell(-1).textContent = Phone.instances[key].model;
        }
    }
};