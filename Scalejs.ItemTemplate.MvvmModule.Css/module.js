/*global define */
define([
    'sandbox!$fileinputname$',
    'app/$fileinputname$/viewmodels/$fileinputname$ViewModel',
    'bindings!$fileinputname$',
    'views!$fileinputname$',
    'styles!$fileinputname$'
], function (
    sandbox,
    $fileinputname$ViewModel
) {
    'use strict';

    return function $fileinputname$Module() {
        var // imports
            root = sandbox.mvvm.root,
            template = sandbox.mvvm.template,
            registerStates = sandbox.state.registerStates,
            state = sandbox.state.builder.state,
            onEntry = sandbox.state.builder.onEntry,
            // vars
            $fileinputname$ = $fileinputname$ViewModel(sandbox);

        // Register application state for the module.
        registerStates('app',
            state('$fileinputname$',
                onEntry(function () {
                    // Render viewModel using 'main_template' template 
                    // (defined in main.html) and show it in the `root` region.
                    $fileinputname$.text('Hello World from $fileinputname$!');
                    root(template('$fileinputname$_template', $fileinputname$));
                })));
    };
});
