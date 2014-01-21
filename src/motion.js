;
(function(win, lib) {

    /**
     * 二次贝塞尔曲线(即抛物线)转换为三次贝塞尔曲线
     * 
     * @param  {number} a p1点的横坐标
     * @param  {number} b p1点的纵坐标
     * @return {Array}    4个三次贝塞尔参数组成的数组，形如[[p1x, p1y], [p2x, p2y]]
     */
    function quadratic2cubicBezier(a, b) {
        return [[(a / 3 + (a + b) / 3 - a) / (b - a), (a * a / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)],
            [(b / 3 + (a + b) / 3 - a) / (b - a), (b * b / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)]];
    }

    /**
     * 通过已知的运动参数，推导出其它的位置参数
     * 基于牛顿第二定律：s = vt + at^2/2
     * 
     * @param {object} config 形如{v, a, s, t}，其中：
     *                        v是已知初速度，a是已知加速度
     *                        t是时间，s是位移
     *                        t和s最少知其一，即可推导出另一个
     */
    function Motion(config){

        this.v = config.v || 0;
        this.a = config.a || 0;
        
        if(typeof config.t !== 'undefined') {
            this.t = config.t;
        }

        if(typeof config.s !== 'undefined') {
            this.s = config.s;
        }

        // 通过位移倒推时间
        if (typeof this.t === 'undefined') {
            if (typeof this.s === 'undefined') {
                this.t = - this.v / this.a;
            } else {
                var t1 = (Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v) / this.a;
                var t2 = (-Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v) / this.a;
                this.t = Math.min(t1, t2);
            }
        }

        // 通过时间推导位移
        if (typeof this.s === 'undefined') {
            this.s = this.a * this.t * this.t / 2 + this.v * this.t;
        }
    }

    /**
     * 根据运动参数推导出三维贝塞尔参数
     * @return {Array} 4个三次贝塞尔参数组成的数组，形如[[p1x, p1y], [p2x, p2y]]
     */
    Motion.prototype.generateCubicBezier = function () {
        return quadratic2cubicBezier( this.v / this.a , this.t + this.v / this.a );
    };

    lib.motion = function(config) {
        return new Motion(config);
    }

})(window, window['lib'] || (window['lib'] = {}));