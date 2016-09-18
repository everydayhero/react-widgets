"use strict";

var urlRegExp = new RegExp(
  "^(https?):\\/\\/" +                    // protocol
  "([\\w-]+(?:\\.[\\w-]+)*(?::\\d+)?)" +  // hostname
  "(\\/[^?#]*)?" +                        // path
  "(?:\\?([^#]*))?" +                     // query
  "(?:#(.*))?",                           // bookmark
  "i"
);

function parseUrl(url) {
  var match = url.match(urlRegExp);

  return !match ? null : {
    protocol: match[1],
    hostname: match[2],
    path: match[3] || '/',
    query: match[4],
    bookmark: match[5]
  };
}

export default parseUrl;
