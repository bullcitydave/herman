var flickrApiKey = "806745a8a5db2aff0b0cdb591b633726";
var flickrUserId = 'toastie97';




var $gallery = $('#main-gallery');
//
// $(function galleryInit() {
//   $gallery.flickity({
//     // options
//   });
// });


var getGallery = function (tag) {
  var flickrApiUrl =  "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrApiKey + "&user_id=toastie97&tags=" + tag +"&per_page=16&page=1&format=json&nojsoncallback=1";

    return $.getJSON(flickrApiUrl + "&format=json&nojsoncallback=1").done(function(photoData){
      flickrLength = Math.min(photoData.photos.photo.length,15);
      var flickrView = $('#flickr-template').html();
      var flickrImg = '';
      var photoId = '';
      var farmId='';
      var serverId ='';
      var secret='';



      for (var i = 0; i < flickrLength ; i++) {
        if (!photoData.photos.photo[i]) {
          continue;
        }
        photoId = photoData.photos.photo[i].id;
        farmId = photoData.photos.photo[i].farm;
        serverId = photoData.photos.photo[i].server;
        secret = photoData.photos.photo[i].secret;
        flickrImg = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + photoId + '_'+ secret + '_n.jpg';
        flickrUrl = 'https://www.flickr.com/photos/' + flickrUserId + '/' + photoId + '/';
        // console.log('Rendering Flickr image: ',flickrImg);
        $('#main-gallery').append(_.template(flickrView,({"flickrImg":flickrImg})));
        console.log($('.gallery-cell').length);
        // $('#main-gallery').flickity('append' , (_.template(flickrView,({"flickrImg":flickrImg}))));
      }
      // cells = $('.gallery-cell');
      // _.each(cells, function(cell) {
      //   $('#main-gallery').flickity( 'append',  cell );
      // })
    }).then(function() {
      var r = confirm("Click to continue");
      if (r == true) {
      $gallery.css('display','block').flickity({
        // options
        cellAlign: 'center',
        freeScroll: false,
        contain: true,
        wrapAround: true,
        setGallerySize: false,
        imagesLoaded: true,
        percentPosition: false
      });
    }
    });
}

$('input[id=tag]').on('keypress', function(e) {
  if (e.keyCode == 13) {
    getGallery($('input[id=tag]').val());
  }
})
