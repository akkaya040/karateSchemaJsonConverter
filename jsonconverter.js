var sampleData ='{"data":[{"type":"articles","id":"1","attributes":{"title":"JSON:API paints my bikeshed!","body":"The shortest article. Ever."},"relationships":{"author":{"data":{"id":"42","type":"people"}}}}],"included":[{"type":"people","id":"42","attributes":{"name":"John"}}]}';

function karateValidationJsonConverter() {
  var json;
  if (document.getElementById('code').value) {
    try {
      json = JSON.parse(document.getElementById('code').value);
      document.getElementById('code').value = JSON.stringify(inputTxt, null, 2);
      document.getElementById('output').value = '';
    } catch (e) {
      document.getElementById('output').value = e;
    }
  }

  var responseName;
  if (document.getElementById('responseInput').value)
    responseName = document.getElementById('responseInput').value;
  else
    responseName = 'response';

  let outArr = {};
  let output = convertJson(json, responseName, true);
  ouput = Object.assign(output, outArr);
  Object.keys(ouput).forEach(key => ouput[key] === "#undefined" && delete ouput[key]);
  document.getElementById('output').value = JSON.stringify(output, null, 2);

  function convertJson(json, keyName, isParent) {
    let outA = {};
    let x = {};
    let y = {};
    Object.keys(json).forEach(function(key) {
      if (!(getJSType(json[key]) === "object") && !(getJSType(json[key]) === "array")) {
        x[key] = '#' + getJSType(json[key]);
      }
      if (getJSType(json[key]) === "object") {
        x[key] = convertJson(json[key], key, false);
      }
      if (getJSType(json[key]) === "array") {
        x[key] = '#[] #('+ key + 'Data)';//getJSType(json[key]);
        getArray(json[key][0], key, false);
      }
    })

    if (isParent) {
      if (Object.keys(x).length > 0) {
        outA[keyName] = x;
      }
      if (Object.keys(y).length > 0) {
        outA[keyName + 'Arr'] = y;
      }
      return outA;
    } else {
      if (Object.keys(y).length > 0 && isParent) {
        return y;
      }
      if (Object.keys(x).length > 0) {
        return x;
      }
    }
  }

  function getArray(json, keyName, isParent) {
    let z = {};
    if (!(getJSType(json) === "object") && !(getJSType(json) === "array")) {
      z[keyName + 'Data'] = '#' + getJSType(json);
    } else {
      z[keyName + 'Data'] = convertJson(json, keyName, false);
    }
    outArr = Object.assign(outArr, z);
  }


  function getJSType(valToChk) {

    function isUndefined(valToChk) {
      return valToChk === undefined;
    }

    function isNull(valToChk) {
      return valToChk === null;
    }

    function isArray(valToChk) {
      return valToChk.constructor == Array;
    }

    function isBoolean(valToChk) {
      return valToChk.constructor == Boolean;
    }

    function isFunction(valToChk) {
      return valToChk.constructor == Function;
    }

    function isNumber(valToChk) {
      return valToChk.constructor == Number;
    }

    function isString(valToChk) {
      return valToChk.constructor == String;
    }

    function isObject(valToChk) {
      return valToChk.constructor == Object;
    }

    if (isUndefined(valToChk)) {
      return "undefined";
    }
    if (isNull(valToChk)) {
      return "null";
    }
    if (isArray(valToChk)) {
      return "array";
    }
    if (isBoolean(valToChk)) {
      return "boolean";
    }
    if (isFunction(valToChk)) {
      return "function";
    }
    if (isNumber(valToChk)) {
      return "number";
    }
    if (isString(valToChk)) {
      return "string";
    }
    if (isObject(valToChk)) {
      return "object";
    }

  }
}

function formatJson() {
  if (document.getElementById('code').value) {
    try {
      var inputTxt = JSON.parse(document.getElementById('code').value);
      document.getElementById('code').value = JSON.stringify(inputTxt, null, 2);
      document.getElementById('output').value = '';
    } catch (e) {
      document.getElementById('output').value = e;
    }
  }
}

function minifyJson() {
  if (document.getElementById('code').value) {
    try {
      var inputTxt = JSON.parse(document.getElementById('code').value);
      document.getElementById('code').value = JSON.stringify(inputTxt, null, null);
      document.getElementById('output').value = '';
    } catch (e) {
      document.getElementById('output').value = e;
    }
  }
}

function getSample() {
  document.getElementById("code").value = sampleData;
//  document.getElementById("code").value = httpGet(url);
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}