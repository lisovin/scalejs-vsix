/// <reference path="../Scripts/require.js"/>
/// <reference path="../Scripts/jasmine.js"/>

/*global requirejs*/
requirejs({
    paths: {
        'scalejs' : '../Scripts/scalejs-0.1.3'
    }
}, ['./$projectname$.test']);
