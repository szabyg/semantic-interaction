/**
 * Demo-specific methods.
 */

function presentEntitiesAsTags (rdfs, field) {
			var foundEntities = [];
			for (var i in rdfs.matches) {
				var rdf = rdfs.matches[i];
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
			for (var x = 0; x < foundEntities.length; x++) {
				var name = foundEntities[x].name;
				field.append($("<div>").text(name.replace(/@en/, "")));
			}
		}