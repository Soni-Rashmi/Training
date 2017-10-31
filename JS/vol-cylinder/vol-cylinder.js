function Volume(r, h) {
    this.r = r;
    this.h = h;
};

Volume.prototype.getVolume = function () {
    return ((Math.PI * Math.pow(this.r, 2) * this.h).toFixed(4));
};

function getResult() {
    var h = document.getElementById('h').value
    var r = document.getElementById('r').value;
    var volume = new Volume(r, h);
    document.getElementById('result').innerHTML = volume.getVolume();
};
