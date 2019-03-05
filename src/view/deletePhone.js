pl.view.deletePhone = {
    setupUserInterface: function () {
        var deleteButton = document.forms['DeletePhone'].commit;
        var selectEl = document.forms['DeletePhone'].selectPhone;
        var i=0, key="", keys=[], phone=null, optionEl=null;
        // load all phone objects
        Phone.loadAll();
        keys = Object.keys(Phone.instances);
        // populate the selection list with phones
        for (i=0; i < keys.length; i++) {
            key = keys[i];
            phone = Phone.instances[key];
            optionEl = document.createElement("option");
            optionEl.text = phone.model;
            optionEl.value = phone.imei;
            selectEl.add(optionEl, null);
        }
        deleteButton.addEventListener("click", pl.view.deletePhone.handleDeleteButtonClickEvent);
        window.addEventListener("beforeunload", function () {
            Phone.saveAll();
        });
    },
    handleDeleteButtonClickEvent: function () {
        var selectEl = document.forms['DeletePhone'].selectPhone;
        var imei = selectEl.value;
        if (imei) {
            Phone.destroy(imei);
            selectEl.remove(selectEl.selectedIndex);
        }
        window.location.reload();
    }
};