var createDefaultField = require('./createTextField');

module.exports = {
    init: function (formdata) {
        // body...
        var formHtml = this.createWrapper(formdata);

        formHtml.appendChild(this.createForm(formdata));

        // TODO: REFACTOR THIS to append wrapper to user's need
        document.getElementsByTagName('body')[0].appendChild(formHtml);
    },
    createWrapper: function (formdata) {
        // create the wrapper for the form 
        var formWrapper = document.createElement('div');
        formWrapper.id = formdata.id;
        formWrapper.className = 'bform-wrapper';
        
        return formWrapper;
    },
    createHeader: function (formdata) {
        // Create form header
        var header = document.createElement('section');
        var h1 = document.createElement('h1');
        var p = document.createElement('p');

        h1.innerHTML = formdata.title;
        h1.className = 'bform-header__title';
        p.innerHTML = formdata.description;
        p.className = 'bform-header__description';

        header.className = 'bform-header';
        header.appendChild(h1);
        header.appendChild(p);

        return header;
    },
    createSectionHeader: function (section, parent) {
        // create section header
        if(section.title){
            var h2 = document.createElement('h2');
            h2.className = 'bform-section__header';
            h2.innerHTML = section.title;
            parent.appendChild(h2);
        }

        if(section.description){
            var p = document.createElement('p');
            p.className = 'bform-section__description';
            p.innerHTML = section.description;
            parent.appendChild(p);
        }
    },
    createForm: function (formdata) {
        // create the overall structure of the form
        var f = document.createElement('form');
        var sections = formdata.sections;
        var header = this.createHeader(formdata);
        var that = this;
        
        f.className = "bform";
        f.appendChild(header);

        sections.forEach(function(section, index){
            var sectionHTML = document.createElement('ul');
            
            sectionHTML.className = 'bform-section';

            // Add section title
            that.createSectionHeader(section, sectionHTML);

            if(section.fields){
                section.fields.forEach(function (field, index) {
                    // append child field sections
                    sectionHTML.appendChild(createDefaultField.create(field));
                })
            }
            
            
            f.appendChild(sectionHTML);
        })

        var submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'btn';
        submitButton.innerHTML = 'Submit';
        submitButton.id = 'submit';

        f.appendChild(submitButton);

        f.method = 'POST';
        f.action = formdata.action;
        
        return f;
    }
}