module.exports = {

    validateEmail: function (elem) {
        // Check email input against email format
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
    initInsertRelation: function (elem, targetID) {
        // body...
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