/**
 * @extends storeLocator.StaticDataFeed
 * @constructor
 */
function StoreDataSource() {
  $.extend(this, new storeLocator.StaticDataFeed);
  /*  
  Get data from mysql 
   */
  var that = this;
  $.get('address.php', function(data) {
   // console.log(that.parse_(data));
    that.setStores(that.parse_(data));
  });
}

//Store
/**
 * @const
 * @type {!storeLocator.FeatureSet}
 * @private
 */

StoreDataSource.prototype.FEATURES_ = new storeLocator.FeatureSet( 
);

/**
 * @return {!storeLocator.FeatureSet}
 */
StoreDataSource.prototype.getFeatures = function() {
  return this.FEATURES_;
};

/**
 * @private
 * @param {string} csv
 * @return {!Array.<!storeLocator.Store>}
 */
StoreDataSource.prototype.parse_ = function(csv) {
  var stores = [];
  var rows = csv.split('\n');
  var headings = this.parseRow_(rows[0]);

  for (var i = 1, row; row = rows[i]; i++) {
    row = this.toObject_(headings, this.parseRow_(row));  
   //console.log(row);   
    var features = new storeLocator.FeatureSet;  
    var position = new google.maps.LatLng(row.Xcoord, row.Ycoord);
    //console.log(position);    
    var shop = row.address; 
    var store = new storeLocator.Store(row.id, position, features, {
      title: row.store_name,
      address: this.join_([shop], '<br>'),
    });
    stores.push(store);    
  }
 return stores;
};

/**
 * Joins elements of an array that are non-empty and non-null.
 * @private
 * @param {!Array} arr array of elements to join.
 * @param {string} sep the separator.
 * @return {string}
 */
StoreDataSource.prototype.join_ = function(arr, sep) {
  var parts = [];
  for (var i = 0, ii = arr.length; i < ii; i++) {
    arr[i] && parts.push(arr[i]);
  }
  return parts.join(sep);
};

/**
 * Very rudimentary CSV parsing - we know how this particular CSV is formatted.
 * IMPORTANT: Don't use this for general CSV parsing!
 * @private
 * @param {string} row
 * @return {Array.<string>}
 */
StoreDataSource.prototype.parseRow_ = function(row) {
  // Strip leading quote.
  if (row.charAt(0) == '"') {
    row = row.substring(1);
  }
  // Strip trailing quote. There seems to be a character between the last quote
  // and the line ending, hence 2 instead of 1.
  if (row.charAt(row.length - 2) == '"') {
    row = row.substring(0, row.length - 2);
  }

  row = row.split('","');

  return row;
};

/**
 * Creates an object mapping headings to row elements.
 * @private
 * @param {Array.<string>} headings
 * @param {Array.<string>} row
 * @return {Object}
 */
StoreDataSource.prototype.toObject_ = function(headings, row) {
  var result = {};
  for (var i = 0, ii = row.length; i < ii; i++) {
    result[headings[i]] = row[i];
  }
  return result;
};
