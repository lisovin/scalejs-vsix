/*global define */
define([
    'scalejs!module',
    './viewmodels/mainViewModel',
    'text!./views/main.html',
    './bindings/mainBindings.js'
], function (
    module,
    mainViewModel,
    mainTemplate,
    mainBindings
) {
    'use strict';

    function create(sandbox) {
        var // imports
            root = sandbox.mvvm.root,
            renderable = sandbox.mvvm.renderable,
            registerBindings = sandbox.mvvm.registerBindings,
            registerTemplates = sandbox.mvvm.registerTemplates,
            // vars
            viewModel = mainViewModel(sandbox);

        // Register module bindings
        registerBindings(mainBindings);

        // Register module templates
        registerTemplates(mainTemplate);

        // Render viewModel using 'main_template' and show it set root view
        root(renderable('main_template', viewModel));
    }

    return module('main', create);
});
