var require = {
    "baseUrl":  ".",
    "config": {
        "scalejs.statechart-scion": {
            "logStatesEnteredAndExited": true
        }
    },
    "paths": {
        "jasmine":  "Scripts/jasmine",
        "jasmine-html":  "Scripts/jasmine-html"
    },
    "shim": {
        "jasmine":  {
            "exports":  "jasmine"
        },
        "jasmine-html":  {
            "deps":  [
                "jasmine"
            ]
        }
    }
};
