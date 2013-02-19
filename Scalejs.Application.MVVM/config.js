var require = {
    "baseUrl":  ".",
    "paths":  {
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
