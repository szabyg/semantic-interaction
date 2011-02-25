/**
 * Demo-specific methods.
 */

function presentEntitiesAsTags (companies, field) {
	var foundEntities = [];
	$.each (companies.matches, function () {
		var entity = this;
		var name = entity.name;
		var confidence = (entity.confidence) ? parseFloat((entity.confidence.toString()).replace(/"/g, "")) : 100.0;
		foundEntities.push({
			value: entity,
			name: name.toString().replace(/"/g, ""),
			confidence: confidence
		});
	});
	for (var x = 0; x < foundEntities.length; x++) {
		var name = foundEntities[x].name;
		console.info(name);
		field.append($("<div>").text(name.replace(/@en/, "")));
	}
}