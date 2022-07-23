export function addr(address) {
  return address.slice(0,5) + "..." + address.slice(-4, -1);
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function upperText(myString) {        
  return myString.toUpperCase();
}


// abbrNum(12 , 1)          => 12
// abbrNum(0 , 2)           => 0
// abbrNum(1234 , 0)        => 1k
// abbrNum(34567 , 2)       => 34.57k
// abbrNum(918395 , 1)      => 918.4k
// abbrNum(2134124 , 2)     => 2.13m 
// abbrNum(47475782130 , 2) => 47.48b

export function abbrNum(number, decPlaces) {
  const k = 1000;
  const dm = decPlaces < 0 ? 0 : decPlaces;
  const sizes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'Ge'];
  if (number === 0) return '0';
  if (number > 0) {
    const i = Math.floor(Math.log(number) / Math.log(k));
    if (i > 9) {
      return ">1e+30"
    }
    if (i < -10) {
      return "0"
    }
    if (i < 0) {
      const miniSize = ['e-3', 'e-6', 'e-9', 'e-12', 'e-15', 'e-18', 'e-21', 'e-24', 'e-27', 'e-30'];
      return parseFloat((number / Math.pow(k, i)).toFixed(dm)) + ' ' + miniSize[-i-1];
    }

    return parseFloat((number / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  if (number < 0) {
    const num = -number
    const i = Math.floor(Math.log(num) / Math.log(k));
    if (i > 9) {
      return "<-1e+30"
    }
    if (i < -10) {
      return "0"
    }
    if (i < 0) {
      const miniSize = ['e-3', 'e-6', 'e-9', 'e-12', 'e-15', 'e-18', 'e-21', 'e-24', 'e-27', 'e-30'];
      return -parseFloat((number / Math.pow(k, i)).toFixed(dm)) + ' ' + miniSize[-i-1];
    }
    return -parseFloat((num / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

export function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year;
  return time;
}