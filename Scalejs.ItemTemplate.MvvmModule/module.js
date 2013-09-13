/*global define */
define([
    'scalejs!sandbox/$fileinputname$',
    'app/$fileinputname$/viewmodels/$fileinputname$ViewModel',
    'app/$fileinputname$/bindings/$fileinputname$Bindings.js',
    'text!app/$fileinputname$/views/$fileinputname$.html'
], function (
    sandbox,
    $fileinputname$ViewModel,
    $fileinputname$Bindings,
    $fileinputname$Template
) {
    'use strict';

    return function $fileinputname$Module() {
        var // imports
            root = sandbox.mvvm.root,
            template = sandbox.mvvm.template,
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
                        // Render viewModel using 'main_template' template 
                        // (defined in main.html) and show it in the `root` region.
                        viewModel.text('Hello World from $fileinputname$!');
                        root(template('$fileinputname$_template', viewModel));
                    }))));
    };
});
