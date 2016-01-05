module.exports={
    create: function (fieldata) {
        // init & field create function text fields
        var field = this.createWrapper(fieldata);
        var that = this;

        if (fieldata.type === 'label') {
            field.appendChild(that.createLabel(fieldata));
        }else if(fieldata.type === 'text'){
            field.appendChild(that.createLabel(fieldata));
            field.appendChild(that.createInputField(fieldata));
        }else if(fieldata.type === 'select'){
            field.appendChild(that.createLabel(fieldata));
            field.appendChild(that.createSelectField(fieldata));
        }else if(fieldata.type === 'radio' || fieldata.type === 'checkbox'){
            field.appendChild(that.createLabel(fieldata));
            field.appendChild(that.createCheckboxSection(fieldata));
        };
        
        if(fieldata.subfields){
            var subfieldWrapper = that.createSubFields(fieldata.subfields);

            field.appendChild(subfieldWrapper);
        }

        return field;
    },
    createSubFields: function (subfields) {
        // generate subfields
        var that = this;
        var subfieldWrapper = document.createElement('div');
            subfieldWrapper.className = 'bform-subfield__holder';

            subfields.forEach(function(subfield, index){
                var subfieldHTML;

                if(subfield.type === "text"){
                    subfieldHTML = that.createSubTextField(subfield);
                }else if(subfield.type === "select"){
                    subfieldHTML = that.createSubSelectField(subfield);
                }   
                
                if(subfieldHTML){
                    subfieldWrapper.appendChild(subfieldHTML);
                }
            })
        return subfieldWrapper;
    },
    createWrapper: function (fieldata) {
        // create the wrapper for text field
        var wrapper = document.createElement('li');
        wrapper.className = "bform-field__wrapper";

        return wrapper;
    },
    createLabel: function (fieldata) {
        // create field label
        var label = document.createElement('label');
        label.className = "bform-field__label";
        label.for = fieldata.name;
        label.innerHTML= (fieldata.label) ? fieldata.label : fieldata.name;

        if(fieldata.required){
            var span = document.createElement('span');
            span.className = "bform-field__label-required"
            span.innerHTML= "*";
            label.appendChild(span);
        }   
        return label;
    },
    createInputField: function (fieldata){
        var input = document.createElement('input');
        input.type = fieldata.type;
        input.name = fieldata.name;
        input.required = fieldata.required;
        if(fieldata.placeholder){
            input.placeholder = fieldata.placeholder;
        }
        input.className = 'bform-field__input';
        
        return input;
    },
    createCheckboxSection: function (fieldata) {
        // Create checkboxes field
        var checkboxesHTML = document.createElement('div');
        checkboxesHTML.className = 'bform-subfield__holder';
        if(fieldata.options){
            fieldata.options.forEach(function (option, index) {
                // create checkbox for each options
                var wrapper = document.createElement('label');
                var checkboxHTML = document.createElement('input');
                checkboxHTML.type = fieldata.type;
                checkboxHTML.className = "bform-checkbox";
                checkboxHTML.value = option.value;
                checkboxHTML.name = fieldata.name;
                checkboxHTML.selected = option.selected;

                wrapper.appendChild(checkboxHTML);
                wrapper.innerHTML += option.value;
                wrapper.className = 'bform-checkbox__label';

                checkboxesHTML.appendChild(wrapper);
            })
        }
        return checkboxesHTML;
    },
    createSelectField: function (fieldata) {
        // create the html for select field
        var selectHTML = document.createElement('select');
        var selectWrapper = document.createElement('div');
        selectHTML.name = fieldata.name;
        selectHTML.className = 'bform-select';
        selectWrapper.className = 'bform-select__wrapper';
        if(fieldata.required){
            selectHTML.required = true;
        }
        if(fieldata.options){
            fieldata.options.forEach(function (option, index) {
                // create option tag 
                var optionHTML = document.createElement('option');
                
                if(option.label){
                    optionHTML.innerHTML = option.label;
                }else{
                    optionHTML.innerHTML = option.value;
                }
                optionHTML.value = option.value;

                if(option.selected){
                    optionHTML.selected = true;
                }
                selectHTML.appendChild(optionHTML);
            })
            selectWrapper.appendChild(selectHTML);
        }
        return selectWrapper;
    },
    createSubTextField: function (subfieldata) {
        // create sub text field
        // label comes after input field
        // TODO: need to consider responsive issue
        var that = this;
        var wrapper = document.createElement('span');
        wrapper.className = 'bform-subfield__item';
        if(subfieldata.className){
            wrapper.className = wrapper.className + ' ' + subfieldata.className;
        }
        wrapper.appendChild(that.createInputField(subfieldata));
        wrapper.appendChild(that.createLabel(subfieldata));

        return wrapper;
    }, 
    createSubSelectField: function(subfieldata){
        var that = this;
        var wrapper = document.createElement('span');
        wrapper.className = 'bform-subfield__item';
        wrapper.appendChild(that.createSelectField(subfieldata));
        if(subfieldata.label){
            wrapper.appendChild(that.createLabel(subfieldata));
        }

        return wrapper;
    }
}