var layout = layout || (function (d) {

    var container;
    var currentRow;

    function initialise(containerSelector) {
        container = d.querySelectorAll(containerSelector)[0];
    }

    function addRow() {
        var row = d.createElement("div");
        row.classList.add("row");
        currentRow = row;
        container.appendChild(row);
    }

    function addPanel(module, options) {

        var panel = d.createElement("div");
        panel.classList.add("panel");
        panel.classList.add("pull-left");
        panel.classList.add("col-sm-4");

        if(options) {
            if(options.size) {
                panel.classList.add("col-sm-" + options.size);
            }
            if(options.height) {
                panel.style.height = options.height;
            }
            if(options['min-height']) {
                panel.style.minHeight = options['min-height'];
            }
        }

        module.attach(panel);

        currentRow.appendChild(panel);
    }

    return {
        initialise: initialise,
        addPanel: addPanel,
        addRow: addRow
    };

})(document);
