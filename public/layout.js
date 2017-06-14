var layout = layout || (function (d) {

    var container;

    function initialise(containerSelector) {
        container = d.querySelectorAll(containerSelector)[0];
    }

    function addPanel(module) {

        var panel = d.createElement("div");
        panel.classList.add("panel");
        panel.classList.add("pull-left");
        panel.classList.add("col-sm-4");
        module.attach(panel);

        container.appendChild(panel);
    }

    return {
        initialise: initialise,
        addPanel: addPanel
    };

})(document);