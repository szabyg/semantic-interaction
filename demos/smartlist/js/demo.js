/**
 * Demo-specific methods.
 */

function presentEntitiesAsTags (rdfs, inputField) {
			var foundEntities = [];
			for (i in rdfs) {
				var rdf = rdfs[i];
				for (var e = 0; e < rdf.matches.length; e++) {
					var entity = rdf[e];
					var name = entity.name;
					var confidence = (entity.confidence) ? parseFloat((entity.confidence.toString()).replace(/"/g, "")) : 100.0;
					foundEntities.push({
						value: e,
						name: name.toString().replace(/"/g, ""),
						confidence: confidence
					});
				}
			}
		  	inputField
			.autoSuggest({value: "", name: ""}, {
						selectedItemProp: "name", 
                        searchObjProps: "name",
						startText: "",
						showResultList: false,
						preFill: foundEntities,
                        selectionRemoved: function(elem) { 
                            elem.fadeTo("fast", 0, function(){ elem.remove(); });
                        }});
		}