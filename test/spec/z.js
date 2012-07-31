describe('Testing z.js', function() {
    var result;
    
    describe('Type Selector', function() {
        it('$z() → <div></div> : get one <div> tag when given not any arguments', function() {
            result = $z();
            expect(result).to.be('div');
        });

        it('$z("section") → <section></section> : get exact tag when given some type selector', function() {
            result = $z('section');
            expect(result).to.be('section');
        });
    });

    describe('ID Selector', function() {
        it('$z("#page") → <div id="page"></div> : div tag is default without type selector', function() {
            result = $z('#id');
            expect(result).to.be('div');
        });

        it('$z("p#page") → <p id="page"></p> : should have id when given id selector', function() {
            result = $z('p#page');
            expect(result).to.be('p');
            expect(result).to.have.id('page');
        });

        it('$z("p#page#dummy") → <p id="page"></p> : should have only one id when given plural id selectors', function() {
            result = $z('p#page#dummy');
            expect(result).to.be('p');
            expect(result).to.have.id('page');
            expect(result).to.not.have.id('dummy');
        });
    });

    describe('Class Selector', function() {
        it('$z("p.title") → <p class="title"></p> : should have class when given class selector', function() {
            result = $z('p.title');
            expect(result).to.be('p');
            expect(result).to.have.class('title');
        });

        it('$z("p.error.critical") → <p class="error critical"></p> : should have classes when given plural class selectors', function() {
            result = $z('p.error.critical');
            expect(result).to.be('p');
            expect(result).to.have.class('error');
            expect(result).to.have.class('critical');
        });
    });

    describe('Child Selector', function() {
        it('$z("div>ul>li") → <div><ul><li></li></ul></div> : get top element including children when given child selectors', function() {
            result = $z('div>ul>li');
            expect(result).to.be('div');
            expect(result).to.have('ul');
            expect(result).to.have('li');
        });
    });

    describe('Adjacent Sibling Selector', function() {
        it('$z("section>div+ul+p") → <section><div></div><ul></ul><p></p></section> : get top element having children when given adjacent sibling selectors', function() {
            result = $z('section>div+ul+p');
            expect(result).to.be('section');
            expect(result).to.have('div');
            expect(result).to.have('ul');
            expect(result).to.have('p');
            expect(result).to.have('div+ul');
            expect(result).to.have('ul+p');
            expect(result).to.have('div+ul+p');
        });
    });

    describe('Text Node', function() {
        it('$z("p{hello}") → <p>hello</p> : get element having text node when given text delimeter', function() {
            result = $z('p{hello}');
            expect(result).to.be('p');
            expect(result).to.have.text('hello');
        });
    });
    
    describe('Attribute selector', function() {
        it('$z("input[name=\"hello\"][type=\'hidden\'][disable][value=test]") → <input name="hello" type="hidden" disable="disable" /> : get element with attribute when given attribute selector', function() {
    		result = $z('input[name=hello][type=hidden][disable][value=test]');
            expect(result).to.be('input');
            expect(result).to.have.attr('name','hello');
            expect(result).to.have.attr('type','hidden');
            expect(result).to.have.attr('disable');
            expect(result).to.have.attr('value','test');    		
    	});
    });

    describe('All Together', function() {
        it('$z("header>h1#title{hello}+p#message.error.critical{oops}") → <header><h1 id="title">hello</h1><p id="message" class="error critical">oops</p></header>', function() {
            result = $z('header>h1#title{hello}+p#message.error.critical{oops}');
            expect(result).to.be('header');
            expect(result).to.have('h1#title');
            expect(result).to.have('p#message.error.critical');
        });
    });
});
