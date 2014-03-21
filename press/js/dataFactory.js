function dataFactory (datasets, categories, range) {
  var data = []
    ;
  for (var i = 0; i < datasets.length; i++) {
    if (i==0) 
      value = (range - 1) + Math.random()*(range - 1);
    else
      value = 10+Math.random()*30;
    
    data.push({
      title: datasets[i],
      values: stream(categories, range)
    })
  };

  return data;
}

function stream (cats, range) {
  var result = []
    , value = 0
    ;

  for (var i = 0; i < cats.length; i++) {
    if (i==0) 
      value = (range - 1) + Math.random()*(range - 1);
    else
      value = 10+Math.random()*30;

    result.push({
      label: cats[i],
      value: parseInt( value )
    })
  };

  return result;
}

function sine (points) {
  var result = []
    , incrementAngle = (Math.PI*2)/points
    ;
  for (var i = 0; i < Math.PI*2; i += incrementAngle) {
    result.push({
      label: i,
      value: parseFloat(Math.sin(i).toFixed(5))
    })
  };
  return result;
}

function cosine (points) {
  var result = []
    , incrementAngle = (Math.PI*2)/points
    ;
  for (var i = 0; i < Math.PI*2; i += incrementAngle) {
    result.push({
      label: i,
      value: parseFloat(Math.cos(i).toFixed(5))
    })
  };
  return result;
}

function yearByMonths (yearCount) {
  var dates = []
    , month = 1
    , startYear = 2014 - yearCount
    ;
  
  for (var i = 0; i < yearCount; i++) {
    month = 0;
    while (month < 12) {
      dates.push(new Date(startYear+i, month).getTime());
      month++;
    }
  }
  return dates;
}