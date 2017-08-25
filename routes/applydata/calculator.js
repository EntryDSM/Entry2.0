var calculator = {};

calculator.calculateScore = (data, graduateType, applyType) => {
  if(graduateType != 'black'){
    for (var i = 0; i < data.length; i++) {
      if(checkNullArray(data[i])){
        if(i % 2 == 0){
          if(i < data.length - 1){
            data[i] = data[i + 1];
          }
        }else{
          data[i] = data[i - 1];
        }
      }
    }
    return calculateNormal(data, graduateType, applyType);
  }else{
    return calculateBlack(data, applyType);
  }
}

function calculateNormal(data, graduateType, applyType) {
  var result = [];
  var i;

  for (i = 0; i < data.length; i++) {
    var average = 0, count = 0;
    for (var j = 0; j < data[i].length; j++) {
      if(data[i][j] != null) {
        average += data[i][j];
        count++;
      } else if(i % 2 == 0) {
        if(i < data.length - 1){
          if(data[i+1][j] == null) {
            continue;
          } else {
            average += data[i+1][j];
            count++;
          }
        }
      } else {
        if(data[i-1][j] == null) {
          continue;
        } else {
          average += data[i-1][j];
          count++;
        }
      }
    }
    result[i] = count != 0 ? average / count : null;
  }
  if(graduateType == 'Will'){
    result[5] = result[4];
  }

  var flag = 0;
  for (i = 0; i < result.length; i += 2) {
    if(i < result.length - 1){
      if(result[i] == null && result[i+1] == null){
        flag += (i / 2) + 1;
      }
    }
  }

  var first, second, third;
  var fsMultiply, tMultiply;
  if(applyType == 'Common'){
    fsMultiply = 4.5;
    tMultiply = 6;
  }else{
    fsMultiply = 2.7;
    tMultiply = 3.6;
  }

  first = (result[0] + result[1]) * fsMultiply;
  second = (result[2] + result[3]) * fsMultiply;
  third = (result[4] + result[5]) * tMultiply;
  if(flag == 1){
    if(graduateType == 'Will'){
      first = (result[2] + result[3] + result[4]) * (2 / 3) * fsMultiply;
    }else{
      first = (result[2] + result[3] + result[4] + result[5]) * 0.5 * fsMultiply;
    }
  }else if(flag == 2){
    if(graduateType == 'Will'){
      second = (result[0] + result[1] + result[4]) * (2 / 3) * fsMultiply;
    }else{
      second = (result[0] + result[1] + result[4] + result[5]) * 0.5 * fsMultiply;
    }
  }else if(flag == 3){
    first = (result[4] + result[5]) * fsMultiply;
    second = (result[4] + result[5]) * fsMultiply;
  }

  var resultScore = {
    firstAverage: getRound(first),
    secondAverage: getRound(second),
    thirdAverage: getRound(third)
  };

  return resultScore;
}

function calculateBlack(data, applyType) {
  var average = 0, total;
  for (var i = 0; i < data.length; i++) {
    if(data[i] != null){
      average += data[i];
    }
  }
  average /= data.length;

  var multiply;
  if(applyType == 'Common'){
    multiply = 150;
  }else{
    multiply = 90;
  }

  total = (average - 50) / 50 * multiply;
  total = getRound(total);

  return total;
}

calculator.calculateAttendent = (data, graduateType) => {
  if(graduateType == 'black'){
    return 15;
  }
  var toSub = (data.attendAbsence + (data.attendLate + data.attendEarly + data.attendClass) / 3) % 1;
  if(toSub >= 15) {
    return 0;
  }
  return 15 - toSub;
}

calculator.calculateVolunteer = (data, applyType) => {
  var score, minus, div;
  if(applyType != undefined){ // black(GED)
    score = calculateBlack(data, applyType);
    minus = 30;
    div = 120;
  }else{
    if(data >= 50){
      return 15;
    }else if(data <= 14){
      return 3;
    }
    score = data;
    minus = 14;
    div = 36;
  }

  var result;

  result = 3 + (score - minus) / div * 12;
  result = getRound(result);

  return result;
}

function checkNullArray(data) {
  for (var i = 0; i < data.length; i++) {
    if(data[i] != null){
      return false;
    }
  }
  return true;
}

function getRound(value){
  value *= 1000;
  value = Math.round(value);
  value /= 1000;
  return value;
}

module.exports = calculator;