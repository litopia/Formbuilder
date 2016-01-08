module.exports = {
    validateRequired: function(elem){
        var that = this;
        var errorMsg = that.fieldErrorMsg('This field is required.');
        var validated = false;

        elem.addEventListener('blur', function(e){
            var isValid = Boolean(elem.value);

            if (isValid && validated) {
                validated = false;
                that.changeInvalidState(isValid, elem);
                elem.parentNode.removeChild(errorMsg);
            }else if(!isValid && !validated){
                validated = true;
                that.changeInvalidState(isValid, elem);
                elem.parentNode.appendChild(errorMsg);
            };
        })
    },
    validatePhoneNumber: function(elem){
        var errorMsg = this.fieldErrorMsg('Please enter a valid phone number. It should contains 10 digits and starts with your area code only.');
        var validated = false;
        var that = this;

        elem.addEventListener('blur', function(){
            var phoneRegex = new RegExp('(\\d{3})(\\d{3})(\\d{4})');
            var number = this.value;
            number = number.replace(/[_\W]+/g, '');
            var length = number.length;
            var isValid = phoneRegex.test(number);
            
            if(isValid){
                this.value = number.replace(phoneRegex, "$1-$2-$3");
                if(validated){
                    validated = false;
                    that.changeInvalidState(isValid, elem);
                    elem.parentNode.removeChild(errorMsg);
                }
            }else{
                if (!validated) {
                    validated = true;
                    that.changeInvalidState(isValid, elem);
                    elem.parentNode.appendChild(errorMsg);
                }
            }
            
        })
    },
    validateEmail: function (elem) {
        // Check email input against email format
        var emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        var that = this;
        var errorMsg = that.fieldErrorMsg('This is not a valid email address.');
        var validated = false;

        elem.addEventListener('blur', function(e){
            var parent = elem.parentNode;
            var isValid = emailRegex.test(this.value);

            // If email input doesn't match regex format
            if(!isValid){
                if (!validated){
                    validated = true;

                    that.changeInvalidState(isValid, elem);
                    
                    parent.appendChild(errorMsg);
                };
            }else{
                if (validated) {
                    validated = false;

                    that.changeInvalidState(isValid, elem);

                    parent.removeChild(errorMsg);
                };
            }
        })
    },
    initUpdateRelation: function(elem, targetID){
        var that = this;

        elem.addEventListener('change', function(e){
            var targetElem = document.getElementById(targetID);
            var targetLabel = targetElem.parentNode.getElementsByTagName('label')[0];

            targetLabel.firstChild.nodeValue = this.value

            targetElem.name = this.value;
        })
    },
    initInsertRelation: function (elem, target) {
        // Show/hide subfields according to select value
        // This funciton assumes that it always starts at 0
        var that = this;

        elem.addEventListener('change', function (e) {
            var targetElems = that.getTargets(target);
            var value = this.value;

            for (var i = 0; i < targetElems.length; i++) {
                if (i < value) {
                    if(targetElems[i].classList.contains('hide')){
                        targetElems[i].classList.remove('hide');
                    }
                }else{
                    if(!targetElems[i].classList.contains('hide')){
                        targetElems[i].classList.add('hide');
                    }
                }
            };
        })   
    },
    initConfirm: function(elem, targetID){
        var that = this;
        var errorMsg = that.fieldErrorMsg('These two fields don\'t match.', 'repeat-error');
        var validated = false;

        elem.addEventListener('blur', function(e){

            var inputValue = this.value;
            var targetElem = document.getElementById(targetID);
            var targetValue = targetElem.value;
            var parentElem = that.getClosest(elem, '.bform-subfield__holder');
            var isValid = inputValue.toLowerCase() === targetValue.toLowerCase();

            if (targetValue) {
                if(isValid){
                    // If input matches target input, remove all invalid states
                    that.changeInvalidState(isValid, elem);

                    targetElem.classList.remove('invalid');

                    if (parentElem.getElementsByClassName('repeat-error').length > 0) {
                        parentElem.getElementsByClassName('repeat-error')[0].remove();
                    };
                
                }else{
                    that.changeInvalidState(isValid, elem);

                    targetElem.classList.add('invalid');
                    if (parentElem.getElementsByClassName('repeat-error').length < 1) {
                        parentElem.appendChild(errorMsg);
                    };
                }
            };
        })
    },
    changeInvalidState: function (valid, elem) {
        // This function updates the ui state of the target element
        if(valid){
            elem.classList.remove('invalid');

            // enable submit button, if there is no invalid inputs
            if(document.getElementsByClassName('invalid').length < 1){
                document.getElementById('submit').setAttribute('disabled', false);
            }
        }else{
            elem.classList.add('invalid');
            document.getElementById('submit').setAttribute('disabled', true);
        }
    },
    fieldErrorMsg: function (message, className) {
        // construct field error message
        var msg = document.createElement('p');
        msg.textContent = message;
        msg.className = 'bform-errorMsg';

        if(className){msg.classList.add(className)}
        return msg;
    },
    getTargets: function (selector) {
        // Get targets by given selector
        var firstChar = selector.charAt(0);

        if(firstChar === '.'){
            return document.getElementsByClassName(selector.substr(1));
        }else if(firstChar === '#'){
            return document.getElementById(selector.substr(1));
        }

        return false;
    },
    getClosest: function (elem, selector) {
        var firstChar = selector.charAt(0);

        // Get closest match
        for( ; elem && elem !== document; elem = elem.parentNode){
            if (firstChar === '.') {
            // matching classname
                if (elem.classList.contains(selector.substr(1))){
                    return elem;
                } 
            };

            // If matching Id
            if (firstChar === '#') {
                if (elem.id === selector.substr(1)) {
                    return elem;
                };
            };

            // If selector is a data attribute
            if ( firstChar === '[' ) {
                if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) ) {
                    return elem;
                }
            }

            // If selector is a tag
            if ( elem.tagName.toLowerCase() === selector ) {
                return elem;
            }

        }
        
        return false;
    }
}