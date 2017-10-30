var volume = {
    r: '',
    h: '',
    getVolume: function (r, h) {
      return ((Math.PI * Math.pow(r, 2) * h).toFixed(4));
    }
};

function getResult() {
    var r = document.getElementById('r').value;
    var h = document.getElementById('h').value;
    document.getElementById('result').innerHTML = volume.getVolume(r, h);
};
