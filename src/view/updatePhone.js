pl.view.updatePhone = {
    setupUserInterface: function () {
        var formEl = document.forms['UpdatePhone'],
            saveButton = formEl.commit,
            selectPhoneEl = formEl.selectPhone;
        var i=0, key="", keys=[], phone=null, optionEl=null;
        // load all phone objects
        Phone.loadAll();
        // populate the selection list with phones
        keys = Object.keys(Phone.instances);
        for (i=0; i < keys.length; i++) {
            key = keys[i];
            phone = Phone.instances[key];
            optionEl = document.createElement("option");
            optionEl.text = phone.manufacturer;
            optionEl.value = phone.imei;
            selectPhoneEl.add(optionEl, null);
        }
        // when a phone is selected, populate the form with the phone data
        selectPhoneEl.addEventListener("change", function () {
            var phone=null, key = selectPhoneEl.value;
            if (key) {
                phone = Phone.instances[key];
                formEl.imei.value = phone.imei;
                formEl.manufacturer.value = phone.manufacturer;
                formEl.model.value = phone.model;
            } else {
                formEl.imei.value = "";
                formEl.manufacturer.value = "";
                formEl.model.value = "";
            }
        });
        saveButton.addEventListener("click", pl.view.updatePhone.handleUpdateButtonClickEvent);
        window.addEventListener("beforeunload", function () {
            Phone.saveAll(); 
        });
    },
    // save updated data
    handleUpdateButtonClickEvent: function () {
        var formEl = document.forms['UpdatePhone'];
        var slots = { imei: formEl.imei.value, 
            manufacturer: formEl.manufacturer.value, 
            model: formEl.model.value
        };
        Phone.update(slots);
        formEl.reset();
        window.location.reload();
    }
};