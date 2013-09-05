/*global define */
define([
    'scalejs!sandbox/main'
], function (
    sandbox
) {
    'use strict';

    return function () {
        var observable = sandbox.mvvm.observable,
            text = observable('Hello World');

        return {
            text: text
        };
    };
});
