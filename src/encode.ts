function btoa2(s: string): string {
    var _PADCHAR = "=";
    var _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    function _getbyte( s, i ) {
      var x = s.charCodeAt( i );
   
      if ( x > 255 ) {
        throw "INVALID_CHARACTER_ERR: DOM Exception 5";
      }
   
      return x;
    }
    

      s = String( s );
      var i,
        b10,
        x = [],
        imax = s.length - s.length % 3;
   
      if ( s.length === 0 ) {
        return s;
      }
   
      for ( i = 0; i < imax; i += 3 ) {
        b10 = ( _getbyte( s, i ) << 16 ) | ( _getbyte( s, i + 1 ) << 8 ) | _getbyte( s, i + 2 );
        x.push( _ALPHA.charAt( b10 >> 18 ) );
        x.push( _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) );
        x.push( _ALPHA.charAt( ( b10 >> 6 ) & 0x3f ) );
        x.push( _ALPHA.charAt( b10 & 0x3f ) );
      }
   
      switch ( s.length - imax ) {
        case 1:
          b10 = _getbyte( s, i ) << 16;
          x.push( _ALPHA.charAt( b10 >> 18 ) + _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) + _PADCHAR + _PADCHAR );
          break;
   
        case 2:
          b10 = ( _getbyte( s, i ) << 16 ) | ( _getbyte( s, i + 1 ) << 8 );
          x.push( _ALPHA.charAt( b10 >> 18 ) + _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) + _ALPHA.charAt( ( b10 >> 6 ) & 0x3f ) + _PADCHAR );
          break;
      }
   
      return x.join("");
}

function base64url_encode(e: string): string {
    return btoa2(e).replace("+", "-").replace("/", "_")
}

function encodeID(id: string): string {
    var url = 'http://www.youtube.com/watch?v=' + id;
    return base64url_encode(url);
}

module.exports = encodeID;