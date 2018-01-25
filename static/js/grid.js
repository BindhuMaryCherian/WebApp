/*globals $:false */
"use strict";
 
    // jsGrid documentation: http://js-grid.com/docs/
    $("#jsGrid").jsGrid({
        width: "100%",
        height: "auto",
 
        autoload: true,
        pageButtonCount: 3,
        inserting: false,
        editing: false,
        filtering: true,
        sorting: true,
        paging: true,

        controller: {
            loadData: function(filter) {
                var def = $.Deferred();
                $.ajax({
                    type: "GET",
                    url: window.location.href.replace("8080","4000/listcurrency"),
                    dataType: "json"
                }).done(function(result) {
                    // After we get our data, check to see if a filter exists and if so, apply it
                    result = $.grep(result, function(item) {
                        if (!filter.name) {
                          return true;
                        } else {
                            if (typeof filter.name === "string" || filter.name instanceof String) {
                                return item.name.indexOf(filter.name) >= 0;
                            } else {
                                return true;
                            }
                        } 
                        
                    });
                    def.resolve(result);
                });
                return def.promise();
            }
        },
 
        fields : [ {
            name : "name",
            title : "Currency Name",
            type: "text",
            sorting: true,
            width : 100
        }, {
            name : "id",
            title : "ID",
            type: "text",
            width : 80
        }, {
            name : "symbol",
            title : "Symbol",
            type: "text",
            width : 50
        }, {
            name : "value",
            title : "Value",
            type: "text",
            width : 100
        } ],

        // This method is called after the controller.loadData promise is resolved
        onDataLoaded: function() {
            // Sort after data is loaded
            $("#jsGrid").jsGrid("sort", 0);
        }
    });
