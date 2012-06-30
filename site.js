$(function() {
    var tileUrl = function(layer) {
        return 'http://a.tiles.mapbox.com/v3/' + layer + '.jsonp'
    };

    var layerInfo = {};

    var cssSafe = function(str) {
        return str.replace(/[^a-zA-Z0-9]+/g, '');
    };

    // Build map, returns function to update map.
    var buildMap = function(tilejson) {
        // Tile layer
        var map = new MM.Map('map',
        new wax.mm.connector(tilejson));
        map.setCenterZoom(new MM.Location(40.7010,
            -74.0137),
            12);
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
            $('#layer-switcher li#' + tilejson.handle).addClass('active');
        };
        updateUI(tilejson);

        // Return handler for updating the map.
        return function(tilejson) {
            if (map.layers.length > 1) return;
            interaction && interaction.remove();
            $(map.layers[0].parent).css('z-index', 100);
            map.insertLayerAt(1, new wax.mm.connector(tilejson));
            $(map.layers[0].parent).fadeOut(500, function() {
                map.removeLayerAt(0);
            });
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

    $('#layer-switcher li').each(function(i, el) {
        wax.tilejson(tileUrl($('a', el).attr('data-layer')), function(tilejson) {
            tilejson.handle = $(el).attr('id');
            layerInfo[tilejson.handle] = tilejson;
            // Load the first map and attach event handlers.
            if (i == 0) {
                var updateMap = buildMap(tilejson);
                $('#layer-switcher li .title').click(function() {
                    updateMap(layerInfo[$(this).parent().attr('id')]);
                    return false;
                });
            }
        });
    });

    
});
