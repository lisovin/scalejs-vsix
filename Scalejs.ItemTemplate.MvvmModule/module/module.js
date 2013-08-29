/*global define */
define([
    'scalejs!module',
    './viewmodels/$fileinputname$ViewModel',
    'text!./views/$fileinputname$.html',
    './bindings/$fileinputname$Bindings.js'
], function (
    module,
    $fileinputname$ViewModel,
    $fileinputname$Template,
    $fileinputname$Bindings
) {
    'use strict';

    function create(sandbox) {
        var // imports
            root = sandbox.mvvm.root,
            renderable = sandbox.mvvm.renderable,
            registerBindings = sandbox.mvvm.registerBindings,
            registerTemplates = sandbox.mvvm.registerTemplates,
            registerStates = sandbox.state.registerStates,
            state = sandbox.state.builder.state,
            onEntry = sandbox.state.builder.onEntry,
            // vars
            viewModel = $fileinputname$ViewModel(sandbox);

        // Register module bindings
        registerBindings($fileinputname$Bindings);

        // Register module templates
        registerTemplates($fileinputname$Template);

        // Register application state for the module.
        registerStates('root',
            state('app',
                state('$fileinputname$',
                    onEntry(function () {
                        // Render viewModel using '$fileinputname$-text' binding 
                        // and show it set root view
                        viewModel.text('Hello World from $fileinputname$!');
                        root(renderable('$fileinputname$-text', viewModel));
                    }))));
    }

    return module('$fileinputname$', create);
});
