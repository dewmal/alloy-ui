AUI.add('aui-ace-autocomplete-velocity', function(A) {
var Lang = A.Lang,

	Base = A.AceEditor.AutoCompleteBase,

	MATCH_DIRECTIVES = 0,
	MATCH_VARIABLES = 1,

	NAME = 'aui-ace-autocomplete-velocity';

var Velocity = A.Component.create({
	NAME: NAME,

	NS: NAME,

	ATTRS: {
		directives: {
			validator: Lang.isArray,
			value: [
				'else',
				'elseif',
				'foreach',
				'if',
				'include',
				'macro',
				'parse',
				'set',
				'stop'
			]
		},

		directivesMatcher: {
			setter: '_setRegexValue',
			value: /#[\w]*[^#]*$/
		},

		host: {
			validator: Lang.isObject
		},

		variables: {
			validator: Lang.isObject
		},

		variablesMatcher: {
			setter: '_setRegexValue',
			value: /\$[\w., ()"]*(?:[^$]|\\\$)*$/
		}
	},

	EXTENDS: A.AceEditor.TemplateProcessor,

	prototype: {
		getMatch: function(content) {
			var instance = this;

			var match;

			var matchIndex;

			if ((matchIndex = content.lastIndexOf('#')) >= 0) {
				content = content.substring(matchIndex);

				if (instance.get('directivesMatcher').test(content)) {
					match = {
						content: content.substring(1),
						start: matchIndex,
						type: MATCH_DIRECTIVES
					};
				}
			}
			else if ((matchIndex = content.lastIndexOf('$')) >= 0) {
				content = content.substring(matchIndex);

				if (instance.get('variablesMatcher').test(content)) {
					match = {
						content: content.substring(1),
						start: matchIndex,
						type: MATCH_VARIABLES
					};
				}
			}

			return match;
		}
	}
});

A.AceEditor.AutoCompleteVelocity = Velocity;

}, '@VERSION@' ,{requires:['aui-ace-autocomplete-templateprocessor']});
