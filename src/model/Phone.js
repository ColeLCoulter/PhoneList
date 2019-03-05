function Phone(slots) {
    this.imei = slots.imei;
    this.manufacturer = slots.manufacturer;
    this.model = slots.model;
};

Phone.instances = {};

// Convert row to object
Phone.convertRow2Obj = function (phoneRow) {
    var phone = new Phone(phoneRow);
    return phone;
};

// Load the phone table from Local Storage
Phone.loadAll = function () {
    var i=0, key="", keys= [], phonesString="", phones={};
    try {
        if (localStorage.getItem("phones")) {
            phonesString = localStorage.getItem("phones");
        }
    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);
    }
    if (phonesString) {
        phones = JSON.parse(phonesString);
        keys = Object.keys(phones);
        console.log(keys.length + " phones loaded.");
        for (i=0; i < keys.length; i++) {
            key = keys[i];
            Phone.instances[key] = Phone.convertRow2Obj(phones[key]);
        }
    }
};

//  Save all phone objects to Local Storage
Phone.saveAll = function () {
    var phonesString="", error=false,
        nmrOfPhones = Object.keys(Phone.instances).length;
    try {
        phonesString = JSON.stringify(Phone.instances);
        localStorage.setItem("phones", phonesString);
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
        error = true;
    }
    if (!error) console.log(nmrOfPhones + " phones saved.");
};

//  Create a new phone row
Phone.add = function (slots) {
    var phone = new Phone(slots);
    Phone.instances[slots.imei] = phone;
    console.log("Phone " + slots.imei + " created!");
};

//  Update an existing phone row
Phone.update = function (slots) {
    var phone = Phone.instances[slots.imei];
    if (phone.manufacturer !== slots.manufacturer) { phone.manufacturer = slots.manufacturer;}
    if (phone.model !== slots.model) { phone.model = slots.model;}
    console.log("Phone " + slots.imei + " modified!");
};

//  Delete a phone row from persistent storage
    Phone.destroy = function (imei) {
    if (Phone.instances[imei]) {
        console.log("Phone " + imei + " deleted");
        delete Phone.instances[imei];
    } else {
        console.log("There is no phone with IMEI " + imei + " in the database!");
    }
};

//  Testing functions
//  Create and save test data
Phone.createTestData = function () {
    Phone.instances["869386043998999"] = new Phone({imei:"869386043998999", manufacturer:"OnePlus", model:"6T"});
    Phone.instances["869386043998981"] = new Phone({imei:"869386043998981", manufacturer:"Google", model:"Pixel 3 XL"});
    Phone.instances["046503079345494"] = new Phone({imei:"046503079345494", manufacturer:"Samsung", model:"Galaxy S10"});
    Phone.saveAll();
    location.reload();
};

//  Clear data
Phone.clearData = function () {
    if (confirm("Do you really want to delete all phone data?")) {
        Phone.instances = {};
        localStorage.setItem("phones", "{}");
    }
    location.reload();
};