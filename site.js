$(function() {
    var layers = [
        {
            handle: 'trees',
            layer: 'villeda.trees-brooklyn,villeda.trees-bronx,villeda.trees-queens,villeda.trees-manhattan',
            name: 'Street trees',
            description: 'New York City street trees.'
        }, {
            handle: 'coolroofs',
            layer: 'lxbarth.map-s26z9vnz'
        }, {
            handle: 'buildings',
            layer: 'villeda.nyc-buildings'
        }, {
            handle: 'greenstreets',
            layer: 'villeda.map-8lrdm572'
        }, {
            handle: 'school1',
            layer: 'villeda.map-knrpf5da'
        }, {
            handle: 'school2',
            layer: 'villeda.map-iaqy28df'
        }
    ];
    var layerTemplate = $('#layer-switcher ul').html();
    $('#layer-switcher ul').empty();

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

    _.each(layers, function(layer, i){
        var el = $('#layer-switcher ul')
            .append(layerTemplate)
            .find('li:last')
            .attr('id', layer.handle);
        wax.tilejson(tileUrl(layer.layer), function(tilejson) {
            tilejson.handle = layer.handle;
            tilejson.name = layer.name || tilejson.name;
            tilejson.description = layer.description || tilejson.description;
            tilejson.attribution = layer.attribution || tilejson.attribution;
            layerInfo[layer.handle] = tilejson;

            $('.title', el).empty().append(tilejson.name);
            $('.description', el).empty().append(tilejson.description);

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
