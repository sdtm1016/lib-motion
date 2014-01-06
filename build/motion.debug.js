;
(function(win, lib) {

    function Motion(config){
        
        if(!("v" in config)) {
            this.v = 0;
        } else {
            this.v = config.v;
        }
        if(!("a" in config)) {
            this.a = 0;
        } else {
            this.a = config.a;
        }
        
        if(("t" in config)) {
            this.t = config.t;
        } else if(("s" in config)) {
            this.t = Math.sqrt((this.v * this.v + 2 * this.a * this.s ) / (this.a * this.a)) - this.v / this.a;
        } else if( this.v / this.a  < 0) {
            this.t = - this.v / this.a;
        }
        
        if("s" in config) {
            this.s = config.s;
        } else {
            this.s = this.a * this.t * this.t / 2 + this.v * this.t;
        }
        
        this.generateCubicBezier = function() {
            function quadratic2cubicBezier(a, b) {
                return [[(a / 3 + (a + b) / 3 - a) / (b - a), (a * a / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)],
                    [(b / 3 + (a + b) / 3 - a) / (b - a), (b * b / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)]];
            }
            return quadratic2cubicBezier( this.v / this.a , -this.t + this.v / this.a );
        }
        
    };

    lib.createMotion = function(config) {
        return new Motion(config);
    }

})(window, window['lib'] || (window['lib'] = {}));