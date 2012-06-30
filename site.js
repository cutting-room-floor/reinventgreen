$(function() {
    var map;
    var layerTemplate = $('#layer-switcher ul').html();
    $('#layer-switcher ul').empty();

    var tileUrl = function(layer) {
        return 'http://a.tiles.mapbox.com/v3/' + layer + '.jsonp'
    };

    var layers = [
        'lxbarth.map-s26z9vnz',
        'villeda.nyc-trees',
        'villeda.map-8lrdm572',
        'villeda.nyc-buildings',
        'villeda.map-knrpf5da',
        'villeda.map-iaqy28df'
    ];

    var layerInfo = [];

    var cssSafe = function(str) {
        return str.replace(/[^a-z,A-Z,0-0,-]/g, '-');
    };

    var loadMap = function(tilejson) {
        map = new MM.Map('map',
        new wax.mm.connector(tilejson));
        map.setCenterZoom(new MM.Location(tilejson.center[0],
            tilejson.center[1]),
            tilejson.center[2]);

        wax.mm.zoomer(map).appendTo(map.parent);
        wax.mm.interaction()
            .map(map)
            .tilejson(tilejson)
            .on(wax.tooltip().animate(true).parent(map.parent).events());
        wax.mm.legend(map, tilejson).appendTo(map.parent);

        $('#attribution').empty().append(tilejson.attribution);
        $('#layer-switcher li').removeClass('active');
        $('#layer-switcher li#' + cssSafe(tilejson.id)).addClass('active');
    };

    var updateMap = function(tilejson) {
        // todo
    };

    _.each(layers, function(layer, i){
        var el = $('#layer-switcher ul')
            .append(layerTemplate)
            .find('li:last')
            .attr('id', cssSafe(layer));
        wax.tilejson(tileUrl(layer), function(tilejson) {
            layerInfo.push(tilejson);
            $('.title', el).empty().append(tilejson.name);
            $('.description', el).empty().append(tilejson.description);
            i == 0 && loadMap(tilejson);
        });
    });

    $('#layer-switcher li .title').click(function() {
        var id = $(this).attr('id');
        _.any(layerInfo, function(info) {
            if (id != info.id) return false;
            updateMap(id);
            return true;
        });
        return false;
    });
});
