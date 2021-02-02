<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Store Locator</title>
    <script
      src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyC7VI1clJTVYMRYJRqnnksl7beLSTa9HC4"></script>
    <script
      src="https://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js">
    </script>
    <script src="js/store-locator.min.js"></script>
    <script src="store-static-ds2.js"></script>
    <script src="custom.js"></script>
    <link rel="stylesheet" href="css/storelocator.css">
    <style>
      body { font-family: sans-serif; }
      #map-canvas, #panel { height: 500px; }
      #panel { width: 300px; float: left; margin-right: 10px; }
      #panel .feature-filter label { width: 130px; }
      p.attribution, p.attribution a { color: #666; }
      .store .hours { color: grey; }
    </style>
  </head>
  <body>
    <h1>Store Locator</h1>
    <div id="panel"></div>
    <div id="map-canvas"></div>    
  </body>
</html>
