GENTICS.Aloha.PastePlugin.WordPasteHandler=new GENTICS.Aloha.PastePlugin.PasteHandler;GENTICS.Aloha.PastePlugin.WordPasteHandler.handlePaste=function(b){this.detectWordContent(b)&&this.transformWordContent(b)};
GENTICS.Aloha.PastePlugin.WordPasteHandler.detectWordContent=function(b){var f=false;b.find("*").each(function(){var c=jQuery(this).attr("style");if(c)if(c.toLowerCase().indexOf("mso")>=0){f=true;return false}if(c=jQuery(this).attr("class"))if(c.toLowerCase().indexOf("mso")>=0){f=true;return false}});return f};
GENTICS.Aloha.PastePlugin.WordPasteHandler.isOrderedList=function(b){if(b.css("fontFamily")=="Wingdings"||b.css("fontFamily")=="Symbol")return false;return b.text().match(/^([0-9]{1,3}\.)|([0-9]{1,3}\)|([a-zA-Z]{1,5}\.)|([a-zA-Z]{1,5}\)))$/)?true:false};
GENTICS.Aloha.PastePlugin.WordPasteHandler.transformListsFromWord=function(b){var f=this,c="p.MsoListParagraphCxSpFirst,p.MsoListParagraph,p span";c=b.find(c);c.each(function(){var a=jQuery(this);if(a.hasClass("MsoListParagraphCxSpFirst")||a.hasClass("MsoListParagraph"))a.addClass("aloha-list-element");else if(a.css("font-family").indexOf("Symbol")>=0)a.closest("p").addClass("aloha-list-element");else if(a.css("font-family").indexOf("Wingdings")>=0)a.closest("p").addClass("aloha-list-element");else a.css("mso-list")&&
a.css("mso-list")!=""&&a.closest("p").addClass("aloha-list-element")});c="p span span span";b.find(c).each(function(){var a=jQuery(this);if(a.text().trim().replace(/&nbsp;/g,"").length==0)if(a.parent().parent().text().trim().replace(/&nbsp;/g,"").match(/^([0-9]{1,3}\.)|([0-9]{1,3}\))|([a-zA-Z]{1,5}\.)|([a-zA-Z]{1,5}\))|(.)$/)){a.closest("p").addClass("aloha-list-element");a.parent().parent().addClass("aloha-list-bullet")}});c="p.aloha-list-element";var o=":not("+c+")";c=b.find(c);c.length>0&&c.each(function(){var a=
jQuery(this);a.removeClass("aloha-list-element");a.find("font").each(function(){jQuery(this).contents().unwrap()});var i=0,j=parseFloat(a.css("marginLeft")),k=[],p=a.nextUntil(o),d=jQuery(a.find("span.aloha-list-bullet"));if(d.length==0)d=jQuery(a.children("span:first"));var m=f.isOrderedList(d);d.remove();var e=jQuery(m?"<ol></ol>":"<ul></ul>");k.push(e);var h=jQuery("<li></li>");e.append(h);a.contents().appendTo(h);a.replaceWith(e);p.each(function(){var g=jQuery(this);g.find("font").each(function(){jQuery(this).contents().unwrap()});
var l=parseFloat(g.css("marginLeft"));d=jQuery(g.find("span.aloha-list-bullet"));if(d.length==0)d=jQuery(g.children("span:first"));m=f.isOrderedList(d);d.remove();if(l>j){var n=jQuery(m?"<ol></ol>":"<ul></ul>");e.children(":last").append(n);e=n;k.push(e);i++;j=l}else if(l<j&&i>0){k.pop();i--;e=k[i];j=l}h=jQuery("<li></li>");e.append(h);g.contents().appendTo(h);g.remove()})})};
GENTICS.Aloha.PastePlugin.WordPasteHandler.transformTitles=function(b){b.find("p.MsoTitle").each(function(){GENTICS.Aloha.Markup.transformDomObject(jQuery(this),"h1")});b.find("p.MsoSubtitle").each(function(){GENTICS.Aloha.Markup.transformDomObject(jQuery(this),"h2")})};GENTICS.Aloha.PastePlugin.WordPasteHandler.transformWordContent=function(b){this.transformListsFromWord(b);this.transformTitles(b)};