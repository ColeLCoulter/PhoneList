pl.view.createPhone = {
    setupUserInterface: function () {
        var saveButton = document.forms['AddPhone'].commit;
        // load all phone objects
        Phone.loadAll();
        // Set an event handler for the save/submit button
        saveButton.addEventListener("click", pl.view.createPhone.handleSaveButtonClickEvent);
        window.addEventListener("beforeunload", function () {
            Phone.saveAll(); 
        });
    },
    handleSaveButtonClickEvent: function () {
        var formEl = document.forms['AddPhone'];
        var slots = { imei: formEl.imei.value, 
            manufacturer: formEl.manufacturer.value, 
            model: formEl.model.value};
        Phone.add(slots);
        formEl.reset();
        window.location.reload();
    }
};