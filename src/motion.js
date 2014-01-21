;
(function(win, lib) {

    /**
     * 二次贝塞尔曲线(即抛物线)转换为三次贝塞尔曲线
     * 
     * @param  {number} a p1 点的横坐标
     * @param  {number} b p1 点的纵坐标
     * @return {Array}    4 个三次贝塞尔参数组成的数组，形如[[p1x, p1y], [p2x, p2y]]
     */
    function quadratic2cubicBezier(a, b) {
        return [[(a / 3 + (a + b) / 3 - a) / (b - a), (a * a / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)],
            [(b / 3 + (a + b) / 3 - a) / (b - a), (b * b / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)]];
    }

    function Motion(config){

        this.v = config.v || 0;
        this.a = config.a || 0;
        
        if(typeof config.t !== 'undefined') {
            this.t = config.t;
        }

        if(typeof config.s !== 'undefined') {
            this.s = config.s;
        }

        if (typeof this.t === 'undefined') {
            if (typeof this.s === 'undefined') {
                this.t = - this.v / this.a;
            } else {
                var t1 = (Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v) / this.a;
                var t2 = (-Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v) / this.a;
                this.t = Math.min(t1, t2);
            }
        }

        if (typeof this.s === 'undefined') {
            this.s = this.a * this.t * this.t / 2 + this.v * this.t;
        }
        
        this.generateCubicBezier = function() {
            return quadratic2cubicBezier( this.v / this.a , this.t + this.v / this.a );
        }
        
    };

    lib.motion = function(config) {
        return new Motion(config);
    }

})(window, window['lib'] || (window['lib'] = {}));