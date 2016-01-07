module.exports = {
    validatePhoneNumber: function(elem){
        var errorMsg = this.fieldErrorMsg('Please enter a valid phone number. It should contains 10 digits and starts with your area code only.');

        elem.addEventListener('blur', function(){
            var phoneRegex = new RegExp('(\\d{3})(\\d{3})(\\d{4})');
            var number = this.value;
            number = number.replace(/[_\W]+/g, '');
            var length = number.length;
            
            if(phoneRegex.test(number)){
                this.value = number.replace(phoneRegex, "$1-$2-$3");
                if(elem.classList.contains('invalid')){
                    elem.classList.remove('invalid');
                    elem.parentNode.removeChild(errorMsg);
                    if(document.getElementsByClassName('invalid').length < 1){
                        document.getElementById('submit').setAttribute('disabled', false);
                    }
                }
            }else{
                if (!elem.classList.contains('invalid')) {
                    elem.classList.add('invalid');
                    elem.parentNode.appendChild(errorMsg);
                    document.getElementById('submit').setAttribute('disabled', true);
                };
            }
            
        })
    },
    validateEmail: function (elem) {
        // Check email input against email format
        var emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        var that = this;
        var errorMsg = that.fieldErrorMsg('This is not a valid email address.');

        elem.addEventListener('blur', function(e){
            var parent = elem.parentNode;

            if(!emailRegex.test(this.value)){
                if (!this.classList.contains('invalid')){
                    this.classList.add('invalid');
                    parent.appendChild(errorMsg);
                    document.getElementById('submit').setAttribute('disabled', true);
                };
            }else{
                if (this.classList.contains('invalid')) {
                    this.classList.remove('invalid');
                    parent.removeChild(errorMsg);
                    if(document.getElementsByClassName('invalid').length < 1){
                        document.getElementById('submit').setAttribute('disabled', false);
                    }
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
        var errorMsg = that.fieldErrorMsg('These two fields don\'t match.');

        elem.addEventListener('blur', function(e){

            var inputValue = this.value;
            var targetElem = document.getElementById(targetID);
            var targetValue = targetElem.value;
            var parentElem = that.getClosest(elem, '.bform-subfield__holder');

            if(inputValue.toLowerCase() === targetValue.toLowerCase()){
                // If input matches target input, remove all invalid states
                if(this.classList.contains('invalid')){
                    this.classList.remove('invalid');
                    targetElem.classList.remove('invalid');

                    parentElem.removeChild(errorMsg);
                }
            }else{
                if(!this.classList.contains('invalid')){
                    this.classList.add('invalid');
                    targetElem.classList.add('invalid');
                }
                
                parentElem.appendChild(errorMsg);
            }
        })
    },
    fieldErrorMsg: function (message) {
        // construct field error message
        var msg = document.createElement('p');
        msg.textContent = message;
        msg.className = 'bform-errorMsg';

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