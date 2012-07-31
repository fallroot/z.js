(function() {
    var root = this;

    var $ = root.jQuery || root.Zepto || function(element) {return element;};

    var defaults = {
        tag: 'div'
    };

    function execute(selector) {
        if (!selector) {
            return $(document.createElement(defaults.tag));
        }

        // get child selectors separated by ">"
        var reChildren = /\s*>\s*/,
            reSiblings = /\s*\+\s*/,
            children = selector.split(reChildren),
            siblings,
            result,
            parent,
            element,
            i = 0,
            j,
            childrenCount = children.length,
            siblingsCount;

        for (; i < childrenCount; ++i) {
            // get adjacent sibling selectors separated by "+"
            siblings = children[i].split(reSiblings);

            for (j = 0, siblingsCount = siblings.length; j < siblingsCount; ++j) {
                element = parse(siblings[j]);

                if (parent) {
                    parent.appendChild(element);
                }

                if (!i && !j) {
                    result = element;
                }
            }

            parent = element;
        }

        // console.debug(selector, result);

        return $(result);
    }

    function parse(selector) {
        var element,
            id,
            classes = [],
        	attributes = [], 
            text,
            reId = /#([\w-]+)/g,
            reClass = /\.([\w-]+)/g,
            reText = /\{(.+)\}/g,
            reAttributeNameAndValue = /\[\s*(\w+)\s*=\s*([^\].]*)\s*\]/, 
    		reAttributeName = /\[\s*(\w+)\s*\]/;

        // remove leading or trailing spaces
        selector = selector.replace(/^\s+|\s+$/, '');

        // get id selector started with "#"
        if (reId.test(selector)) {
            id = RegExp.$1;
        }

        // get class selectors started with "."
        while (reClass.test(selector)) {
            classes.push(RegExp.$1);
        }

        // get text contents surrounded with braces
        if (reText.test(selector)) {
            text = RegExp.$1;
        }
    	//get attribute name and value surrounded with []
		while (reAttributeNameAndValue.test(selector)) {
			attributes.push({
				key : [ RegExp.$1 ],
				value : RegExp.$2.replace(/"|'/, '')
			});
			
			selector = selector.replace(reAttributeNameAndValue, '');
		}

		//get attribute just name surrounded with []
		while (reAttributeName.test(selector)) {
			attributes.push({
				key : [ RegExp.$1 ],
				value : [ RegExp.$1 ]
			});
			selector = selector.replace(reAttributeName, '');
		}
        selector = selector.replace(reId, '')
                           .replace(reClass, '')
                           .replace(reText, '');

        // if tag selector not exist, create <div> by default.
        element = document.createElement(selector || defaults.tag);

        if (text) {
            element.appendChild(document.createTextNode(text));
        }

        if (id) {
            element.id = id;
        }

        if (classes.length) {
            element.className = classes.join(' ');
        }
    
        for ( var i = 0; i < attributes.length; i++) {
			element.setAttribute(attributes[i].key, attributes[i].value);
		}

        return element;
    }

    root.$z = execute;
})();
