$(function() {
    var layers = [
        'lxbarth.map-s26z9vnz',
        'villeda.nyc-trees',
        'villeda.map-8lrdm572',
        'villeda.nyc-buildings',
        'villeda.map-knrpf5da',
        'villeda.map-iaqy28df'
    ];
    var layerTemplate = $('#layer-switcher ul').html();
    $('#layer-switcher ul').empty();

    var tileUrl = function(layer) {
        return 'http://a.tiles.mapbox.com/v3/' + layer + '.jsonp'
    };

    var layerInfo = [];

    var cssSafe = function(str) {
        return str.replace(/[^a-z,A-Z,0-0,-]/g, '-');
    };

    // Build map, returns function to update map.
    var buildMap = function(tilejson) {
        // Tile layer
        var map = new MM.Map('map',
        new wax.mm.connector(tilejson));
        map.setCenterZoom(new MM.Location(40.7010,
            -74.0137),
            11);
        wax.mm.zoomer(map).appendTo(map.parent);

        // Interaction
        var interaction = wax.mm.interaction()
            .map(map)
            .tilejson(tilejson)
            .on(wax.tooltip().animate(true).parent(map.parent).events());

        // Legend
        var legend = wax.mm.legend(map, tilejson).appendTo(map.parent);

        // Update UI from map info
        var updateUI = function(tilejson) {
            $('#attribution').empty().append(tilejson.attribution);
            $('#layer-switcher li').removeClass('active');
            $('#layer-switcher li#' + cssSafe(tilejson.id)).addClass('active');
        };
        updateUI(tilejson);

        // Return handler for updating the map.
        return function(tilejson) {
            interaction && interaction.remove();
            map.setLayerAt(0, new wax.mm.connector(tilejson));
            interaction = wax.mm
                .interaction()
                .map(map)
                .tilejson(tilejson)
                .on(wax.tooltip().animate(true).parent(map.parent).events());
            if (legend) {
                $(legend.element()).css('opacity', 0);
                legend.content(tilejson);
                $(legend.element()).animate({opacity: 1}, 500);
            }
            updateUI(tilejson);
        };
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

            // Load the first map and attach event handlers.
            if (i == 0) {
                var updateMap = buildMap(tilejson);
                $('#layer-switcher li .title').click(function() {
                    var id = $(this).parent().attr('id');
                    _.any(layerInfo, function(tilejson) {
                        if (id != cssSafe(tilejson.id)) return false;
                        updateMap(tilejson);
                        return true;
                    });
                    return false;
                });
            }
        });
    });

    
});
