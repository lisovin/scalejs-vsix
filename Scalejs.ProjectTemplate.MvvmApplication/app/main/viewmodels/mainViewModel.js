/*global define */
define([
    'sandbox!$fileinputname$'
], function (
    sandbox
) {
    'use strict';

    return function () {
        var // imports
            observable = sandbox.mvvm.observable,
            // properties
            text = observable('Hello World');

        return {
            text: text
        };
    };
});
