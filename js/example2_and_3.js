//=================================================
// Example 2 and 3 - cover
//=================================================

$(function() {

  $("#example-2, #example-3").each(function() {

    var example = $(this);
    var parent = example.parents(".track");
    var track = example.silverTrack($.extend({}, SilverTrackExample.defaults, {cover: true}));

    track.install(new SilverTrack.Plugins.Navigator({
      prev: $("a.prev", parent),
      next: $("a.next", parent)
    }));

    track.install(new SilverTrack.Plugins.BulletNavigator({
      container: $(".bullet-pagination", parent)
    }));

    track.install(new SilverTrack.Plugins.ResponsiveHubConnector({
      layouts: ["phone", "small-tablet", "tablet", "web"],
      onReady: function(track, options, event) {
        options.onChange(track, options, event);
      },

      onChange: function(track, options, event) {
        track.options.mode = "horizontal";
        track.options.autoHeight = false;
        track.options.perPage = 5;

        if (event.layout === "small-tablet") {
          track.options.perPage = 5;
          if (track.container.hasClass("huge")) {
            track.options.autoHeight = false;
          }

        } else if (event.layout === "phone") {
          track.options.perPage = 5;
          track.options.mode = "vertical";
          track.options.autoHeight = false;
        }

        track.restart({keepCurrentPage: true});
      }
    }));

    track.start();

  });

});