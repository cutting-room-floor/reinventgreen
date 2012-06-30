$(function() {
    var layers = [
        {
            handle: 'trees',
            layer: 'villeda.trees-brooklyn,villeda.trees-bronx,villeda.trees-queens,villeda.trees-manhattan',
            description: 'A census of street trees by borough yielded datasets with a total of 623,939 trees (<a href="https://nycopendata.socrata.com/browse?q=street%20tree%20census&sortBy=relevance">Source</a>). This map contains all boroughs except Staten Island.',
            name: 'New York City street trees.'
        }, {
            handle: 'coolroofs',
            layer: 'lxbarth.map-s26z9vnz',
            name: 'Cool roof buildings',
            description: 'There are over 200 cool roof buildings in New York City. This newly opened dataset identifies them by street address and geo location (<a href="https://nycopendata.socrata.com/Environmental-Sustainability/NYC-Cool-Roofs-Buildings/uuxn-wzxe">Source</a>).'
        }, {
            handle: 'buildings',
            layer: 'villeda.nyc-buildings',
            name: 'Building perimeter outlines',
            description: 'Rich dataset containing over one million building footprints of New York City, here colored by footprint area (<a href="https://nycopendata.socrata.com/Facilities-and-Structures/Building-Perimeter-Outlines/r7fd-yd5e">Source</a>)'
        }, {
            handle: 'greenstreets',
            layer: 'villeda.map-8lrdm572',
            name: 'Green streets',
            description: 'Small planted areas that are maintained as <a href="http://www.nycgovparks.org/trees">Greenstreets</a> (<a href="https://nycopendata.socrata.com/Environmental-Sustainability/Greenstreets/p23h-ci72">Source</a>).'
        }, {
            handle: 'school1',
            layer: 'villeda.map-knrpf5da',
            name: 'Elementary school zones',
            description: '<a href="https://nycopendata.socrata.com/Education/School-Zones-2011-2012/dqkt-8x6u">Source</a>'
        }, {
            handle: 'school2',
            layer: 'villeda.map-iaqy28df',
            name: 'Middle school zones',
            description: '<a href="https://nycopendata.socrata.com/Education/School-Zones-2011-2012/dqkt-8x6u">Source</a>'
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
