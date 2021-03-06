﻿/*global define */
define([
    'sandbox!$fileinputname$',
], function (
    sandbox
) {
    'use strict';

    return function () {
        var observable = sandbox.mvvm.observable,
            text = observable();

        return {
            text: text
        };
    };
});
